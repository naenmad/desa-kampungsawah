import { Bell, FileText, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HomeHero() {
  return (
    <section className="relative min-h-[550px] lg:min-h-[650px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('/images/background.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-16">
        <div className="space-y-6 lg:col-span-7">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Portal Pelayanan Resmi Digital</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            Sinergi Menuju <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Desa Mandiri & Maju
            </span>
          </h1>
          <p className="text-base md:text-lg text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Selamat datang di portal informasi resmi Desa Kampungsawah, Kecamatan Jayakerta. Dapatkan akses transparansi publik, berita terkini, dan pengajuan administrasi surat mandiri dengan mudah.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/pengajuan" variant="primary" className="shadow-emerald-900/40">
              <FileText className="w-5 h-5" />
              <span>Buat Surat Online</span>
            </Button>
            <Button href="/profil" variant="secondary">
              Jelajahi Profil Desa
            </Button>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-5 justify-end">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-80 h-96 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-teal-400/20 rounded-full blur-xl" />
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                <Bell className="w-6 h-6 text-emerald-300 animate-bounce" />
              </div>
              <div className="space-y-3 relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Agenda Kerja Desa</span>
                <h3 className="font-bold text-xl text-white leading-snug">Rapat Minggon Rutin</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Pelaksanaan koordinasi aparatur desa (Minggon Desa) berjalan aktif setiap hari Rabu, disusul rapat tingkat kecamatan pada hari Selasa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}