import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LeadCardClient from "./LeadCardClient";

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

function isCoachEmail(email: string | null | undefined) {
    const allow = (process.env.COACH_EMAILS ?? "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);
    if (allow.length === 0) return true; // MVP: si no configuras, deja entrar
    return email ? allow.includes(email.toLowerCase()) : false;
}

async function fetchLeads(): Promise<Lead[]> {
    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/admin/leads`, { cache: "no-store" });
    const j = await r.json();
    return j?.leads ?? [];
}

export default async function CoachLeadsPage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const u = await currentUser();
    const email = u?.emailAddresses?.[0]?.emailAddress;
    if (!isCoachEmail(email)) {
        return (
            <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-xl font-semibold text-slate-900">Acceso restringido</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Tu usuario no está habilitado como coach. Agregalo en <code>COACH_EMAILS</code>.
                </p>
            </main>
        );
    }

    const leads = await fetchLeads();
    const apiBase = process.env.NEXT_PUBLIC_API_URL!;

    return (
        <main className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>
                        <p className="mt-1 text-sm text-slate-600">
                            Aprobar genera un link único para que el cliente cree cuenta y pase a pago.
                        </p>
                    </div>
                    <div className="text-xs font-semibold text-slate-500">
                        Total: <span className="text-slate-900">{leads.length}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {leads.map((l) => (
                    <LeadCardClient key={l.id} lead={l} apiBase={apiBase} />
                ))}
            </div>
        </main>
    );
}
