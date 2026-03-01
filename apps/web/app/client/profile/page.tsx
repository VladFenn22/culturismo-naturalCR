import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";

async function getProfile(userId: string) {
    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/me/profile?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store",
    });
    return r.json();
}

export default async function ProfilePage() {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const j = await getProfile(userId);
    const p = j?.profile ?? null;

    return (
        <main className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold text-slate-900">Perfil</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Esto nos ayuda a ajustar entrenamiento, macros y seguimiento.
                </p>
            </div>

            <ProfileForm
                initial={{
                    alturaCm: p?.alturaCm ?? "",
                    pesoKg: p?.pesoKg ?? "",
                    meta: p?.meta ?? "",
                    experiencia: p?.experiencia ?? "",
                    lesiones: p?.lesiones ?? "",
                    disponibilidad: p?.disponibilidad ?? "",
                }}
            />
        </main>
    );
}
