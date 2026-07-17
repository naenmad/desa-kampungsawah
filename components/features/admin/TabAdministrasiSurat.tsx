"use client";

import { useState, useEffect } from "react";
import { Check, CheckCircle2, XCircle, Eye, Search, AlertCircle, FileText, Info, ShieldCheck, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { apiFetch } from "@/lib/apiClient";

type LetterRequest = {
  id: string;
  name: string;
  nik: string;
  type: string;
  dusun: string;
  rt: string;
  rw: string;
  reason: string;
  date: string;
  status: "Pending" | "Disetujui" | "Ditolak";
  rejectReason?: string;
};

const initialLetters: LetterRequest[] = [
  {
    id: "KSW-203948",
    name: "Sudarmono",
    nik: "3215091204850001",
    type: "Surat Keterangan Usaha (SKU)",
    dusun: "Puloharapan",
    rt: "03",
    rw: "02",
    reason: "Persyaratan untuk mengajukan kredit usaha rakyat (KUR) guna menambah modal usaha konveksi dompet.",
    date: "15 Juli 2026",
    status: "Pending",
  },
  {
    id: "KSW-893021",
    name: "Siti Aminah",
    nik: "3215095409920003",
    type: "Surat Keterangan Tidak Mampu (SKTM)",
    dusun: "Campea",
    rt: "01",
    rw: "01",
    reason: "Mengajukan keringanan biaya kuliah semester ganjil anak di Universitas Singaperbangsa Karawang.",
    date: "15 Juli 2026",
    status: "Pending",
  },
  {
    id: "KSW-129482",
    name: "Ahmad Fauzi",
    nik: "3215091807900002",
    type: "Surat Pengantar SKCK",
    dusun: "Karajan",
    rt: "04",
    rw: "03",
    reason: "Melamar pekerjaan sebagai operator produksi di kawasan industri KIIC Karawang.",
    date: "14 Juli 2026",
    status: "Disetujui",
  },
];

export default function TabAdministrasiSurat() {
  const [letters, setLetters] = useState<LetterRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<LetterRequest | null>(null);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Pending" | "Disetujui" | "Ditolak">("Semua");

  // Reject Form state
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReasonText, setRejectReasonText] = useState("");

  const fetchLetters = async () => {
    try {
      const data = await apiFetch("/letters");
      const mapped = data.map((item: any) => {
        let type = "Surat Keterangan Umum";
        let name = "Warga Desa";
        let reason = item.alasan;

        const match = item.alasan.match(/^\[(.*?)\] Nama: (.*?)\. Alasan: (.*)$/);
        if (match) {
          type = match[1] === "SKU" ? "Surat Keterangan Usaha (SKU)" :
                 match[1] === "SKTM" ? "Surat Keterangan Tidak Mampu (SKTM)" :
                 match[1] === "DOMISILI" ? "Surat Keterangan Domisili Penduduk" :
                 match[1] === "SKCK" ? "Surat Pengantar SKCK" : "Layanan Surat";
          name = match[2];
          reason = match[3];
        }

        return {
          id: String(item.id),
          name,
          nik: item.nik,
          type,
          dusun: item.dusun,
          rt: item.rt,
          rw: item.rw,
          reason,
          date: new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          status: item.status === "approved" ? "Disetujui" : item.status === "rejected" ? "Ditolak" : "Pending",
          rejectReason: item.reject_reason || undefined,
        };
      });
      setLetters(mapped);
    } catch (e) {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  const handleApproveLetter = async (id: string) => {
    if (confirm("Setujui berkas permohonan surat ini?")) {
      try {
        await apiFetch(`/letters/${id}/status`, {
          method: "PUT",
          body: JSON.stringify({ status: "approved" }),
        });
        fetchLetters();
        setSelectedItem(null);
      } catch (err: any) {
        alert(err.message || "Gagal menyetujui permohonan.");
      }
    }
  };

  const handleRejectLetter = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (!rejectReasonText) {
      alert("Silakan masukkan alasan penolakan berkas.");
      return;
    }
    try {
      await apiFetch(`/letters/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: "rejected", rejectReason: rejectReasonText }),
      });
      fetchLetters();
      setRejectReasonText("");
      setShowRejectForm(false);
      setSelectedItem(null);
    } catch (err: any) {
      alert(err.message || "Gagal menolak permohonan.");
    }
  };

  const getRequirements = (type: string) => {
    if (type.includes("Usaha")) {
      return ["KTP asli", "Kartu Keluarga (KK)", "Foto tempat/produk usaha", "Pengantar RT/RW"];
    }
    if (type.includes("Tidak Mampu")) {
      return ["KTP asli", "Kartu Keluarga (KK)", "Surat Pengantar RT/RW", "Foto rumah tampak depan"];
    }
    if (type.includes("Domisili")) {
      return ["KTP asli", "Kartu Keluarga (KK)", "Surat Pengantar RT/RW"];
    }
    if (type.includes("SKCK")) {
      return ["KTP asli", "Kartu Keluarga (KK)", "Surat Pengantar RT/RW"];
    }
    return ["KTP asli", "Kartu Keluarga (KK)"];
  };

  // Aggregates
  const totalRequests = letters.length;
  const totalPending = letters.filter(l => l.status === "Pending").length;
  const totalApproved = letters.filter(l => l.status === "Disetujui").length;
  const totalRejected = letters.filter(l => l.status === "Ditolak").length;

  // Filtered List
  const filteredLetters = letters.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "Semua" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* 1. SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-50 text-slate-500 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Pengajuan</span>
            <span className="text-xl font-black text-slate-800">{totalRequests} Resi</span>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center shrink-0 border border-yellow-100">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Menunggu Verifikasi</span>
            <span className="text-xl font-black text-yellow-600">{totalPending} Pending</span>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Disetujui / Selesai</span>
            <span className="text-xl font-black text-emerald-600">{totalApproved} Berkas</span>
          </div>
        </Card>

        <Card className="p-4 bg-white border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ditolak / Gagal</span>
            <span className="text-xl font-black text-red-600">{totalRejected} Berkas</span>
          </div>
        </Card>

      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Verifikasi Pengajuan Berkas Mandiri</h3>
            <p className="text-xs text-slate-500 mt-1">Gunakan kotak pencarian atau filter status untuk menyeleksi antrean berkas warga.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
            
            {/* Input Search */}
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Cari nama atau nomor resi..."
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
              <option value="Pending">Pending</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Ditolak">Ditolak</option>
            </select>

          </div>
        </div>
      </Card>

      {/* 3. REQUEST LIST TABLE */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[700px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-3 pl-2">Tiket Resi</th>
              <th className="py-3">Nama Pemohon</th>
              <th className="py-3">Layanan Surat</th>
              <th className="py-3">Dusun & RT/RW</th>
              <th className="py-3">Tanggal Pengisian</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-650">
            {filteredLetters.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 pl-2 font-mono font-bold text-slate-500">{item.id}</td>
                <td className="py-3.5 font-bold text-slate-800">{item.name}</td>
                <td className="py-3.5 font-semibold text-slate-700">{item.type}</td>
                <td className="py-3.5 text-slate-550">
                  Dusun {item.dusun} (RT {item.rt} / RW {item.rw})
                </td>
                <td className="py-3.5 text-slate-450">{item.date}</td>
                <td className="py-3.5">
                  <span
                    className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-lg border ${
                      item.status === "Disetujui"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : item.status === "Ditolak"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 text-center whitespace-nowrap">
                  <button
                    onClick={() => { setSelectedItem(item); setShowRejectForm(false); }}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Verifikasi Berkas</span>
                  </button>
                </td>
              </tr>
            ))}
            {filteredLetters.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400 italic">Tidak ada data pengajuan surat ditemukan.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* 4. MODAL DETAIL VERIFIKASI */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl p-6 md:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Verifikasi Resi Pengajuan</span>
                <h3 className="text-lg font-black text-slate-800">{selectedItem.id}</h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200/50 p-2 rounded-xl text-slate-400 hover:text-slate-650 cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Grid Detail Data */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-650">
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Nama Lengkap Pemohon</span>
                <span className="text-sm font-bold text-slate-900 block">{selectedItem.name}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NIK Penduduk</span>
                <span className="text-sm font-mono font-bold text-slate-900 block">{selectedItem.nik}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Jenis Layanan Surat</span>
                <span className="text-xs font-bold text-emerald-600 block">{selectedItem.type}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dusun & Alamat Tinggal</span>
                <span className="text-xs font-bold text-slate-800 block">Dusun {selectedItem.dusun} (RT {selectedItem.rt} / RW {selectedItem.rw})</span>
              </div>

              <div className="md:col-span-2 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Alasan / Keperluan Surat</span>
                <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed text-slate-600 font-medium">
                  {selectedItem.reason}
                </p>
              </div>

              {/* Dokumen wajib checklist untuk dicocokkan */}
              <div className="md:col-span-2 bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Syarat Fisik Yang Harus Dicocokkan (Saat Pengambilan):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {getRequirements(selectedItem.type).map((req, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 text-xs">
                      <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 w-3.5 h-3.5" defaultChecked />
                      <span>{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tampilan riwayat penolakan */}
              {selectedItem.status === "Ditolak" && selectedItem.rejectReason && (
                <div className="md:col-span-2 p-3 bg-red-50 border border-red-100 rounded-xl space-y-1 text-red-800 font-medium">
                  <span className="text-[9px] font-bold uppercase block tracking-wider text-red-600">Alasan Penolakan Berkas:</span>
                  <p className="text-xs">{selectedItem.rejectReason}</p>
                </div>
              )}

            </div>

            {/* Actions panel */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-end gap-3">
              
              {selectedItem.status === "Pending" && !showRejectForm && (
                <>
                  <button
                    onClick={() => setShowRejectForm(true)}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-150 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer text-center"
                  >
                    Tolak Pengajuan
                  </button>
                  <button
                    onClick={() => handleApproveLetter(selectedItem.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Setujui Berkas</span>
                  </button>
                </>
              )}

              {showRejectForm && (
                <form onSubmit={(e) => handleRejectLetter(e, selectedItem.id)} className="w-full space-y-3">
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">Alasan Penolakan Berkas</span>
                  <textarea
                    required
                    rows={2}
                    value={rejectReasonText}
                    onChange={(e) => setRejectReasonText(e.target.value)}
                    placeholder="Masukkan alasan penolakan secara jelas agar dipahami warga..."
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectForm(false)}
                      className="bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors"
                    >
                      Kirim Tolak
                    </button>
                  </div>
                </form>
              )}

              {!showRejectForm && selectedItem.status !== "Pending" && (
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Tutup Verifikasi
                </button>
              )}

            </div>

          </Card>
        </div>
      )}

    </div>
  );
}
