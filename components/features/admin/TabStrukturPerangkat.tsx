"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus, Trash2, Edit, X, Award, Eye, FileText, User, ArrowUp, ArrowDown, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input, { Select, TextArea } from "@/components/ui/Input";

// Import Mermaid dynamically for client-side rendering
const MermaidRender = dynamic(() => import("../../ui/Mermaid.js"), {
  ssr: false,
  loading: () => <p className="text-center text-xs text-slate-400 py-6">Memuat bagan organisasi...</p>
});

type ApparatusItem = {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarText: string;
  reportsTo: string; // id of another node or "none"
  type: "kepala" | "staf" | "dusun";
};

const initialApparatus: ApparatusItem[] = [
  {
    id: "kd",
    name: "Aparatur Kepala Desa",
    role: "Kepala Desa",
    description: "Memimpin jalannya pemerintahan desa, menyusun kebijakan anggaran, dan mengoordinasikan program pembangunan di seluruh dusun.",
    avatarText: "KD",
    reportsTo: "none",
    type: "kepala"
  },
  {
    id: "sekdes",
    name: "Arif Munawir",
    role: "Sekretaris Desa",
    description: "Bertanggung jawab atas administrasi umum, pelayanan data kependudukan, pengarsipan berkas permohonan, dan koordinasi staf.",
    avatarText: "AM",
    reportsTo: "kd",
    type: "kepala"
  },
  {
    id: "kasi1",
    name: "Yuda Wuguna",
    role: "Kasie Pemerintahan",
    description: "Mengurus administrasi pertanahan, ketenteraman dan ketertiban warga, serta penegakan hukum peraturan desa.",
    avatarText: "YW",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kasi2",
    name: "Aad Jihaddudin",
    role: "Kesra",
    description: "Mengoordinasikan program jaminan sosial, penyaluran bantuan pangan (BLT), pelayanan keagamaan, serta kepemudaan.",
    avatarText: "AJ",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kasi3",
    name: "Asep Johan",
    role: "Kasie Pelayanan",
    description: "Mengelola loket pelayanan mandiri surat warga, penerimaan aspirasi pengaduan, dan fasilitasi program Posyandu/Kesehatan.",
    avatarText: "AJ",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kaur1",
    name: "Asep Sudia",
    role: "Kaur Umum",
    description: "Mengelola administrasi persuratan umum, sarana prasarana kantor desa, serta pembantuan operasional harian.",
    avatarText: "AS",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kaur2",
    name: "Ari Bukhori",
    role: "Kaur Keuangan",
    description: "Menyusun pembukuan laporan APBDes, realisasi pos belanja pembangunan, serta laporan pertanggungjawaban anggaran.",
    avatarText: "AB",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kaur3",
    name: "",
    role: "Kaur Perencanaan",
    description: "Menyusun draf rencana kerja pembangunan jangka menengah desa (RPJMDes) dan Rencana Kerja Pemerintah Desa (RKPDes).",
    avatarText: "KP",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kadus1",
    name: "Dede Saepul",
    role: "Kepala Dusun Pasar",
    description: "Perwakilan pelayanan kependudukan wilayah Dusun Pasar.",
    avatarText: "DS",
    reportsTo: "kd",
    type: "dusun"
  },
  {
    id: "kadus2",
    name: "Ahmad Dudis",
    role: "Kepala Dusun Puloharapan",
    description: "Perwakilan pelayanan kependudukan wilayah Dusun Puloharapan.",
    avatarText: "AD",
    reportsTo: "kd",
    type: "dusun"
  },
  {
    id: "kadus3",
    name: "Yayan bcb Haryanto",
    role: "Kepala Dusun Campea",
    description: "Perwakilan pelayanan kependudukan wilayah Dusun Campea.",
    avatarText: "YH",
    reportsTo: "kd",
    type: "dusun"
  },
  {
    id: "kadus4",
    name: "Ujang Zaenudin",
    role: "Kepala Dusun Karajan",
    description: "Perwakilan pelayanan kependudukan wilayah Dusun Karajan.",
    avatarText: "UZ",
    reportsTo: "kd",
    type: "dusun"
  },
];

