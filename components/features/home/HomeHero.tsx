"use client";

import { Bell, FileText, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { useHomepageConfig } from "@/lib/homepageService";

export default function HomeHero() {
  const { config } = useHomepageConfig();

  return (
    <section className="relative min-h-[550px] lg:min-h-[650px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('/images/background.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-16">
        <div className="space-y-6 lg:col-span-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Portal Pelayanan Resmi Digital</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            {config.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {config.heroSub}
            </span>
          </h1>
          <p className="text-base md:text-lg text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            {config.heroDesc}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/pengajuan" variant="primary" className="shadow-emerald-900/40">
              <FileText className="w-5 h-5" />
              <span>Buat Surat Online</span>
            </Button>
            <Button href="/profil" variant="secondary">
              Jelajahi Profil Desa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}