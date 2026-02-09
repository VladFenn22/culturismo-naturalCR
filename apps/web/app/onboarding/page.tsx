import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function redeem(token: string, userId: string) {
    const api = process.env.NEXT_PUBLIC_API_URL!;
    const url = `${api}/invites/redeem`;

    const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, userId }),
    });

    const text = await r.text();

    let json: { ok?: boolean } = {};
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error(`Redeem returned non-JSON. status=${r.status} body=${text.slice(0, 200)}`);
    }

    if (!r.ok || !json?.ok) {
        console.error("Redeem problem:", { status: r.status, text });
        return { ok: false };
    }
    return json;
}

export default async function OnboardingPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const sp = await searchParams;
    const token = sp.token;

    try { if (token) await redeem(token, userId); } catch { }
    redirect("/client/billing");
}
