"use client";

import { useState } from "react";
import Image from "next/image";
import { Landmark, Calendar, X, ZoomIn, Info } from "lucide-react";

type GalleryItem = {
  id: number;
  category: "Pemerintahan" | "Pertanian" | "UMKM" | "Sosial" | "Kesehatan";
  image: string;
  title: string;
  date: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "Pemerintahan",
    image: "/images/galeri-rapat.png",
    title: "Rapat Minggon Aparatur Desa Kampungsawah",
    date: "12 Juli 2026",
    description: "Rapat koordinasi berkala aparatur internal pemerintah desa bersama para kepala urusan kewilayahan (dusun) dan perwakilan RT/RW guna membahas integrasi pelayanan digital terpadu serta evaluasi operasional TPST Dusun Karajan.",
  },
  {
    id: 2,
    category: "Pertanian",
    image: "/images/galeri-pertanian.png",
    title: "Penyuluhan & Edukasi Pertanian Modern",
    date: "05 Juli 2026",
    description: "Kegiatan pendampingan kelompok tani untuk menyosialisasikan pola tanam padi unggul, manajemen air berkelanjutan, serta pengenalan teknologi deteksi hama sundep guna memaksimalkan hasil panen raya.",
  },
  {
    id: 3,
    category: "UMKM",
    image: "/images/galeri-umkm.png",
    title: "Workshop Kewirausahaan & Pemasaran Online",
    date: "20 Juni 2026",
    description: "Pemberdayaan pelaku UMKM lokal yang memfokuskan pada pengembangan produk konveksi dompet di Dusun Puloharapan untuk memperluas pasar lewat digital marketing dan pembentukan naungan organisasi resmi.",
  },
  {
    id: 4,
    category: "Sosial",
    image: "/images/background.webp",
    title: "Gotong Royong Kebersihan Saluran Air & Sampah",
    date: "28 Juni 2026",
    description: "Aksi kolaboratif warga Dusun Karajan dalam membersihkan saluran pembuangan air dan menanggulangi tumpukan sampah liar di sekitar gerbang utama desa demi menciptakan lingkungan yang asri dan bebas banjir.",
  },
  {
    id: 5,
    category: "Kesehatan",
    image: "/images/background.webp",
    title: "Pemeriksaan Kesehatan Rutin di Posyandu",
    date: "15 Juni 2026",
    description: "Layanan rutin bulanan untuk pemeriksaan kesehatan ibu hamil, imunisasi balita, dan konsultasi gizi mandiri guna mencegah stunting, diselenggarakan serempak di Dusun Campea.",
  },
  {
    id: 6,
    category: "Pemerintahan",
    image: "/images/background.webp",
    title: "Penyaluran BLT Dana Desa Kampungsawah",
    date: "10 Juni 2026",
    description: "Penyaluran Bantuan Langsung Tunai (BLT) bersumber dari Dana Desa tahap II kepada keluarga penerima manfaat secara tertib dan transparan, diawasi langsung oleh BPD.",
  },
];

const categories = ["Semua", "Pemerintahan", "Pertanian", "UMKM", "Sosial", "Kesehatan"];

export default function GaleriKegiatanPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === "Semua" || item.category === activeCategory
  );

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[450px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/images/background.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto relative z-10 w-full py-12 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dokumentasi Kegiatan Desa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Galeri Aktivitas & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Pembangunan Desa
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Kilas balik visual dari agenda pemerintahan, gotong royong, kegiatan pemberdayaan ekonomi UMKM, serta pelayanan kesehatan masyarakat di Desa Kampungsawah.
          </p>
        </div>
      </section>

      {/* 2. FILTER & GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-emerald-600 border border-gray-200/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Photo Frame Container */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge on Image */}
                <span className="absolute top-4 left-4 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-500/20">
                  {item.category}
                </span>
                {/* Hover overlay indicator */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white shadow-lg">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Text Meta Content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center space-x-1 text-xs font-bold text-emerald-600 group-hover:text-emerald-500">
                  <span>Lihat Detail Dokumentasi</span>
                  <Info className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 space-y-3 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-sm">Tidak ada kegiatan di kategori ini.</p>
            <button
              onClick={() => setActiveCategory("Semua")}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-500"
            >
              Kembali Tampilkan Semua
            </button>
          </div>
        )}
      </section>

      {/* 3. LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]">
            {/* Left Hand: Image Column */}
            <div className="relative h-64 md:h-auto md:w-1/2 bg-gray-900 shrink-0">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Hand: Text Content Column */}
            <div className="p-8 md:w-1/2 flex flex-col justify-between overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-200">
                    {selectedItem.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{selectedItem.date}</span>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug">
                  {selectedItem.title}
                </h2>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Deskripsi Kegiatan</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Close Button Inside Panel for Mobile friendliness */}
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all text-sm"
              >
                Tutup Dokumentasi
              </button>
            </div>

            {/* Close Icon Floating top-right */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
