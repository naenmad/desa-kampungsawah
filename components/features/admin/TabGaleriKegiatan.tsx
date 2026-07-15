"use client";

import { Users } from "lucide-react";
import Card from "@/components/ui/Card";

export default function TabGaleriKegiatan() {
  return (
    <Card className="p-8 bg-white border border-slate-100 shadow-sm text-center space-y-4">
      <Users className="w-12 h-12 text-emerald-600 mx-auto" />
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-900">Galeri Kegiatan Desa</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Dokumentasi aktif mencakup: Rapat Minggon Desa, Panen Padi Karawang, dan Produksi Konveksi Dompet Warga.
        </p>
      </div>
    </Card>
  );
}
