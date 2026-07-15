"use client";

import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";

export default function TabAdministrasiSurat() {
  const [letters, setLetters] = useState([
    { id: "KSW-203948", name: "Sudarmono", type: "Surat Keterangan Usaha (SKU)", date: "15 Juli 2026", status: "Pending" },
    { id: "KSW-893021", name: "Siti Aminah", type: "Surat Keterangan Tidak Mampu (SKTM)", date: "15 Juli 2026", status: "Pending" },
    { id: "KSW-129482", name: "Ahmad Fauzi", type: "Surat Pengantar SKCK", date: "14 Juli 2026", status: "Disetujui" },
  ]);

  const handleApproveLetter = (id: string) => {
    setLetters(letters.map((l) => (l.id === id ? { ...l, status: "Disetujui" as const } : l)));
  };

  return (
    <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6 overflow-x-auto">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-900">Persetujuan Berkas Mandiri</h3>
        <p className="text-xs text-slate-500 mt-1">Verifikasi kelengkapan syarat fisik yang diajukan oleh pemohon sebelum menyetujui surat.</p>
      </div>

      <table className="w-full text-left text-xs min-w-[600px]">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
            <th className="py-3">Tiket Resi</th>
            <th className="py-3">Nama Pemohon</th>
            <th className="py-3">Format Surat</th>
            <th className="py-3">Tanggal Pengisian</th>
            <th className="py-3">Status Verifikasi</th>
            <th className="py-3 text-center">Tindakan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {letters.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 font-mono font-bold text-slate-600">{item.id}</td>
              <td className="py-4 font-bold text-slate-800">{item.name}</td>
              <td className="py-4 text-slate-600">{item.type}</td>
              <td className="py-4 text-slate-500">{item.date}</td>
              <td className="py-4">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all ${
                    item.status === "Disetujui"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : "bg-yellow-50 text-yellow-700 border-yellow-100"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="py-4 text-center">
                {item.status === "Pending" ? (
                  <button
                    onClick={() => handleApproveLetter(item.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors flex items-center justify-center space-x-1 mx-auto cursor-pointer shadow-sm shadow-emerald-900/10"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Setujui</span>
                  </button>
                ) : (
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Selesai
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
