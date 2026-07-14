import { BookOpen, Calendar, Milestone, ShieldCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export default function SejarahPage() {
  const historyTimeline: TimelineItem[] = [
    {
      year: "1950-an",
      title: "Asal-usul Nama Kampungsawah",
      description: "Wilayah desa semula dikenal sebagai hamparan persawahan rawa air tawar yang sangat luas. Penduduk sekitar menjulukinya 'Kampung Sawah' karena hampir seluruh kawasan dihuni oleh para petani penggarap sawah tadah hujan.",
    },
    {
      year: "1978",
      title: "Peresmian Administratif Desa",
      description: "Pemekaran wilayah secara administratif dari kecamatan induk. Desa Kampungsawah disahkan berdiri sebagai desa mandiri di bawah Kecamatan Jayakerta, Kabupaten Karawang, Jawa Barat dengan pembagian dusun awal.",
    },
    {
      year: "1990-an",
      title: "Perkembangan Sektor UMKM Kerajinan",
      description: "Beberapa pengrajin mulai memprakarsai pembuatan kerajinan konveksi dompet rumahan. Sektor ini secara cepat menarik minat angkatan kerja lokal, menjadi alternatif mata pencaharian pokok di luar pertanian padi sawah.",
    },
    {
      year: "Era Modern",
      title: "Digitalisasi & Pembangunan Berkelanjutan",
      description: "Pemerintah desa meluncurkan program layanan mandiri warga digital dan merevitalisasi TPS3R/TPST persampahan guna merintis program pengelolaan limbah terpadu yang ramah lingkungan.",
    },
  ];

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
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Riwayat Singkat & Kilas Balik</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm max-w-3xl">
            Sejarah & Asal-usul <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Desa Kampungsawah
            </span>
          </h1>
          <p className="text-base text-emerald-100/90 max-w-xl leading-relaxed drop-shadow-sm">
            Menelusuri benang merah perjalanan historis, nilai-nilai lokal, dan adaptasi sosial kemasyarakatan dari masa ke masa.
          </p>
        </div>
      </section>

      {/* 2. PENDAHULUAN & LOGO FILOSOFI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Narration */}
          <div className="space-y-6 lg:col-span-7">
            <SectionHeading
              title="Nilai Luhur dan Kearifan Lokal"
              description="Perjalanan panjang Desa Kampungsawah melahirkan tradisi gotong royong yang kuat di tengah masyarakat agraris."
              align="left"
            />
            <p className="text-sm text-gray-500 leading-relaxed">
              Masyarakat Desa Kampungsawah dikenal memegang teguh tradisi kekeluargaan. Semangat gotong royong terwujud dalam tata kelola perairan sawah bersama (irigasi) serta kepedulian terhadap kebersihan lingkungan melalui kelompok swadaya masyarakat.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Kombinasi budaya agraris Karawang yang ramah dipadukan dengan keterampilan wirausaha konveksi dompet menciptakan tatanan sosial masyarakat yang dinamis, mandiri, namun tetap santun menjunjung adab budaya Sunda.
            </p>
          </div>

          {/* Quote Card */}
          <div className="lg:col-span-5">
            <Card className="p-8 bg-emerald-50/50 border border-emerald-100 relative rounded-3xl space-y-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/10 rounded-bl-full pointer-events-none" />
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
              <blockquote className="text-sm font-medium text-emerald-950 leading-relaxed">
                &ldquo;Kampungsawah bukan sekadar hamparan bumi persawahan. Ia adalah manifestasi kerja keras para leluhur yang berjuang menjaga ketersediaan pangan dan membangun keharmonisan bertetangga.&rdquo;
              </blockquote>
              <cite className="block text-xs font-bold uppercase tracking-wider text-emerald-700 not-italic">
                &mdash; Tetua Adat Desa Kampungsawah
              </cite>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE SEJARAH */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Lintasan Sejarah Desa</h2>
          <div className="w-12 h-1 bg-emerald-600 rounded-full mx-auto mt-3" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-emerald-200 ml-4 md:ml-32 space-y-12">
          {historyTimeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12">
              {/* Year marker */}
              <div className="absolute -left-3 md:-left-24 top-0 w-6 h-6 md:w-20 md:h-8 bg-emerald-600 rounded-full md:rounded-lg border-4 border-white md:border-0 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                <span className="hidden md:inline">{item.year}</span>
              </div>
              
              {/* Point on timeline for mobile */}
              <div className="md:hidden absolute -left-1.5 top-1.5 w-3 h-3 bg-emerald-600 rounded-full border-2 border-white" />

              <Card className="p-6 space-y-3 hover:shadow-md transition-shadow bg-white border border-gray-100 relative">
                <span className="inline-block md:hidden text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                  <Milestone className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
