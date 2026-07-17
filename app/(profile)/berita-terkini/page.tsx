"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, ChevronRight, Landmark, Tag } from "lucide-react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useNewsList, NewsItem } from "@/lib/newsService";

const categories = ["Semua", "Prioritas", "Pertanian", "Ekonomi", "Kesehatan", "Pemerintahan"];

export default function BeritaTerkiniPage() {
  const { news } = useNewsList();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const idParam = params.get("id");
      if (idParam) {
        const found = news.find((item) => item.id === parseInt(idParam));
        if (found) {
          setSelectedNews(found);
        }
      }
    }
  }, [news]);

  const filteredNews = news.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kabar Utama & Pengumuman Resmi</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Berita & Pengumuman <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Desa Kampungsawah
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Menyajikan berita pembangunan lingkungan, aktivitas pertanian, program kesejahteraan, dan agenda kemasyarakatan terkini secara berkala.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH PANEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-24">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Search bar */}
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="Cari berita atau pengumuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-gray-400" />}
            />
          </div>
          {/* Category Dropdown for Mobile / Simple toggle */}
          <div className="w-full flex items-center justify-end text-sm">
            <span className="text-xs font-bold text-gray-400 uppercase mr-3">Filter Kategori:</span>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-xs bg-gray-50/50 flex-grow md:flex-grow-0"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* 3. NEWS FEED / DETAIL MODE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedNews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((news) => (
              <Card
                key={news.id}
                className="group bg-white flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative border border-gray-100"
              >
                {/* Header Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
                  <Image
                    src={news.image || "/images/background.webp"}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-4 flex-grow">
                  {/* Category and Date meta */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-emerald-600" />
                      {news.category}
                    </span>
                    <span className="text-gray-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {news.date}
                    </span>
                  </div>

                  {/* Title and Excerpt */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-gray-800 text-lg leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {news.description}
                    </p>
                  </div>
                </div>

                {/* Read Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedNews(news)}
                    className="w-full bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}

            {/* Empty State */}
            {filteredNews.length === 0 && (
              <div className="col-span-full text-center py-16 space-y-3 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 font-medium text-sm">Tidak ada berita yang cocok dengan kriteria pencarian Anda.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Semua");
                  }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-500"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        ) : (
          // NEWS DETAIL VIEW
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 md:p-10 space-y-6">
            {/* Detail Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <button
                onClick={() => setSelectedNews(null)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                &larr; Kembali ke Daftar Berita
              </button>
              
              <div className="flex items-center space-x-4">
                <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-md border border-emerald-100 text-xs">
                  {selectedNews.category}
                </span>
                <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {selectedNews.date}
                </span>
              </div>
            </div>

            {/* Content Header */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug">
                {selectedNews.title}
              </h2>
              <div className="w-20 h-1 bg-emerald-600 rounded-full" />
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm shrink-0">
              <Image
                src={selectedNews.image || "/images/background.webp"}
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="text-sm text-gray-600 leading-relaxed space-y-4 pt-2">
              <p>{selectedNews.content}</p>
              <p>Pemerintah Desa Kampungsawah mengimbau kepada seluruh masyarakat untuk terus berpartisipasi aktif dalam memantau pengerjaan program ini, serta turut andil menjaga hasil pembangunan lingkungan maupun sarana prasarana yang telah diupayakan bersama demi kesejahteraan wilayah Kecamatan Jayakerta.</p>
            </div>

            {/* Back Button bottom */}
            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <Button onClick={() => setSelectedNews(null)} variant="primary">
                Kembali ke Kabar Desa
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
