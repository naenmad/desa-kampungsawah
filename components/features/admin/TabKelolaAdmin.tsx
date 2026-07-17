"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, X, CheckCircle2, User } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { Select } from "@/components/ui/Input";
import { apiFetch } from "@/lib/apiClient";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function TabKelolaAdmin() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminRole, setAdminRole] = useState("Staf Pelayanan Kasi");
  const [isSaved, setIsSaved] = useState(false);

  const fetchAdmins = async () => {
    try {
      const data = await apiFetch("/admins");
      const mapped = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.email === "admin@kampungsawah.id" ? "Administrator Utama" : "Staf Pelayanan Kasi",
      }));
      setAdmins(mapped);
    } catch (e) {
      // Ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminName || !adminEmail) return;

    try {
      if (editingId !== null) {
        // Edit Mode
        await apiFetch(`/admins/${editingId}`, {
          method: "PUT",
          body: JSON.stringify({
            name: adminName,
            email: adminEmail,
            password: adminPassword || undefined,
          }),
        });
        setEditingId(null);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        // Add Mode (requires a password, default to admin123 if blank)
        await apiFetch("/admins", {
          method: "POST",
          body: JSON.stringify({
            name: adminName,
            email: adminEmail,
            password: adminPassword || "admin123",
          }),
        });
      }

      fetchAdmins();

      // Reset Form
      setAdminName("");
      setAdminEmail("");
      setAdminPassword("");
      setAdminRole("Staf Pelayanan Kasi");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan administrator.");
    }
  };

  const handleStartEdit = (item: AdminUser) => {
    setEditingId(item.id);
    setAdminName(item.name);
    setAdminEmail(item.email);
    setAdminRole(item.role);
    setAdminPassword(""); // leave blank unless changing it
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
    setAdminRole("Staf Pelayanan Kasi");
  };

  const handleDeleteAdmin = async (id: number) => {
    const target = admins.find(a => a.id === id);
    if (target && target.email === "admin@kampungsawah.id") {
      alert("Akun Super Admin utama tidak dapat dihapus demi keamanan sistem.");
      return;
    }

    if (confirm("Apakah Anda yakin ingin menghapus akun administrator ini? Akses kelola akan dicabut secara permanen.")) {
      try {
        await apiFetch(`/admins/${id}`, { method: "DELETE" });
        fetchAdmins();
        if (editingId === id) {
          handleCancelEdit();
        }
      } catch (err: any) {
        alert(err.message || "Gagal menghapus administrator.");
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TAB */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Kelola Akun Administrator</h3>
            <p className="text-xs text-slate-500 mt-1">Daftarkan atau perbarui hak akses pengguna portal layanan digital desa.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {isSaved && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                Data Tersimpan!
              </span>
            )}
          </div>
        </div>
      </Card>

      {/* INPUT FORM: CREATE / UPDATE */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            {editingId !== null ? "Ubah Akun Administrator" : "Daftarkan Akun Administrator Baru"}
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

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <Input
              label="Nama Lengkap Admin"
              required
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              placeholder="Contoh: Asep Sudiana"
            />
          </div>
          
          <div>
            <Input
              label="Alamat Email"
              type="email"
              required
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="asep@mail.com"
            />
          </div>

          <div>
            <Input
              label={editingId !== null ? "Kata Sandi Baru" : "Kata Sandi"}
              type="password"
              required={editingId === null}
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder={editingId !== null ? "Kosongkan jika tetap" : "Min. 6 Karakter"}
            />
          </div>
          
          <div>
            <Select
              label="Role Otoritas Akses"
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value)}
            >
              <option value="Administrator Utama">Administrator Utama</option>
              <option value="Staf Pelayanan Kasi">Staf Pelayanan Kasi</option>
              <option value="Kontributor Berita">Kontributor Berita</option>
            </Select>
          </div>

          <div className="flex gap-2">
            {editingId !== null ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold h-[46px] rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[46px] rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Simpan
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[46px] rounded-xl flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors text-xs"
              >
                <Plus className="w-4 h-4 mr-1 animate-pulse" />
                <span>Tambah Akun</span>
              </button>
            )}
          </div>
        </form>
      </Card>

      {/* ADMIN USERS LIST TABLE */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
          Daftar Pengguna Administrator Terdaftar
        </h4>
        <table className="w-full text-left text-xs min-w-[500px] mt-4">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-2.5 pl-2">Nama Pengguna</th>
              <th className="py-2.5">Alamat Email</th>
              <th className="py-2.5">Role Otoritas</th>
              <th className="py-2.5 text-right pr-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-650">
            {admins.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 pl-2 font-bold text-slate-800 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold text-[10px] mr-2 shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <span>{item.name}</span>
                </td>
                <td className="py-3.5 text-slate-600 font-mono">{item.email}</td>
                <td className="py-3.5">
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                    item.role.includes("Utama")
                      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                      : item.role.includes("Kasi")
                      ? "bg-blue-50 text-blue-700 border-blue-100"
                      : "bg-purple-50 text-purple-700 border-purple-100"
                  }`}>
                    {item.role}
                  </span>
                </td>
                <td className="py-3.5 text-right pr-2 whitespace-nowrap">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                    title="Ubah Akses"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  {item.id !== 1 && (
                    <button
                      onClick={() => handleDeleteAdmin(item.id)}
                      className="text-red-655 hover:text-red-850 p-1 cursor-pointer transition-colors"
                      title="Hapus Akun"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
}
