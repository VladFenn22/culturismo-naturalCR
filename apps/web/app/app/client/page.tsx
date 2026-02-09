import Link from "next/link";

export default async function ClientHome({
    searchParams,
}: {
    searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
    const sp = await searchParams;

    const paid = sp.success === "1" || sp.success === "true";
    const canceled = sp.canceled === "1" || sp.canceled === "true";

    return (
        <main className="space-y-6">
            {/* Hero */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Panel del Cliente</h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Aquí vas a ver tu plan, seguimiento, macros y tu estado de suscripción.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/client/billing"
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        >
                            Gestionar billing
                        </Link>
                        <Link
                            href="/"
                            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                        >
                            Ir a inicio
                        </Link>
                    </div>
                </div>

                {/* Status banner */}
                {paid && (
                    <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <div className="text-sm font-semibold text-emerald-900">✅ Pago exitoso</div>
                        <p className="mt-1 text-sm text-emerald-800">
                            Tu suscripción debería activarse en breve. Si en unos minutos no se refleja, revisá Billing.
                        </p>
                    </div>
                )}

                {canceled && (
                    <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <div className="text-sm font-semibold text-amber-900">⚠️ Pago cancelado</div>
                        <p className="mt-1 text-sm text-amber-800">
                            No pasa nada. Podés intentar de nuevo cuando quieras desde Billing.
                        </p>
                    </div>
                )}

                {!paid && !canceled && (
                    <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <div className="text-sm font-semibold text-gray-900">Bienvenido</div>
                        <p className="mt-1 text-sm text-gray-700">
                            Este será tu panel (planes, check-ins, macros, chat). Hoy te dejo una vista inicial.
                        </p>
                    </div>
                )}
            </div>

            {/* Grid cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="text-sm font-semibold text-gray-900">Suscripción</div>
                    <p className="mt-2 text-sm text-gray-600">Estado, periodo y recibos.</p>
                    <Link
                        href="/client/billing"
                        className="mt-4 inline-flex rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        Ver detalles
                    </Link>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="text-sm font-semibold text-gray-900">Check-in semanal</div>
                    <p className="mt-2 text-sm text-gray-600">Peso, fotos, adherencia y notas.</p>
                    <button
                        className="mt-4 inline-flex rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        type="button"
                    >
                        Próximamente
                    </button>
                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="text-sm font-semibold text-gray-900">Macros</div>
                    <p className="mt-2 text-sm text-gray-600">Calorías, proteína, carbs y grasas.</p>
                    <button
                        className="mt-4 inline-flex rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                        type="button"
                    >
                        Próximamente
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-500">
                Consejo: cuando conectemos Stripe + Webhooks, aquí vas a ver el estado “active” en tiempo real.
            </div>
        </main>
    );
}


