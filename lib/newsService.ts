"use client";

import { useState, useEffect } from "react";

export type NewsItem = {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  content: string;
  image: string;
};

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Identifikasi Masalah Persampahan & Rencana Perdes Lingkungan",
    category: "Prioritas",
    date: "14 Juli 2026",
    description: "Penanganan sampah mandiri dengan dibakar masih mendominasi akibat ketiadaan TPS resmi. Tumpukan sampah di Dusun Karajan dipicu warga luar desa.",
    content: "Penanganan sampah mandiri dengan dibakar masih mendominasi akibat ketiadaan TPS resmi. Tumpukan sampah di Dusun Karajan (jalur utama Pasar Dengklok) dipicu warga luar desa. Program TPST oleh KSM dijadwalkan aktif kembali awal Juli menunggu perbaikan mesin guna merumuskan regulasi sanksi tegas.",
    image: "/images/galeri-rapat.png"
  },
  {
    id: 2,
    title: "Potensi Pertanian Padi & Mitigasi Hama Sundep",
    category: "Pertanian",
    date: "05 Juli 2026",
    description: "Kelompok tani aktif menjalankan pola 2 kali panen per tahun dengan komoditas padi. Pengendalian hama tikus, ngengat, dan penyakit sundep.",
    content: "Kelompok tani aktif menjalankan pola 2 kali panen per tahun dengan komoditas padi. Pengendalian hama tikus, ngengat, dan penyakit sundep (padi kopong) serta tanah asam-asaman kini mulai diarahkan menuju edukasi Pertanian Modern bersama mahasiswa.",
    image: "/images/galeri-pertanian.png"
  },
  {
    id: 3,
    title: "Strategi Penguatan Kelompok Dagang Resmi UMKM Desa",
    category: "Ekonomi",
    date: "28 Juni 2026",
    description: "Sektor konveksi dompet daring dan kuliner kue basah pagi hari menjadi motor ekonomi utama desa. Pemerintah desa mengidentifikasi perlunya penguatan organisasi.",
    content: "Sektor konveksi dompet daring dan kuliner kue basah pagi hari menjadi motor ekonomi utama desa. Pemerintah desa mengidentifikasi perlunya penguatan organisasi naungan resmi guna mengatasi kendala sistem titip jual produsen ke pedagang.",
    image: "/images/galeri-umkm.png"
  }
];

export function getNews(): NewsItem[] {
  if (typeof window === "undefined") {
    return DEFAULT_NEWS;
  }
  const stored = localStorage.getItem("desa_news_list");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_NEWS;
    }
  }
  return DEFAULT_NEWS;
}

export function saveNews(newsList: NewsItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("desa_news_list", JSON.stringify(newsList));
  window.dispatchEvent(new Event("storage"));
}

export function useNewsList() {
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);

  useEffect(() => {
    setNews(getNews());

    const handleStorageChange = () => {
      setNews(getNews());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { news, setNews: (updated: NewsItem[]) => { setNews(updated); saveNews(updated); } };
}
