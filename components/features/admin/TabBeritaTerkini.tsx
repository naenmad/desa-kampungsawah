"use client";

import { useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import Input, { Select, TextArea } from "@/components/ui/Input";
import { useNewsList } from "@/lib/newsService";

export default function TabBeritaTerkini() {
  const { news, addNews, updateNews, deleteNews } = useNewsList();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("Prioritas");
  const [newDesc, setNewDesc] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState("/images/background.webp");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        alert("Format file tidak didukung! Gunakan format PNG, JPEG, JPG, atau WEBP.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newContent) return;

    try {
      if (editingId !== null) {
        await updateNews(editingId, {
          title: newTitle,
          category: newCat,
          date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          description: newDesc,
          content: newContent,
          image: newImage
        });
        setEditingId(null);
      } else {
        await addNews({
          title: newTitle,
          category: newCat,
          date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          description: newDesc,
          content: newContent,
          image: newImage
        });
      }

      // Reset Form
      setNewTitle("");
      setNewDesc("");
      setNewContent("");
      setNewImage("/images/background.webp");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan berita.");
    }
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewCat(item.category);
    setNewDesc(item.description);
    setNewContent(item.content);
    setNewImage(item.image);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewTitle("");
    setNewDesc("");
    setNewContent("");
    setNewImage("/images/background.webp");
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        await deleteNews(id);
        if (editingId === id) {
          handleCancelEdit();
        }
      } catch (err: any) {
        alert(err.message || "Gagal menghapus berita.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {editingId !== null ? "Ubah Berita & Pengumuman" : "Kelola Berita & Pengumuman"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {editingId !== null 
                ? "Sesuaikan isian form di bawah untuk mengubah detail berita." 
                : "Gunakan form di bawah untuk menerbitkan berita desa yang baru secara langsung."}
            </p>
          </div>
          {editingId !== null && (
            <button
              onClick={handleCancelEdit}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Batal Ubah</span>
            </button>
          )}
        </div>

        {/* Form Tambah / Edit Berita */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Judul Berita"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Contoh: Perbaikan Pintu Air Dusun Campea Rampung"
              />
            </div>
            <div>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="sm:col-span-2">
              <Input
                label="Deskripsi Singkat"
                required
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Ringkasan singkat berita untuk halaman utama..."
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Upload Gambar Utama
              </label>
              <div className="flex items-center gap-3">
                <div className="relative flex-grow">
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleImageChange}
                    className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer border border-slate-200 rounded-xl bg-slate-50/50 p-0.5"
                  />
                </div>
                {newImage && (
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <img
                      src={newImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <TextArea
            label="Isi Lengkap Berita"
            required
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Tuliskan isi lengkap artikel berita di sini..."
          />

          <div className="pt-2 flex justify-end gap-2">
            {editingId !== null ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Terbitkan Berita</span>
              </button>
            )}
          </div>
        </form>
      </Card>

      {/* News Table */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[600px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-2.5 pb-3 pl-2">Gambar</th>
              <th className="py-2.5 pb-3">Judul Berita</th>
              <th className="py-2.5 pb-3">Kategori</th>
              <th className="py-2.5 pb-3">Deskripsi</th>
              <th className="py-2.5 pb-3">Tanggal</th>
              <th className="py-2.5 pb-3 text-right pr-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {news.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 pl-2">
                  <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-slate-150 bg-slate-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3 font-bold text-slate-800 max-w-[180px] truncate" title={item.title}>
                  {item.title}
                </td>
                <td className="py-3">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded text-[10px] font-bold">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 text-slate-500 max-w-[200px] truncate" title={item.description}>
                  {item.description}
                </td>
                <td className="py-3 text-slate-400 whitespace-nowrap">{item.date}</td>
                <td className="py-3 text-right pr-2">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                    title="Ubah"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
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
