import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "بوابة الطالب الذكية - وزارة التربية والتعليم",
  description: "بوابة الطالب الذكية لعرض الدرجات وإدارة بيانات الطلاب",
  keywords: ["بوابة الطالب", "وزارة التربية والتعليم", "درجات", "طلاب"],
  authors: [{ name: "وزارة التربية والتعليم" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "بوابة الطالب الذكية",
    description: "بوابة الطالب الذكية لعرض الدرجات وإدارة بيانات الطلاب",
    url: "https://chat.z.ai",
    siteName: "بوابة الطالب",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "بوابة الطالب الذكية",
    description: "بوابة الطالب الذكية لعرض الدرجات وإدارة بيانات الطلاب",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: 'var(--font-cairo), sans-serif' }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
