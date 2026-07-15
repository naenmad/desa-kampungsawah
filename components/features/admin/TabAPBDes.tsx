"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function TabAPBDes() {
  const [apbdes, setApbdes] = useState({
    pendapatan: "2.850.000.000",
    belanja: "2.712.000.000",
    realisasi: "95"
  });
  const [editPendapatan, setEditPendapatan] = useState(apbdes.pendapatan);
  const [editBelanja, setEditBelanja] = useState(apbdes.belanja);
  const [isApbSaved, setIsApbSaved] = useState(false);

  const handleSaveApb = (e: React.FormEvent) => {
    e.preventDefault();
    setApbdes({
      pendapatan: editPendapatan,
      belanja: editBelanja,
      realisasi: "95"
    });
    setIsApbSaved(true);
    setTimeout(() => setIsApbSaved(false), 2000);
  };

  return (
    <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-slate-900">APBDes Realisasi Transparansi</h3>
          <p className="text-xs text-slate-500 mt-1">Perbarui nominal pendapatan dan belanja APBDes 2026 yang tayang pada dashboard publik.</p>
        </div>
        {isApbSaved && (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
            Realisasi Ter-update!
          </span>
        )}
      </div>

      <form onSubmit={handleSaveApb} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label="Total Pendapatan (IDR)"
            required
            value={editPendapatan}
            onChange={(e) => setEditPendapatan(e.target.value)}
          />
          <Input
            label="Total Belanja (IDR)"
            required
            value={editBelanja}
            onChange={(e) => setEditBelanja(e.target.value)}
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
          >
            Perbarui Data Keuangan
          </button>
        </div>
      </form>
    </Card>
  );
}
