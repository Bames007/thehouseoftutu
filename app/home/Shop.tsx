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
  id: string;
  name: string;
  brand: string;
  category: "perfume" | "diffuser" | "gear" | "candle";
  price: number;
  salePrice?: number;
  image: string;
  scentProfile?: string[];
  origin?: string;
  history?: string;
  sizes?: string[];
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

  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, products]);

  return (
    <section
      id="shop-section"
      className="relative py-20 md:py-32 bg-[#FAF9F6] min-h-screen overflow-hidden"
    >
      {/* High-end Film Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grain.png')] mix-blend-multiply" />

      <div className="container relative z-10 mx-auto px-6">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#691C33] opacity-50" />
              <span
                className={`${montserrat.className} text-[8px] md:text-[9px] tracking-[0.4em] md:tracking-[0.6em] uppercase text-[#691C33] font-bold`}
              >
                The Collection
              </span>
            </div>
            <h2
              className={`${italiana.className} text-5xl md:text-7xl lg:text-9xl text-[#1A1A1A] leading-[1.1] lg:leading-tight`}
            >
              The <span className="italic text-[#691C33]">House of Tutu</span>
            </h2>
          </motion.div>

          {/* Luxury Filter Navigation - Touch Optimized */}
          <nav className="w-full lg:w-auto overflow-hidden">
            <div className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 md:mx-0 md:px-0">
              <div className="flex items-center gap-2 pr-6 border-r border-black/5 flex-shrink-0">
                <SlidersHorizontal className="w-3 h-3 text-[#691C33]" />
                <span
                  className={`${montserrat.className} text-[9px] uppercase tracking-widest text-gray-400 font-medium`}
                >
                  Filter
                </span>
              </div>

              <div className="flex gap-8 md:gap-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="relative py-2 group whitespace-nowrap flex-shrink-0"
                  >
                    <span
                      className={`${montserrat.className} text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
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
                        className="absolute -bottom-1 left-0 w-full h-[1.5px] md:h-[2px] bg-[#691C33]"
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
            </div>
          </nav>
        </header>

        {/* Product Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-px bg-gray-200 mb-8" />
                <p
                  className={`${italiana.className} text-2xl md:text-3xl text-gray-300 italic`}
                >
                  This curation is currently <br /> being prepared
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Master Perfumer CTA */}
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-32 md:mt-56 border-t border-black/5 pt-20 md:pt-32 flex flex-col items-center text-center"
        >
          <div className="relative mb-12 md:mb-16">
            <div className="w-px h-24 md:h-32 bg-gradient-to-b from-[#691C33] to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#691C33]" />
          </div>

          <h3
            className={`${italiana.className} text-3xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-8 md:mb-10 max-w-3xl leading-[1.2] px-4`}
          >
            Find a scent that whispers <br className="hidden md:block" />{" "}
            <span className="italic text-[#691C33]">
              the story of your soul.
            </span>
          </h3>

          <button className="group relative flex flex-col items-center">
            <span
              className={`${montserrat.className} text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-bold text-[#691C33] mb-4`}
            >
              Private Consultation
            </span>
            <div className="h-[1px] w-12 bg-[#691C33] group-hover:w-32 md:group-hover:w-48 transition-all duration-1000 ease-in-out" />
          </button>
        </motion.footer>
      </div>
    </section>
  );
};

export default Shop;
