"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Input, { TextArea } from "@/components/ui/Input";

export default function TabSejarahDesa() {
  const [milestones, setMilestones] = useState([
    { id: 1, period: "1950-an", title: "Asal-usul Nama Kampungsawah", desc: "Wilayah desa semula dikenal sebagai hamparan persawahan rawa air tawar." },
    { id: 2, period: "1978", title: "Peresmian Administratif Desa", desc: "Disahkan berdiri di bawah Kecamatan Jayakerta, Kabupaten Karawang." },
  ]);
  const [editPeriod, setEditPeriod] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPeriod || !editTitle) return;
    const newItem = {
      id: Date.now(),
      period: editPeriod,
      title: editTitle,
      desc: editDesc
    };
    setMilestones([...milestones, newItem]);
    setEditPeriod("");
    setEditTitle("");
    setEditDesc("");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">Linimasa Sejarah Desa</h3>
          <p className="text-xs text-slate-500 mt-1">Tambahkan entri perjalanan tahun penting dalam pendirian Desa Kampungsawah.</p>
        </div>

        <form onSubmit={handleAddMilestone} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Tahun / Periode"
              required
              value={editPeriod}
              onChange={(e) => setEditPeriod(e.target.value)}
              placeholder="Contoh: Tahun 1978"
            />
            <div className="sm:col-span-2">
              <Input
                label="Judul Milestone"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Contoh: Pemekaran Wilayah Administratif"
              />
            </div>
          </div>
          <TextArea
            label="Deskripsi Detil Riwayat"
            required
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="Jelaskan secara singkat mengenai kejadian sejarah tersebut..."
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Tambah Catatan Sejarah
            </button>
          </div>
        </form>
      </Card>

      {/* Milestones list */}
      <div className="space-y-4">
        {milestones.map((m) => (
          <Card key={m.id} className="p-5 bg-white border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-100 text-xs shrink-0">
              {m.period}
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 text-sm">{m.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
