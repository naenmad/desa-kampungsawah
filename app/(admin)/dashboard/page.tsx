"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FileText, MessageSquare, Newspaper, Users, LogOut,
  User, Menu, X, Landmark, Calendar, BarChart3, Mail, Award, Home
} from "lucide-react";

// Import modular tab components
import AdminNavbar from "@/components/features/admin/AdminNavbar";
import AdminFooter from "@/components/features/admin/AdminFooter";
import TabOverview from "@/components/features/admin/TabOverview";
import TabBeritaTerkini from "@/components/features/admin/TabBeritaTerkini";
import TabDataPenduduk from "@/components/features/admin/TabDataPenduduk";
import TabSejarahDesa from "@/components/features/admin/TabSejarahDesa";
import TabStrukturPerangkat from "@/components/features/admin/TabStrukturPerangkat";
import TabPotensiDesa from "@/components/features/admin/TabPotensiDesa";
import TabAPBDes from "@/components/features/admin/TabAPBDes";
import TabGaleriKegiatan from "@/components/features/admin/TabGaleriKegiatan";
import TabAdministrasiSurat from "@/components/features/admin/TabAdministrasiSurat";
import TabPengaduanWarga from "@/components/features/admin/TabPengaduanWarga";
import TabKontakMasuk from "@/components/features/admin/TabKontakMasuk";
import TabKelolaAdmin from "@/components/features/admin/TabKelolaAdmin";

type AdminTab =
  | "overview"
  | "berita-terkini"
  | "data-penduduk"
  | "sejarah"
  | "struktur-perangkat"
  | "potensi-desa"
  | "apbdes"
  | "galeri-kegiatan"
  | "administrasi-surat"
  | "pengaduan-warga"
  | "kontak-masuk"
  | "kelola-admin";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const savedTab = sessionStorage.getItem("admin_active_tab");
    if (savedTab) {
      setActiveTab(savedTab as AdminTab);
    }
  }, []);

  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab);
    sessionStorage.setItem("admin_active_tab", tab);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_active_tab");
    router.push("/login");
  };

  return (
    <div id="admin-dashboard-root" className="h-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col lg:flex-row font-sans">

      {/* 1. SIDEBAR (Tema Emerald-White) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:flex lg:flex-col lg:shrink-0 h-full`}>

        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-white">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo-karawang.svg"
              alt="Logo Kabupaten Karawang"
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
            <span className="font-bold text-base text-slate-900 tracking-wide">Portal Admin KSW</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-650 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Menu Grouping */}
        <div className="flex-grow overflow-y-auto px-4 py-6 space-y-6">

          {/* Group 0: Beranda */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">Navigasi Utama</span>
            <button
              onClick={() => handleTabChange("overview")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "overview" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Home className="w-4 h-4 text-emerald-600" />
              <span>Beranda Admin</span>
            </button>
          </div>

          {/* Group 1: Profil Desa */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">Profil Desa</span>
            <button
              onClick={() => handleTabChange("berita-terkini")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "berita-terkini" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Newspaper className="w-4 h-4 text-emerald-600" />
              <span>Berita Terkini</span>
            </button>
            <button
              onClick={() => handleTabChange("data-penduduk")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "data-penduduk" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Data Penduduk</span>
            </button>
            <button
              onClick={() => handleTabChange("sejarah")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "sejarah" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Sejarah Desa</span>
            </button>
            <button
              onClick={() => handleTabChange("struktur-perangkat")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "struktur-perangkat" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Struktur Perangkat</span>
            </button>
          </div>

          {/* Group 2: Informasi Publik */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">Informasi Publik</span>
            <button
              onClick={() => handleTabChange("potensi-desa")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "potensi-desa" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>Potensi Desa</span>
            </button>
            <button
              onClick={() => handleTabChange("apbdes")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "apbdes" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Landmark className="w-4 h-4 text-emerald-600" />
              <span>Transparansi APBDes</span>
            </button>
            <button
              onClick={() => handleTabChange("galeri-kegiatan")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "galeri-kegiatan" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Galeri Kegiatan</span>
            </button>
          </div>

          {/* Group 3: Layanan Warga */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">Layanan Warga</span>
            <button
              onClick={() => handleTabChange("administrasi-surat")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "administrasi-surat" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Administrasi</span>
            </button>
            <button
              onClick={() => handleTabChange("pengaduan-warga")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "pengaduan-warga" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Laporan Warga</span>
            </button>
            <button
              onClick={() => handleTabChange("kontak-masuk")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "kontak-masuk" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>Kontak Masuk</span>
            </button>
          </div>

          {/* Group 4: Pengaturan */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block">Pengaturan</span>
            <button
              onClick={() => handleTabChange("kelola-admin")}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "kelola-admin" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <User className="w-4 h-4 text-emerald-600" />
              <span>Kelola Admin</span>
            </button>
          </div>

        </div>

        {/* Sidebar Logout */}
        <div className="p-4 border-t border-slate-150 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-slate-600 hover:bg-red-50 hover:text-red-650 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Portal</span>
          </button>
        </div>

      </aside>

      {/* 2. MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

        <AdminNavbar activeTab={activeTab} onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {activeTab === "overview" && <TabOverview onNavigate={handleTabChange} />}
            {activeTab === "berita-terkini" && <TabBeritaTerkini />}
            {activeTab === "data-penduduk" && <TabDataPenduduk />}
            {activeTab === "sejarah" && <TabSejarahDesa />}
            {activeTab === "struktur-perangkat" && <TabStrukturPerangkat />}
            {activeTab === "potensi-desa" && <TabPotensiDesa />}
            {activeTab === "apbdes" && <TabAPBDes />}
            {activeTab === "galeri-kegiatan" && <TabGaleriKegiatan />}
            {activeTab === "administrasi-surat" && <TabAdministrasiSurat />}
            {activeTab === "pengaduan-warga" && <TabPengaduanWarga />}
            {activeTab === "kontak-masuk" && <TabKontakMasuk />}
            {activeTab === "kelola-admin" && <TabKelolaAdmin />}

            <div className="pt-8">
              <AdminFooter />
            </div>
          </div>
        </main>
      </div>

    </div>
  );
}
