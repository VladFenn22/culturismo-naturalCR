import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

async function getSub(userId: string) {
    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/me/subscription?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store",
    });
    return r.json();
}

function Panel({
    title,
    subtitle,
    right,
    children,
}: {
    title: string;
    subtitle?: string;
    right?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                border: "1px solid rgba(15,23,42,0.10)",
                borderRadius: 22,
                background: "white",
                boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    padding: 18,
                    borderBottom: "1px solid rgba(15,23,42,0.08)",
                    background:
                        "linear-gradient(135deg, rgba(17,24,39,0.02), rgba(214,31,44,0.03), rgba(16,185,129,0.03))",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#0F172A" }}>{title}</h1>
                    {subtitle ? (
                        <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.78, color: "#0F172A" }}>
                            {subtitle}
                        </p>
                    ) : null}
                </div>
                {right ? <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{right}</div> : null}
            </div>

            <div style={{ padding: 18 }}>{children}</div>
        </div>
    );
}

function Badge({ tone, children }: { tone: "green" | "amber" | "gray" | "red"; children: React.ReactNode }) {
    const map = {
        green: { bg: "rgba(22,101,52,0.10)", bd: "rgba(22,101,52,0.22)", fg: "#166534" },
        amber: { bg: "rgba(180,83,9,0.10)", bd: "rgba(180,83,9,0.22)", fg: "#b45309" },
        gray: { bg: "rgba(15,23,42,0.06)", bd: "rgba(15,23,42,0.14)", fg: "#0F172A" },
        red: { bg: "rgba(214,31,44,0.10)", bd: "rgba(214,31,44,0.22)", fg: "#D61F2C" },
    }[tone];

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                borderRadius: 999,
                border: `1px solid ${map.bd}`,
                background: map.bg,
                color: map.fg,
                fontWeight: 900,
                fontSize: 12,
                lineHeight: 1,
            }}
        >
            {children}
        </span>
    );
}

function Notice({
    tone,
    title,
    desc,
}: {
    tone: "green" | "amber" | "gray";
    title: string;
    desc: string;
}) {
    const map = {
        green: { bg: "rgba(22,101,52,0.10)", bd: "rgba(22,101,52,0.22)", fg: "#166534" },
        amber: { bg: "rgba(180,83,9,0.10)", bd: "rgba(180,83,9,0.22)", fg: "#b45309" },
        gray: { bg: "rgba(15,23,42,0.06)", bd: "rgba(15,23,42,0.14)", fg: "#0F172A" },
    }[tone];

    return (
        <div
            style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 16,
                border: `1px solid ${map.bd}`,
                background: map.bg,
                color: map.fg,
            }}
        >
            <div style={{ fontSize: 13, fontWeight: 900 }}>{title}</div>
            <div style={{ marginTop: 4, fontSize: 13, opacity: 0.9, lineHeight: 1.45 }}>{desc}</div>
        </div>
    );
}

function StatCard({
    label,
    value,
    hint,
}: {
    label: string;
    value: string;
    hint: string;
}) {
    return (
        <div
            style={{
                border: "1px solid rgba(15,23,42,0.10)",
                borderRadius: 16,
                padding: 14,
                background: "rgba(15,23,42,0.03)",
            }}
        >
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900, color: "#0F172A" }}>{label}</div>
            <div style={{ marginTop: 8, fontSize: 14, fontWeight: 900, color: "#0F172A" }}>{value}</div>
            <div style={{ marginTop: 4, fontSize: 12, opacity: 0.72, color: "#0F172A" }}>{hint}</div>
        </div>
    );
}

