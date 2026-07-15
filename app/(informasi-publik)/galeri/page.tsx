"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, X, ZoomIn } from "lucide-react";

type GalleryItem = {
  id: number;
  image: string;
  caption: string;
  date: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, image: "/images/galeri-rapat.png", caption: "Rapat Minggon Aparatur Desa Kampungsawah", date: "12 Juli 2026" },
  { id: 2, image: "/images/galeri-pertanian.png", caption: "Penyuluhan & Edukasi Pertanian Modern", date: "05 Juli 2026" },
  { id: 3, image: "/images/galeri-umkm.png", caption: "Workshop Kewirausahaan & Pemasaran Online", date: "20 Juni 2026" },
  { id: 4, image: "/images/background.webp", caption: "Gotong Royong Kebersihan Saluran Air & Sampah", date: "28 Juni 2026" },
];

export default function GaleriKegiatanPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[450px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/images/background.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto relative z-10 w-full py-12 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dokumentasi Foto Desa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Galeri Kegiatan & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Dokumentasi Visual
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Kumpulan foto-foto dokumentasi resmi program pembangunan, rapat koordinasi minggon, gotong royong, dan aktivitas masyarakat di Desa Kampungsawah.
          </p>
        </div>
      </section>

      {/* 2. PHOTO GALLERY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white p-4 border border-gray-200/60 shadow-sm rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              {/* Photo Frame */}
              <div className="relative h-52 w-full overflow-hidden rounded-xl bg-gray-150">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(max-w-768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Zoom overlay on hover */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Date & Caption */}
              <div className="mt-4 text-center space-y-1">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                  {item.date}
                </span>
                <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-3 group-hover:text-emerald-700 transition-colors" title={item.caption}>
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {galleryItems.length === 0 && (
          <div className="text-center py-16 text-gray-400 italic">
            Belum ada dokumentasi foto kegiatan.
          </div>
        )}
      </section>

      {/* 3. MINIMAL LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            
            {/* Float Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 text-white hover:text-emerald-450 p-2 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
            >
              <X className="w-5 h-5" />
              <span>Tutup</span>
            </button>

            {/* Photo Container */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <Image
                src={selectedItem.image}
                alt={selectedItem.caption}
                fill
                className="object-contain"
              />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-5 border-t border-white/10 flex flex-col items-center gap-1">
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
                  {selectedItem.date}
                </span>
                <p className="text-white text-sm md:text-base font-bold text-center leading-relaxed max-w-3xl mx-auto">
                  {selectedItem.caption}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
