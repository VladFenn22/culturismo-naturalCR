import { auth } from "@clerk/nextjs/server";

type CheckoutApiResponse = {
    ok: boolean;
    url?: string;
    [key: string]: unknown;
};

export async function GET() {
    return new Response("Use POST /api/checkout", { status: 200 });
}

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const form = await req.formData();
    const plan = String(form.get("plan") ?? "coaching"); // default

    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/billing/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkUserId: userId, plan }),
    });

    const text = await r.text();
    let j: CheckoutApiResponse | null = null;
    try { j = JSON.parse(text) as CheckoutApiResponse; } catch { }

    if (!r.ok || !j?.ok || !j?.url) {
        return new Response(`Checkout error from API\nstatus=${r.status}\nbody=${text}`, {
            status: 500,
        });
    }

    return Response.redirect(j.url, 303);
}
