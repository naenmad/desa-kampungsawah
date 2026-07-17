"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "./apiClient";

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

export async function saveHomepageConfig(config: HomepageConfig) {
  const result = await apiFetch("/homepage", {
    method: "PUT",
    body: JSON.stringify(config),
  });
  window.dispatchEvent(new Event("homepage-updated"));
  return result;
}

export function useHomepageConfig() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG);

  useEffect(() => {
    const fetchConfig = () => {
      apiFetch("/homepage")
        .then((data) => {
          if (data) setConfig(data);
        })
        .catch(() => {
          // Fallback
        });
    };

    fetchConfig();

    window.addEventListener("homepage-updated", fetchConfig);
    return () => {
      window.removeEventListener("homepage-updated", fetchConfig);
    };
  }, []);

  return { config, setConfig: (updated: HomepageConfig) => { setConfig(updated); saveHomepageConfig(updated); } };
}
