import Link from "next/link";
import { ArrowLeft, Calendar, Newspaper, ShieldCheck, User } from "lucide-react";
import { notFound } from "next/navigation";

// Data riil statis untuk simulasi pembacaan detail berita berdasarkan slug
const beritaDatabase = {
  "masalah-persampahan-dusun-karajan": {
    title: "Identifikasi Masalah Persampahan & Rencana Perdes Lingkungan",
    date: "Juli 2026",
    category: "Prioritas",
    author: "Sekretariat KKN Kelompok 82",
    content: [
      "Persampahan saat ini menjadi isu prioritas utama di Desa Kampungsawah. Belum adanya Tempat Pembuangan Sampah (TPS) resmi memicu rata-rata masyarakat melakukan penanganan akhir dengan cara dibakar. Kondisi penumpukan sampah paling krusial terpantau di sepanjang jalur utama Dusun Karajan yang merupakan akses utama menuju Pasar Dengklok. Fenomena ini diperparah oleh oknum warga luar desa yang turut membuang sampah di sepanjang jalur tersebut.",
      "Langkah penanganan sebelumnya melalui sistem jaring irigasi serta pembuatan eco-brick dinilai belum efektif meredam masalah karena volume sampah yang terlampau tinggi. Namun, program Kelompok Sosial Masyarakat (KSM) dan TPST dijadwalkan akan diaktifkan kembali pada awal Juli seiring selesainya perbaikan kerusakan mesin penunjang.",
      "Pemerintah desa bersama tokoh masyarakat kini tengah merancang draf Peraturan Desa (Perdes) Lingkungan. Regulasi sanksi tegas bagi pelanggar pembuang sampah sembarangan akan dirundingkan matang begitu sarana fisik TPST beroperasi penuh. Sosialisasi intensif juga akan diarahkan langsung ke pengajian rutin ibu-ibu desa yang tersebar aktif di malam Selasa, malam Sabtu, malam Minggu, Kamis, dan Rabu."
    ]
  },
  "potensi-pertanian-manajemen-air": {
    title: "Potensi Pertanian Padi & Mitigasi Hama Sundep",
    date: "Juni 2026",
    category: "Pertanian",
    author: "Sekretariat KKN Kelompok 82",
    content: [
      "Sektor agrikultur Desa Kampungsawah menyimpan potensi besar didukung kekompakan kelompok tani yang sangat aktif. Pola tanam berjalan konsisten sebanyak 2 kali panen per tahun dengan komoditas utama berupa padi sawah.",
      "Kendati produktif, para petani masih dihadapkan pada serangkaian tantangan alami yang berulang. Gangguan hama tikus, ngengat, hingga penyakit sundep (padi kopong) kerap menurunkan optimalisasi hasil panen. Kondisi ini diperumit dengan karakter tanah yang sering mengalami siklus asam-asaman serta stabilitas manajemen pengairan yang belum seimbang.",
      "Mayoritas sistem penanggulangan saat ini masih mengandalkan pola tradisional spekulatif (aplikasi solar, minyak tanah, oli) dicampur insektisida kimia. Guna mendorong akselerasi ketahanan pangan, diperlukan proyeksi sinergi intensif bersama mahasiswa untuk mengedukasi masyarakat tani menuju implementasi tata cara Pertanian Modern yang ramah lingkungan dan efisien."
    ]
  },
  "penguatan-naungan-umkm-lokal": {
    title: "Strategi Penguatan Kelompok Dagang Resmi UMKM Desa",
    date: "Juni 2026",
    category: "Ekonomi",
    author: "Sekretariat KKN Kelompok 82",
    content: [
      "Geliat usaha mikro kecil menengah (UMKM) mandiri di desa bergerak produktif di dua sektor utama, yakni konveksi manufaktur dan kuliner rumahan. Sektor konveksi berfokus pada produksi dompet yang sukses menembus pasar perkotaan secara luring maupun daring. Sementara itu, sektor kuliner dihidupkan oleh produsen kue basah tradisional yang menyuplai pasar lokal setiap pagi hari.",
      "Namun, akselerasi pertumbuhan ekonomi ini terhambat oleh tata niaga yang belum terorganisasi. Belum adanya naungan kelompok dagang resmi membuat posisi tawar produsen lemah, sebab sistem pemasaran sejauh ini masih bersifat titip jual pasif dari produsen langsung ke jaringan pedagang.",
      "Rekomendasi tindak lanjut ke depan menekankan pentingnya penguatan struktur organisasi UMKM. Pembentukan badan komunal dagang resmi diharapkan mampu memperluas jangkauan pasar mandiri serta memutus rantai ketergantungan titip jual."
    ]
  }
};

interface DetailBeritaProps {
  params: {
    slug: string;
  };
}

export default function DetailBeritaPage({ params }: DetailBeritaProps) {
  const newsItem = beritaDatabase[params.slug as keyof typeof beritaDatabase];

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20 bg-white">
      
      {/* 1. HERO BANNER STYLE DETAIL (Konsisten Emerald Gradient) */}
      <section className="relative bg-gradient-to-r from-emerald-850 to-teal-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link 
            href="/berita" 
            className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-200 hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Berita</span>
          </Link>
          <div className="pt-2">
            <span className="bg-emerald-600/50 text-emerald-200 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
              {newsItem.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            {newsItem.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-xs text-emerald-100/80 pt-2 border-t border-emerald-600/50">
            <span className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Publikasi: {newsItem.date}</span>
            </span>
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kontributor: {newsItem.author}</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. ISI KONTEN UTAMA (Latar Belakang Dijamin Putih Bersih) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="prose prose-emerald max-w-none space-y-6 text-gray-600 text-sm md:text-base leading-relaxed">
          {newsItem.content.map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

    </div>
  );
}