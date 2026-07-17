"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, ShieldCheck, ArrowRight, User, CreditCard, HelpCircle, AlertCircle, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Input, TextArea, Select } from "@/components/ui/Input";
import { apiFetch } from "@/lib/apiClient";

export default function AdministrasiPelayananPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [tokenCode, setTokenCode] = useState("");
  const [selectedSurat, setSelectedSurat] = useState("");
  
  // Form input states
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [dusun, setDusun] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [alasan, setAlasan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jenisSurat = [
    {
      id: "sku",
      name: "Surat Keterangan Usaha (SKU)",
      description: "Untuk warga pelaku UMKM konveksi dompet, kuliner kue basah, atau dagang lainnya.",
      requirements: "KTP asli, Kartu Keluarga (KK), Foto tempat/produk usaha, Pengantar RT/RW."
    },
    {
      id: "sktm",
      name: "Surat Keterangan Tidak Mampu (SKTM)",
      description: "Untuk keperluan keringanan biaya sekolah, jaminan kesehatan, atau bantuan sosial.",
      requirements: "KTP asli, Kartu Keluarga (KK), Surat Pengantar RT/RW yang ditandatangani, Foto rumah tampak depan."
    },
    {
      id: "domisili",
      name: "Surat Keterangan Domisili Penduduk",
      description: "Untuk menerangkan domisili tinggal saat ini di wilayah Desa Kampungsawah.",
      requirements: "KTP asli, Kartu Keluarga (KK), Surat Pengantar RT/RW."
    },
    {
      id: "skck",
      name: "Surat Pengantar SKCK",
      description: "Surat rekomendasi pengantar untuk pembuatan SKCK di Polsek Jayakerta.",
      requirements: "KTP asli, Kartu Keluarga (KK), Surat Pengantar RT/RW."
    },
  ];

  const dusunList = ["Pasar", "Puloharapan", "Campea", "Karajan"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nik || !dusun || !rt || !rw || !alasan) return;
    setIsSubmitting(true);

    try {
      const result = await apiFetch("/letters", {
        method: "POST",
        body: JSON.stringify({
          nik,
          dusun,
          rt,
          rw,
          alasan: `[${selectedSurat.toUpperCase()}] Nama: ${nama}. Alasan: ${alasan}`,
        }),
      });

      // Generate tracking token
      const trackingToken = `KSW-${result.id || Math.floor(100000 + Math.random() * 900000)}`;
      setTokenCode(trackingToken);
      setFormSubmitted(true);
    } catch (err: any) {
      alert(err.message || "Gagal mengirim permohonan surat.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSuratDetail = jenisSurat.find(s => s.id === selectedSurat);

  return (
    <div className="space-y-16 pb-20 bg-white">

      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative min-h-[450px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
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
              Administrasi & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Pengajuan Surat Mandiri
              </span>
            </h1>
            <p className="text-sm md:text-base text-emerald-100/90 max-w-xl leading-relaxed">
              Fasilitas pengisian berkas kependudukan online untuk efisiensi birokrasi. Data Anda akan langsung diverifikasi oleh Pemerintah Desa Kampungsawah secara aman.
            </p>
          </div>

          {/* Right Side Info Box */}
          <div className="hidden lg:flex lg:col-span-4 justify-end">
            <div className="relative w-72 h-72 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 p-6 flex flex-col justify-between shadow-2xl">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-emerald-300 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-base text-white">Alur Pelayanan</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Isi form secara lengkap, simpan token resi digital Anda, tunggu verifikasi dari Kasi Pelayanan, lalu bawa berkas asli saat pengambilan surat fisik di Kantor Desa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FORMULIR UTAMA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative z-20 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Form Panel */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Formulir Permohonan Digital</h2>
                  <p className="text-xs text-gray-500 mt-1">Isi data identitas diri Anda secara valid berdasarkan KTP/KK asli Desa Kampungsawah.</p>
                </div>

                {/* Grid Form Input */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Pilihan Surat */}
                  <div className="md:col-span-2">
                    <Select
                      label="Jenis Layanan Surat"
                      required
                      value={selectedSurat}
                      onChange={(e) => setSelectedSurat(e.target.value)}
                    >
                      <option value="">-- Pilih Format Surat --</option>
                      {jenisSurat.map((surat) => (
                        <option key={surat.id} value={surat.id}>{surat.name}</option>
                      ))}
                    </Select>
                  </div>

                   {/* Nama Lengkap */}
                  <Input
                    label="Nama Lengkap"
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama sesuai KTP"
                    icon={<User className="h-4 w-4 text-gray-400" />}
                  />

                  {/* NIK */}
                  <Input
                    label="Nomor Induk Kependudukan (NIK)"
                    type="text"
                    required
                    maxLength={16}
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="16 digit NIK Anda"
                    icon={<CreditCard className="h-4 w-4 text-gray-400" />}
                  />

                  {/* Wilayah Dusun */}
                  <Select
                    label="Wilayah Dusun asal tinggal"
                    required
                    value={dusun}
                    onChange={(e) => setDusun(e.target.value)}
                  >
                    <option value="">-- Pilih Dusun Asal --</option>
                    {dusunList.map((dusun, idx) => (
                      <option key={idx} value={dusun.toLowerCase()}>Dusun {dusun}</option>
                    ))}
                  </Select>

                  {/* RT / RW */}
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="RT"
                      type="number"
                      required
                      min={1}
                      max={12}
                      value={rt}
                      onChange={(e) => setRt(e.target.value)}
                      placeholder="1 - 12"
                      className="text-center"
                    />
                    <Input
                      label="RW"
                      type="number"
                      required
                      min={1}
                      max={4}
                      value={rw}
                      onChange={(e) => setRw(e.target.value)}
                      placeholder="1 - 4"
                      className="text-center"
                    />
                  </div>

                  {/* Keperluan Berkas */}
                  <div className="md:col-span-2">
                    <TextArea
                      label="Alasan / Keperluan Keterangan Surat"
                      required
                      rows={4}
                      value={alasan}
                      onChange={(e) => setAlasan(e.target.value)}
                      placeholder="Contoh: Digunakan sebagai syarat pengajuan modal usaha UMKM konveksi dompet."
                    />
                  </div>

                </div>

                {/* Tombol Kirim Form */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Kirim Permohonan Surat</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            ) : (
              // Tampilan Sukses Mendapatkan Token Transaksi Digital
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <ShieldCheck className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-gray-900">Permohonan Berhasil Dikirim!</h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Data permohonan surat Anda telah masuk ke sistem antrean digital terpadu desa. Silakan salin dan simpan Kode Resi berikut untuk pelacakan berkas.
                  </p>
                </div>

                {/* Tampilan Token Resi */}
                <div className="bg-gray-50 border border-dashed border-emerald-300 rounded-xl p-5 max-w-sm mx-auto">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">Kode Resi Pengajuan</span>
                  <span className="text-3xl font-mono font-black tracking-wider text-gray-800 selection:bg-emerald-200">{tokenCode}</span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/layanan/pengaduan"
                    className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-emerald-700 transition-colors shadow-sm text-center flex items-center justify-center"
                  >
                    Lacak Status & Pengaduan
                  </Link>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setSelectedSurat("");
                    }}
                    className="text-gray-600 hover:text-gray-900 font-semibold text-sm py-3 px-6 transition-colors cursor-pointer"
                  >
                    Buat Surat Baru
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Requirements Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box 1: Persyaratan Surat */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-gray-900 text-lg flex items-center border-b border-gray-100 pb-3">
                <Info className="w-5 h-5 text-emerald-600 mr-2 shrink-0" />
                <span>Persyaratan Berkas</span>
              </h3>

              {currentSuratDetail ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase text-emerald-600 block">Surat Terpilih:</span>
                    <span className="text-sm font-bold text-gray-800 block">{currentSuratDetail.name}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase text-gray-400 block">Fungsi / Deskripsi:</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{currentSuratDetail.description}</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-bold uppercase text-emerald-700 flex items-center">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      Dokumen Wajib:
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {currentSuratDetail.requirements}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Pilih jenis layanan surat pada formulir untuk melihat persyaratan dokumen wajib.</p>
                </div>
              )}
            </Card>

            {/* Box 2: Catatan Penting */}
            <Card className="p-6 bg-emerald-950 text-emerald-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-900 rounded-full -mr-8 -mt-8 opacity-40" />
              <div className="space-y-3 relative z-10">
                <h4 className="font-bold text-gray-800 text-base">Ketentuan Layanan</h4>
                <ul className="list-disc pl-4 text-xs space-y-2 text-gray-600 leading-relaxed">
                  <li>Pelayanan digital ini <strong>100% gratis</strong> tanpa biaya administrasi (pungutan liar).</li>
                  <li>Lama proses verifikasi berkas rata-rata memakan waktu <strong>1x24 jam</strong> sejak pengajuan dikirim.</li>
                  <li>Pengambilan surat fisik harus membawa fotokopi KTP/KK serta surat pengantar RT/RW asli ke Kantor Desa.</li>
                </ul>
              </div>
            </Card>
          </div>

        </div>
      </section>

    </div>
  );
}
