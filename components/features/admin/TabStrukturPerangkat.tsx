"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function TabStrukturPerangkat() {
  const [apparatus, setApparatus] = useState([
    { id: 1, name: "Aparatur Kepala Desa", role: "Kepala Desa Kampungsawah" },
    { id: 2, name: "Arif Munawir", role: "Sekretaris Desa" },
    { id: 3, name: "Yuda Wuguna", role: "Kasi Pemerintahan" },
    { id: 4, name: "Aad Jihaddudin", role: "Kasi Kesejahteraan (Kesra)" },
    { id: 5, name: "Asep Johan", role: "Kasi Pelayanan" },
  ]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  const handleAddApparatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newRole) return;
    const newItem = {
      id: Date.now(),
      name: newName,
      role: newRole
    };
    setApparatus([...apparatus, newItem]);
    setNewName("");
    setNewRole("");
  };

  const handleDeleteApparatus = (id: number) => {
    setApparatus(apparatus.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Struktur & Aparatur Pelayanan</h3>
          <p className="text-xs text-slate-500 mt-1">Ubah atau tambahkan nama perangkat desa beserta perannya dalam struktur bagan publik.</p>
        </div>

        <form onSubmit={handleAddApparatus} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <Input
              label="Nama Lengkap"
              required
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Contoh: Asep Sudia"
            />
          </div>
          <div>
            <Input
              label="Jabatan / Peran"
              required
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Contoh: Kaur Keuangan"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[46px] rounded-xl flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span>Tambah Staff</span>
          </button>
        </form>
      </Card>

      {/* Team list */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[400px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
              <th className="py-2.5">Nama Staff</th>
              <th className="py-2.5">Jabatan / Role</th>
              <th className="py-2.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {apparatus.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 font-bold text-slate-800">{item.name}</td>
                <td className="py-3.5 text-slate-500 font-semibold">{item.role}</td>
                <td className="py-3.5 text-right">
                  <button
                    onClick={() => handleDeleteApparatus(item.id)}
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
    </div>
  );
}
