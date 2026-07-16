"use client";

import { Menu } from "lucide-react";

interface AdminNavbarProps {
  activeTab: string;
  onOpenSidebar: () => void;
}

export default function AdminNavbar({ activeTab, onOpenSidebar }: AdminNavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 shrink-0">
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-base font-black text-slate-900 capitalize tracking-tight flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeTab.replace("-", " ")}</span>
        </h2>
      </div>

      <div className="flex items-center space-x-2 text-sm text-slate-600 font-medium">
        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center font-bold text-xs">
          SA
        </div>
        <span className="hidden sm:inline text-xs font-bold text-slate-800">Super Admin</span>
      </div>
    </header>
  );
}
