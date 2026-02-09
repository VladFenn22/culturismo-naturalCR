"use client";

import { useMemo, useState } from "react";

type Lead = {
    id: string;
    createdAt: string;
    nombre: string | null;
    email: string | null;
    whatsapp: string | null;
    objetivo: string | null;
    experiencia: string | null;
    disponibilidad: string | null;
    lesiones: string | null;
    mensaje: string | null;
    source: string | null;
    status: string;
    inviteToken: string | null;
    inviteUrl: string | null;
};

function Info({ label, value }: { label: string; value: string | null }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-xs font-semibold text-slate-500">{label}</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">{value ?? "—"}</div>
        </div>
    );
}

export default function LeadCardClient({
    lead,
    apiBase,
}: {
    lead: Lead;
    apiBase: string;
}) {
    const [busy, setBusy] = useState(false);
    const [inviteUrl, setInviteUrl] = useState<string | null>(lead.inviteUrl);
    const [status, setStatus] = useState<string>(lead.status);

    const wa = useMemo(() => (lead.whatsapp ?? "").replace(/\D/g, ""), [lead.whatsapp]);
    const msg = useMemo(() => {
        const url = inviteUrl ?? "";
        return `Hola ${lead.nombre ?? ""} 👋 Soy del equipo de Culturismo Natural CR.\n\nTu solicitud fue aprobada ✅\nCreá tu cuenta aquí: ${url}\n\nLuego te guía a pagar y arrancamos.`;
    }, [lead.nombre, inviteUrl]);

    async function approve() {
        try {
            setBusy(true);
            const r = await fetch(`${apiBase}/admin/leads/${lead.id}/approve`, { method: "POST" });
            const j = await r.json();

            if (!j?.ok || !j?.inviteUrl) {
                alert("No se pudo aprobar (API).");
                return;
            }

            setInviteUrl(j.inviteUrl);
            setStatus("APPROVED");
        } catch {
            alert("Error aprobando lead.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <div className="text-sm font-semibold text-slate-900">
                        {lead.nombre ?? "Sin nombre"}{" "}
                        <span className="text-xs font-semibold text-slate-500">({status})</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                        {lead.email ?? "—"} • {lead.whatsapp ?? "—"}
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                        {new Date(lead.createdAt).toLocaleString()}
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {!inviteUrl ? (
                        <button
                            onClick={approve}
                            disabled={busy}
                            className="rounded-xl bg-[#D61F2C] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
                            type="button"
                        >
                            {busy ? "Aprobando…" : "Aprobar"}
                        </button>
                    ) : (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                            Link generado
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Info label="Objetivo" value={lead.objetivo} />
                <Info label="Experiencia" value={lead.experiencia} />
                <Info label="Disponibilidad" value={lead.disponibilidad} />
            </div>

            {lead.mensaje ? (
                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="text-xs font-semibold text-slate-500">Mensaje</div>
                    <div className="mt-1 whitespace-pre-wrap">{lead.mensaje}</div>
                </div>
            ) : null}

            {inviteUrl ? (
                <div className="mt-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-500">Invite URL</div>

                    <div className="flex flex-col gap-2 md:flex-row">
                        <input
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                            value={inviteUrl}
                            readOnly
                        />

                        <button
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                            onClick={async () => {
                                await navigator.clipboard.writeText(inviteUrl);
                            }}
                            type="button"
                        >
                            Copiar link
                        </button>

                        <a
                            className="rounded-xl bg-[#0B2A6F] px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
                            href={
                                wa
                                    ? `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`
                                    : `https://wa.me/?text=${encodeURIComponent(msg)}`
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            Enviar WhatsApp
                        </a>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
