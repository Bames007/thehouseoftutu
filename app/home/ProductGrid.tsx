"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Plus, Eye } from "lucide-react";
import ProductDetailModal from "./modals/ProductDetailsModal";
import QuickLookDrawer from "./QuickLookDrawer"; // Import the new drawer
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "../utils/toast";
import type { Product } from "./Shop";
import { Italiana, Montserrat } from "next/font/google";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } =
    useCart();

  const handleProductClick = (product: Product) => {
    // Check if mobile (simple window check or CSS media query logic)
    if (window.innerWidth < 1024) {
      setQuickViewProduct(product);
    } else {
      setSelectedProduct(product);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-10 gap-y-12 md:gap-y-20">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: index * 0.05,
              duration: 0.6,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="group relative flex flex-col"
          >
            {/* PRODUCT CANVAS */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F8F6] rounded-[24px] md:rounded-[32px] transition-all duration-500 md:group-hover:shadow-2xl md:group-hover:shadow-black/5">
              <div
                onClick={() => handleProductClick(product)}
                className="relative w-full h-full cursor-pointer overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-[2s] ease-out md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* ACTION TOOLBAR */}
              <div className="absolute bottom-3 right-3 md:bottom-8 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2 md:gap-3 md:translate-y-20 md:group-hover:translate-y-0 transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(
                      product.id,
                      product.sizes ? product.sizes[0] : "Standard",
                    );
                    showQuickAddToast(product);
                  }}
                  className="bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-full text-[#1A1A1A] hover:bg-[#691C33] hover:text-white transition-all duration-300 shadow-xl active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="hidden md:flex bg-white/95 backdrop-blur-md px-6 py-4 rounded-full text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 shadow-xl items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span
                    className={`${montserrat.className} text-[10px] font-bold tracking-[0.2em] uppercase`}
                  >
                    View
                  </span>
                </button>
              </div>

              {/* WISHLIST BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product.id);
                }}
                className="absolute top-3 right-3 md:top-6 md:right-6 z-10 p-2.5 md:p-3 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white transition-colors active:scale-90"
              >
                <Heart
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-all duration-500 ${
                    isInWishlist(product.id)
                      ? "fill-[#691C33] text-[#691C33]"
                      : "text-black/40"
                  }`}
                />
              </button>
            </div>

            {/* PRODUCT METADATA */}
            <div className="mt-5 md:mt-8 flex flex-col items-center text-center px-1">
              <span
                className={`${montserrat.className} text-[7px] md:text-[9px] tracking-[0.2em] md:tracking-[0.4em] text-gray-400 uppercase mb-1 md:mb-2 font-semibold`}
              >
                {product.brand}
              </span>
              <h3
                className={`${italiana.className} text-lg md:text-2xl text-[#1A1A1A] mb-1 md:mb-3 md:group-hover:text-[#691C33] transition-colors duration-500 leading-tight`}
              >
                {product.name}
              </h3>
              <span
                className={`${montserrat.className} text-xs md:text-sm font-medium text-gray-600`}
              >
                ${product.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Mobile Drawer */}
      <QuickLookDrawer
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default ProductGrid;
