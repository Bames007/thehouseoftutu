"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Italiana, Montserrat } from "next/font/google";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import ProductGrid from "./ProductGrid";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export interface Product {
  id: string; // FIXED: Changed from number to string
  name: string;
  brand: string;
  category: "perfume" | "diffuser" | "gear" | "candle"; // Added candle to match your new data
  price: number;
  salePrice?: number;
  image: string;
  scentProfile?: string[];
  origin?: string;
  history?: string;
  sizes?: string[]; // Changed to string array to handle "50ml" or "Universal"
  notes?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  isNew?: boolean;
  description?: string;
}

interface ShopProps {
  products: Product[];
}

const categories = ["all", "perfume", "diffuser", "gear", "candle"] as const;

const Shop = ({ products = [] }: ShopProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("all");

  // Performance optimization: memoize filtered results
  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <section
      id="shop-section"
      className="relative py-32 bg-[#FAF9F6] min-h-screen overflow-hidden"
    >
      {/* High-end Film Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grain.png')] mix-blend-multiply" />

      <div className="container relative z-10 mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-4 h-4 text-[#691C33] opacity-50" />
              <span
                className={`${montserrat.className} text-[9px] tracking-[0.6em] uppercase text-[#691C33] font-bold`}
              >
                The Collection
              </span>
            </div>
            <h2
              className={`${italiana.className} text-6xl md:text-9xl text-[#1A1A1A] leading-tight`}
            >
              The <span className="italic text-[#691C33]">House of Tutu</span>
            </h2>
          </motion.div>

          {/* Luxury Filter Navigation */}
          <nav className="flex items-center gap-10 overflow-x-auto pb-4 no-scrollbar w-full md:w-auto">
            <div className="flex items-center gap-3 pr-6 border-r border-black/5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#691C33]" />
              <span
                className={`${montserrat.className} text-[10px] uppercase tracking-widest text-gray-400 font-medium`}
              >
                Filter
              </span>
            </div>

            <div className="flex gap-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="relative py-2 group whitespace-nowrap"
                >
                  <span
                    className={`${montserrat.className} text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500 ${
                      selectedCategory === cat
                        ? "text-[#691C33]"
                        : "text-gray-300 hover:text-black"
                    }`}
                  >
                    {cat}
                  </span>
                  {selectedCategory === cat && (
                    <motion.div
                      layoutId="atelier-underline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#691C33]"
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </nav>
        </header>

        {/* Product Display with Entrance Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-px bg-gray-200 mb-8" />
                <p
                  className={`${italiana.className} text-3xl text-gray-300 italic`}
                >
                  This curation is currently <br /> being prepared
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Master Perfumer CTA */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mt-56 border-t border-black/5 pt-32 flex flex-col items-center text-center"
        >
          <div className="relative mb-16">
            <div className="w-px h-32 bg-gradient-to-b from-[#691C33] to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#691C33]" />
          </div>

          <h3
            className={`${italiana.className} text-4xl md:text-6xl text-[#1A1A1A] mb-10 max-w-3xl leading-[1.1]`}
          >
            Find a scent that whispers <br />{" "}
            <span className="italic text-[#691C33] font-serif">
              the story of your soul.
            </span>
          </h3>

          <button className="group relative pt-4 flex flex-col items-center">
            <span
              className={`${montserrat.className} text-[10px] tracking-[0.6em] uppercase font-bold text-[#691C33] mb-4`}
            >
              Private Consultation
            </span>
            <div className="h-[1px] w-12 bg-[#691C33] group-hover:w-48 transition-all duration-1000 ease-in-out" />
          </button>
        </motion.footer>
      </div>
    </section>
  );
};

export default Shop;
