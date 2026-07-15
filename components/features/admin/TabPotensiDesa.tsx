"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, BarChart3, Wheat, ShoppingBag, Upload, Plus, Trash2, Edit, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { TextArea } from "@/components/ui/Input";

type PotentialItem = {
  id: number;
  title: string;
  description: string;
};

export default function TabPotensiDesa() {
  const [subTab, setSubTab] = useState<"statistik" | "pertanian" | "umkm">("statistik");
  const [isSaved, setIsSaved] = useState(false);

  // 1. STATISTIK RINGKAS POTENSI
  const [statPanenVal, setStatPanenVal] = useState("2 Kali");
  const [statPanenLbl, setStatPanenLbl] = useState("Panen Padi per Tahun");
  
  const [statUmkmVal, setStatUmkmVal] = useState("50+");
  const [statUmkmLbl, setStatUmkmLbl] = useState("UMKM Konveksi Dompet");
  
  const [statEkonomiVal, setStatEkonomiVal] = useState("Rp 5M+");
  const [statEkonomiLbl, setStatEkonomiLbl] = useState("Perputaran Uang Ekonomi Lokal");
  
  const [statKomoditasVal, setStatKomoditasVal] = useState("Utama");
  const [statKomoditasLbl, setStatKomoditasLbl] = useState("Komoditas Karawang Padi");

  // 2. SEKTOR PRIMER / PERTANIAN GLOBAL
  const [pertanianTitle, setPertanianTitle] = useState("Pertanian Padi Sawah Berkelanjutan");
  const [pertanianDesc, setPertanianDesc] = useState("Sebagai bagian dari lumbung padi nasional Kabupaten Karawang, Desa Kampungsawah memiliki lahan pertanian subur dengan basis kelompok tani yang aktif mengelola pola 2 kali panen per tahun. Pemerintah desa berfokus mengoptimalkan manajemen perairan serta mengedukasi mitigasi hama.");
  const [pertanianImg, setPertanianImg] = useState("/images/galeri-pertanian.png");
  
  // Sektor Pertanian Sub-CRUD (Points)
  const [pertanianPoints, setPertanianPoints] = useState<PotentialItem[]>([
    {
      id: 1,
      title: "Mitigasi Hama Modern",
      description: "Kolaborasi aktif dengan penyuluh pertanian lapangan untuk meminimalisasi penyakit sundep (padi kopong) dan ngengat melalui pemantauan berkala."
    },
    {
      id: 2,
      title: "Manajemen Saluran Irigasi",
      description: "Pengawasan pintu air di Dusun Campea dan Dusun Karajan untuk memastikan pasokan air sawah tetap tercukupi walau saat musim kemarau."
    }
  ]);
  const [editingPointId, setEditingPointId] = useState<number | null>(null);
  const [pointTitle, setPointTitle] = useState("");
  const [pointDesc, setPointDesc] = useState("");

  // 3. SEKTOR SEKUNDER / UMKM GLOBAL
  const [umkmTitle, setUmkmTitle] = useState("Geliat Usaha Mikro, Kecil, & Menengah");
  const [umkmDesc, setUmkmDesc] = useState("UMKM merupakan tulang punggung ekonomi kerakyatan di Desa Kampungsawah. Keberadaan ratusan pengrajin rumahan di sektor konveksi serta kuliner lokal mampu menyerap tenaga kerja lokal dalam jumlah besar.");
  const [umkmImg, setUmkmImg] = useState("/images/galeri-umkm.png");

  // Sektor UMKM Sub-CRUD (Cards/Businesses)
  const [umkmCards, setUmkmCards] = useState<PotentialItem[]>([
    {
      id: 1,
      title: "Konveksi Dompet (Dusun Puloharapan)",
      description: "Sentra konveksi dompet eceran dan grosir. Produk dipasarkan secara daring (online marketplace) hingga dikirim ke berbagai kota besar di Jawa Barat dan Jabodetabek."
    },
    {
      id: 2,
      title: "Kuliner Kue Basah (Dusun Pasar)",
      description: "Aktivitas pembuatan aneka kue tradisional basah setiap subuh. Menjadi penyuplai utama lapak sarapan pagi di kecamatan Jayakerta dan sekitarnya."
    }
  ]);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDesc, setCardDesc] = useState("");

  // Handler Upload Gambar
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "pertanian" | "umkm") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ["png", "jpg", "jpeg", "webp"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      alert("Format file tidak valid. Silakan upload file dengan ekstensi png, jpg, jpeg, atau webp.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        if (type === "pertanian") {
          setPertanianImg(reader.result);
        } else {
          setUmkmImg(reader.result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Sub-CRUD: Submit Pertanian Point
  const handlePointSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointTitle || !pointDesc) return;

    if (editingPointId !== null) {
      setPertanianPoints(pertanianPoints.map(p => 
        p.id === editingPointId ? { ...p, title: pointTitle, description: pointDesc } : p
      ));
      setEditingPointId(null);
    } else {
      setPertanianPoints([...pertanianPoints, {
        id: Date.now(),
        title: pointTitle,
        description: pointDesc
      }]);
    }
    setPointTitle("");
    setPointDesc("");
  };

  const handleStartEditPoint = (item: PotentialItem) => {
    setEditingPointId(item.id);
    setPointTitle(item.title);
    setPointDesc(item.description);
  };

  const handleCancelEditPoint = () => {
    setEditingPointId(null);
    setPointTitle("");
    setPointDesc("");
  };

  const handleDeletePoint = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus poin kebijakan ini?")) {
      setPertanianPoints(pertanianPoints.filter(p => p.id !== id));
      if (editingPointId === id) {
        handleCancelEditPoint();
      }
    }
  };

  // Sub-CRUD: Submit UMKM Card
  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardTitle || !cardDesc) return;

    if (editingCardId !== null) {
      setUmkmCards(umkmCards.map(c => 
        c.id === editingCardId ? { ...c, title: cardTitle, description: cardDesc } : c
      ));
      setEditingCardId(null);
    } else {
      setUmkmCards([...umkmCards, {
        id: Date.now(),
        title: cardTitle,
        description: cardDesc
      }]);
    }
    setCardTitle("");
    setCardDesc("");
  };

  const handleStartEditCard = (item: PotentialItem) => {
    setEditingCardId(item.id);
    setCardTitle(item.title);
    setCardDesc(item.description);
  };

  const handleCancelEditCard = () => {
    setEditingCardId(null);
    setCardTitle("");
    setCardDesc("");
  };

  const handleDeleteCard = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus bidang usaha ini?")) {
      setUmkmCards(umkmCards.filter(c => c.id !== id));
      if (editingCardId === id) {
        handleCancelEditCard();
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
      
      {/* HEADER UTAMA */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ubah Profil Potensi Desa</h3>
            <p className="text-xs text-slate-500 mt-1">
              Sesuaikan data potensi pertanian dan UMKM yang ditampilkan di halaman informasi publik.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {isSaved && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                Data Tersimpan!
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Simpan Semua Potensi
            </button>
          </div>
        </div>

        {/* Pemilihan subTab */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setSubTab("statistik")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "statistik"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Statistik Ringkas</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab("pertanian")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "pertanian"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>Sektor Pertanian</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab("umkm")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              subTab === "umkm"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sektor UMKM</span>
          </button>
        </div>
      </Card>

      {/* DETAIL INPUT SECTION TERPILIH */}
      
      {/* 1. SUB TAB: STATISTIK RINGKAS */}
      {subTab === "statistik" && (
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Ubah 4 Card Statistik Ringkas Potensi
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Stat 1 */}
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Card 1: Sektor Pertanian</span>
              <Input
                label="Angka / Nilai"
                required
                value={statPanenVal}
                onChange={(e) => setStatPanenVal(e.target.value)}
                placeholder="Contoh: 2 Kali"
              />
              <Input
                label="Label Deskripsi"
                required
                value={statPanenLbl}
                onChange={(e) => setStatPanenLbl(e.target.value)}
                placeholder="Contoh: Panen Padi per Tahun"
              />
            </div>

            {/* Stat 2 */}
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Card 2: Industri Kreatif</span>
              <Input
                label="Angka / Nilai"
                required
                value={statUmkmVal}
                onChange={(e) => setStatUmkmVal(e.target.value)}
                placeholder="Contoh: 50+"
              />
              <Input
                label="Label Deskripsi"
                required
                value={statUmkmLbl}
                onChange={(e) => setStatUmkmLbl(e.target.value)}
                placeholder="Contoh: UMKM Konveksi Dompet"
              />
            </div>

            {/* Stat 3 */}
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Card 3: Skala Ekonomi</span>
              <Input
                label="Angka / Nilai"
                required
                value={statEkonomiVal}
                onChange={(e) => setStatEkonomiVal(e.target.value)}
                placeholder="Contoh: Rp 5M+"
              />
              <Input
                label="Label Deskripsi"
                required
                value={statEkonomiLbl}
                onChange={(e) => setStatEkonomiLbl(e.target.value)}
                placeholder="Contoh: Perputaran Uang Ekonomi Lokal"
              />
            </div>

            {/* Stat 4 */}
            <div className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Card 4: Status Komoditas</span>
              <Input
                label="Angka / Nilai"
                required
                value={statKomoditasVal}
                onChange={(e) => setStatKomoditasVal(e.target.value)}
                placeholder="Contoh: Utama"
              />
              <Input
                label="Label Deskripsi"
                required
                value={statKomoditasLbl}
                onChange={(e) => setStatKomoditasLbl(e.target.value)}
                placeholder="Contoh: Komoditas Karawang Padi"
              />
            </div>

          </div>
        </Card>
      )}

      {/* 2. SUB TAB: SEKTOR PERTANIAN */}
      {subTab === "pertanian" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Inputs fields */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Deskripsi Pertanian Padi
              </h4>
              <Input
                label="Judul Sektor"
                required
                value={pertanianTitle}
                onChange={(e) => setPertanianTitle(e.target.value)}
              />
              <TextArea
                label="Deskripsi Paragraf"
                required
                rows={4}
                value={pertanianDesc}
                onChange={(e) => setPertanianDesc(e.target.value)}
              />
            </Card>

            {/* Sektor Image Uploader */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Gambar Sektor Pertanian
              </h4>
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                {pertanianImg ? (
                  <Image
                    src={pertanianImg}
                    alt="Pertanian Sawah Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                    Belum ada gambar
                  </div>
                )}
              </div>
              
              <label className="border border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Upload Gambar Pertanian</span>
                <span className="text-[10px] text-slate-400">PNG, JPG, JPEG, WEBP (maks. 2MB)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "pertanian")}
                />
              </label>
            </Card>
          </div>

          {/* SUB-CRUD: POIN KEBIJAKAN PERTANIAN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Input Poin */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
              <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  {editingPointId !== null ? "Ubah Poin Kebijakan" : "Tambah Poin Kebijakan"}
                </h4>
                {editingPointId !== null && (
                  <button
                    type="button"
                    onClick={handleCancelEditPoint}
                    className="text-slate-400 hover:text-slate-650 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <Input
                label="Judul Kebijakan / Poin"
                required
                value={pointTitle}
                onChange={(e) => setPointTitle(e.target.value)}
                placeholder="Contoh: Irigasi Otomatis"
              />
              <TextArea
                label="Keterangan Lengkap Poin"
                required
                rows={3}
                value={pointDesc}
                onChange={(e) => setPointDesc(e.target.value)}
                placeholder="Keterangan mengenai kebijakan irigasi..."
              />
              <div className="flex justify-end gap-2 pt-2">
                {editingPointId !== null ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelEditPoint}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handlePointSubmit}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Simpan Poin
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handlePointSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Poin</span>
                  </button>
                )}
              </div>
            </Card>

            {/* List Poin */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm lg:col-span-2 overflow-x-auto">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Daftar Poin Kebijakan Pertanian
              </h4>
              <table className="w-full text-left text-xs min-w-[400px] mt-4">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                    <th className="py-2 pl-2">Judul Poin</th>
                    <th className="py-2">Keterangan Deskripsi</th>
                    <th className="py-2 text-right pr-2">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-650">
                  {pertanianPoints.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pl-2 font-bold text-slate-800">{item.title}</td>
                      <td className="py-3 max-w-[250px] truncate" title={item.description}>{item.description}</td>
                      <td className="py-3 text-right pr-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleStartEditPoint(item)}
                          className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeletePoint(item.id)}
                          className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {pertanianPoints.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-slate-400 italic">Belum ada poin kebijakan pertanian.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>

          </div>
        </div>
      )}

      {/* 3. SUB TAB: SEKTOR UMKM */}
      {subTab === "umkm" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Inputs fields */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-2">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Deskripsi UMKM & Ekonomi Kreatif
              </h4>
              <Input
                label="Judul Sektor"
                required
                value={umkmTitle}
                onChange={(e) => setUmkmTitle(e.target.value)}
              />
              <TextArea
                label="Deskripsi Paragraf"
                required
                rows={4}
                value={umkmDesc}
                onChange={(e) => setUmkmDesc(e.target.value)}
              />
            </Card>

            {/* Sektor Image Uploader */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Gambar Sektor UMKM
              </h4>
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                {umkmImg ? (
                  <Image
                    src={umkmImg}
                    alt="UMKM Sektor Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                    Belum ada gambar
                  </div>
                )}
              </div>
              
              <label className="border border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-50 transition-colors">
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Upload Gambar UMKM</span>
                <span className="text-[10px] text-slate-400">PNG, JPG, JPEG, WEBP (maks. 2MB)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, "umkm")}
                />
              </label>
            </Card>
          </div>

          {/* SUB-CRUD: BIDANG USAHA / KARTU UMKM */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Input Usaha */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
              <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  {editingCardId !== null ? "Ubah Bidang Usaha" : "Tambah Bidang Usaha"}
                </h4>
                {editingCardId !== null && (
                  <button
                    type="button"
                    onClick={handleCancelEditCard}
                    className="text-slate-400 hover:text-slate-650 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <Input
                label="Nama Usaha & Lokasi (Judul)"
                required
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                placeholder="Contoh: Konveksi Dompet (Dusun Puloharapan)"
              />
              <TextArea
                label="Keterangan Lengkap Usaha"
                required
                rows={3}
                value={cardDesc}
                onChange={(e) => setCardDesc(e.target.value)}
                placeholder="Keterangan mengenai prospek usaha dan pasar..."
              />
              <div className="flex justify-end gap-2 pt-2">
                {editingCardId !== null ? (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelEditCard}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleCardSubmit}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Simpan Usaha
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleCardSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Usaha</span>
                  </button>
                )}
              </div>
            </Card>

            {/* List Usaha */}
            <Card className="p-6 bg-white border border-slate-100 shadow-sm lg:col-span-2 overflow-x-auto">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Daftar Bidang Usaha Kreatif / UMKM
              </h4>
              <table className="w-full text-left text-xs min-w-[400px] mt-4">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                    <th className="py-2 pl-2">Nama Usaha / Lokasi</th>
                    <th className="py-2">Keterangan Usaha</th>
                    <th className="py-2 text-right pr-2">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-650">
                  {umkmCards.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 pl-2 font-bold text-slate-800">{item.title}</td>
                      <td className="py-3 max-w-[250px] truncate" title={item.description}>{item.description}</td>
                      <td className="py-3 text-right pr-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleStartEditCard(item)}
                          className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCard(item.id)}
                          className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {umkmCards.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-6 text-slate-400 italic">Belum ada daftar bidang usaha UMKM.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Card>

          </div>
        </div>
      )}

    </div>
  );
}
