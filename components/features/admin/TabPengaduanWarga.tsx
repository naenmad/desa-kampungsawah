"use client";

import { useState, useEffect } from "react";
import { Check, CheckCircle2, Clock, Eye, Search, AlertTriangle, UserCheck, ShieldAlert, X, MessageSquare } from "lucide-react";
import Card from "@/components/ui/Card";
import { apiFetch } from "@/lib/apiClient";

type ComplaintStatus = "diterima" | "verifikasi" | "proses" | "selesai";

type Complaint = {
  id: string;
  category: string;
  title: string;
  description: string;
  dusun: string;
  reporter: string;
  whatsapp?: string;
  isAnonymous: boolean;
  date: string;
  status: ComplaintStatus;
  responseNote?: string;
};

const initialComplaints: Complaint[] = [
  {
    id: "ADU-102938",
    category: "Persampahan & Kebersihan Lingkungan (TPST)",
    title: "Tumpukan Sampah Liar Dusun Karajan",
    description: "Tumpukan sampah liar menumpuk di pinggir jalur utama Pasar Dengklok Dusun Karajan, memicu bau tidak sedap bagi pengendara.",
    dusun: "Karajan",
    reporter: "Bambang Hermawan",
    whatsapp: "081298459203",
    isAnonymous: true,
    date: "10 Juli 2026",
    status: "selesai",
    responseNote: "Tim KSM TPST bersama warga setempat telah mengangkut sampah tersebut ke penampungan resmi, serta memasang plang sanksi larangan membuang sampah liar.",
  },
  {
    id: "ADU-229103",
    category: "Jalan Rusak & Saluran Air Irigasi",
    title: "Pintu Air Irigasi Campea Tersumbat Lumpur",
    description: "Saluran irigasi pertanian di wilayah Dusun Campea tersumbat lumpur tebal sehingga menghambat air masuk ke sawah bagian ujung.",
    dusun: "Campea",
    reporter: "Karya Mulyana",
    whatsapp: "085710294821",
    isAnonymous: false,
    date: "13 Juli 2026",
    status: "proses",
    responseNote: "Koordinasi dengan kelompok tani Campea sedang berjalan. Pekerjaan pengerukan lumpur dijadwalkan mulai pertengahan minggu ini.",
  },
  {
    id: "ADU-338291",
    category: "Layanan Administrasi / Perangkat Desa",
    title: "Keterlambatan Antrean Surat Keterangan Usaha",
    description: "Saya mengajukan berkas SKU kemarin pagi secara online namun statusnya belum bergeser dari antrean awal.",
    dusun: "Pasar",
    reporter: "Suryani",
    whatsapp: "089620394857",
    isAnonymous: false,
    date: "14 Juli 2026",
    status: "verifikasi",
    responseNote: "Berkas sedang diperiksa silang NIK oleh Kasi Pelayanan untuk divalidasi keabsahan usahanya.",
  },
];

