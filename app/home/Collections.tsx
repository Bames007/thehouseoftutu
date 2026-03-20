"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Italiana, Montserrat } from "next/font/google";
import { Plus, Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "../utils/toast";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

// 1. Defined Categories with Counts
const categories = [
  { id: "all", label: "All", count: 24 },
  { id: "signature", label: "Signature Intense", count: 8 },
  { id: "floral", label: "Floral Absolute", count: 6 },
  { id: "smoky", label: "Smoky Woods", count: 5 },
  { id: "oud", label: "Oud Series", count: 5 },
];

const products = [
  {
    id: "p1",
    name: "Oud Al-Fayed",
    category: "Signature Intense",
    price: 280.0,
    image: "/logo3.jpeg",
    tall: true,
  },
  {
    id: "p2",
    name: "Desert Rose",
    category: "Floral Absolute",
    price: 195.0,
    image: "/logo4.jpeg",
    tall: false,
  },
  {
    id: "p3",
    name: "Midnight In Abuja",
    category: "Smoky Woods",
    price: 310.0,
    image: "/logo5.jpeg",
    tall: true,
  },
];

const Collections = () => {
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleQuickAdd = (product: any) => {
    setAddingId(product.id);
    addToCart(product.id, "Standard");
    if (showQuickAddToast) showQuickAddToast(product);
    setTimeout(() => setAddingId(null), 2000);
  };

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF9] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* HEADER & FILTER AREA */}
        <div className="flex flex-col gap-12 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span
                className={`${montserrat.className} text-[10px] tracking-[0.4em] text-[#691C33] font-bold uppercase mb-4 block`}
              >
                The Permanent Collection
              </span>
              <h2
                className={`${italiana.className} text-6xl md:text-8xl text-[#1A1A1A] leading-[0.9]`}
              >
                Iconic <span className="italic text-[#691C33]">Scents</span>
              </h2>
            </motion.div>
          </div>

          {/* LUXURY FILTER SCROLLBAR WITH COUNTERS */}
          <div className="relative -mx-6 px-6 border-b border-gray-100">
            <div className="flex overflow-x-auto gap-8 no-scrollbar pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group relative flex items-center gap-2 pb-4 transition-all"
                >
                  <span
                    className={`${montserrat.className} text-[11px] tracking-[0.2em] uppercase font-bold whitespace-nowrap transition-colors duration-300 ${activeCategory === cat.id ? "text-[#1A1A1A]" : "text-gray-400 group-hover:text-gray-600"}`}
                  >
                    {cat.label}
                  </span>

                  {/* The Counter Bubble */}
                  <span
                    className={`${montserrat.className} text-[9px] w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-500 ${activeCategory === cat.id ? "bg-[#691C33] text-white border-[#691C33]" : "bg-transparent text-gray-300 border-gray-200"}`}
                  >
                    {cat.count}
                  </span>

                  {/* Animated Active Line */}
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#691C33]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group ${product.tall ? "" : "lg:mt-24"}`}
            >
              {/* IMAGE WRAPPER */}
              <div className="relative aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden shadow-sm transition-all duration-700 hover:shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />

                {/* Mobile/iPad Floating Quick-Add */}
                <div className="absolute bottom-6 right-6 z-20">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className={`p-4 rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${addingId === product.id ? "bg-[#691C33] text-white" : "bg-white text-black hover:bg-[#691C33] hover:text-white"}`}
                  >
                    {addingId === product.id ? (
                      <Check size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </button>
                </div>

                <div className="absolute top-6 left-6">
                  <span
                    className={`${montserrat.className} text-[8px] tracking-widest uppercase bg-white/90 backdrop-blur px-3 py-1.5 font-bold text-black`}
                  >
                    {product.category}
                  </span>
                </div>
              </div>

              {/* PRODUCT META */}
              <div className="mt-8 px-2 flex justify-between items-start">
                <div>
                  <p
                    className={`${montserrat.className} text-[9px] tracking-[0.3em] text-[#691C33] uppercase font-bold mb-2`}
                  >
                    Signature Series
                  </p>
                  <h3
                    className={`${italiana.className} text-3xl text-[#1A1A1A] group-hover:text-[#691C33] transition-colors`}
                  >
                    {product.name}
                  </h3>
                </div>
                <span className={`${montserrat.className} text-lg font-light`}>
                  ${product.price.toFixed(0)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
