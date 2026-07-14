import Link from "next/link";
import { Compass, Home, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Visual Icon Box */}
                <div className="relative group inline-flex">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-24 h-24 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                        <Compass className="w-12 h-12 animate-spin-slow" />
                    </div>
                </div>

                {/* Text Metadata */}
                <div className="space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Error 404</span>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
                        Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman tersebut mungkin telah dipindahkan, dihapus, atau tautan yang Anda masukkan salah.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button href="/" variant="primary" className="w-full sm:w-auto shadow-emerald-900/20">
                        <Home className="w-4 h-4 mr-1" />
                        <span>Kembali ke Beranda</span>
                    </Button>

                    <Link
                        href="/kontak"
                        className="w-full sm:w-auto text-center px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-semibold text-sm text-gray-600 flex items-center justify-center gap-2"
                    >
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span>Hubungi Kami</span>
                    </Link>
                </div>

            </div>
        </div>
    );
}
