import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./prisma";
import { stripe } from "./stripe";
import crypto from "crypto";


function makeInviteToken() {
    return crypto.randomBytes(24).toString("hex"); // simple y suficiente para MVP
}

const app = express();
app.use(cors());

// ✅ 1) WEBHOOK STRIPE (RAW BODY) — ANTES de express.json()
app.post("/webhooks/stripe", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            sig as string,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as any;

            const clerkUserId = session?.metadata?.clerkUserId;
            const subscriptionId = session?.subscription;

            if (clerkUserId && subscriptionId) {
                const sub = await stripe.subscriptions.retrieve(String(subscriptionId)) as any;

                const currentPeriodEndUnix = sub?.current_period_end;
                const currentPeriodEnd =
                    typeof currentPeriodEndUnix === "number" && Number.isFinite(currentPeriodEndUnix)
                        ? new Date(currentPeriodEndUnix * 1000)
                        : null; // ✅ si no existe, guardamos null

                await prisma.subscription.upsert({
                    where: { stripeSubscriptionId: String(sub.id) }, // ✅ aquí
                    update: {
                        userId: clerkUserId,
                        status: String(sub.status),
                        stripeCustomerId: sub.customer ? String(sub.customer) : null,
                        currentPeriodEnd, // ✅ puede ser null
                    },
                    create: {
                        userId: clerkUserId,
                        status: String(sub.status),
                        stripeCustomerId: sub.customer ? String(sub.customer) : null,
                        stripeSubscriptionId: String(sub.id),
                        currentPeriodEnd, // ✅ puede ser null
                    },
                });
            }
        }

        return res.json({ received: true });
    } catch (err: any) {
        console.error("STRIPE_WEBHOOK_ERROR:", err?.message ?? err);
        return res.status(400).send(`Webhook Error: ${err?.message ?? "unknown"}`);
    }
});


app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "api" });
});

// ✅ Crear inivitación al aprobar un lead (admin)
app.post("/admin/leads/:id/approve", async (req, res) => {
    try {
        const leadId = String(req.params.id);

        // 1) genera token si no existe
        const token = makeInviteToken();

        const lead = await prisma.lead.update({
            where: { id: leadId },
            data: {
                status: "APPROVED",
                inviteToken: token,
                approvedAt: new Date(),
            },
        });

        const webBase = process.env.WEB_BASE_URL || "http://localhost:3000";
        const redirectTo = `/onboarding?token=${encodeURIComponent(token)}`;

        // ✅ Link directo a Clerk
        const inviteUrl = `${webBase}/sign-up?redirect_url=${encodeURIComponent(redirectTo)}`;

        return res.json({ ok: true, lead, inviteUrl });
    } catch (e: any) {
        console.error("APPROVE_LEAD_ERROR:", e);
        return res.status(500).json({ ok: false, error: "approve_failed" });
    }
});

// ✅ Mostrar leads (admin)
app.get("/admin/leads", async (_req, res) => {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            take: 200,
            select: {
                id: true,
                createdAt: true,
                nombre: true,
                email: true,
                whatsapp: true,
                objetivo: true,
                experiencia: true,
                disponibilidad: true,
                lesiones: true,
                mensaje: true,
                source: true,
                status: true,
                inviteToken: true,
                approvedAt: true,
                invitedAt: true,
            },
        });

        const webBase = process.env.WEB_BASE_URL || "http://localhost:3000";

        const withUrl = leads.map((l) => ({
            ...l,
            inviteUrl: l.inviteToken ? `${webBase}/sign-up?redirect_url=${encodeURIComponent(`/onboarding?token=${encodeURIComponent(l.inviteToken)}`)}`
                : null,
        }));

        return res.json({ ok: true, leads: withUrl });
    } catch (e) {
        console.error("ADMIN_LEADS_ERROR:", e);
        return res.status(500).json({ ok: false, error: "admin_leads_failed" });
    }
});

// ✅ redimir invitados
app.post("/invites/redeem", async (req, res) => {
    try {
        const { token, userId } = req.body as { token?: string; userId?: string };
        if (!token || !userId) return res.status(400).json({ ok: false, error: "missing" });

        const lead = await prisma.lead.findUnique({ where: { inviteToken: token } });
        if (!lead) return res.status(404).json({ ok: false, error: "invalid_token" });

        // idempotente
        if (lead.status === "REDEEMED") return res.json({ ok: true, alreadyRedeemed: true });

        if (lead.status !== "APPROVED") {
            return res.status(400).json({ ok: false, error: "not_approved", status: lead.status });
        }

        await prisma.lead.update({
            where: { id: lead.id },
            data: { status: "REDEEMED" },
        });

        return res.json({ ok: true, redeemed: true });
    } catch (e) {
        console.error("REDEEM_INVITE_ERROR:", e);
        const message =
            e instanceof Error ? e.message : typeof e === "string" ? e : "unknown_error";
        return res.status(500).json({ ok: false, error: "redeem_failed", message });
    }
});




