"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Download, ArrowUpRight, Scale } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type BudgetRow = {
    code: string;
    name: string;
    budget: number;
    realization: number;
};

const pendapatanData: BudgetRow[] = [
    { code: "1.1", name: "Dana Desa (DD) - APBN", budget: 1100000000, realization: 935000000 },
    { code: "1.2", name: "Alokasi Dana Desa (ADD) - APBD", budget: 750000000, realization: 600000000 },
    { code: "1.3", name: "Pendapatan Asli Desa (PADesa)", budget: 180000000, realization: 115000000 },
    { code: "1.4", name: "Bagi Hasil Pajak & Retribusi (BHPR)", budget: 120000000, realization: 70000000 },
];

const belanjaData: BudgetRow[] = [
    { code: "2.1", name: "Bidang Pembangunan Fisik & Infrastruktur", budget: 950000000, realization: 780000000 },
    { code: "2.2", name: "Bidang Penyelenggaraan Pemerintahan Desa", budget: 720000000, realization: 540000000 },
    { code: "2.3", name: "Bidang Pembinaan Kemasyarakatan", budget: 210000000, realization: 150000000 },
    { code: "2.4", name: "Bidang Pemberdayaan Masyarakat", budget: 180000000, realization: 120000000 },
    { code: "2.5", name: "Bidang Penanggulangan Bencana & Darurat", budget: 60000000, realization: 40000000 },
];

