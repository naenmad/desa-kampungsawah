import { Landmark, Users, Map, Shield, Calendar, Award, CheckCircle, Bell } from "lucide-react";

export default function ProfilDesaPage() {
  // Data pembagian wilayah riil berdasarkan hasil pembahasan desa
  const dusunList = [
    { name: "Dusun Pasar", deskripsi: "Pusat aktivitas perdagangan dan ekonomi utama warga desa." },
    { name: "Dusun Puloharapan", deskripsi: "Kawasan pemukiman dengan fokus pengembangan ekonomi lokal." },
    { name: "Dusun Campea", deskripsi: "Wilayah subur dengan basis kelompok pertanian yang aktif." },
    { name: "Dusun Karajan", deskripsi: "Wilayah jalur utama (Pasar Dengklok) yang menjadi gerbang utama desa." },
  ];

  return (
    <div className="space-y-20 pb-20 bg-white">
      
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE (Sama Persis dengan Style Beranda) */}
      <section className="relative min-h-[550px] lg:min-h-[650px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
        {/* Background Image Element */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/images/background.webp')" }}
        />
        {/* Dark & Gradient Overlay for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-16">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pemerintah Kabupaten Karawang</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
              Profil & Tata Wilayah <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Desa Kampungsawah
              </span>
            </h1>
            <p className="text-base md:text-lg text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
              Mengenal lebih dekat struktur administrasi, pembagian dusun, serta visi strategis pembangunan berkelanjutan di Kecamatan Jayakerta.
            </p>
          </div>

          {/* Right Side: Stunning Photo Frame Feature (Sama Persis dengan Style Beranda) */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-80 h-96 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-teal-400/20 rounded-full blur-xl" />
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center border border-white/10 shadow-inner">
                  <Calendar className="w-6 h-6 text-emerald-300 animate-bounce" />
                </div>
                <div className="space-y-3 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Agenda Kerja Desa</span>
                  <h3 className="font-bold text-xl text-white leading-snug">Rapat Minggon Rutin</h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    Pelaksanaan koordinasi aparatur internal dilaksanakan rutin setiap hari Rabu, disusul tingkat kecamatan pada hari Selasa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK DESA (Sama Persis dengan Style Beranda) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100 text-center">
          <div className="space-y-2 p-2">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">13.000+</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Jiwa (Pendataan)</span>
          </div>
          <div className="space-y-2 p-2 border-l border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <Map className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">4 Dusun</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pasar, Puloharapan, Campea, Karajan</span>
          </div>
          <div className="space-y-2 p-2 border-l border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <Landmark className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">12 / 4</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Jumlah RT / RW</span>
          </div>
          <div className="space-y-2 p-2 border-l border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">9.000+</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Daftar Pemilih (DPT)</span>
          </div>
        </div>
      </section>

      {/* 3. PEMERINTAHAN & ADMINISTRASI (Ubah Background Menjadi Putih Bersih) */}
      <section className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-200">
              <Landmark className="w-4 h-4" />
              <span>Sistem Aparatur Desa</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Struktur Organisasi & Kependudukan
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
              Pemerintah Desa Kampungsawah saat ini didukung penuh oleh <strong>9 Kepala Seksi (Kasi)</strong> yang bertugas melayani administrasi warga. Pemetaan data kependudukan digital masyarakat saat ini telah berhasil menyentuh capaian **90%**, terus disinkronkan demi akurasi pelayanan terpadu.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-800 text-sm">Proses Mutakhir</span>
                  <span className="text-xs text-gray-400">Pendataan ulang sisa 10% wilayah terkendala teknis sedang berjalan.</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-800 text-sm">Partisipasi Warga</span>
                  <span className="text-xs text-gray-400">Masyarakat dan mahasiswa diperbolehkan andil dalam Minggon Desa.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Riil Dusun dengan Aksen Emerald Border Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dusunList.map((dusun, idx) => (
              <div key={idx} className="group bg-gray-50/50 p-6 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600 transition-all group-hover:w-3" />
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm">
                    <Map className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{dusun.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{dusun.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISI, MISI & TENTANG DESA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Visi & Misi Strategis</h2>
            <p className="text-gray-500 text-sm">Kerangka dasar arah pembangunan lingkungan, pertanian modern, dan akselerasi UMKM.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Visi */}
          <article className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Visi Desa</h3>
            <p className="text-sm text-gray-500 leading-relaxed italic">
              "Mewujudkan tata kelola Desa Kampungsawah yang Mandiri, Sejahtera, Transparan, serta Unggul dalam tata kelola pertanian dan pelayanan digital terintegrasi publik."
            </p>
          </article>

          {/* Card Misi 1 */}
          <article className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Prioritas Lingkungan & UMKM</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Mengakselerasi perbaikan operasional mesin TPST melalui sinergi KSM awal Juli, menyusun Perdes persampahan jalur Dusun Karajan, serta merintis penguatan wadah naungan organisasi resmi UMKM titip jual.
            </p>
          </article>

          {/* Card Misi 2 */}
          <article className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden flex flex-col p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Akselerasi Pertanian Modern</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Mengedukasi kelompok tani aktif yang mengelola pola 2 kali panen padi setahun untuk memitigasi kendala tanah asam-asaman serta manajemen air dari penanganan tradisional menuju agrikultur modern.
            </p>
          </article>
        </div>
      </section>

    </div>
  );
}