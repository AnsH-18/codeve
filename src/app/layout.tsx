import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { GeistSans } from "geist/font/sans";


export const metadata: Metadata = {
  title: "Codeve",
  description: "Save and manage your code snippets",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${session?.user ? 'bg-[#f2f9f1]' : ''} ${GeistSans.className}`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