function PlanCard({
    name,
    desc,
    priceNote,
    featured,
    planKey,
}: {
    name: string;
    desc: string;
    priceNote: string;
    featured?: boolean;
    planKey: string;
}) {
    return (
        <div
            style={{
                border: featured ? "1px solid rgba(214,31,44,0.40)" : "1px solid rgba(15,23,42,0.10)",
                borderRadius: 18,
                padding: 16,
                boxShadow: featured ? "0 12px 28px rgba(214,31,44,0.10)" : "0 10px 24px rgba(0,0,0,0.05)",
                background: "white",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div>
                    <div style={{ fontWeight: 950, fontSize: 16, color: "#0F172A" }}>{name}</div>
                    <div style={{ fontSize: 13, opacity: 0.82, marginTop: 6, lineHeight: 1.45, color: "#0F172A" }}>
                        {desc}
                    </div>
                </div>

                {featured ? <Badge tone="red">Recomendado</Badge> : null}
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.72, color: "#0F172A" }}>{priceNote}</div>

            <form method="POST" action="/api/checkout" style={{ marginTop: 14 }}>
                <input type="hidden" name="plan" value={planKey} />
                <button
                    style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: 14,
                        background: featured ? "#D61F2C" : "#111827",
                        border: "none",
                        color: "white",
                        fontWeight: 950,
                        cursor: "pointer",
                    }}
                >
                    Suscribirme
                </button>
            </form>

            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65, color: "#0F172A" }}>
                Pago seguro con Stripe • cancelable cuando quieras
            </div>
        </div>
    );
}

