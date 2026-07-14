import HomeGreeting from "@/components/features/home/HomeGreeting";
import HomeHero from "@/components/features/home/HomeHero";
import HomeMap from "@/components/features/home/HomeMap";
import HomeNews, { type NewsItem } from "@/components/features/home/HomeNews";
import HomeServices from "@/components/features/home/HomeServices";
import HomeStats from "@/components/features/home/HomeStats";
import StrukturOrganisasi from "@/components/features/StrukturOrganisasi";
import SectionHeading from "@/components/ui/SectionHeading";

const latestNews: NewsItem[] = [
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

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20 bg-white">
      <HomeHero />
      <HomeStats />
      <HomeGreeting />
      <HomeServices />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white space-y-10">
        <SectionHeading
          align="center"
          title="Struktur Aparatur Pemerintah Desa"
          description="Bagan hierarki komando pelayanan 9 Kepala Seksi (Kasi), Kaur, beserta Kepala Urusan Kewilayahan Dusun."
          className="mx-auto"
        />
        <div className="w-full">
          <StrukturOrganisasi />
        </div>
      </section>

      <HomeNews latestNews={latestNews} />
      <HomeMap />
    </div>
  );
}