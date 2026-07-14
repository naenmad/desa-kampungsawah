import SectionHeading from "@/components/ui/SectionHeading";

export default function HomeMap() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white space-y-8">
      <SectionHeading
        title="Geografis Peta Wilayah Desa"
        description="Visualisasi lokasi geografis resmi Desa Kampungsawah, Kecamatan Jayakerta, Kabupaten Karawang."
      />
      <div className="w-full h-[400px] rounded-3xl border border-gray-200/80 overflow-hidden shadow-md group">
        <iframe
          src="https://www.google.com/maps?q=Desa%20Kampungsawah%2C%20Jayakerta%2C%20Karawang&z=13&output=embed"
          title="Peta Desa Kampungsawah"
          className="w-full h-full border-0 transition-all duration-700"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="text-xs text-gray-400">
        Jika peta tidak tampil, buka langsung di{" "}
        <a href="https://www.google.com/maps?q=Desa+Kampungsawah,+Jayakerta,+Karawang" target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">
          Google Maps
        </a>.
      </p>
    </section>
  );
}