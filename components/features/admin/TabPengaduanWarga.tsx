"use client";

import { useState } from "react";
import { Check, CheckCircle2, Play } from "lucide-react";
import Card from "@/components/ui/Card";

export default function TabPengaduanWarga() {
  const [complaints, setComplaints] = useState([
    { id: "ADU-102938", title: "Sampah liar menumpuk di jalur utama", reporter: "Anonim (Dusun Karajan)", date: "14 Juli 2026", status: "diterima" },
    { id: "ADU-492019", title: "Pintu air irigasi tersumbat eceng gondok", reporter: "Supardi (Dusun Campea)", date: "12 Juli 2026", status: "proses" },
  ]);

  const handleProcessComplaint = (id: string) => {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status: "proses" as const } : c)));
  };

  const handleCompleteComplaint = (id: string) => {
    setComplaints(complaints.map((c) => (c.id === id ? { ...c, status: "selesai" as const } : c)));
  };

  return (
    <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6 overflow-x-auto">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-900">Keluhan & Laporan Warga</h3>
        <p className="text-xs text-slate-500 mt-1">Ubah status pelacakan pengaduan warga setelah berkoordinasi dengan Kasi Pelayanan.</p>
      </div>

      <table className="w-full text-left text-xs min-w-[700px]">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
            <th className="py-3">Tiket Laporan</th>
            <th className="py-3">Pelapor / Pengirim</th>
            <th className="py-3">Subjek Laporan</th>
            <th className="py-3">Tanggal Lapor</th>
            <th className="py-3">Status Proses</th>
            <th className="py-3 text-center">Tindakan Alur</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {complaints.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 font-mono font-bold text-slate-600">{item.id}</td>
              <td className="py-4 font-bold text-slate-800">{item.reporter}</td>
              <td className="py-4 text-slate-600 max-w-[200px] truncate">{item.title}</td>
              <td className="py-4 text-slate-500">{item.date}</td>
              <td className="py-4">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize border transition-all ${
                    item.status === "selesai"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : item.status === "proses"
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-yellow-50 text-yellow-700 border-yellow-100"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-4 text-center">
                {item.status === "diterima" && (
                  <button
                    onClick={() => handleProcessComplaint(item.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors flex items-center justify-center space-x-1 mx-auto cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>Proses</span>
                  </button>
                )}
                {item.status === "proses" && (
                  <button
                    onClick={() => handleCompleteComplaint(item.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors flex items-center justify-center space-x-1 mx-auto cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Selesaikan</span>
                  </button>
                )}
                {item.status === "selesai" && (
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Ditutup
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
