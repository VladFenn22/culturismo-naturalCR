import express from "express";
import cors from "cors";
import { prisma } from "./prisma";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "api" });
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
