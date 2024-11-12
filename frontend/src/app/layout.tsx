import type { Metadata } from "next";
import { Luckiest_Guy, Fredoka } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import Navbar from "@/components/Navbar";

const header = Luckiest_Guy({ subsets: ["latin"], weight: "400", variable: "--font-header" });
const normal = Fredoka({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-normal" });

export const metadata: Metadata = {
  title: "WOW HIRE",
  description: "GET HIRED NOW!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${header.variable} ${normal.variable} antialiased bg-background`}>
        <Provider>
          <>
            <Navbar />
            {children}
          </>
        </Provider>
      </body>
    </html>
  );
}
