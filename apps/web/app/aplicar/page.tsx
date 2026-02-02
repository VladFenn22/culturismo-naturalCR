"use client";

import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";

type FormState = {
    nombre: string;
    email: string;
    whatsapp: string;
    objetivo: "ganar_musculo" | "perder_grasa" | "recomposicion" | "competencia" | "salud";
    experiencia: "principiante" | "intermedio" | "avanzado";
    disponibilidad: "2_3" | "4_5" | "6_plus";
    lesiones: string;
    mensaje: string;
};

const initial: FormState = {
    nombre: "",
    email: "",
    whatsapp: "",
    objetivo: "ganar_musculo",
    experiencia: "principiante",
    disponibilidad: "4_5",
    lesiones: "",
    mensaje: "",
};

const objetivoLabel: Record<string, string> = {
    ganar_musculo: "ganar músculo",
    perder_grasa: "perder grasa",
    recomposicion: "recomposición corporal",
    competencia: "competencia natural",
    salud: "salud y rendimiento",
};

const diasLabel: Record<string, string> = {
    "2_3": "2–3",
    "4_5": "4–5",
    "6_plus": "6 o más",
};


export default function AplicarPage() {
    const [data, setData] = useState<FormState>(initial);
    const [sent, setSent] = useState(false);

    const isValid = useMemo(() => {
        return (
            data.nombre.trim().length >= 2 &&
            data.email.includes("@") &&
            data.whatsapp.trim().length >= 8
        );
    }, [data]);

    function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setData((p) => ({ ...p, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
            const resp = await fetch(`${apiUrl}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await resp.json();
            if (!resp.ok || !json?.ok) {
                alert(json?.error ?? "No se pudo enviar. Intenta de nuevo.");
                return;
            }

            // Marcar como enviado en UI
            setSent(true);

            // WhatsApp message armado
            const to = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
            const text =
                `Hola 👋 Soy ${data.nombre}.\n\n` +
                `Acabo de aplicar a la asesoría de Culturismo Natural CR.\n` +
                `Mi objetivo es *${objetivoLabel[data.objetivo]}* y entreno *${diasLabel[data.disponibilidad]} días/semana*.\n\n` +
                `Quedo atento(a) para coordinar los siguientes pasos.\n` +
                `¡Pura Vida!\n\n` +
                `ID de aplicación: ${json.leadId}`;


            const url = `https://wa.me/${to}?text=${encodeURIComponent(text)}`;
            window.open(url, "_blank");
        } catch (err) {
            console.error(err);
            alert("Error de red. Revisa que la API esté corriendo.");
        }
    }




    return (
        <main className="min-h-screen bg-white text-slate-900">
            <Navbar subtitle="Aplicación" />

            <section className="mx-auto max-w-6xl px-4 py-14">
                <h1 className="text-4xl font-bold tracking-tight">Aplicar a la asesoría</h1>
                <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
                    Esto es para personas en Costa Rica (o fuera) que entrenan natural y quieren estructura.
                    Completa el formulario y te respondo con el plan recomendado y siguientes pasos.
                </p>

                <div className="mt-10 grid gap-8 md:grid-cols-2">
                    {/* Form */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        {!sent ? (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium">Nombre</label>
                                        <input
                                            value={data.nombre}
                                            onChange={(e) => onChange("nombre", e.target.value)}
                                            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                            placeholder="Tu nombre"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Email</label>
                                        <input
                                            value={data.email}
                                            onChange={(e) => onChange("email", e.target.value)}
                                            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                            placeholder="tu@email.com"
                                            type="email"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">WhatsApp</label>
                                    <input
                                        value={data.whatsapp}
                                        onChange={(e) => onChange("whatsapp", e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                        placeholder="Ej: +506 8888 8888"
                                    />
                                    <p className="mt-2 text-xs text-slate-500">
                                        Lo usamos para coordinar rápido (no spam).
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className="text-sm font-medium">Objetivo</label>
                                        <select
                                            value={data.objetivo}
                                            onChange={(e) => onChange("objetivo", e.target.value as FormState["objetivo"])}
                                            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                        >
                                            <option value="ganar_musculo">Ganar músculo</option>
                                            <option value="perder_grasa">Perder grasa</option>
                                            <option value="recomposicion">Recomposición</option>
                                            <option value="competencia">Competencia natural</option>
                                            <option value="salud">Salud / rendimiento</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Experiencia</label>
                                        <select
                                            value={data.experiencia}
                                            onChange={(e) =>
                                                onChange("experiencia", e.target.value as FormState["experiencia"])
                                            }
                                            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                        >
                                            <option value="principiante">Principiante</option>
                                            <option value="intermedio">Intermedio</option>
                                            <option value="avanzado">Avanzado</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">Días/semana</label>
                                        <select
                                            value={data.disponibilidad}
                                            onChange={(e) =>
                                                onChange("disponibilidad", e.target.value as FormState["disponibilidad"])
                                            }
                                            className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                        >
                                            <option value="2_3">2–3</option>
                                            <option value="4_5">4–5</option>
                                            <option value="6_plus">6+</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Lesiones / Limitaciones</label>
                                    <input
                                        value={data.lesiones}
                                        onChange={(e) => onChange("lesiones", e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                        placeholder="Ej: rodilla, hombro, espalda… (opcional)"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium">Mensaje</label>
                                    <textarea
                                        value={data.mensaje}
                                        onChange={(e) => onChange("mensaje", e.target.value)}
                                        className="mt-2 min-h-[120px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#0B2A6F]/30"
                                        placeholder="Contame tu contexto: horario, equipo disponible, meta, etc."
                                    />
                                </div>

                                <button
                                    disabled={!isValid}
                                    className={[
                                        "w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition",
                                        isValid ? "bg-[#D61F2C] hover:opacity-95" : "bg-slate-300 cursor-not-allowed",
                                    ].join(" ")}
                                    type="submit"
                                >
                                    Enviar aplicación
                                </button>

                                <p className="text-xs text-slate-500">
                                    *Luego conectamos esto a tu API para guardar leads automáticamente.
                                </p>
                            </form>
                        ) : (
                            <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200">
                                <h2 className="text-xl font-semibold">¡Listo! Aplicación enviada ✅</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Te responderé con el paquete recomendado y los siguientes pasos.
                                </p>
                                <div className="mt-5 flex gap-3">
                                    <button
                                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-white"
                                        onClick={() => {
                                            setData(initial);
                                            setSent(false);
                                        }}
                                    >
                                        Enviar otra respuesta
                                    </button>
                                    <Link
                                        href="/"
                                        className="rounded-xl bg-[#0B2A6F] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                                    >
                                        Volver al inicio
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Side info */}
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-semibold">Qué pasa después</h3>
                            <ol className="mt-3 space-y-2 text-sm text-slate-600">
                                <li>1) Revisamos tu objetivo y disponibilidad</li>
                                <li>2) Te propongo el plan recomendado</li>
                                <li>3) Definimos frecuencia de check-ins y soporte</li>
                                <li>4) Arrancamos con onboarding y tu primera semana</li>
                            </ol>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-semibold">Esto es para vos si…</h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li>• Querés entrenar natural con estructura</li>
                                <li>• Estás cansado de improvisar rutinas</li>
                                <li>• Te importa la salud y el progreso real</li>
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-6">
                            <h3 className="text-lg font-semibold">No es para vos si…</h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600">
                                <li>• Buscás “resultados en 2 semanas”</li>
                                <li>• No querés seguir un plan ni reportar check-ins</li>
                                <li>• Buscás atajos o química</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
