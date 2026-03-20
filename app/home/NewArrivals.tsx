"use client";

import { motion } from "framer-motion";
import { Italiana, Montserrat } from "next/font/google";
import ProductGrid from "./ProductGrid";
import { ArrowUpRight } from "lucide-react";
// Ensuring type consistency
import type { Product } from "./Shop";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals = ({ products = [] }: NewArrivalsProps) => {
  // Slice for exclusivity
  const displayProducts = products.slice(0, 3);

  return (
    <section
      id="new"
      className="relative py-20 md:py-32 bg-white overflow-hidden"
    >
      {/* 1. LUXURY ARCHITECTURAL ACCENT */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#691C33]/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 md:w-8 h-[1px] bg-[#691C33]"></span>
              <span
                className={`${montserrat.className} text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold text-[#691C33]`}
              >
                The Seasonal Edit
              </span>
            </div>
            <h2
              className={`${italiana.className} text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] leading-[1.1] md:leading-tight`}
            >
              Les <span className="italic text-[#691C33]">Nouveautés</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <p
              className={`${montserrat.className} text-[10px] md:text-xs text-gray-400 max-w-[260px] md:max-w-[280px] leading-relaxed uppercase tracking-widest border-l border-gray-100 pl-4 md:pl-6`}
            >
              A collection of rare essences recently captured and bottled for
              the discerning.
            </p>
          </motion.div>
        </div>

        {/* 2. DYNAMIC CONTENT AREA */}
        <div className="relative">
          {/* Subtle Background Watermark - Adjusted for Tablet */}
          <div className="absolute -top-10 -right-20 pointer-events-none opacity-[0.02] select-none hidden xl:block">
            <h3
              className={`${italiana.className} text-[15rem] leading-none text-[#691C33]`}
            >
              Fresh
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {displayProducts.length > 0 ? (
              /* On mobile, ProductGrid handles its own 2-column layout. 
                 For New Arrivals, we keep it consistent with the boutique look.
              */
              <ProductGrid products={displayProducts} />
            ) : (
              <div className="py-20 text-center flex flex-col items-center">
                <div className="w-px h-12 bg-gray-100 mb-6" />
                <p
                  className={`${italiana.className} text-xl md:text-2xl text-gray-300 italic`}
                >
                  New treasures arriving soon...
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* 3. CALL TO ACTION BUTTON - Mobile Optimized Padding */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 px-8 md:px-12 py-5 md:py-6 border border-gray-100 hover:border-[#691C33] transition-all duration-500 bg-white shadow-sm hover:shadow-xl hover:shadow-[#691C33]/5"
          >
            <span
              className={`${montserrat.className} text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-500 group-hover:text-[#691C33]`}
            >
              Explore Full Collection
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-300 group-hover:text-[#691C33] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </motion.button>
        </div>
      </div>

      {/* 4. LUXURY GEOMETRIC DECOR (Responsive sizing) */}
      <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-[0.03] md:opacity-[0.05] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#691C33]">
          <path d="M0 100 L100 0 L100 100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default NewArrivals;
