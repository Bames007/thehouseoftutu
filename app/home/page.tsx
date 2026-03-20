"use client";

import { useState } from "react";
import { AirVent } from "lucide-react";
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

      <div id="about">
        <About />
      </div>

      <div id="collections">
        <Collections />
      </div>

      <div id="shop">
        <Shop products={products} />
      </div>

      {/* DISCOVERY SECTION */}
      <section
        id="discovery"
        className="py-20 md:py-32 bg-[#1A1A1A] text-white overflow-hidden relative"
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <span
            className={`${montserrat.className} text-[10px] tracking-[0.5em] uppercase text-[#691C33] font-bold mb-6 block`}
          >
            Olfactive Discovery
          </span>
          <h2
            className={`${italiana.className} text-4xl md:text-6xl font-light mb-8 italic`}
          >
            Can't find your signature?
          </h2>
          <button
            onClick={() => setIsFinderOpen(true)}
            className="group relative inline-flex items-center gap-3 px-10 py-5 border border-white/20 hover:border-white transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-[11px] uppercase tracking-[0.3em] group-hover:text-black font-bold">
              Start the Scent Quiz
            </span>
            <AirVent className="w-4 h-4 relative z-10 group-hover:text-black" />
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </section>

      <FragranceFinder
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
      />

      <Brands />

      <div id="new-arrivals">
        <NewArrivals products={newArrivalsData} />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <FAQ />
    </main>
  );
}
