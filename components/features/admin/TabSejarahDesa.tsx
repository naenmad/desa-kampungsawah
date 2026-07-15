"use client";

import { useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { TextArea } from "@/components/ui/Input";

export default function TabSejarahDesa() {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      year: "1950-an",
      title: "Asal-usul Nama Kampungsawah",
      description: "Wilayah desa semula dikenal sebagai hamparan persawahan rawa air tawar yang sangat luas. Penduduk sekitar menjulukinya 'Kampung Sawah' karena hampir seluruh kawasan dihuni oleh para petani penggarap sawah tadah hujan."
    },
    {
      id: 2,
      year: "1978",
      title: "Peresmian Administratif Desa",
      description: "Pemekaran wilayah secara administratif dari kecamatan induk. Desa Kampungsawah disahkan berdiri sebagai desa mandiri di bawah Kecamatan Jayakerta, Kabupaten Karawang, Jawa Barat dengan pembagian dusun awal."
    },
    {
      id: 3,
      year: "1990-an",
      title: "Perkembangan Sektor UMKM Kerajinan",
      description: "Beberapa pengrajin mulai memprakarsai pembuatan kerajinan konveksi dompet rumahan. Sektor ini secara cepat menarik minat angkatan kerja lokal, menjadi alternatif mata pencaharian pokok di luar pertanian padi sawah."
    },
    {
      id: 4,
      year: "Era Modern",
      title: "Digitalisasi & Pembangunan Berkelanjutan",
      description: "Pemerintah desa meluncurkan program layanan mandiri warga digital dan merevitalisasi TPS3R/TPST persampahan guna merintis program pengelolaan limbah terpadu yang ramah lingkungan."
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!year || !title || !description) return;

    if (editingId !== null) {
      // Edit Mode
      setMilestones(milestones.map((item) =>
        item.id === editingId
          ? { ...item, year, title, description }
          : item
      ));
      setEditingId(null);
    } else {
      // Add Mode
      const newItem = {
        id: Date.now(),
        year,
        title,
        description
      };
      setMilestones([...milestones, newItem]);
    }

    // Reset Form
    setYear("");
    setTitle("");
    setDescription("");
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setYear(item.year);
    setTitle(item.title);
    setDescription(item.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setYear("");
    setTitle("");
    setDescription("");
  };

  const handleDeleteMilestone = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus catatan sejarah ini?")) {
      setMilestones(milestones.filter((m) => m.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* FORM TAMBAH / UBAH MILESTONE */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {editingId !== null ? "Ubah Linimasa Sejarah Desa" : "Kelola Linimasa Sejarah Desa"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {editingId !== null
                ? "Sesuaikan isian form di bawah untuk mengubah rincian riwayat penting."
                : "Tambahkan entri perjalanan tahun penting dalam pendirian Desa Kampungsawah."}
            </p>
          </div>
          {editingId !== null && (
            <button
              onClick={handleCancelEdit}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Batal Ubah</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Tahun / Periode"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Contoh: Tahun 1978 atau Era Modern"
            />
            <div className="sm:col-span-2">
              <Input
                label="Judul Kejadian (Milestone)"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Peresmian Administratif Desa"
              />
            </div>
          </div>
          
          <TextArea
            label="Deskripsi Lengkap Riwayat"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan secara lengkap mengenai rincian kejadian sejarah tersebut..."
          />

          <div className="pt-2 flex justify-end gap-2">
            {editingId !== null ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
                >
                  Simpan Perubahan
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center justify-center cursor-pointer shadow-sm shadow-emerald-700/10 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Tambah Catatan Sejarah</span>
              </button>
            )}
          </div>
        </form>
      </Card>

      {/* TIMELINE LIST DENGAN EDIT & DELETE */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[500px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-2.5 pb-3 pl-2">Periode / Tahun</th>
              <th className="py-2.5 pb-3">Judul Kejadian</th>
              <th className="py-2.5 pb-3">Deskripsi Riwayat</th>
              <th className="py-2.5 pb-3 text-right pr-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {milestones.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-bold text-emerald-700 pl-2 whitespace-nowrap">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                    {item.year}
                  </span>
                </td>
                <td className="py-4 font-bold text-slate-800 max-w-[150px] truncate" title={item.title}>
                  {item.title}
                </td>
                <td className="py-4 text-slate-500 max-w-[250px] truncate" title={item.description}>
                  {item.description}
                </td>
                <td className="py-4 text-right pr-2">
                  <button
                    onClick={() => handleStartEdit(item)}
                    className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                    title="Ubah"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMilestone(item.id)}
                    className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                    title="Hapus"
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
