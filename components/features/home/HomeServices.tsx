import { ArrowRight, FileText, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeServices() {
  return (
    <section className="bg-gray-50/60 py-16 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          align="center"
          title="Layanan Administrasi Mandiri"
          description="Komitmen 9 Kepala Seksi (Kasi) desa untuk memberikan efisiensi pelayanan administrasi publik yang cepat, transparan, dan dapat diakses dari mana saja. Pemetaan data telah mencapai 90%."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="group p-8 flex flex-col justify-between relative overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-600 transition-all group-hover:w-3" />
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">Pengajuan Surat Online</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Pilih format surat administrasi kependudukan yang Anda butuhkan (SKU, SKTM, Domisili) lalu isi formulir digital secara langsung.
              </p>
            </div>
            <Button href="/pengajuan" variant="ghost" size="sm" className="mt-6 w-fit px-0 hover:bg-transparent hover:text-emerald-700">
              <span>Mulai Formulir</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>

          <Card className="group p-8 flex flex-col justify-between relative overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-teal-600 transition-all group-hover:w-3" />
            <div className="space-y-4">
              <div className="w-12 h-12 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center border border-teal-100 shadow-sm">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-700 transition-colors">Pantau Status Surat</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Masukkan kode token transaksi unik yang Anda dapatkan saat pengajuan untuk melacak perkembangan validasi langsung dari perangkat sekretariat desa.
              </p>
            </div>
            <Button href="/tracking" variant="ghost" size="sm" className="mt-6 w-fit px-0 hover:bg-transparent hover:text-teal-700">
              <span>Lacak Dokumen</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}