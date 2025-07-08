import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "LearnIt | Your Gateway to Knowledge",
description: "Discover high-quality online courses to boost your skills and career. Browse curated content and start learning anytime, anywhere.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          {children}
          <Toaster position="bottom-right" reverseOrder={false} />
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
