"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Landmark } from "lucide-react";
import Card from "@/components/ui/Card";
import { Input, TextArea } from "@/components/ui/Input";
import { useContactInfo } from "@/lib/contactService";

export default function KontakPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const contact = useContactInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

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
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hubungi Layanan Publik & Kemitraan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Kontak Resmi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Desa Kampungsawah
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Kami siap melayani kebutuhan informasi Anda. Kirimkan pesan, aduan, atau jalin kemitraan investasi dengan pemerintah desa kami.
          </p>
        </div>
      </section>

      {/* 2. CONTACT LAYOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white relative z-20 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact details & Map */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 md:p-8 bg-white border border-gray-100 shadow-xl space-y-6">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="text-xl font-bold text-gray-900">Informasi Kantor Desa</h2>
                <p className="text-xs text-gray-400 mt-1">Alamat fisik, saluran kontak, dan jam operasional pelayanan desa.</p>
              </div>

              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-800 text-xs uppercase tracking-wider">Alamat Lengkap</span>
                    <span className="text-xs text-gray-500 leading-relaxed">{contact.address}</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-800 text-xs uppercase tracking-wider">Telepon & WhatsApp</span>
                    <span className="text-xs text-gray-500 leading-relaxed">{contact.phone}</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-800 text-xs uppercase tracking-wider">Email Resmi</span>
                    <span className="text-xs text-gray-500 leading-relaxed">{contact.email}</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3 pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-800 text-xs uppercase tracking-wider">Jam Pelayanan Kantor</span>
                    <span className="text-xs text-gray-500 leading-relaxed">{contact.hours}</span>
                  </div>
                </li>
              </ul>
            </Card>

            {/* Embedded map placeholder card / info */}
            <Card className="p-4 bg-gray-50 border border-gray-200/60 rounded-2xl flex flex-col justify-center text-center space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Lokasi Geografis Desa</span>
              <p className="text-xs text-gray-500 leading-relaxed">Pemerintah Desa Kampungsawah terletak strategis di Kecamatan Jayakerta, perbatasan Rengasdengklok.</p>
            </Card>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <h2 className="text-xl font-bold text-gray-900">Kirim Pesan Langsung</h2>
                  <p className="text-xs text-gray-400 mt-1">Kirimkan pertanyaan, kritik saran, atau penawaran kerja sama kemitraan.</p>
                </div>

                <div className="space-y-4">
                  <Input
                    label="Nama Lengkap"
                    type="text"
                    required
                    placeholder="Masukkan nama lengkap Anda"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Alamat Email"
                      type="email"
                      required
                      placeholder="nama@email.com"
                    />
                    <Input
                      label="No. WhatsApp / Telepon"
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                    />
                  </div>

                  <Input
                    label="Subjek Hubungi"
                    type="text"
                    required
                    placeholder="Contoh: Kemitraan UMKM Konveksi Dompet"
                  />

                  <TextArea
                    label="Isi Pesan Anda"
                    required
                    rows={5}
                    placeholder="Tuliskan secara detail pesan atau pertanyaan Anda di sini..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Kirim Pesan Resmi</span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-gray-900">Pesan Berhasil Terkirim!</h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                    Terima kasih telah menghubungi kami. Pesan Anda telah terkirim ke Kasi Pelayanan Desa. Kami akan merespon melalui email atau WhatsApp yang Anda cantumkan dalam kurun waktu 1x24 jam kerja.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-emerald-700 transition-colors shadow-sm cursor-pointer"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
