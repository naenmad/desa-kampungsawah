import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

export type NewsItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  slug: string;
  description: string;
};

type HomeNewsProps = {
  latestNews: NewsItem[];
};

export default function HomeNews({ latestNews }: HomeNewsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <SectionHeading
          title="Seputar Kabar Desa"
          description="Ikuti transparansi program kerja, berita pembangunan ekonomi, dan agenda sosial terkini warga."
        />
        <Link href="/berita" className="group text-emerald-600 font-bold text-sm flex items-center space-x-1 hover:text-emerald-700 shrink-0">
          <span>Lihat Semua Berita</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestNews.map((news) => (
          <Card key={news.id} className="bg-gray-50/40 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                  {news.category}
                </span>
                <span className="text-gray-400 font-medium">{news.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                <Link href={`/berita/${news.slug}`}>{news.title}</Link>
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                {news.description}
              </p>
            </div>
            <div className="px-6 pb-6 pt-2 border-t border-gray-50">
              <Link
                href={`/berita/${news.slug}`}
                className="text-gray-700 font-bold text-xs hover:text-emerald-600 flex items-center space-x-1 group/btn"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}