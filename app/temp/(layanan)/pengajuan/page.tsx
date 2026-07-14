"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, ShieldCheck, ArrowRight, User, CreditCard, MapPin, Building, HelpCircle } from "lucide-react";

export default function PengajuanSuratPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [tokenCode, setTokenCode] = useState("");

  const jenisSurat = [
    { id: "sku", name: "Surat Keterangan Usaha (SKU) - Untuk UMKM Konveksi/Kuliner" },
    { id: "sktm", name: "Surat Keterangan Tidak Mampu (SKTM)" },
    { id: "domisili", name: "Surat Keterangan Domisili Penduduk" },
    { id: "skck", name: "Surat Pengantar SKCK" },
  ];

  const dusunList = ["Pasar", "Puloharapan", "Campea", "Karajan"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pembuatan token acak untuk tracking surat
    const randomToken = "KSW-" + Math.floor(100000 + Math.random() * 900000);
    setTokenCode(randomToken);
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 bg-white">
      
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[500px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/images/background.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-12">
          <div className="space-y-6 lg:col-span-8">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sistem Pelayanan Mandiri Warga Digital</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
              Pengajuan Surat & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Administrasi Mandiri
              </span>
            </h1>
            <p className="text-sm md:text-base text-emerald-100/90 max-w-xl leading-relaxed">
              Fasilitas pengisian berkas kependudukan online untuk efisiensi birokrasi. Data Anda akan langsung diverifikasi oleh 9 Kepala Seksi (Kasi) Pemerintah Desa Kampungsawah.
            </p>
          </div>

          {/* Right Side Info Box */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="relative w-72 h-72 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-white">Sudah Mengajukan?</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Jika Anda telah mengisi formulir sebelumnya, simpan kode unik yang diterbitkan untuk melacak status verifikasi di halaman **Pantau Surat**.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORMULIR UTAMA (Latar Belakang Dijamin Putih Bersih) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative z-20 -mt-24">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
          
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Formulir Permohonan Digital</h2>
                <p className="text-xs text-gray-500 mt-1">Isi data identitas diri Anda secara valid berdasarkan KTP/KK asli Desa Kampungsawah.</p>
              </div>

              {/* Grid Form Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Pilihan Surat */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Jenis Layanan Surat</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50">
                    <option value="">-- Pilih Format Surat --</option>
                    {jenisSurat.map((surat) => (
                      <option key={surat.id} value={surat.id}>{surat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Nama Lengkap */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                    <input type="text" required placeholder="Masukkan nama sesuai KTP" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50" />
                  </div>
                </div>

                {/* NIK */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Nomor Induk Kependudukan (NIK)</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                    <input type="text" required maxLength={16} placeholder="16 digit NIK Anda" className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50" />
                  </div>
                </div>

                {/* Wilayah Dusun */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Wilayah Dusun</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50">
                    <option value="">-- Pilih Dusun Asal --</option>
                    {dusunList.map((dusun, idx) => (
                      <option key={idx} value={dusun.toLowerCase()}>Dusun {dusun}</option>
                    ))}
                  </select>
                </div>

                {/* RT / RW */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">RT</label>
                    <input type="number" required min={1} max={12} placeholder="1 - 12" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50 text-center" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">RW</label>
                    <input type="number" required min={1} max={4} placeholder="1 - 4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50 text-center" />
                  </div>
                </div>

                {/* Keperluan Berkas */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Alasan / Keperluan Keterangan Surat</label>
                  <textarea required rows={4} placeholder="Contoh: Digunakan sebagai syarat penguatan organisasi kelompok dagang resmi konveksi dompet." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm bg-gray-50/50" />
                </div>

              </div>

              {/* Tombol Kirim Form */}
              <div className="pt-4">
                <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 group">
                  <span>Kirim Permohonan Surat</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          ) : (
            
            // Tampilan Sukses Mendapatkan Token Transaksi Digital
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-gray-900">Permohonan Berhasil Dikirim!</h2>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Data Anda telah masuk ke sistem antrean digital terpadu desa. Silakan salin dan simpan Token Transaksi berikut untuk pelacakan berkas.
                </p>
              </div>

              {/* Tampilan Token Kunci Khas Programmer */}
              <div className="bg-gray-50 border border-dashed border-emerald-300 rounded-xl p-5 max-w-sm mx-auto">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">Kode Resi Pengajuan</span>
                <span className="text-3xl font-mono font-black tracking-wider text-gray-800 selection:bg-emerald-200">{tokenCode}</span>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/tracking" className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-emerald-700 transition-colors shadow-sm">
                  Pantau Status Berkas
                </Link>
                <button onClick={() => setFormSubmitted(false)} className="text-gray-600 hover:text-gray-900 font-semibold text-sm py-3 px-6 transition-colors">
                  Buat Surat Baru
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}