import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Kolom 1: Profil Singkat Desa + Logo */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo-karawang.svg"
              alt="Logo Kabupaten Karawang"
              width={36}
              height={36}
              className="w-9 h-9 object-contain brightness-110"
            />
            <span className="font-bold text-xl text-white tracking-wide">
                Desa Kampungsawah
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Website resmi Pemerintah Desa Kampungsawah, Kecamatan Jayakerta. 
            Media transparansi, informasi terkini, dan pelayanan publik mandiri secara online.
          </p>
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-10 before:bg-emerald-500 pb-2">
            Tautan Penting
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/sejarah" className="hover:text-emerald-400 transition-colors">Profil & Sejarah Desa</Link>
            </li>
            <li>
              <Link href="/berita-terkini" className="hover:text-emerald-400 transition-colors">Kabar & Berita Desa</Link>
            </li>
            <li>
              <Link href="/layanan/administrasi" className="hover:text-emerald-400 transition-colors">Sistem Layanan Surat</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-emerald-400 transition-colors">Portal Admin</Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Kontak & Jam Kerja */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-10 before:bg-emerald-500 pb-2">
            Kontak Desa
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Jl. Raya Kampungsawah No. 82, Jayakerta, Kabupaten Karawang</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>kontak@desakampungsawah.id</span>
            </li>
            <li className="flex items-start space-x-3 pt-2 border-t border-gray-800">
              <Clock className="w-4 h-4 text-emerald-500 mt-0.5" />
              <div>
                <span className="block text-white font-medium text-xs">Jam Pelayanan Kantor:</span>
                <span className="text-xs text-gray-400">Senin - Jumat | 08:00 - 15:00 WIB</span>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Bagian Bawah: Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {currentYear} Pemerintah Desa Kampungsawah. All Rights Reserved.</p>
        <p className="text-gray-600">Dikembangkan untuk kenyamanan warga desa.</p>
      </div>
    </footer>
  );
}