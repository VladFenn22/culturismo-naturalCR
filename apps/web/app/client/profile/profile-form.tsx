"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Form = {
    alturaCm: string;
    pesoKg: string;
    meta: string;
    experiencia: string;
    lesiones: string;
    disponibilidad: string;
};

export default function ProfileForm({ initial }: { initial: Form }) {
    const router = useRouter();
    const [form, setForm] = useState<Form>(initial);
    const [errors, setErrors] = useState<Partial<Form>>({});
    const [saving, setSaving] = useState(false);

    function validate(): boolean {
        const e: Partial<Form> = {};

        const altura = Number(form.alturaCm);
        if (!altura || altura < 120 || altura > 230) {
            e.alturaCm = "Ingresá una altura válida (120–230 cm)";
        }

        const peso = Number(form.pesoKg);
        if (!peso || peso < 35 || peso > 250) {
            e.pesoKg = "Ingresá un peso válido (35–250 kg)";
        }

        if (!form.meta || form.meta.length < 10) {
            e.meta = "Contanos un poco más sobre tu meta";
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function save() {
        if (!validate()) return;

        setSaving(true);
        try {
            const r = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const j = await r.json();
            if (!j?.ok) throw new Error();

            // 👉 UX clara: vuelve al dashboard
            router.push("/app/client");
            router.refresh();
        } catch {
            alert("No se pudo guardar el perfil");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Tu perfil</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Esta información nos permite personalizar tu entrenamiento y macros.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <Field
                    label="Altura"
                    unit="cm"
                    value={form.alturaCm}
                    error={errors.alturaCm}
                    placeholder="Ej: 175"
                    onChange={(v) => setForm((s) => ({ ...s, alturaCm: v }))}
                />

                <Field
                    label="Peso actual"
                    unit="kg"
                    value={form.pesoKg}
                    error={errors.pesoKg}
                    placeholder="Ej: 78.5"
                    onChange={(v) => setForm((s) => ({ ...s, pesoKg: v }))}
                />

                <TextArea
                    label="Meta principal"
                    value={form.meta}
                    error={errors.meta}
                    placeholder="Ej: ganar masa muscular sin subir grasa"
                    onChange={(v) => setForm((s) => ({ ...s, meta: v }))}
                />

                <TextArea
                    label="Experiencia entrenando"
                    value={form.experiencia}
                    placeholder="Ej: 2 años entrenando con pesas"
                    onChange={(v) => setForm((s) => ({ ...s, experiencia: v }))}
                />

                <TextArea
                    label="Lesiones / limitaciones"
                    value={form.lesiones}
                    placeholder="Ej: molestias de hombro derecho"
                    onChange={(v) => setForm((s) => ({ ...s, lesiones: v }))}
                />

                <TextArea
                    label="Disponibilidad semanal"
                    value={form.disponibilidad}
                    placeholder="Ej: 4–5 días / 60 minutos"
                    onChange={(v) => setForm((s) => ({ ...s, disponibilidad: v }))}
                />
            </div>

            <div className="mt-8 flex items-center gap-4">
                <button
                    onClick={save}
                    disabled={saving}
                    className="rounded-xl bg-[#0B2A6F] px-6 py-3 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
                >
                    {saving ? "Guardando…" : "Guardar y continuar"}
                </button>

                <span className="text-xs text-slate-500">
                    Podés editar esto cuando quieras
                </span>
            </div>
        </div>
    );
}

/* ---------- UI helpers ---------- */

function Field({
    label,
    unit,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
    unit?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    error?: string;
}) {
    return (
        <label className="block">
            <div className="mb-1 text-xs font-semibold text-slate-500">{label}</div>
            <div className="relative">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full rounded-xl border px-3 py-2 pr-12 text-sm outline-none
            ${error ? "border-red-400" : "border-slate-200 focus:border-slate-300"}`}
                />
                {unit && (
                    <span className="absolute right-3 top-2 text-xs font-semibold text-slate-400">
                        {unit}
                    </span>
                )}
            </div>
            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
        </label>
    );
}

function TextArea({
    label,
    value,
    onChange,
    placeholder,
    error,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    error?: string;
}) {
    return (
        <label className="block">
            <div className="mb-1 text-xs font-semibold text-slate-500">{label}</div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`min-h-[90px] w-full resize-none rounded-xl border px-3 py-2 text-sm outline-none
          ${error ? "border-red-400" : "border-slate-200 focus:border-slate-300"}`}
            />
            {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
        </label>
    );
}
