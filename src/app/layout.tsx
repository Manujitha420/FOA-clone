import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const promptFont = Prompt({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FOA Clothing | The Lifestyle Brand",
  description:
    "Explore FOA Clothing (Freedom Over Anything), a premium lifestyle and urban streetwear brand. Shop the latest men's activewear, women's collections, minimal essentials, and accessories.",
  keywords: "FOA, FOA Clothing, Freedom Over Anything, Sri Lanka Streetwear, Urban Fashion, Activewear Colombo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${promptFont.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
