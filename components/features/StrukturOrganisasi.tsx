"use client";

import dynamic from "next/dynamic";
import { useApparatusList, generateMermaidChart } from "@/lib/structureService";

// Diubah dari "@/components/ui/Mermaid" menjadi relative path "../ui/Mermaid"
const MermaidRender = dynamic(() => import("../ui/Mermaid.js"), { // <--- Tambah .js jika file Mermaid.js
  ssr: false,
  loading: () => <p className="text-center text-xs text-gray-400 py-6">Memuat bagan organisasi...</p>
});

export default function StrukturOrganisasi() {
  const { apparatus } = useApparatusList();
  const strukturKasiChart = generateMermaidChart(apparatus);

  return <MermaidRender chart={strukturKasiChart} />;
}