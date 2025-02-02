import type { Metadata } from "next";
import { Belleza, Geist_Mono } from "next/font/google";
import "./globals.css";

const belleza = Belleza({
  weight: '400',
  variable: '--font-belleza',
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "52 Week Challenge",
  description: "Track your savings journey with the 52 Week Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${belleza.variable} ${geistMono.variable} font-belleza antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
