"use client";

import { Heart, Landmark } from "lucide-react";
import Card from "@/components/ui/Card";
import { useHomepageConfig } from "@/lib/homepageService";

export default function HomeGreeting() {
  const { config } = useHomepageConfig();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
      <Card className="bg-gray-50/40 border-gray-200/50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-56 h-72 rounded-2xl bg-emerald-800 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-white">
            {config.headImage ? (
              <img
                src={config.headImage}
                alt={`Foto ${config.headName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <Landmark className="w-20 h-20 opacity-40 text-emerald-200" />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
              <span className="block font-bold text-sm text-white">Kepala Desa</span>
              <span className="block text-[10px] text-gray-300">{config.headName}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-8 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold border border-emerald-100">
            <Heart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sambutan hangat Kepala Desa</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {config.greetingTitle}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed text-justify">
            &quot;{config.greetingText}&quot;
          </p>
        </div>
      </Card>
    </section>
  );
}