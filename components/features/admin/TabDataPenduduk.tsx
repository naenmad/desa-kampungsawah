"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function TabDataPenduduk() {
  const [popStats, setPopStats] = useState({
    totalJiwa: 13524,
    totalKK: 4120,
    totalDPT: 9420,
    totalDusun: 4
  });
  const [editJiwa, setEditJiwa] = useState(popStats.totalJiwa.toString());
  const [editKK, setEditKK] = useState(popStats.totalKK.toString());
  const [editDPT, setEditDPT] = useState(popStats.totalDPT.toString());
  const [isPopSaved, setIsPopSaved] = useState(false);

  const handleSavePop = (e: React.FormEvent) => {
    e.preventDefault();
    setPopStats({
      totalJiwa: parseInt(editJiwa) || 0,
      totalKK: parseInt(editKK) || 0,
      totalDPT: parseInt(editDPT) || 0,
      totalDusun: 4
    });
    setIsPopSaved(true);
    setTimeout(() => setIsPopSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Ubah Angka Kependudukan</h3>
            <p className="text-xs text-slate-500 mt-1">Perubahan pada form di bawah akan langsung menyinkronkan data demografi desa Kampungsawah.</p>
          </div>
          {isPopSaved && (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
              <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
              Tersimpan!
            </span>
          )}
        </div>

        <form onSubmit={handleSavePop} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Input
              label="Total Jiwa Terdata"
              type="number"
              required
              value={editJiwa}
              onChange={(e) => setEditJiwa(e.target.value)}
            />
            <Input
              label="Kepala Keluarga (KK)"
              type="number"
              required
              value={editKK}
              onChange={(e) => setEditKK(e.target.value)}
            />
            <Input
              label="Wajib Pilih (DPT)"
              type="number"
              required
              value={editDPT}
              onChange={(e) => setEditDPT(e.target.value)}
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Simpan Perubahan Data
            </button>
          </div>
        </form>
      </Card>

      {/* Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="p-5 text-center space-y-1 bg-white border border-slate-100 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Jiwa Aktif</span>
          <span className="text-2xl font-mono font-black text-slate-800">{popStats.totalJiwa.toLocaleString("id-ID")}</span>
        </Card>
        <Card className="p-5 text-center space-y-1 bg-white border border-slate-100 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">KK Terdaftar</span>
          <span className="text-2xl font-mono font-black text-slate-800">{popStats.totalKK.toLocaleString("id-ID")}</span>
        </Card>
        <Card className="p-5 text-center space-y-1 bg-white border border-slate-100 shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">DPT Pemilu</span>
          <span className="text-2xl font-mono font-black text-slate-800">{popStats.totalDPT.toLocaleString("id-ID")}</span>
        </Card>
      </div>
    </div>
  );
}
