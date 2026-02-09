import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function hasActiveSub(userId: string) {
    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/me/subscription?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store",
    });
    const j = await r.json();
    return Boolean(j?.ok && j?.active);
}

export default async function ClientHome({
    searchParams,
}: {
    searchParams: { success?: string };
}) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const active = await hasActiveSub(userId);
    if (!active) redirect("/client/billing");

    return (
        <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
            <h1>Bienvenido ✅</h1>
            {searchParams.success ? (
                <p style={{ marginTop: 8, color: "#166534" }}>
                    Pago exitoso. Suscripción activa.
                </p>
            ) : null}

            <p style={{ marginTop: 12 }}>
                Aquí va tu dashboard de cliente (check-ins, macros, planes, chat).
            </p>

            <div style={{ marginTop: 16 }}>
                <Link href="/app">Volver</Link>
            </div>
        </main>
    );
}
