"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", href: "/" },
    { name: "Profil Desa", href: "/profil" },
    { name: "Berita", href: "/berita" },
    { name: "Layanan Publik", href: "/pengajuan" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Karawang & Nama Desa */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo-karawang.svg"
                alt="Logo Kabupaten Karawang"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-bold text-base md:text-lg text-gray-800 block leading-tight">
                  Desa Kampungsawah
                </span>
                <span className="text-xs text-gray-500 block">
                  Kec. Jayakerta
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm"
            >
              Portal Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-200 mt-2">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Portal Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}