export default async function BillingPage({
    searchParams,
}: {
    searchParams: Promise<{ canceled?: string; success?: string }>;
}) {
    const { userId } = await auth();
    if (!userId) return null;

    const sp = await searchParams;
    const j = await getSub(userId);

    const active = Boolean(j?.ok && j?.active);
    const status = String(j?.status ?? "none");
    const periodEnd = j?.currentPeriodEnd ? new Date(j.currentPeriodEnd).toLocaleDateString() : null;

    const showCanceled = sp.canceled === "1" || sp.canceled === "true";
    const showSuccess = sp.success === "1" || sp.success === "true";

    const plans = [
        {
            key: "basic",
            name: "Base",
            priceNote: "Mensual",
            items: [
                "Rutina estructurada",
                "1 check-in semanal",
                "Ajustes semanales (básicos)",
                "Acceso al panel",
            ],
        },
        {
            key: "coaching",
            name: "Coaching Completo",
            priceNote: "Mensual",
            featured: true,
            items: [
                "Rutina + progresión",
                "Macros + ajustes",
                "Check-in detallado semanal",
                "Soporte y seguimiento",
                "Acceso al panel",
            ],
        },
        {
            key: "competition",
            name: "Competencia Natural",
            priceNote: "Mensual",
            items: [
                "Preparación orientada a tarima",
                "Ajustes más cercanos",
                "Posing (básico)",
                "Acceso al panel",
            ],
        },
    ];


    return (
        <main style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
            <Panel
                title="Suscripción & pagos"
                subtitle="Elegí un plan para activar tu acceso a la plataforma y revisá tu estado actual."
                right={
                    active ? (
                        <>
                            <Link
                                href="/app/client"
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 14,
                                    background: "#111827",
                                    color: "white",
                                    textDecoration: "none",
                                    fontWeight: 950,
                                }}
                            >
                                Ir al dashboard
                            </Link>
                            <Link
                                href="/app/client"
                                style={{
                                    padding: "10px 12px",
                                    borderRadius: 14,
                                    border: "1px solid rgba(15,23,42,0.10)",
                                    background: "white",
                                    textDecoration: "none",
                                    fontWeight: 950,
                                    color: "#0F172A",
                                }}
                            >
                                Volver
                            </Link>
                        </>
                    ) : (
                        <Badge tone="gray">Acceso: pendiente</Badge>
                    )
                }
            >
                {/* Estado principal */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    {active ? <Badge tone="green">Activa ✅</Badge> : <Badge tone="amber">Inactiva</Badge>}
                    <span style={{ fontSize: 12, opacity: 0.7, fontWeight: 800, color: "#0F172A" }}>
                        Stripe: {status}
                    </span>
                    {periodEnd ? (
                        <span style={{ fontSize: 12, opacity: 0.7, fontWeight: 800, color: "#0F172A" }}>
                            • Vence: {periodEnd}
                        </span>
                    ) : null}
                </div>

                {/* Notices */}
                {showSuccess ? (
                    <Notice
                        tone="green"
                        title="✅ Pago registrado"
                        desc={active ? "Tu suscripción está activa." : "Estamos activando tu suscripción… (puede tardar unos segundos)"}
                    />
                ) : null}

                {showCanceled ? (
                    <Notice
                        tone="amber"
                        title="⚠️ Pago cancelado"
                        desc="Podés intentarlo de nuevo cuando quieras."
                    />
                ) : null}

                {/* Stat cards */}
                <div
                    style={{
                        display: "grid",
                        gap: 12,
                        marginTop: 14,
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    }}
                >
                    <StatCard
                        label="Estado"
                        value={active ? "Activa ✅" : "Inactiva"}
                        hint={`Stripe: ${status}`}
                    />
                    <StatCard
                        label="Vence"
                        value={periodEnd ?? "—"}
                        hint="Periodo actual"
                    />
                    <StatCard
                        label="Acceso"
                        value={active ? "Habilitado" : "Bloqueado"}
                        hint={active ? "Ya podés usar el panel." : "Activá un plan para entrar."}
                    />
                </div>
            </Panel>

            {/* Selector de planes */}
            {/* Packages (selector de planes) */}
            {!active ? (
                <section className="mx-auto max-w-6xl pb-6 pt-6">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900">Elegí tu plan</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Activá tu suscripción para desbloquear el panel del cliente.
                            </p>
                        </div>

                        <div className="text-xs font-semibold text-slate-500">
                            Recomendación: <span className="text-slate-900">Coaching Completo</span>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {plans.map((p) => (
                            <div
                                key={p.key}
                                className={[
                                    "rounded-2xl border bg-white p-6 shadow-sm transition",
                                    p.featured
                                        ? "border-[#D61F2C]/30 ring-1 ring-[#D61F2C]/20 shadow-md"
                                        : "border-slate-200 hover:shadow-md",
                                ].join(" ")}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                                    </div>
                                    {p.featured && (
                                        <span className="rounded-full bg-[#D61F2C] px-3 py-1 text-xs font-semibold text-white">
                                            Recomendado
                                        </span>
                                    )}
                                </div>

                                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                                    <div className="text-xs uppercase tracking-wide text-slate-500">Precio</div>
                                    <div className="mt-1 text-2xl font-bold text-slate-900">{p.priceNote}</div>
                                    <div className="mt-1 text-xs text-slate-500">
                                        *En MVP: precio fijo por Stripe (luego lo refinamos por alcance)
                                    </div>
                                </div>

                                {/* “Qué incluye” */}
                                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                                    {(p.items ?? [
                                        "Acceso a tu panel",
                                        "Seguimiento estructurado",
                                        "Soporte y ajustes según plan",
                                    ]).map((item: string) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#D61F2C]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Checkout */}
                                <div className="mt-6">
                                    <form method="POST" action="/api/checkout">
                                        <input type="hidden" name="plan" value={p.key} />
                                        <button
                                            className={[
                                                "inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
                                                p.featured
                                                    ? "bg-[#D61F2C] text-white hover:opacity-95"
                                                    : "bg-[#0B2A6F] text-white hover:opacity-95",
                                            ].join(" ")}
                                            type="submit"
                                        >
                                            Suscribirme a este plan
                                        </button>
                                    </form>

                                    <p className="mt-3 text-xs text-slate-500">
                                        Pago seguro con Stripe. Podés cancelar cuando quieras.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : (
                <section className="mx-auto max-w-6xl pb-6 pt-6">
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="text-sm font-semibold text-emerald-900">✅ Suscripción activa</div>
                        <p className="mt-1 text-sm text-emerald-800">
                            Ya tenés acceso habilitado. Si querés cambiar de plan, lo hacemos después (MVP).
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link
                                href="/app/client"
                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                            >
                                Ir al dashboard
                            </Link>
                            <Link
                                href="/app/client"
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                            >
                                Volver
                            </Link>
                        </div>
                    </div>
                </section>
            )}

        </main>
    );
}
