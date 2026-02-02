import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

const features = [
    {
        title: "Planes de entrenamiento",
        desc: "Estructura semanal, progresiones y ajustes según tu contexto (trabajo, sueño, recuperación).",
    },
    {
        title: "Check-ins con fotos",
        desc: "Revisión real del progreso, feedback claro y cambios concretos cada semana.",
    },
    {
        title: "Macros y nutrición",
        desc: "Enfoque educativo y sostenible: lo suficiente para avanzar sin vivir estresado.",
    },
    {
        title: "Chat con tu coach",
        desc: "Comunicación directa para resolver dudas, ajustar y mantener adherencia.",
    },
    {
        title: "Posing y presentación",
        desc: "Para competir o para mejorar tu estética corporal con intención y técnica.",
    },
    {
        title: "Enfoque natural",
        desc: "Progreso real: entrenamiento inteligente, consistencia y respeto por la salud.",
    },
];

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* NAV */}
            <Navbar />

            {/* HERO */}
            <section className="relative">
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero.jpg"
                        alt="Entrenamiento y culturismo natural en Costa Rica"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
                </div>

                <div className="relative mx-auto max-w-6xl px-4 py-20">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                            Costa Rica · Natural · Método
                            <span className="h-1 w-1 rounded-full bg-white/60" />
                            Cupos limitados
                        </span>

                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Culturismo natural y entrenamiento inteligente, hecho en Costa Rica
                        </h1>

                        <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                            Para culturistas naturales y también para personas “normales” que quieren
                            verse mejor, rendir más y entrenar con estructura. Sin atajos, sin humo,
                            con seguimiento real.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/aplicar"
                                className="inline-flex items-center justify-center rounded-xl bg-[#D61F2C] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                            >
                                Aplicar a la asesoría
                            </Link>
                            <Link
                                href="/sign-in"
                                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/15"
                            >
                                Ya soy cliente
                            </Link>
                        </div>

                        <div className="mt-10 grid grid-cols-3 gap-3 text-white/85">
                            <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
                                <div className="text-lg font-bold text-white">Plan</div>
                                <div className="text-xs">Entreno estructurado</div>
                            </div>
                            <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
                                <div className="text-lg font-bold text-white">Check-in</div>
                                <div className="text-xs">Fotos + ajustes</div>
                            </div>
                            <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/15">
                                <div className="text-lg font-bold text-white">Soporte</div>
                                <div className="text-xs">Chat + guía</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICIOS */}
            <section id="servicios" className="mx-auto max-w-6xl px-4 py-16">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Servicios</h2>
                    <Link href="/servicios">Servicios</Link>
                    <p className="mt-2 max-w-2xl text-slate-600">
                        Un sistema completo para avanzar entrenando natural: programación, seguimiento,
                        nutrición orientativa y comunicación directa.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                        >
                            <div className="mb-3 h-10 w-10 rounded-xl bg-[#0B2A6F]/10 ring-1 ring-[#0B2A6F]/20" />
                            <h3 className="text-base font-semibold">{f.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PLATAFORMA */}
            <section id="plataforma" className="bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <div className="grid gap-10 md:grid-cols-2 md:items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">
                                Qué vas a ver dentro de la plataforma
                            </h2>
                            <p className="mt-3 text-slate-600">
                                Todo diseñado para que no improvisés: plan claro, seguimiento medible y feedback.
                            </p>

                            <ul className="mt-6 space-y-3 text-slate-700">
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-[#D61F2C]" />
                                    Plan por semanas/días con objetivo y enfoque
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-[#D61F2C]" />
                                    Check-in semanal con fotos, peso, notas y revisión del coach
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-[#D61F2C]" />
                                    Macros objetivo + adherencia (simple y útil)
                                </li>
                                <li className="flex gap-3">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-[#D61F2C]" />
                                    Chat privado para dudas y ajustes
                                </li>
                            </ul>

                            <div className="mt-8 flex gap-3">
                                <Link
                                    href="/aplicar"
                                    className="rounded-xl bg-[#0B2A6F] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                                >
                                    Ver si aplico
                                </Link>
                                <Link
                                    href="/sign-in"
                                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium hover:bg-white"
                                >
                                    Ingresar
                                </Link>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div className="relative h-170 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                <Image
                                    src="/images/training.jpg"
                                    alt="Plan de entrenamiento"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        
                        </div>
                    </div>
                </div>
            </section>

            <section id="resultados" className="mx-auto max-w-6xl px-4 py-16">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold tracking-tight">Resultados y testimonios</h2>
                    <p className="mt-2 max-w-2xl text-slate-600">
                        Progreso real (natural) se ve en consistencia, medidas, fuerza y adherencia.
                        Esta sección crecerá con casos documentados.
                    </p>
                </div>
                {/* Resultados */}
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            name: "Cliente (ejemplo)",
                            text: "“Dejé de improvisar. Con el plan y el check-in semanal, por fin siento dirección y progreso.”",
                            meta: "Objetivo: recomposición · 4 días/semana",
                        },
                        {
                            name: "Cliente (ejemplo)",
                            text: "“Los ajustes semanales me ayudaron a sostener el plan sin obsesionarme. Más fuerza, mejor físico.”",
                            meta: "Objetivo: ganar músculo · natural",
                        },
                        {
                            name: "Cliente (ejemplo)",
                            text: "“El enfoque es serio y realista. Nada de promesas, solo método y seguimiento.”",
                            meta: "Objetivo: salud/rendimiento",
                        },
                    ].map((t) => (
                        <div
                            key={t.text}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">{t.name}</div>
                                <span className="text-xs text-slate-500">Costa Rica</span>
                            </div>
                            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{t.text}</p>
                            <p className="mt-4 text-xs text-slate-500">{t.meta}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-2xl bg-slate-50 p-6 border border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="text-lg font-semibold">¿Querés ser un caso documentado?</div>
                        <div className="text-sm text-slate-600">
                            Aplicá y trabajemos con seguimiento real: plan + check-ins + ajustes.
                        </div>
                    </div>
                    <Link
                        href="/aplicar"
                        className="inline-flex items-center justify-center rounded-xl bg-[#D61F2C] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                    >
                        Aplicar
                    </Link>
                </div>
            </section>


            {/* SOBRE MÍ */}
            <section id="nosotros" className="mx-auto max-w-6xl px-4 py-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div className="relative h-72 overflow-hidden rounded-2xl border border-slate-200">
                        <Image
                            src="/images/costa-rica.jpg"
                            alt="Costa Rica"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Sobre mí</h2>
                        <p className="mt-3 text-slate-600 leading-relaxed">
                            Mi enfoque es el culturismo natural aplicado con criterio: progresión,
                            volumen inteligente, recuperación, adherencia y resultados reales. Trabajo con
                            personas en Costa Rica que quieren mejorar su físico y rendimiento sin depender
                            de “hacks” ni promesas irreales.
                        </p>

                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="text-sm font-semibold text-slate-900">
                                Filosofía de trabajo
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                Menos ruido. Más método. Construir un cuerpo natural toma tiempo, pero se puede
                                hacer bien: con estructura, medición y consistencia.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="bg-slate-50">
                <div className="mx-auto max-w-6xl px-4 py-16">
                    <h2 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="font-semibold">¿Esto es solo para culturistas?</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                No. Es para cualquiera que entrene natural y quiera estructura: ganar músculo,
                                perder grasa, mejorar rendimiento o construir hábitos sólidos.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="font-semibold">¿Qué necesito para empezar?</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Constancia y disposición para seguir un plan. El resto lo construimos con
                                seguimiento semanal y ajustes.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="font-semibold">¿Incluye nutrición?</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Incluye orientación y macros (educativo y práctico). Si necesitás manejo clínico,
                                se coordina con un profesional en nutrición.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <h3 className="font-semibold">¿Cómo funcionan los check-ins?</h3>
                            <p className="mt-2 text-sm text-slate-600">
                                Subís fotos y datos una vez por semana. Te respondo con feedback y ajustes del plan.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 rounded-2xl bg-white p-6 border border-slate-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-lg font-semibold">¿Listo para empezar?</div>
                            <div className="text-sm text-slate-600">
                                Cupos limitados para asegurar atención real.
                            </div>
                        </div>
                        <Link
                            href="/aplicar"
                            className="inline-flex items-center justify-center rounded-xl bg-[#D61F2C] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
                        >
                            Aplicar ahora
                        </Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-200">
                <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-600">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <span className="font-semibold text-slate-900">Culturismo Natural CR</span>{" "}
                            · Coaching y seguimiento
                        </div>
                        <div className="flex gap-4">
                            <Link className="hover:text-slate-900" href="/sign-in">
                                Ingreso
                            </Link>
                            <Link className="hover:text-slate-900" href="/sign-up">
                                Aplicar
                            </Link>
                            <a className="hover:text-slate-900" href="#servicios">
                                Servicios
                            </a>
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-slate-500">
                        © {new Date().getFullYear()} · Hecho en Costa Rica · Enfoque natural y sostenible
                    </div>
                </div>
            </footer>
        </div>
    );
}
