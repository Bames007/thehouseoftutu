"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, AirVent } from "lucide-react";
import { Italiana, Montserrat } from "next/font/google";
import Hero from "./Hero";
import About from "./About";
import Collections from "./Collections";
import Shop from "./Shop";
import Brands from "./Brand";
import NewArrivals from "./NewArrivals";
import Contact from "./Contact";
import FAQ from "./FAQ";
import FragranceFinder from "./FragranceFinder";
import { products } from "./data/products";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function HomePage() {
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const newArrivalsData = products.filter((p) => p.isNew);

  return (
    <main className="bg-[#FAF9F6] selection:bg-[#691C33] selection:text-white scroll-smooth overflow-x-hidden">
      <Hero />
      <About />
      <Collections />
      <Shop products={products} />

      {/* --- ELEGANT DISCOVERY CTA --- */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <span
            className={`${montserrat.className} text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-[#691C33] font-bold mb-6 block`}
          >
            Olfactive Discovery
          </span>
          <h2
            className={`${italiana.className} text-4xl md:text-6xl font-light mb-8 italic leading-tight`}
          >
            Can't find your <span className="text-white/90">signature?</span>
          </h2>
          <p
            className={`${montserrat.className} max-w-xl mx-auto text-white/50 text-[10px] md:text-xs mb-10 leading-loose uppercase tracking-[0.2em] px-4`}
          >
            Allow our digital sommelier to guide you through our collection and
            find the essence that speaks your language.
          </p>

          <button
            onClick={() => setIsFinderOpen(true)}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 hover:border-white transition-all duration-500 overflow-hidden active:scale-95"
          >
            {/* Main Label */}
            <span className="relative z-10 text-[10px] md:text-[11px] uppercase tracking-[0.3em] group-hover:text-black transition-colors duration-500 font-bold">
              Start the Scent Quiz
            </span>
            <AirVent className="w-4 h-4 relative z-10 group-hover:text-black transition-colors duration-500" />

            {/* Sliding Background */}
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </div>

        {/* Background Decorative Text - Scaled for Viewport */}
        <div className="absolute -bottom-4 md:-bottom-10 -right-6 md:-right-10 text-[80px] md:text-[150px] lg:text-[200px] font-bold text-white/[0.03] pointer-events-none select-none leading-none">
          DISCOVER
        </div>
      </section>

      <FragranceFinder
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
      />
      <Brands />
      <NewArrivals products={newArrivalsData} />
      <Contact />
      <FAQ />
    </main>
  );
}
