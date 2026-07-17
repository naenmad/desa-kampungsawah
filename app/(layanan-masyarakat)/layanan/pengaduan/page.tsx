"use client";

import { useState } from "react";
import { MessageSquare, Shield, Send, Search, CheckCircle, Clock, AlertTriangle, UserCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, TextArea, Select } from "@/components/ui/Input";
import { apiFetch } from "@/lib/apiClient";

type ComplaintStatus = "diterima" | "verifikasi" | "proses" | "selesai";

type ComplaintTicket = {
  id: string;
  category: string;
  title: string;
  description: string;
  dusun: string;
  date: string;
  status: ComplaintStatus;
  responseNote?: string;
};

// Data aduan tiruan untuk melatih fitur tracking pencarian
const mockTickets: Record<string, ComplaintTicket> = {
  "ADU-102938": {
    id: "ADU-102938",
    category: "Persampahan & Lingkungan",
    title: "Tumpukan Sampah Liar Dusun Karajan",
    description: "Tumpukan sampah liar menumpuk di pinggir jalur utama Pasar Dengklok Dusun Karajan, memicu bau tidak sedap bagi pengendara.",
    dusun: "Karajan",
    date: "10 Juli 2026",
    status: "selesai",
    responseNote: "Tim KSM TPST bersama warga setempat telah mengangkut sampah tersebut ke penampungan resmi, serta memasang plang sanksi larangan membuang sampah liar.",
  },
  "ADU-229103": {
    id: "ADU-229103",
    category: "Jalan & Saluran Air",
    title: "Pintu Air Irigasi Campea Tersumbat Lumpur",
    description: "Saluran irigasi pertanian di wilayah Dusun Campea tersumbat lumpur tebal sehingga menghambat air masuk ke sawah bagian ujung.",
    dusun: "Campea",
    date: "13 Juli 2026",
    status: "proses",
    responseNote: "Koordinasi dengan kelompok tani Campea sedang berjalan. Pekerjaan pengerukan lumpur dijadwalkan mulai pertengahan minggu ini.",
  },
  "ADU-338291": {
    id: "ADU-338291",
    category: "Pelayanan Publik",
    title: "Keterlambatan Antrean Surat Keterangan Usaha",
    description: "Saya mengajukan berkas SKU kemarin pagi secara online namun statusnya belum bergeser dari antrean awal.",
    dusun: "Pasar",
    date: "14 Juli 2026",
    status: "verifikasi",
    responseNote: "Berkas sedang diperiksa silang NIK oleh Kasi Pelayanan untuk divalidasi keabsahan usahanya.",
  },
};

