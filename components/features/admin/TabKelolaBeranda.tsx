"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Home, Landmark, Image as ImageIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { TextArea } from "@/components/ui/Input";
import { getHomepageConfig, saveHomepageConfig, HomepageConfig } from "@/lib/homepageService";

export default function TabKelolaBeranda() {
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setConfig(getHomepageConfig());
  }, []);

  const handleInputChange = (field: keyof HomepageConfig, value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      [field]: value
    });
  };

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
        if (config) {
          setConfig({
            ...config,
            headImage: reader.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    saveHomepageConfig(config);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!config) {
    return <p className="text-center text-xs text-slate-400 py-12">Memuat pengaturan beranda...</p>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Kelola Konten Beranda</h3>
          <p className="text-xs text-slate-500 mt-1">
            Edit dan perbarui isi banner utama (hero) dan sambutan resmi kepala desa di halaman depan website umum.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          {isSaved && (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
              <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
              Konten Tersimpan!
            </span>
          )}
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
          >
            Simpan Perubahan Beranda
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Section 1: Hero Banner */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <Home className="w-4 h-4 text-emerald-600" />
            <span>1. Hero Banner Utama</span>
          </h4>
          
          <div className="space-y-4">
            <Input
              label="Judul Atas (Baris 1)"
              required
              value={config.heroTitle}
              onChange={(e) => handleInputChange("heroTitle", e.target.value)}
              placeholder="Contoh: Sinergi Menuju"
            />
            
            <Input
              label="Judul Gradient (Baris 2)"
              required
              value={config.heroSub}
              onChange={(e) => handleInputChange("heroSub", e.target.value)}
              placeholder="Contoh: Desa Mandiri & Maju"
            />

            <TextArea
              label="Deskripsi Ringkas Banner"
              required
              rows={4}
              value={config.heroDesc}
              onChange={(e) => handleInputChange("heroDesc", e.target.value)}
              placeholder="Tulis ringkasan tentang desa untuk banner utama..."
            />
          </div>
        </Card>

        {/* Section 2: Sambutan Kepala Desa */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-emerald-600" />
            <span>2. Sambutan Kepala Desa</span>
          </h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Kepala Desa"
                required
                value={config.headName}
                onChange={(e) => handleInputChange("headName", e.target.value)}
                placeholder="Contoh: Dede Sunarya"
              />
              
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Foto Resmi Kepala Desa
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
                  {config.headImage && (
                    <div className="relative w-12 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                      <img
                        src={config.headImage}
                        alt="Preview Kades"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Input
              label="Judul Sambutan"
              required
              value={config.greetingTitle}
              onChange={(e) => handleInputChange("greetingTitle", e.target.value)}
              placeholder="Contoh: Selamat Datang di Ruang Digital Kami"
            />

            <TextArea
              label="Teks Sambutan Kades"
              required
              rows={5}
              value={config.greetingText}
              onChange={(e) => handleInputChange("greetingText", e.target.value)}
              placeholder="Tuliskan lengkap sambutan resmi dari kades..."
            />
          </div>
        </Card>

      </div>
    </form>
  );
}