export default function TabStrukturPerangkat() {
  const [items, setItems] = useState<ApparatusItem[]>(initialApparatus);
  const [previewMode, setPreviewMode] = useState<"mermaid" | "cards">("mermaid");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [avatarText, setAvatarText] = useState("");
  const [reportsTo, setReportsTo] = useState("none");
  const [type, setType] = useState<"kepala" | "staf" | "dusun">("staf");
  const [isSaved, setIsSaved] = useState(false);

  // Helper mencari keturunan (descendants) untuk mencegah relasi sirkular
  const getDescendantIds = (nodeId: string, allNodes: ApparatusItem[]): string[] => {
    const descendants: string[] = [];
    const queue = [nodeId];
    
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const children = allNodes.filter((n) => n.reportsTo === currentId);
      children.forEach((c) => {
        if (!descendants.includes(c.id)) {
          descendants.push(c.id);
          queue.push(c.id);
        }
      });
    }
    return descendants;
  };

  const descendantsOfEditing = editingId ? getDescendantIds(editingId, items) : [];

  // Helper auto-generate inisial
  const getInitials = (fullName: string, defaultRole: string) => {
    if (!fullName) {
      return defaultRole
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
    }
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Compile data ke string Mermaid
  const generateMermaidString = (nodes: ApparatusItem[]) => {
    let lines = ["graph TD"];
    
    // 1. Definisikan nodes
    nodes.forEach((item) => {
      const label = item.name ? `${item.role}<br/>${item.name}` : item.role;
      lines.push(`      ${item.id}["${label}"]`);
    });
    
    // 2. Definisikan hubungan relasi (hanya jika parent ada di daftar)
    nodes.forEach((item) => {
      const parentExists = nodes.some((n) => n.id === item.reportsTo);
      if (item.reportsTo && item.reportsTo !== "none" && parentExists) {
        lines.push(`      ${item.reportsTo} --> ${item.id}`);
      }
    });
    
    // 3. Style defs
    lines.push(`      classDef default fill:#fff,stroke:#e5e7eb,stroke-width:2px;`);
    lines.push(`      classDef kepala fill:#047857,stroke:#059669,color:#fff;`);
    lines.push(`      classDef staf fill:#ecfdf5,stroke:#10b981,color:#065f46;`);
    lines.push(`      classDef dusun fill:#f0fdfa,stroke:#14b8a6,color:#0f766e;`);
    
    // 4. Terapkan kelas style
    const kepalaIds = nodes.filter(i => i.type === "kepala").map(i => i.id).join(",");
    const stafIds = nodes.filter(i => i.type === "staf").map(i => i.id).join(",");
    const dusunIds = nodes.filter(i => i.type === "dusun").map(i => i.id).join(",");
    
    if (kepalaIds) lines.push(`      class ${kepalaIds} kepala;`);
    if (stafIds) lines.push(`      class ${stafIds} staf;`);
    if (dusunIds) lines.push(`      class ${dusunIds} dusun;`);
    
    return lines.join("\n");
  };

  const currentMermaidString = generateMermaidString(items);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    const finalAvatar = avatarText.trim() || getInitials(name, role);

    if (editingId !== null) {
      // Edit mode
      setItems(items.map((item) =>
        item.id === editingId
          ? { ...item, name, role, description, avatarText: finalAvatar, reportsTo, type }
          : item
      ));
      setEditingId(null);
    } else {
      // Add mode
      const newId = "node_" + Date.now();
      const newItem: ApparatusItem = {
        id: newId,
        name,
        role,
        description,
        avatarText: finalAvatar,
        reportsTo,
        type
      };
      setItems([...items, newItem]);
    }

    // Reset Form
    setName("");
    setRole("");
    setDescription("");
    setAvatarText("");
    setReportsTo("none");
    setType("staf");
  };

  const handleStartEdit = (item: ApparatusItem) => {
    setEditingId(item.id);
    setName(item.name);
    setRole(item.role);
    setDescription(item.description);
    setAvatarText(item.avatarText);
    setReportsTo(item.reportsTo);
    setType(item.type);

    // UX: Scroll ke form pengisian agar terlihat jelas oleh admin
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setDescription("");
    setAvatarText("");
    setReportsTo("none");
    setType("staf");
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus perangkat ini? Hubungan relasi anak buah di bawahnya akan dialihkan ke atasan di atasnya.")) {
      const targetNode = items.find((i) => i.id === id);
      const newParent = targetNode ? targetNode.reportsTo : "none";

      // Hapus item & alihkan relasi reportsTo anak-anaknya agar bagan tidak patah (orphaned)
      setItems(
        items
          .filter((item) => item.id !== id)
          .map((item) => (item.reportsTo === id ? { ...item, reportsTo: newParent } : item))
      );

      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  // Mengubah urutan rendering profil naik/turun
  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. SELEKTOR PRATINJAU DUAL DAN HEADER */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Kelola Bagan & Profil Perangkat Desa</h3>
            <p className="text-xs text-slate-500 mt-1">
              Tambahkan, edit, atau hapus aparatur desa. Perubahan otomatis memperbarui diagram bagan dan daftar kartu profil publik.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {isSaved && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                Data Tersimpan!
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Simpan Bagan & Profil Perangkat
            </button>
          </div>
        </div>

        {/* Pemilihan Mode Preview */}
        <div className="flex gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => setPreviewMode("mermaid")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              previewMode === "mermaid"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Bagan Struktur (Mermaid)</span>
          </button>
          <button
            onClick={() => setPreviewMode("cards")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              previewMode === "cards"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 text-slate-650 hover:bg-slate-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lihat Kartu Profil Publik</span>
          </button>
        </div>
      </Card>

      {/* 2. DYNAMIC LIVE PREVIEW CARD */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4">
        {previewMode === "mermaid" ? (
          <div className="text-center space-y-4">
            <h4 className="text-sm font-bold text-slate-800 flex items-center justify-center gap-1">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Hierarki Hubungan Kerja (Mermaid)</span>
            </h4>
            <div className="overflow-x-auto py-4 bg-slate-50/50 rounded-2xl border border-slate-105">
              <div className="min-w-[600px] max-w-3xl mx-auto p-4">
                <MermaidRender chart={currentMermaidString} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Profil Inti */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 flex items-center gap-1">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Pratinjau Profil Perangkat Inti & Staf</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items
                  .filter((i) => i.type !== "dusun")
                  .map((p, idx) => (
                    <div key={idx} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm border border-emerald-100 shrink-0">
                          {p.avatarText}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800 text-xs leading-tight">
                            {p.name || <span className="text-slate-400 italic font-normal">Nama belum diisi</span>}
                          </h5>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{p.role}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-505 leading-relaxed min-h-[32px]">
                        {p.description || <span className="text-slate-400 italic">Deskripsi tugas/peran belum diisi.</span>}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Profil Kadus */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1 flex items-center gap-1">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Pratinjau Profil Kepala Wilayah (Dusun)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items
                  .filter((i) => i.type === "dusun")
                  .map((d, idx) => (
                    <div key={idx} className="p-4 text-center space-y-2 bg-slate-50/50 border border-slate-100 rounded-2xl shadow-sm">
                      <div className="w-10 h-10 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mx-auto text-sm shrink-0">
                        {d.avatarText}
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 text-xs leading-tight">
                          {d.name || <span className="text-slate-400 italic font-normal">Nama belum diisi</span>}
                        </h5>
                        <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest block mt-0.5">{d.role}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed min-h-[30px]">
                        {d.description || <span className="text-slate-400 italic">Deskripsi tugas belum diisi.</span>}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* 3. INPUT FORM FOR ADD & EDIT */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {editingId !== null ? "Ubah Data Node & Profil" : "Kelola Bagan & Profil (Tanpa Koding)"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {editingId !== null
                ? "Sesuaikan form di bawah untuk mengubah bagan Mermaid dan kartu profil publik sekaligus."
                : "Masukkan data aparat desa, lalu tentukan laporan hierarki untuk menggambar garis bagan otomatis."}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Input
              label="Jabatan / Peran"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Contoh: Kaur Perencanaan"
            />
            <Input
              label="Nama Staff / Pejabat"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Asep Johan"
            />
            <Input
              label="Inisial Avatar (Opsional)"
              value={avatarText}
              onChange={(e) => setAvatarText(e.target.value)}
              placeholder="Contoh: AJ (kosongkan untuk auto-generate)"
            />
            <Select
              label="Tipe Node & Pewarnaan"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="staf">Staf / Kasi / Kaur (Hijau Muda)</option>
              <option value="kepala">Pimpinan / Kades / Sekdes (Hijau Tua)</option>
              <option value="dusun">Kewilayahan / Kadus (Biru Toska)</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Select
                label="Atasan / Melapor Ke"
                value={reportsTo}
                onChange={(e) => setReportsTo(e.target.value)}
              >
                <option value="none">Tidak ada (Top level)</option>
                {items
                  .filter((i) => i.id !== editingId && !descendantsOfEditing.includes(i.id))
                  .map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.role} {i.name ? `(${i.name})` : ""}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="md:col-span-2">
              <TextArea
                label="Deskripsi Tugas & Tanggung Jawab"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tuliskan pembagian tugas pokok dan fungsi perangkat desa secara singkat..."
              />
            </div>
          </div>

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
                <span>Tambah Ke Bagan & Daftar</span>
              </button>
            )}
          </div>
        </form>
      </Card>

      {/* 4. CRUD DATA TABLE DENGAN REORDER ARROWS */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[750px]">
          <thead>
            <tr className="text-slate-400 border-b border-slate-100 font-bold uppercase tracking-wider">
              <th className="py-2.5 pb-3 pl-2">Jabatan</th>
              <th className="py-2.5 pb-3">Nama Pejabat</th>
              <th className="py-2.5 pb-3">Avatar</th>
              <th className="py-2.5 pb-3 max-w-[200px]">Deskripsi Pokok & Fungsi (Tugas)</th>
              <th className="py-2.5 pb-3">Atasan Langsung</th>
              <th className="py-2.5 pb-3">Tipe</th>
              <th className="py-2.5 pb-3 text-center">Urutan</th>
              <th className="py-2.5 pb-3 text-right pr-2">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {items.map((item, index) => {
              const parentNode = items.find((i) => i.id === item.reportsTo);
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pl-2 font-bold text-slate-800">{item.role}</td>
                  <td className="py-3.5 text-slate-650">{item.name || <span className="text-slate-400 italic font-normal">Belum diisi</span>}</td>
                  <td className="py-3.5 font-bold text-emerald-600">
                    <span className="bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {item.avatarText}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500 max-w-[200px] truncate" title={item.description}>
                    {item.description || <span className="text-slate-400 italic">Belum diisi</span>}
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono text-[11px]">
                    {parentNode ? `${parentNode.role} (${parentNode.name || "Staf"})` : "Top Level"}
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border capitalize ${
                      item.type === "kepala"
                        ? "bg-emerald-500 text-white border-emerald-600"
                        : item.type === "staf"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-teal-50 text-teal-700 border-teal-100"
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 text-center">
                    <div className="flex justify-center items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveItem(index, "up")}
                        disabled={index === 0}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                          index === 0 ? "opacity-20 cursor-not-allowed" : "text-slate-500 cursor-pointer"
                        }`}
                        title="Naikkan"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveItem(index, "down")}
                        disabled={index === items.length - 1}
                        className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                          index === items.length - 1 ? "opacity-20 cursor-not-allowed" : "text-slate-500 cursor-pointer"
                        }`}
                        title="Turunkan"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 text-right pr-2 whitespace-nowrap">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="text-emerald-600 hover:text-emerald-800 p-1 cursor-pointer transition-colors mr-1"
                      title="Ubah"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 hover:text-red-800 p-1 cursor-pointer transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

    </div>
  );
}