export default function PengaduanMasyarakatPage() {
  // Form State
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dusun, setDusun] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Submission Success State
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState("");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<ComplaintTicket | null>(null);
  const [searchError, setSearchError] = useState(false);

  const categories = [
    { id: "sampah", name: "Persampahan & Kebersihan Lingkungan (TPST)" },
    { id: "infrastruktur", name: "Jalan Rusak & Saluran Air Irigasi" },
    { id: "pelayanan", name: "Layanan Administrasi / Perangkat Desa" },
    { id: "ketertiban", name: "Keamanan & Ketertiban Umum" },
    { id: "lainnya", name: "Aspirasi & Laporan Lainnya" },
  ];

  const dusunList = ["Pasar", "Puloharapan", "Campea", "Karajan"];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !dusun) return;

    try {
      const result = await apiFetch("/complaints", {
        method: "POST",
        body: JSON.stringify({
          judul: title,
          detail: description,
          dusun,
          category,
          anonymous: isAnonymous,
          reporter_name: isAnonymous ? null : reporterName,
          whatsapp: isAnonymous ? null : whatsapp,
        }),
      });

      const randomTicket = `ADU-${result.id || Math.floor(100000 + Math.random() * 900000)}`;
      setCreatedTicketId(randomTicket);
      setSubmitSuccess(true);

      // Reset Form
      setCategory("");
      setTitle("");
      setDescription("");
      setDusun("");
      setReporterName("");
      setWhatsapp("");
      setIsAnonymous(false);
    } catch (err: any) {
      alert(err.message || "Gagal mengirim pengaduan.");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(false);
    setSearchResult(null);
    
    const cleanQuery = searchQuery.trim().toUpperCase();
    const id = cleanQuery.startsWith("ADU-") ? cleanQuery.replace("ADU-", "") : cleanQuery;

    if (!id || isNaN(Number(id))) {
      setSearchError(true);
      return;
    }

    try {
      const data = await apiFetch(`/complaints/${id}`);
      if (data) {
        setSearchResult({
          id: `ADU-${data.id}`,
          category: data.category || "Aspirasi & Laporan Lainnya",
          title: data.judul,
          description: data.detail,
          dusun: data.dusun,
          date: new Date(data.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          status: data.status as ComplaintStatus,
          responseNote: data.admin_note || undefined,
        });
      } else {
        setSearchError(true);
      }
    } catch (err) {
      setSearchError(true);
    }
  };

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case "diterima":
        return <Clock className="w-5 h-5 text-gray-500 animate-pulse" />;
      case "verifikasi":
        return <UserCheck className="w-5 h-5 text-amber-500" />;
      case "proses":
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case "selesai":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case "diterima":
        return <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">Diterima</span>;
      case "verifikasi":
        return <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">Verifikasi Berkas</span>;
      case "proses":
        return <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">Sedang Ditangani</span>;
      case "selesai":
        return <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">Selesai Ditindaklanjuti</span>;
    }
  };

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

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pusat Suara & Aduan Warga Kampungsawah</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
              Pengaduan & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Aspirasi Masyarakat
              </span>
            </h1>
            <p className="text-sm md:text-base text-emerald-100/90 max-w-xl leading-relaxed">
              Sampaikan keluhan mengenai sampah liar Dusun Karajan, saluran air irigasi tersumbat, ketertiban umum, atau saran pembangunan lainnya guna perbaikan kinerja pelayanan kami.
            </p>
          </div>

          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="relative w-72 h-72 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-white">Layanan 100% Aman</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Semua aduan diproses secara profesional. Anda dapat memilih opsi **Anonim** jika ingin merahasiakan identitas pribadi Anda demi kenyamanan bersama.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN LAYOUT: FORM & TRACKING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative z-20 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: FORM SUBMISSION */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            {!submitSuccess ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-bold text-gray-900">Buat Laporan / Aspirasi Baru</h2>
                  <p className="text-xs text-gray-400 mt-1">Laporan Anda akan terkirim langsung ke admin desa untuk segera dikoordinasikan.</p>
                </div>

                <div className="space-y-4">
                  {/* Pilihan Kategori */}
                  <Select
                    label="Kategori Aduan"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Pilih Kategori Masalah --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </Select>

                  {/* Judul Laporan */}
                  <Input
                    label="Subjek / Judul Laporan"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Tuliskan judul laporan singkat (contoh: Pintu air tersumbat)"
                  />

                  {/* Deskripsi Laporan */}
                  <TextArea
                    label="Isi Detail Pengaduan"
                    required
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan secara rinci kronologi masalah, perkiraan lokasi, dampak, dan detail lainnya..."
                  />

                  {/* Wilayah Dusun & Upload Image Sim */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Lokasi Dusun Masalah"
                      required
                      value={dusun}
                      onChange={(e) => setDusun(e.target.value)}
                    >
                      <option value="">-- Pilih Dusun Terkait --</option>
                      {dusunList.map((d, idx) => (
                        <option key={idx} value={d.toLowerCase()}>Dusun {d}</option>
                      ))}
                    </Select>

                    <div className="space-y-1.5 w-full text-left">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Unggah Foto Bukti (Opsional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50/50 text-gray-900 focus:outline-none cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                      />
                    </div>
                  </div>

                  {/* Checkbox Anonim */}
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="anonymous" className="text-xs font-bold text-gray-600 cursor-pointer select-none">
                      Kirim Laporan secara Anonim (Sembunyikan nama saya)
                    </label>
                  </div>

                  {/* Identitas Pelapor (Render jika tidak anonim) */}
                  {!isAnonymous && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                      <Input
                        label="Nama Pelapor"
                        type="text"
                        required={!isAnonymous}
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="Masukkan nama lengkap Anda"
                      />
                      <Input
                        label="No. WhatsApp / Kontak"
                        type="tel"
                        required={!isAnonymous}
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="0812xxxxxx (Untuk update status)"
                      />
                    </div>
                  )}

                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Kirim Pengaduan / Keluhan</span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            ) : (
              // Tampilan Sukses Pengaduan
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-gray-900">Laporan Berhasil Terkirim!</h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Terima kasih atas laporan Anda. Pengaduan Anda telah terdaftar di sistem. Catat Nomor Tiket di bawah untuk memantau perkembangan tindak lanjut.
                  </p>
                </div>

                <div className="bg-gray-50 border border-dashed border-emerald-300 rounded-xl p-5 max-w-sm mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">Nomor Tiket Pengaduan</span>
                  <span className="text-3xl font-mono font-black tracking-wider text-gray-800 selection:bg-emerald-200">{createdTicketId}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSearchQuery(createdTicketId);
                      // Pasang ke simulasi pencarian instan
                      setSearchResult({
                        id: createdTicketId,
                        category: "Aduan Warga Baru",
                        title: "Laporan Terkirim Baru",
                        description: "Aduan Anda baru saja masuk ke sistem desa. Menunggu pemeriksaan verifikasi administrasi oleh perangkat pelayanan.",
                        dusun: "Pilihan",
                        date: "Baru Saja",
                        status: "diterima",
                      });
                    }}
                    className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Lacak Aduan Ini Sekarang
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: TICKET TRACKING */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 md:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-bold text-gray-900 text-lg flex items-center">
                  <Search className="w-5 h-5 text-emerald-600 mr-2 shrink-0" />
                  <span>Pantau Status Pengaduan</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">Masukkan Nomor Tiket (e.g. `ADU-102938`) untuk melihat status penanganan terkini.</p>
              </div>

              {/* Form Lacak */}
              <form onSubmit={handleSearch} className="flex gap-2 items-end w-full">
                <div className="flex-grow">
                  <Input
                    type="text"
                    required
                    placeholder="Contoh: ADU-102938"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="font-mono text-center tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-600 text-white px-4 py-3 h-[46px] rounded-xl hover:bg-emerald-700 transition-all font-bold text-xs flex items-center shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4 mr-1 shrink-0" />
                  <span>Cari</span>
                </button>
              </form>

              {/* Search results */}
              {searchResult && (
                <div className="space-y-6 border-t border-gray-100 pt-6">
                  {/* Status Badges */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-gray-400">{searchResult.id}</span>
                    {getStatusBadge(searchResult.status)}
                  </div>

                  {/* Header aduan */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-emerald-600 uppercase">{searchResult.category}</span>
                    <h4 className="font-extrabold text-gray-900 text-base leading-snug">{searchResult.title}</h4>
                    <span className="text-[10px] text-gray-400 block font-medium">Diajukan pada: {searchResult.date} | Dusun: {searchResult.dusun}</span>
                  </div>

                  {/* Isi Deskripsi */}
                  <div className="bg-gray-50/70 border border-gray-100 p-4 rounded-xl text-xs text-gray-500 leading-relaxed">
                    <span className="font-bold text-gray-700 block mb-1">Deskripsi Warga:</span>
                    {searchResult.description}
                  </div>

                  {/* Stepper Progres */}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-gray-700 uppercase block">Progres Tindak Lanjut</span>
                    
                    <div className="relative pl-6 space-y-5 border-l-2 border-emerald-100 ml-2.5">
                      
                      {/* Step 1: Diterima */}
                      <div className="relative">
                        <div className="absolute -left-[31px] top-0.5 bg-white border-2 border-emerald-600 rounded-full p-1 text-emerald-600">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="block font-bold text-gray-800 text-xs">Laporan Diterima</span>
                          <span className="text-[10px] text-gray-400">Laporan warga berhasil tercatat di sistem aduan.</span>
                        </div>
                      </div>

                      {/* Step 2: Verifikasi */}
                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0.5 bg-white border-2 rounded-full p-1 ${
                          ["verifikasi", "proses", "selesai"].includes(searchResult.status)
                            ? "border-emerald-600 text-emerald-600"
                            : "border-gray-200 text-gray-300"
                        }`}>
                          <UserCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-0.5">
                          <span className={`block font-bold text-xs ${
                            ["verifikasi", "proses", "selesai"].includes(searchResult.status) ? "text-gray-800" : "text-gray-400"
                          }`}>Verifikasi Lapangan & Berkas</span>
                          <span className="text-[10px] text-gray-400">Pemeriksaan detail aduan oleh perangkat terkait.</span>
                        </div>
                      </div>

                      {/* Step 3: Proses */}
                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0.5 bg-white border-2 rounded-full p-1 ${
                          ["proses", "selesai"].includes(searchResult.status)
                            ? "border-emerald-600 text-emerald-600"
                            : "border-gray-200 text-gray-300"
                        }`}>
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-0.5">
                          <span className={`block font-bold text-xs ${
                            ["proses", "selesai"].includes(searchResult.status) ? "text-gray-800" : "text-gray-400"
                          }`}>Proses Tindak Lanjut</span>
                          <span className="text-[10px] text-gray-400">Koordinasi lapangan dan pengerjaan penyelesaian keluhan.</span>
                        </div>
                      </div>

                      {/* Step 4: Selesai */}
                      <div className="relative">
                        <div className={`absolute -left-[31px] top-0.5 bg-white border-2 rounded-full p-1 ${
                          searchResult.status === "selesai"
                            ? "border-emerald-600 text-emerald-600 bg-emerald-50"
                            : "border-gray-200 text-gray-300"
                        }`}>
                          <CheckCircle className="w-3.5 h-3.5" />
                        </div>
                        <div className="space-y-0.5">
                          <span className={`block font-bold text-xs ${
                            searchResult.status === "selesai" ? "text-gray-800" : "text-gray-400"
                          }`}>Selesai</span>
                          <span className="text-[10px] text-gray-400">Keluhan warga telah dituntaskan dengan bukti dokumentasi.</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Catatan Respon Admin */}
                  {searchResult.responseNote && (
                    <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 space-y-2 text-xs">
                      <span className="font-bold text-emerald-950 block">Catatan Petugas Desa:</span>
                      <p className="text-emerald-900 leading-relaxed">
                        {searchResult.responseNote}
                      </p>
                    </div>
                  )}

                </div>
              )}

              {/* Error State */}
              {searchError && (
                <div className="text-center py-6 border-t border-gray-100 pt-6 space-y-2">
                  <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                  <div className="space-y-1">
                    <span className="block font-bold text-gray-800 text-xs">Tiket Tidak Ditemukan</span>
                    <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                      Pastikan Anda memasukkan kode tiket dengan format yang benar (contoh: `ADU-102938`). Laporan baru memerlukan beberapa saat untuk terdaftar secara riil.
                    </p>
                  </div>
                </div>
              )}

              {/* Default Welcome State */}
              {!searchResult && !searchError && (
                <div className="text-center py-8 border-t border-gray-100 pt-6 space-y-2 text-gray-400">
                  <Clock className="w-10 h-10 mx-auto" />
                  <p className="text-xs">Menunggu pencarian nomor tiket laporan...</p>
                  <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Coba masukkan nomor contoh <strong className="font-semibold text-emerald-600 font-mono">ADU-102938</strong> atau <strong className="font-semibold text-emerald-600 font-mono">ADU-229103</strong> untuk melihat demonstrasi alur pelacakan aduan warga.
                  </p>
                </div>
              )}
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
