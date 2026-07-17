"use client";

import { Landmark, Users, Home, Award, Calendar, Percent } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { usePopulationData } from "@/lib/populationService";

type StatProgressItem = {
  label: string;
  count: string;
  percent: number;
  colorClass: string;
};

export default function DataPendudukPage() {
  const { data } = usePopulationData();

  // Accumulate
  const totalJiwa = Object.values(data).reduce((sum, d) => sum + d.laki + d.perempuan, 0);
  const totalKK = Object.values(data).reduce((sum, d) => sum + d.kk, 0);
  const totalDPT = Object.values(data).reduce((sum, d) => sum + d.dpt, 0);

  const totalLaki = Object.values(data).reduce((sum, d) => sum + d.laki, 0);
  const totalPerempuan = Object.values(data).reduce((sum, d) => sum + d.perempuan, 0);

  const totalJobPertanian = Object.values(data).reduce((sum, d) => sum + d.jobPertanian, 0);
  const totalJobKaryawan = Object.values(data).reduce((sum, d) => sum + d.jobKaryawan, 0);
  const totalJobUMKM = Object.values(data).reduce((sum, d) => sum + d.jobUMKM, 0);
  const totalJobJasa = Object.values(data).reduce((sum, d) => sum + d.jobJasa, 0);

  const totalAgeAnak = Object.values(data).reduce((sum, d) => sum + d.ageAnak, 0);
  const totalAgeProduktif = Object.values(data).reduce((sum, d) => sum + d.ageProduktif, 0);
  const totalAgeLansia = Object.values(data).reduce((sum, d) => sum + d.ageLansia, 0);

  const percentLaki = totalJiwa ? Math.round((totalLaki / totalJiwa) * 1000) / 10 : 0;
  const percentPerempuan = totalJiwa ? Math.round((totalPerempuan / totalJiwa) * 1000) / 10 : 0;

  const dusunStats: StatProgressItem[] = [
    { label: "Dusun Pasar", count: `${(data.pasar.laki + data.pasar.perempuan).toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round(((data.pasar.laki + data.pasar.perempuan) / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-emerald-600" },
    { label: "Dusun Puloharapan", count: `${(data.puloharapan.laki + data.puloharapan.perempuan).toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round(((data.puloharapan.laki + data.puloharapan.perempuan) / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-teal-600" },
    { label: "Dusun Campea", count: `${(data.campea.laki + data.campea.perempuan).toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round(((data.campea.laki + data.campea.perempuan) / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-emerald-500" },
    { label: "Dusun Karajan", count: `${(data.karajan.laki + data.karajan.perempuan).toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round(((data.karajan.laki + data.karajan.perempuan) / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-teal-500" },
  ];

  const jobStats: StatProgressItem[] = [
    { label: "Sektor Pertanian (Petani & Buruh)", count: `${totalJobPertanian.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalJobPertanian / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-emerald-600" },
    { label: "Karyawan Swasta / Buruh Pabrik", count: `${totalJobKaryawan.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalJobKaryawan / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-teal-600" },
    { label: "Perdagangan & UMKM Mandiri", count: `${totalJobUMKM.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalJobUMKM / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-emerald-500" },
    { label: "Jasa, ASN, TNI/Polri, & Lainnya", count: `${totalJobJasa.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalJobJasa / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-teal-500" },
  ];

  const ageStats: StatProgressItem[] = [
    { label: "Usia Produktif (15 - 64 tahun)", count: `${totalAgeProduktif.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalAgeProduktif / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-emerald-600" },
    { label: "Anak-anak & Remaja (0 - 14 tahun)", count: `${totalAgeAnak.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalAgeAnak / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-teal-600" },
    { label: "Lansia (65+ tahun)", count: `${totalAgeLansia.toLocaleString("id-ID")} jiwa`, percent: totalJiwa ? Math.round((totalAgeLansia / totalJiwa) * 1000) / 10 : 0, colorClass: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-16 pb-20 bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[450px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/images/background.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto relative z-10 w-full py-12 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statistik Demografi & Kependudukan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Data Penduduk <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Desa Kampungsawah
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Transparansi informasi demografis warga Kecamatan Jayakerta guna menunjang ketepatan sasaran alokasi dana dan bantuan sosial secara merata.
          </p>
        </div>
      </section>

      {/* 2. STATISTIK UTAMA (4 Kartu) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-2 hover:shadow-md transition-shadow relative overflow-hidden bg-white border border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
              <Users className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">
              {totalJiwa.toLocaleString("id-ID")}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Jiwa Terdata</span>
          </Card>

          <Card className="p-6 text-center space-y-2 hover:shadow-md transition-shadow relative overflow-hidden bg-white border border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
              <Home className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">
              {totalKK.toLocaleString("id-ID")}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Kepala Keluarga (KK)</span>
          </Card>

          <Card className="p-6 text-center space-y-2 hover:shadow-md transition-shadow relative overflow-hidden bg-white border border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
              <Award className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">
              {totalDPT.toLocaleString("id-ID")}
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Wajib Pilih (DPT)</span>
          </Card>

          <Card className="p-6 text-center space-y-2 hover:shadow-md transition-shadow relative overflow-hidden bg-white border border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600 border border-emerald-100">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">4 Dusun</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Wilayah Kewilayahan</span>
          </Card>
        </div>
      </section>

      {/* 3. DIAGRAM PROGRES STATISTIK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Dusun Stats */}
        <Card className="p-6 md:p-8 space-y-6 border border-gray-100 shadow-sm bg-white">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Landmark className="w-5 h-5 text-emerald-600 mr-2" />
              <span>Penyebaran Penduduk per Wilayah Dusun</span>
            </h3>
          </div>
          <div className="space-y-5">
            {dusunStats.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={`${item.colorClass} h-3 rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
                <span className="block text-right text-xs text-gray-400 font-medium">Realisasi: {item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Gender Stats */}
        <Card className="p-6 md:p-8 space-y-6 border border-gray-100 shadow-sm bg-white">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Users className="w-5 h-5 text-emerald-600 mr-2" />
              <span>Proporsi Penduduk Berdasarkan Gender</span>
            </h3>
          </div>
          <div className="space-y-8 pt-4">
            {/* Laki laki */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-800">Laki-laki</span>
                <span className="font-bold text-gray-900">{percentLaki}%</span>
              </div>
              <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-emerald-600 h-4 rounded-full" style={{ width: `${percentLaki}%` }} />
              </div>
              <span className="block text-xs text-gray-400 font-medium">Total: {totalLaki.toLocaleString("id-ID")} jiwa</span>
            </div>

            {/* Perempuan */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-800">Perempuan</span>
                <span className="font-bold text-gray-900">{percentPerempuan}%</span>
              </div>
              <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-4 overflow-hidden">
                <div className="bg-teal-600 h-4 rounded-full" style={{ width: `${percentPerempuan}%` }} />
              </div>
              <span className="block text-xs text-gray-400 font-medium">Total: {totalPerempuan.toLocaleString("id-ID")} jiwa</span>
            </div>
          </div>
        </Card>

        {/* Occupation Stats */}
        <Card className="p-6 md:p-8 space-y-6 border border-gray-100 shadow-sm bg-white">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Percent className="w-5 h-5 text-emerald-600 mr-2" />
              <span>Mata Pencaharian / Pekerjaan Utama</span>
            </h3>
          </div>
          <div className="space-y-5">
            {jobStats.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={`${item.colorClass} h-3 rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
                <span className="block text-right text-xs text-gray-400 font-medium">Jumlah: {item.count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Age Stats */}
        <Card className="p-6 md:p-8 space-y-6 border border-gray-100 shadow-sm bg-white">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 text-emerald-600 mr-2" />
              <span>Komposisi Penduduk Berdasarkan Kelompok Usia</span>
            </h3>
          </div>
          <div className="space-y-5">
            {ageStats.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">{item.label}</span>
                  <span className="font-bold text-gray-900">{item.percent}%</span>
                </div>
                <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={`${item.colorClass} h-3 rounded-full`} style={{ width: `${item.percent}%` }} />
                </div>
                <span className="block text-right text-xs text-gray-400 font-medium">Jumlah: {item.count}</span>
              </div>
            ))}
          </div>
        </Card>

      </section>

      {/* 4. TENTANG PENDATAAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-6 md:p-8 space-y-4">
          <h4 className="text-lg font-bold text-emerald-950 flex items-center">
            <Landmark className="w-5 h-5 text-emerald-600 mr-2 shrink-0" />
            <span>Pemberitahuan Validitas Data</span>
          </h4>
          <p className="text-xs text-emerald-800 leading-relaxed max-w-4xl">
            Semua data statistik demografi kependudukan di atas disinkronkan secara berkala dengan Sistem Informasi Administrasi Kependudukan (SIAK) Kantor Desa Kampungsawah dan Dinas Kependudukan dan Catatan Sipil (Disdukcapil) Kabupaten Karawang. Pembaruan data terakhir dilakukan pada <strong>Juli 2026</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
