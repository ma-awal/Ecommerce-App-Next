import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
 
 
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
// Display serif - headline er personality carry korbe
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Body sans - clean, readable
const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Utility mono - labels, price, tag-style details
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "Anchor Tee — One shirt, done right",
  description: "A single essential t-shirt in two colorways. Heavyweight cotton, made to last.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F1EFE9] text-[#1A1A17]">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}