import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function CoachLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>

            <SignedIn>
                <div className="min-h-screen bg-gray-50">
                    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur">
                        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-[#D61F2C]" />
                                <div>
                                    <div className="text-sm font-semibold text-gray-900">Culturismo Natural</div>
                                    <div className="text-xs text-gray-500">Panel Coach</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link className="text-sm text-gray-600 hover:text-gray-900" href="/app/client">
                                    Panel Cliente
                                </Link>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </div>
                    </header>

                    <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
                </div>
            </SignedIn>
        </>
    );
}
