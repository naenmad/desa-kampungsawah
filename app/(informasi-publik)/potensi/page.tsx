import Image from "next/image";
import { Landmark, Wheat, ShoppingBag, ArrowRight, Award, BarChart3, Settings } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PotensiDesaPage() {
  return (
    <div className="space-y-20 pb-20 bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[500px] flex items-center text-white px-4 overflow-hidden bg-emerald-950">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('/images/background.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-7xl mx-auto relative z-10 w-full py-12 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-4 py-1.5 rounded-full border border-emerald-400/30 backdrop-blur-md">
            <Wheat className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sektor Unggulan & Sumber Daya Alam</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Potensi Ekonomi & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Kekayaan Lokal Desa
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Menelusuri keunggulan komparatif Desa Kampungsawah, mulai dari bentangan sawah padi produktif Karawang hingga geliat industri kreatif konveksi dompet berskala nasional.
          </p>
        </div>
      </section>

      {/* 2. STATISTIK RINGKAS POTENSI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100 text-center">
          <div className="space-y-2 p-2">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <Wheat className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">2 Kali</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Panen Padi per Tahun</span>
          </div>
          <div className="space-y-2 p-2 border-l border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">50+</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">UMKM Konveksi Dompet</span>
          </div>
          <div className="space-y-2 p-2 border-l border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">Rp 5M+</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Perputaran Uang Ekonomi Lokal</span>
          </div>
          <div className="space-y-2 p-2 border-l border-gray-100">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto text-emerald-600">
              <Award className="w-6 h-6" />
            </div>
            <span className="block text-3xl font-extrabold text-gray-800 tracking-tight">Utama</span>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Komoditas Karawang Padi</span>
          </div>
        </div>
      </section>

      {/* 3. SEKTOR PERTANIAN PADI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-200">
              <Wheat className="w-4 h-4" />
              <span>Sektor Primer / Pertanian</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Pertanian Padi Sawah Berkelanjutan
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
              Sebagai bagian dari lumbung padi nasional Kabupaten Karawang, Desa Kampungsawah memiliki lahan pertanian subur dengan basis kelompok tani yang aktif mengelola pola <strong>2 kali panen per tahun</strong>. Pemerintah desa berfokus mengoptimalkan manajemen perairan serta mengedukasi mitigasi hama.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-gray-800 text-sm">Mitigasi Hama Modern</span>
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Kolaborasi aktif dengan penyuluh pertanian lapangan untuk meminimalisasi penyakit sundep (padi kopong) dan ngengat melalui pemantauan berkala.
                  </span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 text-emerald-600 border border-emerald-100">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold text-gray-800 text-sm">Manajemen Saluran Irigasi</span>
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Pengawasan pintu air di Dusun Campea dan Dusun Karajan untuk memastikan pasokan air sawah tetap tercukupi walau saat musim kemarau.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Block */}
          <div className="lg:col-span-5 relative h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="/images/galeri-pertanian.png"
              alt="Pertanian Padi Desa Kampungsawah"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* 4. SEKTOR UMKM & EKONOMI KREATIF */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Block on Left for balance */}
          <div className="lg:col-span-5 order-last lg:order-first relative h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="/images/galeri-umkm.png"
              alt="Kerajinan UMKM Desa Kampungsawah"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Text block */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-200">
              <ShoppingBag className="w-4 h-4" />
              <span>Sektor Sekunder / Industri Kreatif</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Geliat Usaha Mikro, Kecil, & Menengah
            </h2>
            <p className="text-base text-gray-500 leading-relaxed">
              UMKM merupakan tulang punggung ekonomi kerakyatan di Desa Kampungsawah. Keberadaan ratusan pengrajin rumahan di sektor konveksi serta kuliner lokal mampu menyerap tenaga kerja lokal dalam jumlah besar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card UMKM 1 */}
              <Card className="p-6 space-y-3 bg-gray-50/50 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600" />
                <h3 className="font-bold text-gray-800 text-sm">Konveksi Dompet (Dusun Puloharapan)</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sentra konveksi dompet eceran dan grosir. Produk dipasarkan secara daring (online marketplace) hingga dikirim ke berbagai kota besar di Jawa Barat dan Jabodetabek.
                </p>
              </Card>

              {/* Card UMKM 2 */}
              <Card className="p-6 space-y-3 bg-gray-50/50 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600" />
                <h3 className="font-bold text-gray-800 text-sm">Kuliner Kue Basah (Dusun Pasar)</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Aktivitas pembuatan aneka kue tradisional basah setiap subuh. Menjadi penyuplai utama lapak sarapan pagi di kecamatan Jayakerta dan sekitarnya.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISI PENGEMBANGAN EKONOMI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-gray-200 pb-5">
          <SectionHeading
            title="Strategi Penguatan & Digitalisasi"
            description="Upaya pemerintah desa memodernisasi tata kelola produk lokal warga agar berdaya saing tinggi."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Wadah Koperasi Resmi</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Membentuk badan hukum koperasi desa untuk menaungi produsen konveksi dompet. Ini meminimalkan kendala sistem titip jual dan memberikan modal bersama yang sehat bagi warga.
            </p>
          </article>

          <article className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Pemasaran Digital Terpadu</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Mengintegrasikan modul UMKM ke dalam portal website resmi desa. Warga dapat mempromosikan produk lokalnya langsung melalui katalog e-commerce lokal desa.
            </p>
          </article>

          <article className="bg-gray-50/40 rounded-2xl border border-gray-200/60 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">Rencana Agrowisata Sawah</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Menggagas wisata edukasi alam berbasis pertanian padi. Memanfaatkan lanskap sawah hijau yang memanjakan mata sebagai objek edukasi ekosistem pedesaan Karawang.
            </p>
          </article>
        </div>
      </section>

      {/* 6. CALL TO ACTION CONTACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 to-emerald-950/90" />
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Tertarik Menjalin Kemitraan?</h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              Kami menyambut kerja sama investasi sektor pertanian modern, pembinaan desain UMKM, serta kemitraan distribusi produk konveksi dompet Desa Kampungsawah.
            </p>
            <div className="pt-4">
              <Button href="/kontak" variant="secondary" size="lg" className="w-full sm:w-auto">
                <span>Hubungi Pemerintah Desa</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
