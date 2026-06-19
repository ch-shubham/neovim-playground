import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham's Arena",
  description: "A browser-based playground for practicing basic Vim motions and operators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230b0f14'/%3E%3Crect x='8' y='10' width='48' height='34' rx='4' fill='none' stroke='%239dd88f' stroke-width='3'/%3E%3Cpath d='M19 22l8 10-8 10' fill='none' stroke='%23f3f8f0' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M30 42h16' fill='none' stroke='%239dd88f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E"
        />
      </head>
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
