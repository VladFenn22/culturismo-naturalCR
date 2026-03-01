import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ ok: false, error: "unauth" }, { status: 401 });

    const body = await req.json();

    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/me/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, userId }),
    });

    const text = await r.text();
    try {
        const j = JSON.parse(text);
        return NextResponse.json(j, { status: r.status });
    } catch {
        return NextResponse.json({ ok: false, error: "bad_api_response", text }, { status: 500 });
    }
}