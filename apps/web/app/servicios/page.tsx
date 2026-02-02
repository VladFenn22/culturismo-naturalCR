import Link from "next/link";
import Navbar from "../../components/Navbar";

const paquetes = [
    {
        name: "Base (Hábitos + Progreso)",
        price: "Desde ₡xx/mes",
        highlight: "Ideal para personas ocupadas",
        items: [
            "Plan de entrenamiento personalizado",
            "Objetivo de macros (simple y práctico)",
            "1 check-in semanal (fotos + ajustes)",
            "Acceso a chat para dudas puntuales",
        ],
    },
    {
        name: "Coaching Completo",
        price: "Desde ₡xx/mes",
        highlight: "El más recomendado",
        featured: true,
        items: [
            "Plan de entrenamiento + progresiones",
            "Macros por fase (subida/definición/mantenimiento)",
            "Check-in semanal con feedback detallado",
            "Chat directo (soporte continuo)",
            "Revisión de técnica/ejecución por video (opcional)",
        ],
    },
    {
        name: "Competencia Natural",
        price: "Desde ₡xx/mes",
        highlight: "Para tarima y peak week",
        items: [
            "Plan completo orientado a competencia",
            "Ajustes más frecuentes según etapa",
            "Posing y presentación física",
            "Check-ins + estrategia por semana",
            "Soporte cercano en semanas clave",
        ],
    },
];

export default function ServiciosPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            {/* Top bar simple */}
            <Navbar subtitle="Servicios" />

            {/* Intro */}
            <section className="mx-auto max-w-6xl px-4 py-14">
                <h1 className="text-4xl font-bold tracking-tight">
                    Servicios y planes de asesoría
                </h1>
                <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
                    Acompañamiento para entrenar natural en Costa Rica: estructura, seguimiento real y
                    educación práctica. Estos paquetes son una base; se ajustan según tu objetivo,
                    experiencia y estilo de vida.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/sign-up"
                        className="inline-flex items-center justify-center rounded-xl bg-[#0B2A6F] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                    >
                        Quiero aplicar
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-slate-50"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </section>

            {/* Packages */}
            <section className="mx-auto max-w-6xl px-4 pb-16">
                <div className="grid gap-4 md:grid-cols-3">
                    {paquetes.map((p) => (
                        <div
                            key={p.name}
                            className={[
                                "rounded-2xl border bg-white p-6 shadow-sm transition",
                                p.featured
                                    ? "border-[#D61F2C]/30 ring-1 ring-[#D61F2C]/20 shadow-md"
                                    : "border-slate-200 hover:shadow-md",
                            ].join(" ")}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold">{p.name}</h2>
                                    <p className="mt-1 text-sm text-slate-600">{p.highlight}</p>
                                </div>
                                {p.featured && (
                                    <span className="rounded-full bg-[#D61F2C] px-3 py-1 text-xs font-semibold text-white">
                                        Recomendado
                                    </span>
                                )}
                            </div>

                            <div className="mt-5 rounded-xl bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-slate-500">
                                    Precio
                                </div>
                                <div className="mt-1 text-2xl font-bold">{p.price}</div>
                                <div className="mt-1 text-xs text-slate-500">
                                    *Definimos el precio final según alcance y frecuencia de soporte
                                </div>
                            </div>

                            <ul className="mt-5 space-y-2 text-sm text-slate-700">
                                {p.items.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#D61F2C]" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6">
                                <Link
                                    href="/sign-up"
                                    className={[
                                        "inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition",
                                        p.featured
                                            ? "bg-[#D61F2C] text-white hover:opacity-95"
                                            : "bg-[#0B2A6F] text-white hover:opacity-95",
                                    ].join(" ")}
                                >
                                    Aplicar a este plan
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Notes */}
                <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold">Importante</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                        Esto es entrenamiento natural y sostenible. No se ofrecen atajos ni promesas irreales.
                        Si necesitás atención clínica en nutrición, se coordina con un profesional.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-10 rounded-2xl bg-slate-50 p-6 border border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="text-lg font-semibold">¿Querés empezar ya?</div>
                        <div className="text-sm text-slate-600">
                            Aplicá y revisamos si el servicio encaja con tu objetivo y disponibilidad.
                        </div>
                    </div>
                    <Link
                        href="/sign-up"
                        className="inline-flex items-center justify-center rounded-xl bg-[#D61F2C] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                    >
                        Aplicar ahora
                    </Link>
                </div>
            </section>
        </main>
    );
}
