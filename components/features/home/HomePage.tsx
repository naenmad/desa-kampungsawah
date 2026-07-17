"use client";

import HomeGreeting from "@/components/features/home/HomeGreeting";
import HomeHero from "@/components/features/home/HomeHero";
import HomeMap from "@/components/features/home/HomeMap";
import HomeNews from "@/components/features/home/HomeNews";
import HomeServices from "@/components/features/home/HomeServices";
import HomeStats from "@/components/features/home/HomeStats";
import StrukturOrganisasi from "@/components/features/StrukturOrganisasi";
import SectionHeading from "@/components/ui/SectionHeading";
import { useNewsList } from "@/lib/newsService";

export default function HomePage() {
  const { news } = useNewsList();
  const latestNews = news.slice(0, 3);

  return (
    <div className="space-y-20 pb-20 bg-white">
      <HomeHero />
      <HomeStats />
      <HomeGreeting />
      <HomeServices />
 
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white space-y-10">
        <SectionHeading
          align="center"
          title="Struktur Aparatur Pemerintah Desa"
          description="Bagan hierarki komando pelayanan 9 Kepala Seksi (Kasi), Kaur, beserta Kepala Urusan Kewilayahan Dusun."
          className="mx-auto"
        />
        <div className="w-full">
          <StrukturOrganisasi />
        </div>
      </section>
 
      <HomeNews latestNews={latestNews} />
      <HomeMap />
    </div>
  );
}