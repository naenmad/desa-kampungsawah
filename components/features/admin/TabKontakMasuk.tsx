"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";

export default function TabKontakMasuk() {
  const [messages, setMessages] = useState([
    { id: 1, name: "H. Sukarna", contact: "0812-9902-xxxx", subject: "Penawaran Agrowisata Sawah", msg: "Kami ingin menawarkan konsep kemitraan agrowisata sawah tadah air di Dusun Campea.", date: "14 Juli 2026" },
    { id: 2, name: "Ibu Nurmala", contact: "nurmala@mail.com", subject: "Syarat Bantuan UMKM", msg: "Apakah pendaftaran bantuan pembinaan desain konveksi dompet masih dibuka?", date: "12 Juli 2026" },
  ]);

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6 overflow-x-auto">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-900">Pesan Kontak Masuk</h3>
        <p className="text-xs text-slate-500 mt-1">Daftar pertanyaan dan kiriman saran masuk dari form publik hubungi kami.</p>
      </div>

      <table className="w-full text-left text-xs min-w-[650px]">
        <thead>
          <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
            <th className="py-3">Pengirim</th>
            <th className="py-3">Kontak Info</th>
            <th className="py-3">Subjek Pesan</th>
            <th className="py-3">Pesan Detail</th>
            <th className="py-3">Tanggal Masuk</th>
            <th className="py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {messages.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-4 font-bold text-slate-800">{item.name}</td>
              <td className="py-4 text-slate-600 font-mono">{item.contact}</td>
              <td className="py-4 text-emerald-700 font-bold">{item.subject}</td>
              <td className="py-4 text-slate-500 max-w-[250px] leading-relaxed truncate" title={item.msg}>
                {item.msg}
              </td>
              <td className="py-4 text-slate-500">{item.date}</td>
              <td className="py-4 text-right">
                <button
                  onClick={() => handleDeleteMessage(item.id)}
                  className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
