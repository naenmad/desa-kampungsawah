"use client";

import { FileText, Map, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import { usePopulationData } from "@/lib/populationService";

export default function HomeStats() {
  const { data } = usePopulationData();

  // Accumulate
  const totalJiwa = Object.values(data).reduce((sum, d) => sum + d.laki + d.perempuan, 0);
  const totalDPT = Object.values(data).reduce((sum, d) => sum + d.dpt, 0);

  const stats = [
    { icon: Users, value: `${totalJiwa.toLocaleString("id-ID")}`, label: "Total Jiwa (Pendataan)", description: "Warga terdata" },
    { icon: Map, value: "4 Dusun", label: "Pasar, Puloharapan, Campea, Karajan", description: "Wilayah layanan" },
    { icon: FileText, value: "12 / 4", label: "Jumlah RT / RW", description: "Struktur lingkungan" },
    { icon: Users, value: `${totalDPT.toLocaleString("id-ID")}`, label: "Daftar Pemilih (DPT)", description: "Hak pilih aktif" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-20">
      <Card className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={[
                "space-y-2 p-2",
                index > 0 ? "border-l border-gray-100" : "",
              ].join(" ")}
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
                <Icon className="w-6 h-6" />
              </div>
              <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">{stat.value}</span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{stat.label}</span>
              <span className="text-[11px] text-gray-500 block">{stat.description}</span>
            </div>
          );
        })}
      </Card>
    </section>
  );
}