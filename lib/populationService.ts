"use client";

import { useState, useEffect } from "react";

export type DusunData = {
  laki: number;
  perempuan: number;
  kk: number;
  dpt: number;
  jobPertanian: number;
  jobKaryawan: number;
  jobUMKM: number;
  jobJasa: number;
  ageAnak: number;
  ageProduktif: number;
  ageLansia: number;
};

export const DEFAULT_POPULATION: Record<string, DusunData> = {
  pasar: {
    laki: 1920,
    perempuan: 1900,
    kk: 1160,
    dpt: 2660,
    jobPertanian: 1080,
    jobKaryawan: 1380,
    jobUMKM: 960,
    jobJasa: 400,
    ageAnak: 840,
    ageProduktif: 2600,
    ageLansia: 380,
  },
  puloharapan: {
    laki: 1760,
    perempuan: 1720,
    kk: 1060,
    dpt: 2420,
    jobPertanian: 1300,
    jobKaryawan: 1120,
    jobUMKM: 660,
    jobJasa: 400,
    ageAnak: 760,
    ageProduktif: 2360,
    ageLansia: 360,
  },
  campea: {
    laki: 1580,
    perempuan: 1540,
    kk: 960,
    dpt: 2180,
    jobPertanian: 1600,
    jobKaryawan: 720,
    jobUMKM: 480,
    jobJasa: 320,
    ageAnak: 690,
    ageProduktif: 2120,
    ageLansia: 310,
  },
  karajan: {
    laki: 1580,
    perempuan: 1524,
    kk: 940,
    dpt: 2160,
    jobPertanian: 1700,
    jobKaryawan: 566,
    jobUMKM: 334,
    jobJasa: 504,
    ageAnak: 685,
    ageProduktif: 2116,
    ageLansia: 303,
  },
};

export function getPopulationData(): Record<string, DusunData> {
  if (typeof window === "undefined") {
    return DEFAULT_POPULATION;
  }
  const stored = localStorage.getItem("desa_population_data");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_POPULATION;
    }
  }
  return DEFAULT_POPULATION;
}

export function savePopulationData(data: Record<string, DusunData>) {
  if (typeof window === "undefined") return;
  localStorage.setItem("desa_population_data", JSON.stringify(data));
  window.dispatchEvent(new Event("storage"));
}

export function usePopulationData() {
  const [data, setData] = useState<Record<string, DusunData>>(DEFAULT_POPULATION);

  useEffect(() => {
    setData(getPopulationData());

    const handleStorageChange = () => {
      setData(getPopulationData());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { data, setData: (updated: Record<string, DusunData>) => { setData(updated); savePopulationData(updated); } };
}
