"use client";

import { motion } from "framer-motion";
import { Italiana, Montserrat } from "next/font/google";
import ProductGrid from "./ProductGrid";
import { ArrowUpRight } from "lucide-react";
// 1. Importing the interface from Shop to ensure type consistency
import type { Product } from "./Shop";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

// 2. Define the interface so the Home Page can pass the 'products' prop
interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals = ({ products = [] }: NewArrivalsProps) => {
  // We only display the first 3 for that "Exclusive Boutique" feel
  const displayProducts = products.slice(0, 3);

  return (
    <section id="new" className="relative py-32 bg-white overflow-hidden">
      {/* 1. LUXURY ARCHITECTURAL ACCENT (Top border gradient) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#691C33]/20 to-transparent" />

      <div className="container mx-auto px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#691C33]"></span>
              <span
                className={`${montserrat.className} text-[10px] tracking-[0.4em] uppercase font-bold text-[#691C33]`}
              >
                The Seasonal Edit
              </span>
            </div>
            <h2
              className={`${italiana.className} text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1]`}
            >
              Les <span className="italic">Nouveautés</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${montserrat.className} text-xs text-gray-400 max-w-[280px] leading-relaxed uppercase tracking-widest pb-2`}
          >
            A collection of rare essences recently captured and bottled for the
            discerning.
          </motion.p>
        </div>

        {/* 2. DYNAMIC CONTENT AREA */}
        <div className="relative">
          {/* Subtle Background Watermark */}
          <div className="absolute -top-10 -right-20 pointer-events-none opacity-[0.02] select-none hidden lg:block">
            <h3
              className={`${italiana.className} text-[15rem] leading-none text-[#691C33]`}
            >
              Fresh
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Injecting the filtered products into the high-end grid */}
            {displayProducts.length > 0 ? (
              <ProductGrid products={displayProducts} />
            ) : (
              <div className="py-20 text-center">
                <p
                  className={`${italiana.className} text-2xl text-gray-300 italic`}
                >
                  New treasures arriving soon...
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* 3. CALL TO ACTION BUTTON */}
        <div className="mt-20 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="group relative flex items-center gap-4 px-12 py-6 border border-gray-100 hover:border-[#691C33] transition-all duration-500"
          >
            <span
              className={`${montserrat.className} text-[11px] font-bold uppercase tracking-[0.5em] text-gray-500 group-hover:text-[#691C33]`}
            >
              Explore the full Collection
            </span>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#691C33] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </motion.button>
        </div>
      </div>

      {/* 4. LUXURY GEOMETRIC DECOR (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#691C33]">
          <path d="M0 100 L100 0 L100 100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default NewArrivals;
