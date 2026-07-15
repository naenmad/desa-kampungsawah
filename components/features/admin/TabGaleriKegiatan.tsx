"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit, X, Upload, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { TextArea } from "@/components/ui/Input";

type GalleryItem = {
  id: number;
  image: string;
  caption: string;
  date: string;
};

const initialGallery: GalleryItem[] = [
  { id: 1, image: "/images/galeri-rapat.png", caption: "Rapat Minggon Aparatur Desa Kampungsawah", date: "12 Juli 2026" },
  { id: 2, image: "/images/galeri-pertanian.png", caption: "Penyuluhan & Edukasi Pertanian Modern", date: "05 Juli 2026" },
  { id: 3, image: "/images/galeri-umkm.png", caption: "Workshop Kewirausahaan & Pemasaran Online", date: "20 Juni 2026" },
  { id: 4, image: "/images/background.webp", caption: "Gotong Royong Kebersihan Saluran Air & Sampah", date: "28 Juni 2026" },
];

export default function TabGaleriKegiatan() {
  const [items, setItems] = useState<GalleryItem[]>(initialGallery);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check extensions
    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      alert("Format file tidak valid. Gunakan format png, jpg, jpeg, atau webp.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !caption || !date) {
      alert("Silakan lengkapi berkas foto, caption, dan tanggal kegiatan terlebih dahulu.");
      return;
    }

    if (editingId !== null) {
      // Edit Mode
      setItems(items.map((item) =>
        item.id === editingId
          ? { ...item, image, caption, date }
          : item
      ));
      setEditingId(null);
    } else {
      // Add Mode
      const newItem = {
        id: Date.now(),
        image,
        caption,
        date
      };
      setItems([...items, newItem]);
    }

    // Reset Form
    setImage("");
    setCaption("");
    setDate("");
  };

  const handleStartEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setImage(item.image);
    setCaption(item.caption);
    setDate(item.date);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setImage("");
    setCaption("");
    setDate("");
  };

  const handleDeleteItem = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto dokumentasi ini dari galeri?")) {
      setItems(items.filter((item) => item.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TAB */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Kelola Galeri Foto Kegiatan Desa</h3>
            <p className="text-xs text-slate-500 mt-1">
              Unggah foto-foto dokumentasi program pembangunan dan aktivitas warga desa lengkap dengan keterangan caption serta tanggal pelaksanaan.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {isSaved && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                Galeri Tersimpan!
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Simpan Semua Galeri
            </button>
          </div>
        </div>
      </Card>

      {/* INPUT FORM: TAMBAH / EDIT FOTO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Inputs (Caption & Action) */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
          <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              {editingId !== null ? "Ubah Foto Dokumentasi" : "Tambah Foto Dokumentasi Baru"}
            </h4>
            {editingId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-slate-400 hover:text-slate-650 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Tanggal Pelaksanaan Kegiatan"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Contoh: 12 Juli 2026"
            />
            <TextArea
              label="Keterangan Foto (Caption)"
              required
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tuliskan keterangan mengenai foto dokumentasi tersebut (kegiatan apa, lokasi, tujuan)..."
            />
            
            <div className="flex justify-end gap-2 pt-2">
              {editingId !== null ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Simpan Perubahan
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambahkan Foto ke Galeri</span>
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* Image Uploader & Live Preview */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Unggah Berkas Foto
          </h4>
          <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-250 bg-slate-50">
            {image ? (
              <Image
                src={image}
                alt="Upload Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                Belum ada gambar yang dipilih
              </div>
            )}
          </div>

          <label className="border border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors">
            <Upload className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-bold text-slate-700">Pilih Berkas Foto</span>
            <span className="text-[10px] text-slate-400">PNG, JPG, JPEG, WEBP (maks. 2MB)</span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </Card>

      </div>

      {/* LIST GRID FOTO GALERI */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4">
        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Daftar Foto Dokumentasi Galeri ({items.length} Foto)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
          {items.map((item) => (
            <div key={item.id} className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between group relative">
              
              {/* Photo */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Date & Caption */}
              <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-emerald-650 uppercase tracking-wider block">{item.date}</span>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3" title={item.caption}>
                    {item.caption}
                  </p>
                </div>

                {/* Actions inside card footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="text-emerald-600 hover:text-emerald-800 p-1 hover:bg-slate-50 rounded transition-all cursor-pointer"
                    title="Ubah"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-600 hover:text-red-800 p-1 hover:bg-slate-50 rounded transition-all cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
          {items.length === 0 && (
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-12 text-slate-400 italic">
              Belum ada foto dokumentasi di dalam galeri.
            </div>
          )}
        </div>
      </Card>

    </div>
  );
}
