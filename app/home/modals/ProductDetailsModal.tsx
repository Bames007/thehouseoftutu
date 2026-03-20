"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Wind, MapPin } from "lucide-react";
import Image from "next/image";
import { Italiana, Montserrat } from "next/font/google";
import { Product } from "../Shop";
import { useCart } from "../context/CartContext";
import { showQuickAddToast } from "@/app/utils/toast";

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product.id, product.sizes ? product.sizes[0] : "Standard");
    showQuickAddToast(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[400] flex items-center justify-center p-0 md:p-6 lg:p-12">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-6xl bg-white md:rounded-[40px] shadow-2xl overflow-hidden h-full md:h-auto max-h-screen md:max-h-[85vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[500] p-3 bg-white/90 backdrop-blur-md rounded-full text-black shadow-lg hover:bg-[#691C33] hover:text-white transition-all duration-500 active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>

          {/* LEFT SIDE: Visuals */}
          <div className="relative w-full md:w-[45%] lg:w-[50%] bg-[#F9F8F6] flex items-center justify-center">
            <div className="relative w-full aspect-square md:aspect-auto md:h-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
              {product.isNew && (
                <div className="absolute top-8 left-8 bg-[#691C33] text-white px-6 py-2 rounded-full shadow-xl">
                  <span
                    className={`${montserrat.className} text-[10px] font-bold tracking-[0.3em] uppercase`}
                  >
                    New Arrival
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Information */}
          <div className="w-full md:w-[55%] lg:w-[50%] p-8 md:p-12 lg:p-16 overflow-y-auto bg-white flex flex-col">
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-[#691C33]" />
                <span
                  className={`${montserrat.className} text-[10px] tracking-[0.4em] uppercase text-[#691C33] font-bold`}
                >
                  {product.brand || "House Collection"}
                </span>
              </div>

              <h2
                className={`${italiana.className} text-4xl lg:text-6xl text-[#1A1A1A] leading-tight mb-6`}
              >
                {product.name}
              </h2>

              <div className="flex items-center gap-4 mb-10">
                <span
                  className={`${montserrat.className} text-3xl font-light text-[#1A1A1A]`}
                >
                  ${product.salePrice || product.price}
                </span>
                {product.salePrice && (
                  <span
                    className={`${montserrat.className} text-lg text-gray-300 line-through`}
                  >
                    ${product.price}
                  </span>
                )}
              </div>

              <div className="mb-10">
                <h3
                  className={`${montserrat.className} text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4`}
                >
                  The Experience
                </h3>
                <p
                  className={`${montserrat.className} text-base leading-relaxed text-gray-600 font-light italic`}
                >
                  "
                  {product.history ||
                    "A masterful composition that balances traditional heritage with contemporary olfactory art."}
                  "
                </p>
              </div>

              {/* Scent Architecture */}
              {product.notes && (
                <div className="grid grid-cols-1 gap-4 bg-[#FAF9F6] p-8 rounded-3xl mb-8">
                  <h3
                    className={`${montserrat.className} text-[11px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] mb-2 flex items-center gap-2`}
                  >
                    <Wind className="w-4 h-4 text-[#691C33]" /> Olfactive Notes
                  </h3>
                  [Image of fragrance pyramid notes]
                  <div className="space-y-4">
                    {product.notes.top && (
                      <div>
                        <p
                          className={`${montserrat.className} text-[9px] uppercase tracking-widest text-[#691C33] font-bold mb-2`}
                        >
                          Top Notes
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.notes.top.join(", ")}
                        </p>
                      </div>
                    )}
                    <div className="w-full h-[1px] bg-gray-200" />
                    {product.notes.heart && (
                      <div>
                        <p
                          className={`${montserrat.className} text-[9px] uppercase tracking-widest text-[#691C33] font-bold mb-2`}
                        >
                          Heart Notes
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.notes.heart.join(", ")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {product.origin && (
                <div className="flex items-center gap-2 text-gray-400 mb-10">
                  <MapPin className="w-3.5 h-3.5" />
                  <span
                    className={`${montserrat.className} text-[10px] uppercase tracking-[0.2em] font-medium`}
                  >
                    Distilled in {product.origin}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-[#1A1A1A] text-white py-6 rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 hover:bg-[#691C33] active:scale-95 group shadow-xl"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
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
