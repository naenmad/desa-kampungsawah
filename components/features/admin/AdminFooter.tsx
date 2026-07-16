"use client";

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-[10px] sm:text-[11px] text-slate-400 font-bold shrink-0">
      <span>© {currentYear} Pemerintah Desa Kampungsawah. Portal Kendali Administrasi & Transparansi Publik.</span>
    </footer>
  );
}
