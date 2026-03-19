"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Italiana, Montserrat } from "next/font/google";
import { Plus, Check } from "lucide-react";
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "./CartProviderWrapper";
import { useState } from "react";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const products = [
  {
    id: "p1",
    name: "Oud Al-Fayed",
    category: "Signature Intense",
    price: 280.0,
    image:
      "https://images.unsplash.com/photo-1770301410072-f6ef6dad65b2?q=80&w=687&auto=format&fit=crop",
    tall: true,
  },
  {
    id: "p2",
    name: "Desert Rose",
    category: "Floral Absolute",
    price: 195.0,
    image:
      "https://images.unsplash.com/photo-1758225502621-9102d2856dc8?q=80&w=905&auto=format&fit=crop",
    tall: false,
  },
  {
    id: "p3",
    name: "Midnight In Abuja",
    category: "Smoky Woods",
    price: 310.0,
    image:
      "https://images.unsplash.com/photo-1759794108525-94ff060da692?q=80&w=1170&auto=format&fit=crop",
    tall: true,
  },
];

const Collections = () => {
  const { addToCart } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  const handleQuickAdd = (product: any) => {
    setAddingId(product.id);

    // FIX: Pass the WHOLE product object so the Bag has name, price, and image
    addToCart(product);

    if (showQuickAddToast) showQuickAddToast(product);

    setTimeout(() => setAddingId(null), 2000);
  };

  return (
    <section
      id="collection-section"
      className="py-32 bg-[#FDFBF9] relative overflow-hidden"
    >
      {/* 1. IMPROVED WELL-ROUNDED PATTERN */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-repeat bg-[length:250px]"
        style={{
          backgroundImage: "url('/pattern.png')",
          opacity: 0.03, // Ultra-faint
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span
              className={`${montserrat.className} text-[10px] tracking-[0.5em] text-[#691C33] font-bold uppercase mb-4 block`}
            >
              The Permanent Collection
            </span>
            <h2
              className={`${italiana.className} text-6xl md:text-8xl text-[#1A1A1A] leading-[0.9]`}
            >
              Iconic <span className="italic text-[#691C33]">Scents</span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ x: 10 }}
            className={`${montserrat.className} text-[10px] tracking-[0.3em] uppercase font-bold border-b border-[#691C33] pb-2 text-[#691C33] transition-all`}
          >
            View All Creations
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 items-start">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`group relative ${product.tall ? "md:mt-0" : "md:mt-24"}`}
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f1ee] shadow-sm transition-all duration-1000 group-hover:shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                  unoptimized
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    disabled={addingId === product.id}
                    className="bg-white text-black p-6 rounded-full scale-50 group-hover:scale-100 transition-all duration-500 hover:bg-[#691C33] hover:text-white active:scale-90"
                  >
                    {addingId === product.id ? (
                      <Check className="w-6 h-6 animate-in zoom-in" />
                    ) : (
                      <Plus className="w-6 h-6" />
                    )}
                  </button>
                  <span
                    className={`${montserrat.className} text-[9px] text-white uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all delay-100`}
                  >
                    Quick Add
                  </span>
                </div>

                <div className="absolute top-6 left-6 overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    className={`${montserrat.className} text-[8px] tracking-[0.3em] uppercase bg-white/95 backdrop-blur-sm px-4 py-2 text-black font-bold block`}
                  >
                    {product.category}
                  </motion.span>
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className="mt-10 px-2">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <p
                      className={`${montserrat.className} text-[9px] tracking-[0.3em] text-[#691C33] uppercase font-bold`}
                    >
                      Eau de Parfum
                    </p>
                    <h3
                      className={`${italiana.className} text-3xl text-[#1A1A1A] transition-colors duration-500 group-hover:text-[#691C33]`}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <span
                    className={`${montserrat.className} text-lg font-light text-gray-900`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="w-full h-[1px] bg-gray-200 mt-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#691C33] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
