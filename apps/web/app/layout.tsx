import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            localization={esES}
            appearance={{
                variables: {
                    colorPrimary: "#0F8A5F",     // verde CR
                    colorBackground: "#F6F7F9",  // fondo claro
                    colorText: "#111827",        // gris casi negro
                    colorTextSecondary: "#4B5563",
                    colorInputBackground: "#FFFFFF",
                    colorInputText: "#111827",
                    colorNeutral: "#E5E7EB",
                    borderRadius: "14px",
                    colorTextOnPrimaryBackground: "#FFFFFF",
                  
                },
                elements: {
                    // Card y layout
                    card: "shadow-xl border border-gray-200 bg-white",
                    headerTitle: "text-2xl font-semibold text-gray-900",
                    headerSubtitle: "text-gray-600",

                    // Inputs
                    formFieldLabel: "text-gray-700",
                    formFieldInput:
                        "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",

                    // Botones
                    formButtonPrimary:
                        "bg-emerald-600 hover:bg-emerald-700 text-white font-semibold",
                    formButtonSecondary:
                        "border border-gray-300 hover:bg-gray-50 text-gray-900",

                    // Links y textos
                    footerActionLink: "text-emerald-700 hover:text-emerald-800",
                    identityPreviewText: "text-gray-700",
                    dividerLine: "bg-gray-200",
                    dividerText: "text-gray-500",

                    // Alertas
                    formFieldErrorText: "text-red-600",
                    alertText: "text-gray-800",

                    // Botones sociales (Google)
                    socialButtonsBlockButton:
                        "bg-white border border-gray-300 hover:bg-gray-50 shadow-sm",
                    socialButtonsProviderIcon:
                        "opacity-90",

                    // Si estás usando modo oscuro en algún lado, esto ayuda
                    socialButtonsBlockButtonArrow: "text-gray-500",
                    socialButtonsBlockButtonText: "!text-gray-900"
                },
            }}
        >
            <html lang="es">
                <body className="bg-gray-50 text-gray-900">{children}</body>
            </html>
        </ClerkProvider>
    );
}
