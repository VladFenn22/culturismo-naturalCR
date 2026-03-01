import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
                <div className="min-h-screen bg-gray-50">
                    {/* Topbar */}
                    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
                        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-emerald-600" />
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Culturismo Natural</div>
                                    <div className="text-xs text-gray-500">Panel del cliente</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link className="text-sm text-gray-600 hover:text-gray-900" href="/client/billing">
                                    Suscripción & pagos
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </header>

                    {/* Shell */}
                    <div className="mx-auto grid max-w-6xl grid-cols-12 gap-6 px-6 py-8">
                        {/* Sidebar */}
                        <aside className="col-span-12 md:col-span-3">
                            <nav className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                                <Link
                                    href="/app/client"
                                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
                                >
                                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/client/billing"
                                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <span className="h-2 w-2 rounded-full bg-gray-300" />
                                    Suscripción & pagos
                                </Link>
                                <div className="mt-3 border-t border-gray-200 pt-3">
                                    <Link
                                        href="/"
                                        className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        <span className="h-2 w-2 rounded-full bg-gray-300" />
                                        Inicio
                                    </Link>
                                </div>
                            </nav>

                            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                <div className="text-sm font-semibold text-emerald-900">Tip</div>
                                <p className="mt-1 text-sm text-emerald-800">
                                    Mantén tus check-ins al día para ajustar macros y entrenamiento semanal.
                                </p>
                            </div>
                        </aside>

                        {/* Content */}
                        <section className="col-span-12 md:col-span-9">{children}</section>
                    </div>
                </div>
            </SignedIn>
        </>
    );
}
