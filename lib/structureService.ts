"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "./apiClient";

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
  }
];

export async function saveApparatus(list: ApparatusItem[]) {
  const result = await apiFetch("/apparatus", {
    method: "PUT",
    body: JSON.stringify(list),
  });
  window.dispatchEvent(new Event("apparatus-updated"));
  return result;
}

export function useApparatusList() {
  const [apparatus, setApparatus] = useState<ApparatusItem[]>(DEFAULT_APPARATUS);

  useEffect(() => {
    const fetchApparatus = () => {
      apiFetch("/apparatus")
        .then((res) => {
          if (res) setApparatus(res);
        })
        .catch(() => {
          // Fallback
        });
    };

    fetchApparatus();

    window.addEventListener("apparatus-updated", fetchApparatus);
    return () => {
      window.removeEventListener("apparatus-updated", fetchApparatus);
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
    
    chart += `      ${item.id}[${nodeText}]\n`;
    
    if (item.reportsTo && item.reportsTo !== "none") {
      chart += `      ${item.reportsTo} --> ${item.id}\n`;
    }
  });
  
  chart += `\n      classDef default fill:#fff,stroke:#e5e7eb,stroke-width:2px;\n`;
  chart += `      classDef kepala fill:#047857,stroke:#059669,color:#fff;\n`;
  chart += `      classDef staf fill:#ecfdf5,stroke:#10b981,color:#065f46;\n`;
  
  const kepalaIds = list.filter(item => item.type === "kepala").map(item => item.id).join(",");
  const stafIds = list.filter(item => item.type === "staf" || item.type === "dusun").map(item => item.id).join(",");
  
  if (kepalaIds) chart += `      class ${kepalaIds} kepala;\n`;
  if (stafIds) chart += `      class ${stafIds} staf;\n`;
  
  return chart;
}
