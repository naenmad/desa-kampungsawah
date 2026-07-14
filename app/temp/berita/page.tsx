import Link from "next/link";
import { FileText, Search, Calendar, ArrowRight, ShieldCheck, Newspaper, AlertCircle } from "lucide-react";

export default function BeritaPage() {
  // Data riil yang disesuaikan berdasarkan isi "SIL PEMBAHASAN" desa
  const allNews = [
    {
      id: 1,
      title: "Identifikasi Masalah Persampahan & Rencana Perdes Lingkungan",
      date: "Juli 2026",
      category: "Prioritas",
      slug: "masalah-persampahan-dusun-karajan",
      description: "Penanganan sampah mandiri dengan dibakar masih mendominasi akibat ketiadaan TPS resmi. Tumpukan sampah di Dusun Karajan (jalur utama Pasar Dengklok) dipicu warga luar desa. Program TPST oleh KSM dijadwalkan aktif kembali awal Juli menunggu perbaikan mesin guna merumuskan regulasi sanksi tegas.",
    },
    {
      id: 2,
      title: "Potensi Pertanian Padi & Mitigasi Hama Sundep",
      date: "Juni 2026",
      category: "Pertanian",
      slug: "potensi-pertanian-manajemen-air",
      description: "Kelompok tani aktif menjalankan pola 2 kali panen per tahun dengan komoditas padi. Pengendalian hama tikus, ngengat, dan penyakit sundep (padi kopong) serta tanah asam-asaman kini mulai diarahkan menuju edukasi Pertanian Modern bersama mahasiswa.",
    },
    {
      id: 3,
      title: "Strategi Penguatan Kelompok Dagang Resmi UMKM Desa",
      date: "Juni 2026",
      category: "Ekonomi",
      slug: "penguatan-naungan-umkm-lokal",
      description: "Sektor konveksi dompet daring dan kuliner kue basah pagi hari menjadi motor ekonomi utama desa. Pemerintah desa mengidentifikasi perlunya penguatan organisasi naungan resmi guna mengatasi kendala sistem titip jual produsen ke pedagang.",
    },
  ];

  return (
    <div className="space-y-20 pb-20 bg-white">
      
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
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
              <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kabar, Pengumuman & Transparansi</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
              Pusat Informasi & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Kabar Publik Desa
              </span>
            </h1>
            <p className="text-base md:text-lg text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
              Ikuti perkembangan mutakhir seputar regulasi lingkungan, pengelolaan potensi pertanian kelompok tani, agenda pemberdayaan UMKM, hingga laporan kerja kemasyarakatan.
            </p>
          </div>

          {/* Right Side: Stunning Photo Frame Feature */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-80 h-96 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-teal-400/20 rounded-full blur-xl" />
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                  <AlertCircle className="w-6 h-6 text-emerald-300 animate-bounce" />
                </div>
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Fokus Sosialisasi</span>
                  <h3 className="font-bold text-xl text-white leading-snug">Kampanye Lingkungan TPST</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    Menyambut beroperasinya kembali mesin penunjang TPST awal Juli, sosialisasi intensif persampahan segera digulirkan langsung ke ranah masyarakat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DAFTAR ARTIKEL/BERITA (Latar Belakang Putih Bersih) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white">
        <div className="border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Arsip Pengumuman Resmi</h2>
          <p className="text-gray-500 text-sm">Daftar menyeluruh identifikasi masalah dan rencana tindak lanjut pembangunan Desa Kampungsawah.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allNews.map((news) => (
            <article key={news.id} className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                    {news.category}
                  </span>
                  <span className="text-gray-400 font-medium">{news.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                  <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                  {news.description}
                </p>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                <Link 
                  href={`/berita/${news.slug}`} 
                  className="text-gray-700 font-bold text-xs hover:text-emerald-600 flex items-center space-x-1 group/btn"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}