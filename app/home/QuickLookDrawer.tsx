"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Italiana, Montserrat } from "next/font/google";
import Image from "next/image";
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "../utils/toast";
import type { Product } from "./Shop";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

interface QuickLookDrawerProps {
  product: Product | null;
  onClose: () => void;
}

const QuickLookDrawer = ({ product, onClose }: QuickLookDrawerProps) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[600] lg:hidden"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-[601] lg:hidden overflow-hidden shadow-2xl"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-5 mb-2" />

            <div className="p-8 pb-12">
              <div className="flex gap-6 mb-10">
                <div className="relative w-36 aspect-[4/5] bg-[#F9F8F6] rounded-[24px] overflow-hidden flex-shrink-0 shadow-inner">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <span
                    className={`${montserrat.className} text-[10px] tracking-[0.3em] text-[#691C33] uppercase font-bold mb-2`}
                  >
                    {product.brand}
                  </span>
                  <h3
                    className={`${italiana.className} text-4xl text-[#1A1A1A] leading-tight mb-3`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`${montserrat.className} text-xl font-bold text-[#1A1A1A]`}
                  >
                    ${product.price}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    // FIX: Passing ID and default size to avoid type error
                    addToCart(
                      product.id,
                      product.sizes ? product.sizes[0] : "Standard",
                    );
                    showQuickAddToast(product);
                    onClose();
                  }}
                  className="w-full bg-[#1A1A1A] text-white py-6 rounded-2xl text-[11px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 active:scale-[0.97] transition-all shadow-xl shadow-black/10"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>
                <button
                  className="w-full bg-white text-[#1A1A1A] py-6 rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold flex items-center justify-center border border-gray-100 active:scale-[0.97]"
                  onClick={onClose}
                >
                  Keep Browsing
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickLookDrawer;
