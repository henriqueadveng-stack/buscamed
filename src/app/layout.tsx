import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BuscaMed - Comparador de Equipamentos Hospitalares",
  description:
    "Compare precos de equipamentos hospitalares de distribuidores confiaveis. Encontre monitores, ventiladores, mobiliario hospitalar e muito mais com os melhores precos do mercado.",
  keywords: [
    "equipamentos hospitalares",
    "comparador de precos",
    "distribuidores medicos",
    "mobiliario hospitalar",
    "monitores medicos",
    "ventiladores hospitalares",
  ],
  authors: [
    { name: "Andre Nobre" },
    { name: "Henrique Engelhardt" },
  ],
  openGraph: {
    title: "BuscaMed - Comparador de Equipamentos Hospitalares",
    description:
      "Compare precos de equipamentos hospitalares de distribuidores confiaveis.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-x-hidden">
            <Header />
            <main className="flex-1 w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
