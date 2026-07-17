"use client";

import { useState, useEffect } from "react";

export type ApparatusItem = {
  id: string;
  name: string;
  role: string;
  description: string;
  avatarText: string;
  reportsTo: string; // id of another node or "none"
  type: "kepala" | "staf" | "dusun";
};

export const DEFAULT_APPARATUS: ApparatusItem[] = [
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
    description: "Menyusun pembukuan anggaran, laporan pertanggungjawaban APBDes, serta penyusunan anggaran belanja.",
    avatarText: "AB",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kaur3",
    name: "Aparatur Kaur Perencanaan",
    role: "Kaur Perencanaan",
    description: "Mengoordinasikan perencanaan pembangunan jangka panjang desa, musyawarah dusun, dan penyusunan draf program.",
    avatarText: "KP",
    reportsTo: "sekdes",
    type: "staf"
  },
  {
    id: "kadus1",
    name: "Dede Saepul",
    role: "Kepala Dusun Pasar",
    description: "Kewilayahan Dusun Pasar.",
    avatarText: "DS",
    reportsTo: "kd",
    type: "dusun"
  },
  {
    id: "kadus2",
    name: "Ahmad Dudis",
    role: "Kepala Dusun Puloharapan",
    description: "Kewilayahan Dusun Puloharapan.",
    avatarText: "AD",
    reportsTo: "kd",
    type: "dusun"
  },
  {
    id: "kadus3",
    name: "Yayan bcb Haryanto",
    role: "Kepala Dusun Campea",
    description: "Kewilayahan Dusun Campea.",
    avatarText: "YH",
    reportsTo: "kd",
    type: "dusun"
  },
  {
    id: "kadus4",
    name: "Ujang Zaenudin",
    role: "Kepala Dusun Karajan",
    description: "Kewilayahan Dusun Karajan.",
    avatarText: "UZ",
    reportsTo: "kd",
    type: "dusun"
  }
];

export function getApparatus(): ApparatusItem[] {
  if (typeof window === "undefined") {
    return DEFAULT_APPARATUS;
  }
  const stored = localStorage.getItem("desa_apparatus_list");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_APPARATUS;
    }
  }
  return DEFAULT_APPARATUS;
}

export function saveApparatus(list: ApparatusItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("desa_apparatus_list", JSON.stringify(list));
  window.dispatchEvent(new Event("storage"));
}

export function useApparatusList() {
  const [apparatus, setApparatus] = useState<ApparatusItem[]>(DEFAULT_APPARATUS);

  useEffect(() => {
    setApparatus(getApparatus());

    const handleStorageChange = () => {
      setApparatus(getApparatus());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { apparatus, setApparatus: (updated: ApparatusItem[]) => { setApparatus(updated); saveApparatus(updated); } };
}

export function generateMermaidChart(list: ApparatusItem[]): string {
  let chart = "graph TD\n";
  list.forEach((item) => {
    const safeName = item.name.replace(/"/g, "'").replace(/\[/g, "(").replace(/\]/g, ")");
    const safeRole = item.role.replace(/"/g, "'").replace(/\[/g, "(").replace(/\]/g, ")");
    const nodeText = `"${safeRole}<br/>${safeName}"`;
    
    // Add node definition
    chart += `      ${item.id}[${nodeText}]\n`;
    
    // Add relationship link
    if (item.reportsTo && item.reportsTo !== "none") {
      chart += `      ${item.reportsTo} --> ${item.id}\n`;
    }
  });
  
  // Style rules
  chart += `\n      classDef default fill:#fff,stroke:#e5e7eb,stroke-width:2px;\n`;
  chart += `      classDef kepala fill:#047857,stroke:#059669,color:#fff;\n`;
  chart += `      classDef staf fill:#ecfdf5,stroke:#10b981,color:#065f46;\n`;
  
  const kepalaIds = list.filter(item => item.type === "kepala").map(item => item.id).join(",");
  const stafIds = list.filter(item => item.type === "staf" || item.type === "dusun").map(item => item.id).join(",");
  
  if (kepalaIds) chart += `      class ${kepalaIds} kepala;\n`;
  if (stafIds) chart += `      class ${stafIds} staf;\n`;
  
  return chart;
}