export default function TabPengaduanWarga() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Complaint | null>(null);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | ComplaintStatus>("Semua");

  // Modal edit States
  const [modalStatus, setModalStatus] = useState<ComplaintStatus>("diterima");
  const [modalResponseNote, setModalResponseNote] = useState("");

  const fetchComplaints = async () => {
    try {
      const data = await apiFetch("/complaints");
      const mapped = data.map((item: any) => ({
        id: `ADU-${item.id}`,
        category: item.category || "Aspirasi & Laporan Lainnya",
        title: item.judul,
        description: item.detail,
        dusun: item.dusun,
        reporter: item.anonymous ? "Anonim" : (item.reporter_name || "Warga Desa"),
        whatsapp: item.whatsapp || undefined,
        isAnonymous: Boolean(item.anonymous),
        date: new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        status: item.status as ComplaintStatus,
        responseNote: item.admin_note || undefined,
      }));
      setComplaints(mapped);
    } catch (e) {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStartVerifikasi = (item: Complaint) => {
    setSelectedItem(item);
    setModalStatus(item.status);
    setModalResponseNote(item.responseNote || "");
  };

  const handleSaveTindakLanjut = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    const dbId = selectedItem.id.replace("ADU-", "");
    try {
      await apiFetch(`/complaints/${dbId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: modalStatus, adminNote: modalResponseNote }),
      });
      fetchComplaints();
      setSelectedItem(null);
    } catch (err: any) {
      alert(err.message || "Gagal memperbarui status pengaduan.");
    }
  };

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case "diterima":
        return <span className="bg-gray-50 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-gray-150">Diterima</span>;
      case "verifikasi":
        return <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-amber-150">Verifikasi</span>;
      case "proses":
        return <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-blue-150">Diproses</span>;
      case "selesai":
        return <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-emerald-150">Selesai</span>;
    }
  };

  // Aggregates
  const totalCount = complaints.length;
  const totalDiterima = complaints.filter(c => c.status === "diterima").length;
  const totalProses = complaints.filter(c => c.status === "proses").length;
  const totalSelesai = complaints.filter(c => c.status === "selesai").length;

  // Filtered list
  const filteredList = complaints.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "Semua" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. AGGREGATE SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Aduan Masuk</span>
            <span className="text-xl font-black text-slate-800">{totalCount} Tiket</span>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center shrink-0 border border-gray-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Aduan Baru</span>
            <span className="text-xl font-black text-slate-700">{totalDiterima} Baru</span>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sedang Ditangani</span>
            <span className="text-xl font-black text-blue-600">{totalProses} Laporan</span>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selesai Ditangani</span>
            <span className="text-xl font-black text-emerald-600">{totalSelesai} Laporan</span>
          </div>
        </Card>

      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Keluhan & Laporan Pengaduan Warga</h3>
            <p className="text-xs text-slate-500 mt-1">Pantau, perbarui status progres tindak lanjut lapangan, dan berikan catatan respon laporan warga.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            
            {/* Input Search */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Cari subjek atau nomor tiket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Select Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full sm:w-auto px-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-white transition-colors cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="diterima">Diterima</option>
              <option value="verifikasi">Verifikasi</option>
              <option value="proses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>

          </div>
        </div>
      </Card>

      {/* 3. COMPLAINTS LIST TABLE */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-3 pl-2">Tiket Aduan</th>
              <th className="py-3">Kategori Masalah</th>
              <th className="py-3">Subjek Laporan</th>
              <th className="py-3">Asal Dusun</th>
              <th className="py-3">Pelapor / Pengirim</th>
              <th className="py-3">Tanggal Lapor</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-650">
            {filteredList.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 pl-2 font-mono font-bold text-slate-500">{item.id}</td>
                <td className="py-3.5 font-bold text-slate-800">{item.category}</td>
                <td className="py-3.5 max-w-[180px] truncate text-slate-700" title={item.title}>{item.title}</td>
                <td className="py-3.5 text-slate-600">Dusun {item.dusun}</td>
                <td className="py-3.5 text-slate-800">
                  {item.isAnonymous ? (
                    <span className="text-red-650 font-bold flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      Anonim
                    </span>
                  ) : (
                    item.reporter
                  )}
                </td>
                <td className="py-3.5 text-slate-450">{item.date}</td>
                <td className="py-3.5">{getStatusBadge(item.status)}</td>
                <td className="py-3.5 text-center whitespace-nowrap">
                  <button
                    onClick={() => handleStartVerifikasi(item)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Tindak Lanjut</span>
                  </button>
                </td>
              </tr>
            ))}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-slate-400 italic">Tidak ada keluhan pengaduan warga.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* 4. MODAL DETAIL & RESPON TINDAK LANJUT */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="relative bg-white rounded-3xl overflow-hidden max-w-xl w-full shadow-2xl p-6 md:p-8 space-y-6">
            
            {/* Header */}
            <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Progres Penanganan Aduan</span>
                <h3 className="text-lg font-black text-slate-800">{selectedItem.id}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 p-2 rounded-xl text-slate-400 hover:text-slate-650 cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveTindakLanjut} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-650">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Kategori</span>
                  <span className="text-xs font-bold text-slate-800 block">{selectedItem.category}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Lokasi Dusun</span>
                  <span className="text-xs font-bold text-slate-800 block">Dusun {selectedItem.dusun}</span>
                </div>
                
                <div className="md:col-span-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Nama Pelapor / Pengirim</span>
                  {selectedItem.isAnonymous ? (
                    <div className="p-3 bg-red-50/50 border border-red-100 text-red-800 rounded-xl text-xs flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                      <span>IDENTITAS ANONYMOUS (Dirahasiakan oleh Sistem Pelaporan)</span>
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-xl text-xs font-bold flex flex-col gap-1">
                      <span>Nama Pelapor: {selectedItem.reporter}</span>
                      {selectedItem.whatsapp && <span className="text-slate-500 font-mono">WhatsApp/Kontak: {selectedItem.whatsapp}</span>}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Subjek Aduan</span>
                  <span className="text-sm font-black text-slate-900 block">{selectedItem.title}</span>
                </div>

                <div className="md:col-span-2 space-y-0.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Isi Pengaduan Detail</span>
                  <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-slate-600 font-medium">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Input Status & Catatan Respon */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Alur Proses Pelacakan (Status)</label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as ComplaintStatus)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 bg-white transition-colors cursor-pointer font-bold text-slate-800"
                  >
                    <option value="diterima">Laporan Baru Diterima</option>
                    <option value="verifikasi">Verifikasi Berkas & Lapangan</option>
                    <option value="proses">Sedang Ditangani / Tindak Lanjut</option>
                    <option value="selesai">Selesai Dituntaskan</option>
                  </select>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Catatan Petugas Desa (Tanggapan)</label>
                  <textarea
                    rows={3}
                    value={modalResponseNote}
                    onChange={(e) => setModalResponseNote(e.target.value)}
                    placeholder="Tuliskan perkembangan penyelesaian aduan, kendala lapangan, atau pesan kepada pelapor..."
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                  <p className="text-[10px] text-slate-400">Catatan respon ini akan tayang di halaman pelacakan publik secara real-time saat warga memasukkan tiket aduan.</p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer transition-colors shadow-sm"
                >
                  Simpan Tindak Lanjut
                </button>
              </div>

            </form>
          </Card>
        </div>
      )}

    </div>
  );
}