// ✅ 3) Crear checkout session (suscripción)
app.post("/billing/checkout", async (req, res) => {
    try {
        const { clerkUserId, plan } = req.body ?? {};

        if (!clerkUserId || typeof clerkUserId !== "string") {
            return res.status(400).json({ ok: false, error: "Missing clerkUserId" });
        }

        // ✅ Lista blanca de planes permitidos
        const priceMap: Record<string, string | undefined> = {
            basic: process.env.STRIPE_PRICE_BASIC,
            coaching: process.env.STRIPE_PRICE_COACHING,
            competition: process.env.STRIPE_PRICE_COMPETITION,
        };

        const chosenPlan = typeof plan === "string" ? plan : "coaching"; // default
        const priceId = priceMap[chosenPlan];

        if (!priceId) {
            return res.status(400).json({
                ok: false,
                error: `Invalid plan or missing price for plan: ${chosenPlan}`,
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${process.env.APP_BASE_URL}/app/client?success=1`,
            cancel_url: `${process.env.APP_BASE_URL}/client/billing?canceled=1`,
            metadata: { clerkUserId, plan: chosenPlan },
        });

        return res.json({ ok: true, url: session.url });
    } catch (err: any) {
        console.error("CHECKOUT_ERROR:", err?.message ?? err);
        return res.status(500).json({ ok: false, error: "Checkout error" });
    }
});


// ✅ 4) Consultar si un usuario tiene suscripción activa
app.get("/me/subscription", async (req, res) => {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ ok: false, error: "Missing userId" });

    const sub = await prisma.subscription.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    const active =
        sub?.status === "active" ||
        sub?.status === "trialing"; // si luego usás trials

    return res.json({
        ok: true,
        active: Boolean(active),
        status: sub?.status ?? "none",
        currentPeriodEnd: sub?.currentPeriodEnd ?? null,
    });
});

// ✅ 5) Consultar perfil del cliente
app.get("/me/profile", async (req, res) => {
    try {
        const userId = String(req.query.userId || "");
        if (!userId) return res.status(400).json({ ok: false, error: "missing_userId" });

        const profile = await prisma.clientProfile.findUnique({
            where: { clerkUserId: userId },
        });

        return res.json({ ok: true, profile });
    } catch (e) {
        console.error("GET_PROFILE_ERROR:", e);
        return res.status(500).json({ ok: false, error: "get_profile_failed" });
    }
});

// ✅ 5) Subir detalles perfil del cliente
app.post("/me/profile", async (req, res) => {
    try {
        const {
            userId,
            alturaCm,
            pesoKg,
            meta,
            experiencia,
            lesiones,
            disponibilidad,
        } = req.body as {
            userId?: string;
            alturaCm?: number | string;
            pesoKg?: number | string;
            meta?: string;
            experiencia?: string;
            lesiones?: string;
            disponibilidad?: string;
        };

        if (!userId) return res.status(400).json({ ok: false, error: "missing_userId" });

        const altura = alturaCm === "" || alturaCm == null ? null : Number(alturaCm);
        const peso = pesoKg === "" || pesoKg == null ? null : Number(pesoKg);

        const profile = await prisma.clientProfile.upsert({
            where: { clerkUserId: userId },
            update: {
                alturaCm: Number.isFinite(altura) ? Math.round(altura as number) : null,
                pesoKg: Number.isFinite(peso) ? peso : null,
                meta: meta ?? null,
                experiencia: experiencia ?? null,
                lesiones: lesiones ?? null,
                disponibilidad: disponibilidad ?? null,
            },
            create: {
                clerkUserId: userId,
                alturaCm: Number.isFinite(altura) ? Math.round(altura as number) : null,
                pesoKg: Number.isFinite(peso) ? peso : null,
                meta: meta ?? null,
                experiencia: experiencia ?? null,
                lesiones: lesiones ?? null,
                disponibilidad: disponibilidad ?? null,
            },
        });

        return res.json({ ok: true, profile });
    } catch (e) {
        console.error("UPSERT_PROFILE_ERROR:", e);
        return res.status(500).json({ ok: false, error: "upsert_profile_failed" });
    }
});




app.post("/leads", async (req, res) => {
    try {
        const {
            nombre,
            email,
            whatsapp,
            objetivo,
            experiencia,
            disponibilidad,
            lesiones,
            mensaje,
        } = req.body ?? {};

        // Validación mínima (simple)
        if (!nombre || typeof nombre !== "string" || nombre.trim().length < 2) {
            return res.status(400).json({ ok: false, error: "Nombre inválido" });
        }
        if (!email || typeof email !== "string" || !email.includes("@")) {
            return res.status(400).json({ ok: false, error: "Email inválido" });
        }
        if (!whatsapp || typeof whatsapp !== "string" || whatsapp.trim().length < 8) {
            return res.status(400).json({ ok: false, error: "WhatsApp inválido" });
        }

        const lead = await prisma.lead.create({
            data: {
                nombre: nombre.trim(),
                email: email.trim().toLowerCase(),
                whatsapp: whatsapp.trim(),
                objetivo: String(objetivo ?? "unknown"),
                experiencia: String(experiencia ?? "unknown"),
                disponibilidad: String(disponibilidad ?? "unknown"),
                lesiones: lesiones ? String(lesiones) : null,
                mensaje: mensaje ? String(mensaje) : null,
                source: "web",
            },
        });

        return res.json({ ok: true, leadId: lead.id });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, error: "Error guardando lead" });
    }
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
