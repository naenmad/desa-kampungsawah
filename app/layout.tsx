import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/elements/Navbar";
import Footer from "@/components/elements/Footer";
import ScrollToTop from "@/components/elements/ScrollToTop";
import "./globals.css"; // Sesuai posisi file di gambar (satu folder 'app')

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Website Resmi Desa Kampungsawah",
  description: "Portal Informasi dan Pelayanan Publik Mandiri Online",
};

// Menambahkan tipe data React.ReactNode untuk children
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${plusJakartaSans.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}