import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs'
import Providers from "@/components/ui/Provider";
import { Toaster } from 'react-hot-toast'
import { Suspense } from "react";
import Loader from "@/components/ui/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quill ChatPDF",
  description: "AI chatbot for your uploaded PDF files and ask questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
      <Providers>
        <html lang="en">
          <body
            className={cn(
              "min-h-screen font- sans antialiased grainy",
              inter.className
              )}
              >
            <Toaster />
            <Navbar />
            <Suspense fallback={<Loader />}>
              {children}
            </Suspense>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
