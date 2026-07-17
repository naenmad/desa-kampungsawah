"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "./apiClient";

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
  }
];

export function useNewsList() {
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const data = await apiFetch("/news");
      if (data) setNews(data);
    } catch (e) {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const addNews = async (item: Omit<NewsItem, "id">) => {
    const result = await apiFetch("/news", {
      method: "POST",
      body: JSON.stringify(item),
    });
    fetchNews();
    return result;
  };

  const updateNews = async (id: number, item: Omit<NewsItem, "id">) => {
    const result = await apiFetch(`/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
    });
    fetchNews();
    return result;
  };

  const deleteNews = async (id: number) => {
    await apiFetch(`/news/${id}`, {
      method: "DELETE",
    });
    fetchNews();
  };

  return { news, isLoading, addNews, updateNews, deleteNews, refreshNews: fetchNews };
}
