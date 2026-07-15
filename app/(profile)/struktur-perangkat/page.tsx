import { Shield } from "lucide-react";
import Card from "@/components/ui/Card";
import StrukturOrganisasi from "@/components/features/StrukturOrganisasi";

type PerangkatProfile = {
  name: string;
  role: string;
  description: string;
  avatarText: string;
};

export default function StrukturPerangkatPage() {
  const listPerangkat: PerangkatProfile[] = [
    {
      name: "Aparatur Kepala Desa",
      role: "Kepala Desa Kampungsawah",
      description: "Memimpin jalannya pemerintahan desa, menyusun kebijakan anggaran, dan mengoordinasikan program pembangunan di seluruh dusun.",
      avatarText: "KD",
    },
    {
      name: "Arif Munawir",
      role: "Sekretaris Desa",
      description: "Bertanggung jawab atas administrasi umum, pelayanan data kependudukan, pengarsipan berkas permohonan, dan koordinasi staf.",
      avatarText: "AM",
    },
    {
      name: "Yuda Wuguna",
      role: "Kasi Pemerintahan",
      description: "Mengurus administrasi pertanahan, ketenteraman dan ketertiban warga, serta penegakan hukum peraturan desa.",
      avatarText: "YW",
    },
    {
      name: "Aad Jihaddudin",
      role: "Kasi Kesejahteraan (Kesra)",
      description: "Mengoordinasikan program jaminan sosial, penyaluran bantuan pangan (BLT), pelayanan keagamaan, serta kepemudaan.",
      avatarText: "AJ",
    },
    {
      name: "Asep Johan",
      role: "Kasi Pelayanan",
      description: "Mengelola loket pelayanan mandiri surat warga, penerimaan aspirasi pengaduan, dan fasilitasi program Posyandu/Kesehatan.",
      avatarText: "AJ",
    },
    {
      name: "Ari Bukhori",
      role: "Kaur Keuangan",
      description: "Menyusun pembukuan laporan APBDes, realisasi pos belanja pembangunan, serta laporan pertanggungjawaban anggaran.",
      avatarText: "AB",
    },
  ];

  const listKadus: PerangkatProfile[] = [
    { name: "Dede Saepul", role: "Kepala Dusun Pasar", description: "Perwakilan pelayanan kependudukan wilayah Dusun Pasar.", avatarText: "DS" },
    { name: "Ahmad Dudis", role: "Kepala Dusun Puloharapan", description: "Perwakilan pelayanan kependudukan wilayah Dusun Puloharapan.", avatarText: "AD" },
    { name: "Yayan bcb Haryanto", role: "Kepala Dusun Campea", description: "Perwakilan pelayanan kependudukan wilayah Dusun Campea.", avatarText: "YH" },
    { name: "Ujang Zaenudin", role: "Kepala Dusun Karajan", description: "Perwakilan pelayanan kependudukan wilayah Dusun Karajan.", avatarText: "UZ" },
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
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pemerintahan & Aparatur Desa</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Struktur Organisasi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Perangkat Desa
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Bagan tata kelola administrasi pelayanan publik dan pengurus struktural Pemerintah Desa Kampungsawah, Kecamatan Jayakerta.
          </p>
        </div>
      </section>

      {/* 2. BAGAN MERMAID CHART */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <Card className="p-6 md:p-10 shadow-xl border border-gray-100 bg-white space-y-6 text-center">
          <div className="border-b border-gray-100 pb-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Bagan Struktur Pemerintahan</h2>
            <p className="text-xs text-gray-400 mt-1">Hierarki kepengurusan desa dari Kepala Desa hingga Kepala Kewilayahan (Dusun).</p>
          </div>
          
          <div className="overflow-x-auto py-6">
            <div className="min-w-[600px] max-w-4xl mx-auto">
              <StrukturOrganisasi />
            </div>
          </div>
        </Card>
      </section>

      {/* 3. DAFTAR PERANGKAT INTI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Profil & Pembagian Tugas Perangkat</h2>
          <div className="w-12 h-1 bg-emerald-600 rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listPerangkat.map((p, idx) => (
            <Card key={idx} className="p-6 bg-white hover:shadow-md transition-shadow border border-gray-100 space-y-4">
              {/* Header card: avatar and title */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-100">
                  {p.avatarText}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-800 text-sm leading-tight">{p.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{p.role}</span>
                </div>
              </div>
              
              {/* Job Description */}
              <p className="text-xs text-gray-500 leading-relaxed">
                {p.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. KEPALA DUSUN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-10 border-t border-gray-100">
        <div className="text-center pt-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Kepala Kewilayahan (Dusun)</h2>
          <p className="text-xs text-gray-400 mt-1">Mengakomodasi administrasi pelayanan langsung dan memelihara kerukunan antar RT/RW dusun setempat.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listKadus.map((d, idx) => (
            <Card key={idx} className="p-5 text-center space-y-3 bg-gray-50/30 hover:shadow-sm transition-shadow border border-gray-200/50">
              <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mx-auto">
                {d.avatarText}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-gray-800 text-sm leading-tight">{d.name}</h4>
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">{d.role}</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                {d.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
