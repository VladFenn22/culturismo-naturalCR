import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import {
    CheckCircle2,
    XCircle,
    CreditCard,
    Home,
    User,
    Dumbbell,
    Utensils,
    Camera,
    MessageSquare,
    CalendarDays,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ----------------------------- UI primitives ----------------------------- */

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

async function getProfile(userId: string) {
    const api = process.env.NEXT_PUBLIC_API_URL!;
    const r = await fetch(`${api}/me/profile?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store",
    });
    return r.json();
}

const { userId } = await auth();
const j = userId ? await getProfile(userId) : null;
const p = j?.profile;

function Card({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cx(
                "rounded-3xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur",
                "transition hover:shadow-md",
                className
            )}
        >
            {children}
        </div>
    );
}

function ButtonLink({
    href,
    children,
    variant = "secondary",
    className,
}: {
    href: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    className?: string;
}) {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    const styles =
        variant === "primary"
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : variant === "ghost"
                ? "text-slate-700 hover:bg-slate-100"
                : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50";
    return (
        <Link href={href} className={cx(base, styles, className)}>
            {children}
        </Link>
    );
}

function SectionTitle({
    title,
    subtitle,
    right,
}: {
    title: string;
    subtitle?: string;
    right?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
                <h2 className="text-base font-semibold text-slate-900">{title}</h2>
                {subtitle ? (
                    <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
                ) : null}
            </div>
            {right ? <div className="flex flex-wrap gap-2">{right}</div> : null}
        </div>
    );
}

/* ------------------------------- Components ------------------------------ */

function TopAlert({ paid, canceled }: { paid: boolean; canceled: boolean }) {
    if (!paid && !canceled) return null;

    if (paid) {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                        <div className="text-sm font-semibold text-emerald-900">
                            Pago confirmado
                        </div>
                        <p className="mt-1 text-sm text-emerald-800">
                            Tu suscripción debería activarse pronto. Si no se refleja en unos
                            minutos, revisá <span className="font-semibold">Billing</span>.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-start gap-3">
                <XCircle className="mt-0.5 h-5 w-5 text-rose-600" />
                <div>
                    <div className="text-sm font-semibold text-rose-900">
                        Pago cancelado
                    </div>
                    <p className="mt-1 text-sm text-rose-800">
                        No se realizó el cobro. Podés intentar de nuevo desde{" "}
                        <span className="font-semibold">Billing</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}

type NavItem = {
    key: string;
    label: string;
    href: string;
    icon?: LucideIcon;
};

function NavTabs({
    section,
    nav,
}: {
    section: string;
    nav: readonly NavItem[];
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-1">
            <div className="flex flex-wrap gap-1">
                {nav.map((it) => {
                    const active = section === it.key;
                    const Icon = it.icon;
                    return (
                        <Link
                            key={it.key}
                            href={it.href}
                            aria-current={active ? "page" : undefined}
                            className={cx(
                                "group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                                active
                                    ? "bg-slate-900 text-white shadow-sm"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {Icon ? (
                                <Icon
                                    className={cx(
                                        "h-4 w-4 transition",
                                        active ? "text-white" : "text-slate-500 group-hover:text-slate-700"
                                    )}
                                />
                            ) : null}
                            {it.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

function ModuleCard({
    title,
    desc,
    href,
    icon: Icon,
    accent = "blue",
}: {
    title: string;
    desc: string;
    href: string;
    icon: LucideIcon;
    accent?: "blue" | "red" | "slate" | "emerald";
}) {
    const accentMap = {
        blue: "border-blue-200 bg-blue-50 text-blue-700",
        red: "border-rose-200 bg-rose-50 text-rose-700",
        slate: "border-slate-200 bg-slate-50 text-slate-700",
        emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    } as const;

    return (
        <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="text-sm font-semibold text-slate-900">{title}</div>
                    <p className="mt-2 text-sm text-slate-600">{desc}</p>
                </div>

                <div
                    className={cx(
                        "flex h-11 w-11 items-center justify-center rounded-2xl border",
                        accentMap[accent]
                    )}
                >
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            <ButtonLink href={href} variant="secondary" className="mt-5 w-full">
                Abrir <ArrowRight className="h-4 w-4" />
            </ButtonLink>
        </Card>
    );
}

function Shell({
    title,
    subtitle,
    bullets,
    primary,
    secondary,
}: {
    title: string;
    subtitle: string;
    bullets: string[];
    primary?: { label: string; href?: string };
    secondary?: { label: string; href?: string };
}) {
    return (
        <Card className="p-6">
            <SectionTitle
                title={title}
                subtitle={subtitle}
                right={
                    <>
                        {secondary?.href ? (
                            <ButtonLink href={secondary.href} variant="secondary">
                                {secondary.label}
                            </ButtonLink>
                        ) : secondary ? (
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {secondary.label}
                            </button>
                        ) : null}

                        {primary?.href ? (
                            <ButtonLink href={primary.href} variant="primary">
                                {primary.label}
                            </ButtonLink>
                        ) : primary ? (
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {primary.label}
                            </button>
                        ) : null}
                    </>
                }
            />

            <div className="mt-5 grid gap-3 md:grid-cols-2">
                {bullets.map((b) => (
                    <div
                        key={b}
                        className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" />
                        <div className="text-sm text-slate-700">{b}</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <Sparkles className="h-4 w-4" />
                Cáscara: sin datos reales todavía. Solo UI + estructura.
            </div>
        </Card>
    );
}

function Stat({
    label,
    value,
    hint,
}: {
    label: string;
    value: string;
    hint: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold text-slate-500">{label}</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">{value}</div>
            <div className="mt-1 text-xs text-slate-500">{hint}</div>
        </div>
    );
}

/* --------------------------------- Page --------------------------------- */

export default async function ClientHome({
    searchParams,
}: {
    searchParams: Promise<{ success?: string; canceled?: string; section?: string }>;
}) {
    const sp = await searchParams;

    const paid = sp.success === "1" || sp.success === "true";
    const canceled = sp.canceled === "1" || sp.canceled === "true";
    const section =
        (sp.section as
            | "overview"
            | "profile"
            | "training"
            | "macros"
            | "checkins"
            | "chat"
            | "calendar") ?? "overview";

    const nav: readonly NavItem[] = [
        { key: "overview", label: "Resumen", href: "/client?section=overview", icon: Home },
        { key: "profile", label: "Perfil", href: "/client/profile", icon: User },
        { key: "training", label: "Entrenamiento", href: "/client?section=training", icon: Dumbbell },
        { key: "macros", label: "Nutrición", href: "/client?section=macros", icon: Utensils },
        { key: "checkins", label: "Check-ins", href: "/client?section=checkins", icon: Camera },
        { key: "chat", label: "Chat", href: "/client?section=chat", icon: MessageSquare },
        { key: "calendar", label: "Citas", href: "/client?section=calendar", icon: CalendarDays },
    ] as const;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white">
            {/* top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-rose-500" />

            <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
                {/* Header */}
                <Card className="p-6">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                Client Dashboard
                                <span className="h-2 w-2 rounded-full bg-rose-500" />
                            </div>

                            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                                Panel del Cliente
                            </h1>
                            <p className="mt-1 max-w-2xl text-sm text-slate-600">
                                Perfil, plan, check-ins, nutrición, chat y citas — todo en un solo lugar.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <ButtonLink href="/client/billing" variant="secondary">
                                <CreditCard className="h-4 w-4" /> Billing
                            </ButtonLink>
                            <ButtonLink href="/" variant="primary">
                                <Home className="h-4 w-4" /> Inicio
                            </ButtonLink>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <TopAlert paid={paid} canceled={canceled} />
                        <NavTabs section={section} nav={nav} />
                    </div>
                </Card>

                {!p?.meta && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <div className="text-sm font-semibold text-amber-900">
                            Completá tu perfil
                        </div>
                        <p className="mt-1 text-sm text-amber-800">
                            Necesitamos tus datos para ajustar tu entrenamiento.
                        </p>
                    </div>
                )}


                {/* Perfil resumen */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Stat
                        label="Altura"
                        value={p?.alturaCm ? `${p.alturaCm} cm` : "—"}
                        hint="Estatura"
                    />
                    <Stat
                        label="Peso"
                        value={p?.pesoKg ? `${p.pesoKg} kg` : "—"}
                        hint="Peso actual"
                    />
                    <Stat
                        label="Meta"
                        value={p?.meta ? p.meta : "No definida"}
                        hint="Objetivo principal"
                    />
                </div>


                {/* Content */}
                <div className="mt-6">
                    {section === "overview" ? (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <ModuleCard
                                title="Perfil"
                                desc="Altura, peso, meta, lesiones y preferencias."
                                href="/client/profile"
                                icon={User}
                                accent="blue"
                            />
                            <ModuleCard
                                title="Entrenamiento"
                                desc="Ver plan, registrar series y revisar historial."
                                href="/client?section=training"
                                icon={Dumbbell}
                                accent="slate"
                            />
                            <ModuleCard
                                title="Nutrición"
                                desc="Macros, logging manual y adherencia."
                                href="/client?section=macros"
                                icon={Utensils}
                                accent="red"
                            />

                            <div className="lg:col-span-3">
                                <Card className="p-6">
                                    <SectionTitle
                                        title="Accesos rápidos"
                                        subtitle="Check-ins con fotos, chat con tu coach y calendario de citas."
                                        right={
                                            <>
                                                <ButtonLink href="/client?section=checkins" variant="secondary">
                                                    Check-ins
                                                </ButtonLink>
                                                <ButtonLink href="/client?section=chat" variant="secondary">
                                                    Chat
                                                </ButtonLink>
                                                <ButtonLink href="/client?section=calendar" variant="primary">
                                                    Citas
                                                </ButtonLink>
                                            </>
                                        }
                                    />

                                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                                Check-in
                                            </div>
                                            <div className="mt-2 text-sm font-semibold text-slate-900">
                                                Pendiente
                                            </div>
                                            <div className="mt-1 text-sm text-slate-600">
                                                Peso, fotos y notas semanales.
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                                Chat
                                            </div>
                                            <div className="mt-2 text-sm font-semibold text-slate-900">
                                                Disponible
                                            </div>
                                            <div className="mt-1 text-sm text-slate-600">
                                                Mensajes y “seen” (v1).
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                                Citas
                                            </div>
                                            <div className="mt-2 text-sm font-semibold text-slate-900">
                                                Agenda
                                            </div>
                                            <div className="mt-1 text-sm text-slate-600">
                                                Posing, llamadas y revisiones.
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : section === "profile" ? (
                        <Shell
                            title="Clientes y Perfil"
                            subtitle="Perfil del cliente, preferencias de notificación y estado de suscripción."
                            bullets={[
                                "Perfil: altura, peso, meta, experiencia, lesiones, disponibilidad",
                                "Preferencias de notificación",
                                "Estado de suscripción",
                            ]}
                            primary={{ label: "Editar (próximamente)" }}
                            secondary={{ label: "Billing", href: "/client/billing" }}
                        />
                    ) : section === "training" ? (
                        <Shell
                            title="Planes de entrenamiento"
                            subtitle="Estructura base del plan, semanas/días y registro de entrenamiento."
                            bullets={[
                                "Plan: activo/inactivo, objetivo, fecha inicio",
                                "Week / Day: navegación",
                                "Exercise: catálogo",
                                "WorkoutEntry: peso/reps/RPE",
                                "En app: ver plan, marcar completado, registrar series, historial",
                            ]}
                            primary={{ label: "Ver plan (próximamente)" }}
                            secondary={{ label: "Historial (próximamente)" }}
                        />
                    ) : section === "macros" ? (
                        <Shell
                            title="Macros y nutrición"
                            subtitle="v1: logging manual + plantillas (sin DB de alimentos al inicio)."
                            bullets={[
                                "MacroTarget: kcal/prote/carbs/fat por día o por fase",
                                "MealLog / FoodLog: simple",
                                "Adherencia: % cumplimiento + notas",
                            ]}
                            primary={{ label: "Log manual (próximamente)" }}
                            secondary={{ label: "Plantillas (próximamente)" }}
                        />
                    ) : section === "checkins" ? (
                        <Shell
                            title="Check-ins con fotos"
                            subtitle="Check-in semanal con fotos y flujo ideal de subida (cáscara)."
                            bullets={[
                                "CheckIn semanal: peso, medidas opcionales, notas, estado",
                                "CheckInPhoto: 3–6 fotos",
                                "Flujo ideal: signed URL -> storage -> metadata",
                                "En web (coach): panel de revisión + comentarios/ajustes",
                            ]}
                            primary={{ label: "Subir (próximamente)" }}
                            secondary={{ label: "Ver historial (próximamente)" }}
                        />
                    ) : section === "chat" ? (
                        <Shell
                            title="Chat"
                            subtitle="Mensajes en tiempo real (cáscara)."
                            bullets={[
                                "Conversation / Message (texto + adjuntos)",
                                "Tiempo real: Socket.IO",
                                "v1: seen + push por mensaje nuevo",
                                "v2: notas de voz + “plan update” como evento",
                            ]}
                            primary={{ label: "Abrir chat (próximamente)" }}
                            secondary={{ label: "Notificaciones", href: "/client?section=profile" }}
                        />
                    ) : (
                        <Shell
                            title="Calendario / citas"
                            subtitle="Posing, llamadas y revisiones (cáscara)."
                            bullets={[
                                "Appointment: tipo, fecha/hora + zona horaria",
                                "Estado: reservado/cancelado/completado",
                                "Recordatorios: push 24h y 1h antes",
                                "v2: sync con Google Calendar del coach",
                            ]}
                            primary={{ label: "Reservar (próximamente)" }}
                            secondary={{ label: "Mis citas (próximamente)" }}
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 text-xs text-slate-500">
                    Tip: cuando conectemos Stripe + Webhooks, aquí vas a ver el estado “active” en tiempo real.
                </div>
            </div>
        </main>
    );
}