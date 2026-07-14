"use client";

import dynamic from "next/dynamic";

// Diubah dari "@/components/ui/Mermaid" menjadi relative path "../ui/Mermaid"
const MermaidRender = dynamic(() => import("../ui/Mermaid.js"), { // <--- Tambah .js jika file Mermaid.js
  ssr: false,
  loading: () => <p className="text-center text-xs text-gray-400 py-6">Memuat bagan organisasi...</p>
});

export default function StrukturOrganisasi() {
  const strukturKasiChart = `
    graph TD
      KepalaDesa[Kepala Desa] --> Sekretaris["Sekretaris Desa<br/>Arif Munawir"]
      Sekretaris --> Kasi1["Kasie Pemerintahan<br/>Yuda Wuguna"]
      Sekretaris --> Kasi2["Kesra<br/>Aad Jihaddudin"]
      Sekretaris --> Kasi3["Kasie Pelayanan<br/>Asep Johan"]
      Sekretaris --> Kaur1["Kaur Umum<br/>Asep Sudia"]
      Sekretaris --> Kaur2["Kaur Keuangan<br/>Ari Bukhori"]
      Sekretaris --> Kaur3["Kaur Perencanaan"]
      KepalaDesa --> Kadus1["Kepala Dusun Pasar<br/>Dede Saepul"]
      KepalaDesa --> Kadus2["Kepala Dusun Puloharapan<br/>Ahmad Dudis"]
      KepalaDesa --> Kadus3["Kepala Dusun Campea<br/>Yayan bcb Haryanto"]
      KepalaDesa --> Kadus4["Kepala Dusun Karajan<br/>Ujang Zaenudin"]
      
      classDef default fill:#fff,stroke:#e5e7eb,stroke-width:2px;
        classDef kepala fill:#047857,stroke:#059669,color:#fff;
        classDef staf fill:#ecfdf5,stroke:#10b981,color:#065f46;
        class KepalaDesa,Sekretaris kepala;
        class Kasi1,Kasi2,Kasi3,Kaur1,Kaur2,Kaur3 staf;
  `;

  return <MermaidRender chart={strukturKasiChart} />;
}