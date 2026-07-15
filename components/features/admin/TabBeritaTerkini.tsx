"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { Select } from "@/components/ui/Input";

export default function TabBeritaTerkini() {
  const [news, setNews] = useState([
    { id: 1, title: "Identifikasi Masalah Persampahan & Rencana Perdes", category: "Prioritas", date: "14 Juli 2026", views: 242 },
    { id: 2, title: "Potensi Pertanian Padi & Mitigasi Hama Sundep", category: "Pertanian", date: "05 Juli 2026", views: 185 },
    { id: 3, title: "Strategi Penguatan Kelompok Dagang Resmi UMKM", category: "Ekonomi", date: "28 Juni 2026", views: 198 },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Prioritas");

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newItem = {
      id: Date.now(),
      title: newTitle,
      category: newCat,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      views: 0
    };
    setNews([newItem, ...news]);
    setNewTitle("");
  };

  const handleDeleteNews = (id: number) => {
    setNews(news.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Kelola Berita & Pengumuman</h3>
          <p className="text-xs text-slate-500 mt-1">Gunakan form di bawah untuk menerbitkan berita desa yang baru secara langsung.</p>
        </div>

        {/* Form Tambah Berita */}
        <form onSubmit={handleAddNews} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2">
            <Input
              label="Judul Berita Baru"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Contoh: Perbaikan Pintu Air Dusun Campea Rampung"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-grow">
              <Select
                label="Kategori"
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
              >
                <option value="Prioritas">Prioritas</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pemerintahan">Pemerintahan</option>
              </Select>
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[46px] px-4 rounded-xl flex items-center justify-center shrink-0 cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              <span>Mulai</span>
            </button>
          </div>
        </form>
      </Card>

      {/* News Table */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-2.5 pb-3">Judul Berita</th>
              <th className="py-2.5 pb-3">Kategori</th>
              <th className="py-2.5 pb-3">Tanggal Terbit</th>
              <th className="py-2.5 pb-3">Pembaca</th>
              <th className="py-2.5 pb-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-bold text-slate-800">{item.title}</td>
                <td className="py-4">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                    {item.category}
                  </span>
                </td>
                <td className="py-4 text-slate-500">{item.date}</td>
                <td className="py-4 font-mono font-bold text-slate-700">{item.views} views</td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
