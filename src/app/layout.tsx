import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Venkata Ganapathi Physiotherapy Clinic | Dr. Maruti Rao Pulavarthi B.P.T (Hanuman Junction)",
  description:
    "Official website of Venkata Ganapathi Physiotherapy Clinic (Reg. No: 75/2015) in Hanuman Junction. Dr. Maruti Rao Pulavarthi B.P.T offers 10+ years of modern paralysis care, slipped disc, knee replacement rehab, and sciatica relief.",
  keywords: [
    "Venkata Ganapathi Physiotherapy Clinic",
    "Dr Maruti Rao Pulavarthi BPT",
    "Physiotherapy Hanuman Junction",
    "Paralysis Care Hanuman Junction",
    "Slipped Disc Treatment Hanuman Junction",
    "Knee Replacement Rehab Hanuman Junction",
    "Sciatica Pain Relief",
  ],
  authors: [{ name: "Dr. Maruti Rao Pulavarthi B.P.T" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
