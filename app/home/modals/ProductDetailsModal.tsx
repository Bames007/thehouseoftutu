"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Wind, Sparkles, MapPin, Info } from "lucide-react";
import Image from "next/image";
import { Italiana, Montserrat } from "next/font/google";
import { Product } from "../Shop";
import { useCart } from "../context/CartContext";
import { showQuickAddToast } from "../CartProviderWrapper";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product.id, product.sizes ? product.sizes[0] : "Standard");
    showQuickAddToast(product); // Using your custom luxury toast
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 lg:p-12">
        {/* Backdrop: Ultra-soft blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur-md rounded-full text-black hover:bg-[#691C33] hover:text-white transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT SIDE: Image Gallery Style */}
          <div className="relative w-full md:w-[50%] p-6 md:p-8 flex items-center justify-center bg-[#F9F8F6]">
            <div className="relative w-full h-[400px] md:h-full min-h-[500px] overflow-hidden rounded-[24px] shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              {product.isNew && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                  <span
                    className={`${montserrat.className} text-[9px] font-bold tracking-[0.2em] text-[#691C33] uppercase`}
                  >
                    New Arrival
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Content */}
          <div className="w-full md:w-[50%] p-8 md:p-12 lg:p-16 overflow-y-auto bg-white flex flex-col">
            <header className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#691C33]" />
                <span
                  className={`${montserrat.className} text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold`}
                >
                  {product.brand}
                </span>
              </div>

              <h2
                className={`${italiana.className} text-5xl lg:text-7xl text-[#1A1A1A] leading-tight mb-4`}
              >
                {product.name}
              </h2>

              <div className="flex items-baseline gap-4">
                <p
                  className={`${montserrat.className} text-2xl font-medium text-[#1A1A1A]`}
                >
                  ${product.salePrice || product.price}
                </p>
                {product.salePrice && (
                  <p
                    className={`${montserrat.className} text-lg text-gray-300 line-through`}
                  >
                    ${product.price}
                  </p>
                )}
              </div>
            </header>

            {/* Product Details Tabs Style */}
            <div className="space-y-8 flex-grow">
              <section>
                <h3
                  className={`${montserrat.className} text-[11px] uppercase tracking-widest font-bold text-[#691C33] mb-3 flex items-center gap-2`}
                >
                  <Info className="w-3 h-3" /> The Story
                </h3>
                <p
                  className={`${montserrat.className} text-[14px] leading-relaxed text-gray-500 font-light`}
                >
                  {product.history ||
                    "An evocative blend designed for those who appreciate the finer notes of life."}
                </p>
              </section>

              {product.notes && (
                <section className="bg-gray-50 p-6 rounded-[20px]">
                  <h3
                    className={`${montserrat.className} text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-4 flex items-center gap-2`}
                  >
                    <Wind className="w-3.5 h-3.5" /> Scent Architecture
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-wrap gap-2">
                      {product.notes.top.map((note, i) => (
                        <span
                          key={`top-${i}`}
                          className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-white border border-black/5 rounded-full text-gray-600"
                        >
                          Top: {note}
                        </span>
                      ))}
                      {product.notes.heart.map((note, i) => (
                        <span
                          key={`heart-${i}`}
                          className="text-[10px] uppercase tracking-wider px-3 py-1.5 bg-white border border-black/5 rounded-full text-gray-600"
                        >
                          Heart: {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {product.origin && (
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span
                    className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em]`}
                  >
                    Origin: {product.origin}
                  </span>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#1A1A1A] hover:bg-[#691C33] text-white py-6 rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 transform active:scale-[0.98] shadow-xl hover:shadow-[#691C33]/20"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  className={`${montserrat.className} text-[11px] uppercase tracking-[0.4em] font-bold`}
                >
                  Add to Collection
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
