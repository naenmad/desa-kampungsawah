"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/login" || pathname?.startsWith("/dashboard");

  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

  if (isAdminRoute) return null;

  const menuItems = [
    { name: "Beranda", href: "/" },
    {
      name: "Profil Desa",
      dropdown: [
        { name: "Berita Terkini", href: "/berita-terkini" },
        { name: "Data Penduduk", href: "/data-penduduk" },
        { name: "Sejarah", href: "/sejarah" },
        { name: "Struktur Perangkat Desa", href: "/struktur-perangkat" },
      ],
    },
    {
      name: "Informasi Publik",
      dropdown: [
        { name: "Potensi Desa", href: "/potensi" },
        { name: "Transparansi APBDes", href: "/apbdes" },
        { name: "Galeri Kegiatan", href: "/galeri" },
      ],
    },
    {
      name: "Layanan Warga",
      dropdown: [
        { name: "Administrasi Pelayanan", href: "/layanan/administrasi" },
        { name: "Pengaduan Masyarakat", href: "/layanan/pengaduan" },
      ],
    },
    { name: "Kontak", href: "/kontak" },
  ];

  const toggleMobileDropdown = (menuName: string) => {
    if (activeMobileMenu === menuName) {
      setActiveMobileMenu(null);
    } else {
      setActiveMobileMenu(menuName);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Nama Desa */}
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
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative group h-full flex items-center">
                  <button className="flex items-center text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200 py-2">
                    {item.name} <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                  <div className="absolute top-[calc(100%-0.5rem)] left-0 w-56 bg-white border border-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors duration-200 py-2"
                >
                  {item.name}
                </Link>
              )
            )}
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
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel (Sekarang pakai efek smooth slide-down) */}
      <div
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[85vh] opacity-100 border-t border-gray-100 shadow-inner" : "max-h-0 opacity-0"
          }`}
      >
        {/* Inner container untuk padding agar tidak bocor saat max-height 0 */}
        <div className="px-4 pt-2 pb-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) =>
            item.dropdown ? (
              <div key={item.name} className="py-1">
                <button
                  onClick={() => toggleMobileDropdown(item.name)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-semibold text-gray-800 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {item.name}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${activeMobileMenu === item.name ? "rotate-180 text-emerald-600" : "text-gray-400"
                      }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${activeMobileMenu === item.name ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pl-6 space-y-1 border-l-2 border-gray-100 ml-4 py-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors mt-1"
              >
                {item.name}
              </Link>
            )
          )}
          <div className="pt-4 border-t border-gray-200 mt-4">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-emerald-600 text-white px-4 py-3 rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 transition-all font-semibold"
            >
              Portal Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}