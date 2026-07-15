"use client";

import { BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";

export default function TabPotensiDesa() {
  return (
    <Card className="p-8 bg-white border border-slate-100 shadow-sm text-center space-y-4">
      <BarChart3 className="w-12 h-12 text-emerald-600 mx-auto" />
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">Potensi Desa</h3>
        <div className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Sektor komparatif utama mencakup <strong>Pertanian Padi Karawang</strong> (2 kali panen setahun) dan <strong>Sentra UMKM Konveksi Dompet</strong> (50+ pengrajin aktif).
        </div>
      </div>
    </Card>
  );
}
