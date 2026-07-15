"use client";

import { useState } from "react";
import { CheckCircle2, TrendingUp, TrendingDown, Scale, DollarSign, Plus, Trash2, Edit, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

type BudgetRow = {
  id: string;
  code: string;
  name: string;
  budget: number;
  realization: number;
};

const initialPendapatan: BudgetRow[] = [
  { id: "p1", code: "1.1", name: "Dana Desa (DD) - APBN", budget: 1100000000, realization: 935000000 },
  { id: "p2", code: "1.2", name: "Alokasi Dana Desa (ADD) - APBD", budget: 750000000, realization: 600000000 },
  { id: "p3", code: "1.3", name: "Pendapatan Asli Desa (PADesa)", budget: 180000000, realization: 115000000 },
  { id: "p4", code: "1.4", name: "Bagi Hasil Pajak & Retribusi (BHPR)", budget: 120000000, realization: 70000000 },
];

const initialBelanja: BudgetRow[] = [
  { id: "b1", code: "2.1", name: "Bidang Pembangunan Fisik & Infrastruktur", budget: 950000000, realization: 780000000 },
  { id: "b2", code: "2.2", name: "Bidang Penyelenggaraan Pemerintahan Desa", budget: 720000000, realization: 540000000 },
  { id: "b3", code: "2.3", name: "Bidang Pembinaan Kemasyarakatan", budget: 210000000, realization: 150000000 },
  { id: "b4", code: "2.4", name: "Bidang Pemberdayaan Masyarakat", budget: 180000000, realization: 120000000 },
  { id: "b5", code: "2.5", name: "Bidang Penanggulangan Bencana & Darurat", budget: 60000000, realization: 40000000 },
];

export default function TabAPBDes() {
  const [pendapatanList, setPendapatanList] = useState<BudgetRow[]>(initialPendapatan);
  const [belanjaList, setBelanjaList] = useState<BudgetRow[]>(initialBelanja);
  const [activeTab, setActiveTab] = useState<"pendapatan" | "belanja">("pendapatan");
  const [isSaved, setIsSaved] = useState(false);

  // States form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [realization, setRealization] = useState("");

  // Helpers Formatting
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getPercentage = (real: number, budg: number) => {
    if (budg === 0) return "0.0";
    return ((real / budg) * 100).toFixed(1);
  };

  // Aggregates Keuangan Dinamis
  const totalPendapatanBudget = pendapatanList.reduce((acc, cur) => acc + cur.budget, 0);
  const totalPendapatanReal = pendapatanList.reduce((acc, cur) => acc + cur.realization, 0);

  const totalBelanjaBudget = belanjaList.reduce((acc, cur) => acc + cur.budget, 0);
  const totalBelanjaReal = belanjaList.reduce((acc, cur) => acc + cur.realization, 0);

  const surplusBudget = totalPendapatanBudget - totalBelanjaBudget;
  const surplusReal = totalPendapatanReal - totalBelanjaReal;

  const currentList = activeTab === "pendapatan" ? pendapatanList : belanjaList;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name || !budget || !realization) return;

    const numericBudget = Math.max(0, parseFloat(budget.replace(/\./g, "")) || 0);
    const numericReal = Math.max(0, parseFloat(realization.replace(/\./g, "")) || 0);

    const targetList = activeTab === "pendapatan" ? pendapatanList : belanjaList;
    const setTargetList = activeTab === "pendapatan" ? setPendapatanList : setBelanjaList;

    if (editingId !== null) {
      // Edit Mode
      setTargetList(targetList.map((item) =>
        item.id === editingId
          ? { ...item, code, name, budget: numericBudget, realization: numericReal }
          : item
      ));
      setEditingId(null);
    } else {
      // Add Mode
      const newItem: BudgetRow = {
        id: "budget_" + Date.now(),
        code,
        name,
        budget: numericBudget,
        realization: numericReal
      };
      setTargetList([...targetList, newItem]);
    }

    // Reset Form
    setCode("");
    setName("");
    setBudget("");
    setRealization("");
  };

  const handleStartEdit = (item: BudgetRow) => {
    setEditingId(item.id);
    setCode(item.code);
    setName(item.name);
    setBudget(item.budget.toString());
    setRealization(item.realization.toString());
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setCode("");
    setName("");
    setBudget("");
    setRealization("");
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pos anggaran keuangan ini?")) {
      const targetList = activeTab === "pendapatan" ? pendapatanList : belanjaList;
      const setTargetList = activeTab === "pendapatan" ? setPendapatanList : setBelanjaList;

      setTargetList(targetList.filter((item) => item.id !== id));
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
      
      {/* 1. FINANCIAL AGGREGATES CARDS (Kombinasi Dinamis) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Card Pendapatan */}
        <Card className="p-5 bg-white border border-slate-100 shadow-sm relative overflow-hidden space-y-3">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-5 h-5 opacity-40" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pendapatan Desa</span>
            <span className="block text-xl font-black text-emerald-600 tracking-tight">{formatRupiah(totalPendapatanReal)}</span>
            <span className="text-[10px] text-slate-400 block">Target: {formatRupiah(totalPendapatanBudget)}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1">
            <div
              className="bg-emerald-600 h-1 rounded-full"
              style={{ width: `${Math.min(100, (totalPendapatanReal / (totalPendapatanBudget || 1)) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-500 block">Realisasi: {getPercentage(totalPendapatanReal, totalPendapatanBudget)}%</span>
        </Card>

        {/* Card Belanja */}
        <Card className="p-5 bg-white border border-slate-100 shadow-sm relative overflow-hidden space-y-3">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full flex items-center justify-center text-red-600">
            <TrendingDown className="w-5 h-5 opacity-40" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Belanja Desa</span>
            <span className="block text-xl font-black text-red-600 tracking-tight">{formatRupiah(totalBelanjaReal)}</span>
            <span className="text-[10px] text-slate-400 block">Anggaran: {formatRupiah(totalBelanjaBudget)}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1">
            <div
              className="bg-red-500 h-1 rounded-full"
              style={{ width: `${Math.min(100, (totalBelanjaReal / (totalBelanjaBudget || 1)) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-slate-500 block">Realisasi: {getPercentage(totalBelanjaReal, totalBelanjaBudget)}%</span>
        </Card>

        {/* Card Selisih */}
        <Card className="p-5 bg-white border border-slate-100 shadow-sm relative overflow-hidden space-y-3">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full flex items-center justify-center text-blue-600">
            <Scale className="w-5 h-5 opacity-40" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Selisih Anggaran (Surplus)</span>
            <span className="block text-xl font-black text-slate-800 tracking-tight">{formatRupiah(surplusReal)}</span>
            <span className="text-[10px] text-slate-400 block">Sisa Anggaran: {formatRupiah(surplusBudget)}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1">
            <div className="bg-emerald-600 h-1 rounded-full" style={{ width: "100%" }} />
          </div>
          <span className="text-[10px] font-bold text-emerald-650 block">Surplus Terjaga</span>
        </Card>

        {/* Card Efektivitas */}
        <Card className="p-5 bg-gradient-to-br from-emerald-600 to-teal-600 border border-emerald-600 shadow-sm relative overflow-hidden text-white space-y-3">
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white/50" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block">Efektivitas Serapan</span>
            <span className="block text-3xl font-black tracking-tight text-white">{getPercentage(totalBelanjaReal, totalBelanjaBudget)}%</span>
            <span className="text-[10px] text-emerald-100/80 block">Kategori Belanja Rutin & Fisik</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1">
            <div
              className="bg-white h-1 rounded-full"
              style={{ width: `${Math.min(100, (totalBelanjaReal / (totalBelanjaBudget || 1)) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] font-extrabold text-white block">Sesuai Target RKPDesa</span>
        </Card>
      </div>

      {/* 2. HEADER TAB APBDES */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ubah Transparansi Pos Keuangan APBDes</h3>
            <p className="text-xs text-slate-500 mt-1">
              Pilih tab rincian pendapatan atau belanja di bawah untuk memperbarui daftar data laporan keuangan BPD.
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
              Simpan Pos Keuangan
            </button>
          </div>
        </div>

        {/* Tab Pemilihan Pendapatan/Belanja */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => { setActiveTab("pendapatan"); handleCancelEdit(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "pendapatan"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Pos Pendapatan Desa</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("belanja"); handleCancelEdit(); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "belanja"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Pos Belanja Desa</span>
          </button>
        </div>
      </Card>

      {/* 3. INPUT FORM SUB-CRUD & LIST TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Tambah/Ubah */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
          <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              {editingId !== null ? "Ubah Pos Anggaran" : `Tambah Pos ${activeTab === "pendapatan" ? "Pendapatan" : "Belanja"}`}
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
              label="Kode Pos Anggaran"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Contoh: 1.1 atau 2.1"
            />
            <Input
              label="Uraian Sumber Daya / Alokasi"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Dana Desa (DD) - APBN"
            />
            <Input
              label={`Nilai Anggaran / Target (${activeTab === "pendapatan" ? "Target" : "Anggaran"})`}
              required
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Masukkan nominal Rupiah..."
            />
            <Input
              label="Nilai Realisasi Saat Ini"
              required
              type="number"
              value={realization}
              onChange={(e) => setRealization(e.target.value)}
              placeholder="Masukkan nominal Realisasi..."
            />

            <div className="flex justify-end gap-2 pt-2">
              {editingId !== null ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                  >
                    Simpan Anggaran
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Pos</span>
                </button>
              )}
            </div>
          </form>
        </Card>

        {/* Tabel Data List Pos Anggaran */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm lg:col-span-2 overflow-x-auto">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Rincian Pos Anggaran ({activeTab === "pendapatan" ? "Pendapatan" : "Belanja"})
          </h4>
          <table className="w-full text-left text-xs min-w-[500px] mt-4">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
                <th className="py-2.5 pb-3 pl-2 w-16">Kode</th>
                <th className="py-2.5 pb-3">Uraian Alokasi</th>
                <th className="py-2.5 pb-3 text-right">Nilai Target/Anggaran</th>
                <th className="py-2.5 pb-3 text-right">Realisasi</th>
                <th className="py-2.5 pb-3 text-center w-24">Pencapaian</th>
                <th className="py-2.5 pb-3 text-right pr-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-650">
              {currentList.map((item) => {
                const percent = getPercentage(item.realization, item.budget);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-mono text-[10px] font-bold text-slate-400">{item.code}</td>
                    <td className="py-3.5 font-bold text-slate-800">{item.name}</td>
                    <td className="py-3.5 text-right text-slate-500 font-mono">{formatRupiah(item.budget)}</td>
                    <td className="py-3.5 text-right text-slate-900 font-bold font-mono">{formatRupiah(item.realization)}</td>
                    <td className="py-3.5 text-center">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                        parseFloat(percent) >= 80
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        {percent}%
                      </span>
                    </td>
                    <td className="py-3.5 text-right pr-2 whitespace-nowrap">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                        title="Ubah"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {currentList.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 italic">Belum ada pos data anggaran.</td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>

      </div>

    </div>
  );
}
