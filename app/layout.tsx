import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Adhil Marzook | Full-Stack Developer",
  description:
    "Portfolio of Adhil Marzook — Full-Stack Developer. BSc Computer Science at Eastern University of Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} no-scrollbar`}>
      <body className="antialiased bg-background text-white selection:bg-accent/30">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
