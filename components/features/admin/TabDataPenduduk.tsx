"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, Home, Users, Award, Landmark } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { usePopulationData } from "@/lib/populationService";

type DusunData = {
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

const initialData: Record<string, DusunData> = {
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

export default function TabDataPenduduk() {
  const { data: apiData, setData: saveApiData } = usePopulationData();
  const [data, setData] = useState<Record<string, DusunData>>(initialData);
  const [activeDusun, setActiveDusun] = useState<"pasar" | "puloharapan" | "campea" | "karajan">("pasar");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (apiData) {
      setData(apiData);
    }
  }, [apiData]);

  // 1. hitung akumulasi global otomatis
  const totalPasar = data.pasar.laki + data.pasar.perempuan;
  const totalPulo = data.puloharapan.laki + data.puloharapan.perempuan;
  const totalCampea = data.campea.laki + data.campea.perempuan;
  const totalKarajan = data.karajan.laki + data.karajan.perempuan;

  const globalTotalJiwa = totalPasar + totalPulo + totalCampea + totalKarajan;
  const globalTotalKK = data.pasar.kk + data.puloharapan.kk + data.campea.kk + data.karajan.kk;
  const globalTotalDPT = data.pasar.dpt + data.puloharapan.dpt + data.campea.dpt + data.karajan.dpt;

  // 2. detail Dusun aktif
  const currentDusun = data[activeDusun];
  const currentTotalJiwa = currentDusun.laki + currentDusun.perempuan;

  const sumJob = currentDusun.jobPertanian + currentDusun.jobKaryawan + currentDusun.jobUMKM + currentDusun.jobJasa;
  const sumAge = currentDusun.ageAnak + currentDusun.ageProduktif + currentDusun.ageLansia;

  const isJobMismatch = sumJob !== currentTotalJiwa;
  const isAgeMismatch = sumAge !== currentTotalJiwa;

  const handleInputChange = (field: keyof DusunData, value: string) => {
    const numericValue = Math.max(0, parseInt(value) || 0);
    setData({
      ...data,
      [activeDusun]: {
        ...data[activeDusun],
        [field]: numericValue,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveApiData(data);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan data kependudukan.");
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      
      {/* KARTU RINGKASAN UTAMA (Hasil Akumulasi Otomatis) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-5 text-center space-y-2 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
            <Users className="w-5 h-5" />
          </div>
          <span className="block text-2xl font-mono font-black text-slate-800 tracking-tight">
            {globalTotalJiwa.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Jiwa (Akumulasi)</span>
        </Card>

        <Card className="p-5 text-center space-y-2 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
            <Home className="w-5 h-5" />
          </div>
          <span className="block text-2xl font-mono font-black text-slate-800 tracking-tight">
            {globalTotalKK.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total KK (Akumulasi)</span>
        </Card>

        <Card className="p-5 text-center space-y-2 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
            <Award className="w-5 h-5" />
          </div>
          <span className="block text-2xl font-mono font-black text-slate-800 tracking-tight">
            {globalTotalDPT.toLocaleString("id-ID")}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total DPT (Akumulasi)</span>
        </Card>

        <Card className="p-5 text-center space-y-2 bg-white border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
            <Landmark className="w-5 h-5" />
          </div>
          <span className="block text-2xl font-black text-slate-800 tracking-tight">4 Dusun</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Wilayah Terdaftar</span>
        </Card>
      </div>

      {/* HEADER DAN AKSI UTAMA */}
      <Card className="p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Form Pengelolaan Data per Dusun</h3>
            <p className="text-xs text-slate-500 mt-1">
              Pilih dusun di bawah untuk memperbarui datanya. Perubahan data di setiap dusun akan otomatis memperbarui total akumulasi di atas.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {isSaved && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center animate-fade-in">
                <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                Data Tersimpan!
              </span>
            )}
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Simpan Data Kependudukan
            </button>
          </div>
        </div>

        {/* Tab Pemilihan Dusun */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-100 pt-4">
          {(["pasar", "puloharapan", "campea", "karajan"] as const).map((dusun) => (
            <button
              key={dusun}
              type="button"
              onClick={() => setActiveDusun(dusun)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                activeDusun === dusun
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              Dusun {dusun}
            </button>
          ))}
        </div>
      </Card>

      {/* DETAIL INPUT DUSUN TERPILIH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 1. DEMOGRAFI DASAR & ADMINISTRASI */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
          <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            1. Dasar & Administrasi
          </h4>
          <div className="space-y-4">
            <Input
              label="Dusun Terpilih"
              type="text"
              disabled
              value={`Dusun ${activeDusun}`}
              className="bg-slate-50 cursor-not-allowed capitalize font-bold text-slate-650"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Laki-laki"
                type="number"
                required
                value={currentDusun.laki.toString()}
                onChange={(e) => handleInputChange("laki", e.target.value)}
              />
              <Input
                label="Perempuan"
                type="number"
                required
                value={currentDusun.perempuan.toString()}
                onChange={(e) => handleInputChange("perempuan", e.target.value)}
              />
            </div>
            <Input
              label="Total Jiwa Dusun (Otomatis)"
              type="number"
              disabled
              value={currentTotalJiwa.toString()}
              className="bg-slate-50 cursor-not-allowed font-bold"
              helperText="Diakumulasi otomatis dari Laki-laki + Perempuan"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Kepala Keluarga (KK)"
                type="number"
                required
                value={currentDusun.kk.toString()}
                onChange={(e) => handleInputChange("kk", e.target.value)}
              />
              <Input
                label="Wajib Pilih (DPT)"
                type="number"
                required
                value={currentDusun.dpt.toString()}
                onChange={(e) => handleInputChange("dpt", e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* 2. MATA PENCAHARIAN / PEKERJAAN */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              2. Mata Pencaharian
            </h4>
            {isJobMismatch && (
              <span className="text-[9px] text-amber-600 font-bold bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                Selisih {Math.abs(currentTotalJiwa - sumJob)}
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <Input
              label="Pertanian & Buruh Tani"
              type="number"
              required
              value={currentDusun.jobPertanian.toString()}
              onChange={(e) => handleInputChange("jobPertanian", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.jobPertanian / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
            <Input
              label="Karyawan Swasta / Pabrik"
              type="number"
              required
              value={currentDusun.jobKaryawan.toString()}
              onChange={(e) => handleInputChange("jobKaryawan", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.jobKaryawan / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
            <Input
              label="UMKM & Dagang Mandiri"
              type="number"
              required
              value={currentDusun.jobUMKM.toString()}
              onChange={(e) => handleInputChange("jobUMKM", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.jobUMKM / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
            <Input
              label="Jasa, ASN, TNI/Polri, & Lainnya"
              type="number"
              required
              value={currentDusun.jobJasa.toString()}
              onChange={(e) => handleInputChange("jobJasa", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.jobJasa / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
          </div>
        </Card>

        {/* 3. KELOMPOK USIA */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
              3. Kelompok Usia
            </h4>
            {isAgeMismatch && (
              <span className="text-[9px] text-amber-600 font-bold bg-amber-50 border border-amber-150 px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3 shrink-0" />
                Selisih {Math.abs(currentTotalJiwa - sumAge)}
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <Input
              label="Anak-anak & Remaja (0 - 14 tahun)"
              type="number"
              required
              value={currentDusun.ageAnak.toString()}
              onChange={(e) => handleInputChange("ageAnak", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.ageAnak / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
            <Input
              label="Usia Produktif (15 - 64 tahun)"
              type="number"
              required
              value={currentDusun.ageProduktif.toString()}
              onChange={(e) => handleInputChange("ageProduktif", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.ageProduktif / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
            <Input
              label="Lansia (65+ tahun)"
              type="number"
              required
              value={currentDusun.ageLansia.toString()}
              onChange={(e) => handleInputChange("ageLansia", e.target.value)}
              helperText={`${(currentTotalJiwa ? (currentDusun.ageLansia / currentTotalJiwa) * 100 : 0).toFixed(1)}% dari total Dusun`}
            />
          </div>
        </Card>

      </div>

    </form>
  );
}
