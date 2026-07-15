"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldAlert, ArrowRight, Loader2 } from "lucide-react";
import Input from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kampungsawah.id");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (email === "admin@kampungsawah.id" && password === "admin123") {
      setIsLoading(true);
      // Simulasi loading autentikasi selama 1 detik
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setErrorMsg("Kredensial yang Anda masukkan salah. Gunakan detail uji coba di bawah.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-emerald-50 via-slate-50 to-emerald-100">
      
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl -ml-20 -mt-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/35 rounded-full blur-3xl -mr-20 -mb-20" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 space-y-6">

        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
            <Image
              src="/images/logo-karawang.svg"
              alt="Logo Kabupaten Karawang"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-gray-900">Portal Aparatur Desa</h2>
            <p className="text-xs text-gray-400 font-medium">Masuk untuk mengelola administrasi & informasi desa.</p>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs flex items-start gap-2.5 font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Alamat Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@kampungsawah.id"
            disabled={isLoading}
          />

          <Input
            label="Kata Sandi"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center space-x-2 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengautentikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Mock Credentials Help Box */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-800 space-y-1.5">
          <span className="font-bold text-emerald-950 uppercase tracking-wider block text-[10px]">Detail Akun Uji Coba:</span>
          <div className="flex justify-between font-mono text-[11px]">
            <span>Email:</span>
            <span className="font-bold text-emerald-900">admin@kampungsawah.id</span>
          </div>
          <div className="flex justify-between font-mono text-[11px]">
            <span>Sandi:</span>
            <span className="font-bold text-emerald-900">admin123</span>
          </div>
        </div>

      </div>
    </div>
  );
}
