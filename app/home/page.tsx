"use client";

import { useState } from "react"; // Add this
import Hero from "./Hero";
import About from "./About";
import Collections from "./Collections";
import Shop from "./Shop";
import Brands from "./Brand";
import NewArrivals from "./NewArrivals";
import Contact from "./Contact";
import FAQ from "./FAQ";
import { products } from "./data/products";
import FragranceFinder from "./FragranceFinder";
import { Sparkles } from "lucide-react"; // For the button icon

export default function HomePage() {
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const newArrivalsData = products.filter((p) => p.isNew);

  return (
    <main className="bg-[#FAF9F6] selection:bg-[#691C33] selection:text-white scroll-smooth">
      <Hero />
      <About />
      <Collections />
      <Shop products={products} />

      {/* --- ELEGANT DISCOVERY CTA --- */}
      <section className="py-20 bg-[#1A1A1A] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#691C33] font-bold mb-6 block">
            Olfactive Discovery
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-8 italic">
            Can't find your signature?
          </h2>
          <p className="max-w-xl mx-auto text-white/60 text-sm mb-10 leading-relaxed uppercase tracking-widest">
            Allow our digital sommelier to guide you through our collection and
            find the essence that speaks your language.
          </p>
          <button
            onClick={() => setIsFinderOpen(true)}
            className="group relative inline-flex items-center gap-3 px-10 py-5 border border-white/20 hover:border-[#691C33] transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-[11px] uppercase tracking-[0.3em]">
              Start the Scent Quiz
            </span>
            <Sparkles className="w-4 h-4 relative z-10 group-hover:text-[#691C33] transition-colors" />
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
            <span className="absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
            {/* This makes text turn black on hover */}
            <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity text-[11px] uppercase tracking-[0.3em]">
              Find My Scent
            </span>
          </button>
        </div>
        {/* Background Decorative Text */}
        <div className="absolute -bottom-10 -right-10 text-[150px] font-bold text-white/[0.02] pointer-events-none select-none">
          DISCOVER
        </div>
      </section>

      {/* --- THE QUIZ MODAL --- */}
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