export default function APBDesPage() {
    const [activeTab, setActiveTab] = useState<"pendapatan" | "belanja">("pendapatan");

    const formatRupiah = (num: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(num);
    };

    const getPercentage = (real: number, budg: number) => {
        return ((real / budg) * 100).toFixed(1);
    };

    // Aggregates
    const totalPendapatanBudget = pendapatanData.reduce((acc, cur) => acc + cur.budget, 0);
    const totalPendapatanReal = pendapatanData.reduce((acc, cur) => acc + cur.realization, 0);

    const totalBelanjaBudget = belanjaData.reduce((acc, cur) => acc + cur.budget, 0);
    const totalBelanjaReal = belanjaData.reduce((acc, cur) => acc + cur.realization, 0);

    const surplusBudget = totalPendapatanBudget - totalBelanjaBudget;
    const surplusReal = totalPendapatanReal - totalBelanjaReal;

    const currentData = activeTab === "pendapatan" ? pendapatanData : belanjaData;
    const totalBudget = activeTab === "pendapatan" ? totalPendapatanBudget : totalBelanjaBudget;
    const totalReal = activeTab === "pendapatan" ? totalPendapatanReal : totalBelanjaReal;

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
                        <Scale className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Transparansi & Akuntabilitas Keuangan</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
                        Laporan APBDes <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                            Tahun Anggaran 2026
                        </span>
                    </h1>
                    <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
                        Keterbukaan informasi keuangan desa. Akses mudah rincian pendapatan asli, alokasi dana transfer pemerintah, serta realisasi pembangunan di Desa Kampungsawah.
                    </p>
                </div>
            </section>

            {/* 2. STAT CARDS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Card Pendapatan */}
                    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/40 rounded-full -mr-8 -mt-8 flex items-center justify-center text-emerald-600">
                            <TrendingUp className="w-8 h-8 opacity-20" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pendapatan Desa</span>
                            <span className="block text-2xl font-black text-emerald-600">{formatRupiah(totalPendapatanReal)}</span>
                            <span className="text-xs text-gray-400 block">Target: {formatRupiah(totalPendapatanBudget)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                                className="bg-emerald-600 h-1.5 rounded-full"
                                style={{ width: `${getPercentage(totalPendapatanReal, totalPendapatanBudget)}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-gray-500 block">Realisasi: {getPercentage(totalPendapatanReal, totalPendapatanBudget)}%</span>
                    </Card>

                    {/* Card Belanja */}
                    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50/40 rounded-full -mr-8 -mt-8 flex items-center justify-center text-red-600">
                            <TrendingDown className="w-8 h-8 opacity-20" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Belanja Desa</span>
                            <span className="block text-2xl font-black text-red-600">{formatRupiah(totalBelanjaReal)}</span>
                            <span className="text-xs text-gray-400 block">Anggaran: {formatRupiah(totalBelanjaBudget)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                                className="bg-red-500 h-1.5 rounded-full"
                                style={{ width: `${getPercentage(totalBelanjaReal, totalBelanjaBudget)}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-gray-500 block">Realisasi: {getPercentage(totalBelanjaReal, totalBelanjaBudget)}%</span>
                    </Card>

                    {/* Card Pembiayaan/Neto */}
                    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-full -mr-8 -mt-8 flex items-center justify-center text-blue-600">
                            <Scale className="w-8 h-8 opacity-20" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Selisih Anggaran</span>
                            <span className="block text-2xl font-black text-gray-800">{formatRupiah(surplusReal)}</span>
                            <span className="text-xs text-gray-400 block">Sisa Anggaran: {formatRupiah(surplusBudget)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "100%" }} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 block">Surplus Terjaga</span>
                    </Card>

                    {/* Card Realisasi Total */}
                    <Card className="p-6 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden bg-emerald-600 text-white border-emerald-600">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-700/50 rounded-full -mr-8 -mt-8 flex items-center justify-center">
                            <DollarSign className="w-8 h-8 opacity-20" />
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Efektivitas Serapan</span>
                            <span className="block text-4xl font-black text-gray-800">{getPercentage(totalBelanjaReal, totalBelanjaBudget)}%</span>
                            <span className="text-xs text-gray-400 block">Kategori Belanja Rutin & Fisik</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1.5">
                            <div
                                className="bg-emerald-600 h-1.5 rounded-full"
                                style={{ width: `${getPercentage(totalBelanjaReal, totalBelanjaBudget)}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-gray-800 block">Sesuai Target RKPDesa</span>
                    </Card>
                </div>
            </section>

            {/* 3. VISUAL PROGRESS BARS FOR CATS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Pendapatan Progres */}
                <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <TrendingUp className="w-5 h-5 text-emerald-600 mr-2" />
                            <span>Struktur Pendapatan Desa (Target vs Realisasi)</span>
                        </h3>
                    </div>
                    <div className="space-y-5">
                        {pendapatanData.map((row) => {
                            const percent = getPercentage(row.realization, row.budget);
                            return (
                                <div key={row.code} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-semibold text-gray-700">{row.name}</span>
                                        <span className="font-bold text-gray-900">{percent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${percent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Realisasi: {formatRupiah(row.realization)}</span>
                                        <span>Anggaran: {formatRupiah(row.budget)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Belanja Progres */}
                <div className="space-y-6">
                    <div className="border-b border-gray-100 pb-3">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
                            <span>Struktur Belanja Desa (Target vs Realisasi)</span>
                        </h3>
                    </div>
                    <div className="space-y-5">
                        {belanjaData.map((row) => {
                            const percent = getPercentage(row.realization, row.budget);
                            return (
                                <div key={row.code} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-semibold text-gray-700">{row.name}</span>
                                        <span className="font-bold text-gray-900">{percent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${percent}%` }} />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400">
                                        <span>Realisasi: {formatRupiah(row.realization)}</span>
                                        <span>Anggaran: {formatRupiah(row.budget)}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. INTERACTIVE ANGGARAN TABLE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-5">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-extrabold text-gray-900">Rincian Pos Anggaran APBDes 2026</h2>
                        <p className="text-xs text-gray-500">Klik tab di bawah untuk melihat rincian alokasi Pendapatan atau Belanja desa secara mendetail.</p>
                    </div>

                    {/* Toggle Buttons */}
                    <div className="inline-flex bg-gray-50 p-1.5 rounded-xl border border-gray-200/50 self-start sm:self-center">
                        <button
                            onClick={() => setActiveTab("pendapatan")}
                            className={`px-5 py-2.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${activeTab === "pendapatan" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            Rincian Pendapatan
                        </button>
                        <button
                            onClick={() => setActiveTab("belanja")}
                            className={`px-5 py-2.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${activeTab === "belanja" ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            Rincian Belanja
                        </button>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white border border-gray-200/60 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-200/60 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                    <th className="py-4 px-6 w-20">Kode</th>
                                    <th className="py-4 px-6">Uraian Sumber Daya / Alokasi</th>
                                    <th className="py-4 px-6 text-right">Nilai Anggaran</th>
                                    <th className="py-4 px-6 text-right">Realisasi</th>
                                    <th className="py-4 px-6 text-center w-32">Pencapaian</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {currentData.map((row) => {
                                    const percent = getPercentage(row.realization, row.budget);
                                    return (
                                        <tr key={row.code} className="hover:bg-gray-50/30 transition-colors">
                                            <td className="py-4 px-6 font-mono text-xs text-gray-400 font-bold">{row.code}</td>
                                            <td className="py-4 px-6 font-semibold text-gray-800">{row.name}</td>
                                            <td className="py-4 px-6 text-right font-mono text-gray-500">{formatRupiah(row.budget)}</td>
                                            <td className="py-4 px-6 text-right font-mono text-gray-900 font-semibold">{formatRupiah(row.realization)}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span
                                                    className={`inline-block font-bold text-xs px-2.5 py-1 rounded-full ${Number(percent) >= 80
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        : "bg-amber-50 text-amber-700 border border-amber-200"
                                                        }`}
                                                >
                                                    {percent}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Total Row */}
                                <tr className="bg-gray-50/20 font-bold border-t-2 border-gray-100">
                                    <td className="py-4 px-6"></td>
                                    <td className="py-4 px-6 text-gray-800">Jumlah Total {activeTab === "pendapatan" ? "Pendapatan" : "Belanja"}</td>
                                    <td className="py-4 px-6 text-right font-mono text-gray-500">{formatRupiah(totalBudget)}</td>
                                    <td className="py-4 px-6 text-right font-mono text-emerald-600">{formatRupiah(totalReal)}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className="inline-block bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full">
                                            {getPercentage(totalReal, totalBudget)}%
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5. DOWNLOAD PDF CORNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1.5 text-center md:text-left">
                        <h4 className="text-lg font-bold text-emerald-950 flex items-center justify-center md:justify-start">
                            <Download className="w-5 h-5 text-emerald-600 mr-2" />
                            <span>Unduh Dokumen APBDes Resmi</span>
                        </h4>
                        <p className="text-xs text-emerald-800 max-w-xl">
                            Butuh salinan berkas resmi anggaran desa? Anda dapat mengunduh dokumen PDF Laporan APBDes Kampungsawah Tahun Anggaran 2026 yang telah disahkan oleh BPD.
                        </p>
                    </div>
                    <Button href="#" variant="primary" className="shrink-0 flex items-center space-x-1 px-8">
                        <span>Unduh PDF APBDes</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
}
