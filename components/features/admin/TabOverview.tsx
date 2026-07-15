"use client";

import { Newspaper, Users, FileText, MessageSquare, ArrowRight, Settings, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import Card from "@/components/ui/Card";
import { useContactInfo } from "@/lib/contactService";

interface TabOverviewProps {
  onNavigate: (tab: any) => void;
}

export default function TabOverview({ onNavigate }: TabOverviewProps) {
  const contact = useContactInfo();

  return (
    <div className="space-y-6">
      
      {/* 1. WELCOME HERO BANNER */}
      <Card className="p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-1 bg-white/20 text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sistem Kendali Utama</span>
          </div>
          <h3 className="text-xl font-black">Selamat Datang Kembali, Administrator!</h3>
          <p className="text-xs text-emerald-100/90 max-w-xl leading-relaxed">
            Portal ini dirancang untuk memudahkan verifikasi pengajuan surat warga secara mandiri, pengelolaan pengaduan pelacakan, serta transparansi publik Desa Kampungsawah.
          </p>
        </div>
      </Card>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        <Card onClick={() => onNavigate("data-penduduk")} className="p-4 bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Data Penduduk</span>
            <span className="text-lg font-black text-slate-800">3.486 Jiwa</span>
          </div>
        </Card>

        <Card onClick={() => onNavigate("berita-terkini")} className="p-4 bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Kabar Desa</span>
            <span className="text-lg font-black text-slate-800">5 Artikel</span>
          </div>
        </Card>

        <Card onClick={() => onNavigate("administrasi-surat")} className="p-4 bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
          <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center shrink-0 border border-yellow-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Berkas Surat</span>
            <span className="text-lg font-black text-yellow-650">2 Pending</span>
          </div>
        </Card>

        <Card onClick={() => onNavigate("pengaduan-warga")} className="p-4 bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md cursor-pointer transition-all flex items-center gap-4 group">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center shrink-0 border border-red-100">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Aduan Warga</span>
            <span className="text-lg font-black text-red-650">2 Pending</span>
          </div>
        </Card>

      </div>

      {/* 3. QUICK LINKS & INFO BLOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Task Actions */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm lg:col-span-7 space-y-4">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
            Aktivitas Layanan Terpopuler
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <button
              onClick={() => onNavigate("administrasi-surat")}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50 text-left transition-all cursor-pointer group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 text-xs block">Verifikasi Berkas Surat</span>
                <span className="text-[10px] text-slate-400 block">Ada pengajuan surat menunggu approval.</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onNavigate("pengaduan-warga")}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50 text-left transition-all cursor-pointer group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 text-xs block">Tindak Lanjut Aduan</span>
                <span className="text-[10px] text-slate-400 block">Berikan respon catatan progres keluhan.</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onNavigate("berita-terkini")}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50 text-left transition-all cursor-pointer group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 text-xs block">Publikasikan Kabar</span>
                <span className="text-[10px] text-slate-400 block">Posting berita atau pengumuman desa baru.</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => onNavigate("kontak-masuk")}
              className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-slate-50/50 text-left transition-all cursor-pointer group"
            >
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 text-xs block">Ubah Informasi Kontak</span>
                <span className="text-[10px] text-slate-400 block">Update alamat, email, telepon kantor.</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transform group-hover:translate-x-1 transition-all" />
            </button>

          </div>
        </Card>

        {/* Current Contact Info Box */}
        <Card className="p-6 bg-white border border-slate-100 shadow-sm lg:col-span-5 space-y-4">
          <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Informasi Kontak Desa Saat Ini
            </h4>
            <button
              onClick={() => onNavigate("kontak-masuk")}
              className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 cursor-pointer flex items-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Ubah</span>
            </button>
          </div>

          <ul className="space-y-3.5 text-xs text-slate-650">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Alamat Kantor</span>
                <span className="text-slate-500 leading-relaxed block">{contact.address}</span>
              </div>
            </li>
            
            <li className="flex items-start space-x-2.5">
              <Phone className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Telepon / WhatsApp</span>
                <span className="text-slate-500 block">{contact.phone}</span>
              </div>
            </li>

            <li className="flex items-start space-x-2.5">
              <Mail className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-800 block">Email Resmi</span>
                <span className="text-slate-500 block">{contact.email}</span>
              </div>
            </li>
          </ul>
        </Card>

      </div>

    </div>
  );
}
