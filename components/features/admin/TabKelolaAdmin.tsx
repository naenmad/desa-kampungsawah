"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { Select } from "@/components/ui/Input";

export default function TabKelolaAdmin() {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Super Admin", email: "admin@kampungsawah.id", role: "Administrator Utama" },
    { id: 2, name: "Asep Johan", email: "asepjohan@gmail.com", role: "Staf Pelayanan Kasi" },
  ]);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminRole, setAdminRole] = useState("Staf Pelayanan Kasi");

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName || !adminEmail) return;
    const newItem = {
      id: Date.now(),
      name: adminName,
      email: adminEmail,
      role: adminRole
    };
    setAdmins([...admins, newItem]);
    setAdminName("");
    setAdminEmail("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Kelola Akun Administrator</h3>
          <p className="text-xs text-slate-500 mt-1">Daftarkan akun administrator baru untuk pembagian hak akses pengelolaan portal desa.</p>
        </div>

        <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="sm:col-span-1">
            <Input
              label="Nama Admin"
              required
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Contoh: Asep Sudia"
            />
          </div>
          <div className="sm:col-span-1">
            <Input
              label="Email Admin"
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="asep@mail.com"
            />
          </div>
          <div className="sm:col-span-1">
            <Select
              label="Role Akses"
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
            >
              <option value="Administrator Utama">Administrator Utama</option>
              <option value="Staf Pelayanan Kasi">Staf Pelayanan Kasi</option>
              <option value="Kontributor Berita">Kontributor Berita</option>
            </Select>
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[46px] rounded-xl flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            <span>Tambah Admin</span>
          </button>
        </form>
      </Card>

      {/* Admins Table */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[450px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase">
              <th className="py-2.5">Nama Pengguna</th>
              <th className="py-2.5">Email</th>
              <th className="py-2.5">Role Otoritas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {admins.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-bold text-slate-800 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold text-[10px] mr-2 shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <span>{item.name}</span>
                </td>
                <td className="py-4 text-slate-600 font-mono">{item.email}</td>
                <td className="py-4 text-emerald-700 font-bold">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
