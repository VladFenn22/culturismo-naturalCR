import Link from "next/link";

type NavbarProps = {
    subtitle?: string;
};

export default function Navbar({ subtitle = "Coaching & Seguimiento" }: NavbarProps) {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#0B2A6F]" />
                    <div className="leading-tight">
                        <div className="text-sm font-semibold">Culturismo Natural CR</div>
                        <div className="text-xs text-slate-500">{subtitle}</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    <Link className="text-sm text-slate-700 hover:text-slate-900" href="/servicios">
                        Servicios
                    </Link>
                    <Link className="text-sm text-slate-700 hover:text-slate-900" href="/aplicar">
                        Aplicar
                    </Link>
                    <a className="text-sm text-slate-700 hover:text-slate-900" href="/#resultados">
                        Resultados
                    </a>
                    <a className="text-sm text-slate-700 hover:text-slate-900" href="/#nosotros">
                        Sobre mí
                    </a>
                    <a className="text-sm text-slate-700 hover:text-slate-900" href="/#faq">
                        Preguntas
                    </a>
                </nav>

                <div className="flex items-center gap-2">
                    <Link
                        href="/sign-in"
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
                    >
                        Ingreso
                    </Link>
                    <Link
                        href="/sign-up"
                        className="rounded-xl bg-[#D61F2C] px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
                    >
                        Crear cuenta
                    </Link>
                </div>
            </div>
        </header>
    );
}
