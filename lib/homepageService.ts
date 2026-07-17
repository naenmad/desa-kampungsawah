"use client";

import { useState, useEffect } from "react";

export type HomepageConfig = {
  heroTitle: string;
  heroSub: string;
  heroDesc: string;
  greetingTitle: string;
  greetingText: string;
  headName: string;
  headImage: string; // base64 or placeholder
};

export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  heroTitle: "Sinergi Menuju",
  heroSub: "Desa Mandiri & Maju",
  heroDesc: "Selamat datang di portal informasi resmi Desa Kampungsawah, Kecamatan Jayakerta. Dapatkan akses transparansi publik, berita terkini, dan pengajuan administrasi surat mandiri dengan mudah.",
  greetingTitle: "Selamat Datang di Ruang Digital Kami",
  greetingText: "Puji syukur kami panjatkan demi terwujudnya transparansi publik Desa Kampungsawah. Melalui portal ini, kami berkomitmen penuh menyinergikan data warga agar terkelola secara modern. Kehadiran inovasi surat mandiri online serta pemetaan potensi agrikultur dan penguatan kelompok dagang UMKM ini ditujukan sepenuhnya demi kenyamanan, keterbukaan, serta kemajuan bersama seluruh elemen masyarakat.",
  headName: "Dede Sunarya",
  headImage: ""
};

export function getHomepageConfig(): HomepageConfig {
  if (typeof window === "undefined") {
    return DEFAULT_HOMEPAGE_CONFIG;
  }
  const stored = localStorage.getItem("desa_homepage_config");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_HOMEPAGE_CONFIG;
    }
  }
  return DEFAULT_HOMEPAGE_CONFIG;
}

export function saveHomepageConfig(config: HomepageConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem("desa_homepage_config", JSON.stringify(config));
  window.dispatchEvent(new Event("storage"));
}

export function useHomepageConfig() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG);

  useEffect(() => {
    setConfig(getHomepageConfig());

    const handleStorageChange = () => {
      setConfig(getHomepageConfig());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { config, setConfig: (updated: HomepageConfig) => { setConfig(updated); saveHomepageConfig(updated); } };
}
