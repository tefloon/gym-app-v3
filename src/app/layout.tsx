import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/reset.css";
import "./css/globals.css";
import "./css/scrolls.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen items-center pt-12`}
      >
        <main className="max-w-[1024px] w-full">{children}</main>
      </body>
    </html>
  );
}
