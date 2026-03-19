"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Plus, Eye } from "lucide-react";
import ProductDetailModal from "./modals/ProductDetailsModal";
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "./CartProviderWrapper";
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
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } =
    useCart();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20 px-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: index * 0.05,
              duration: 0.8,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="group relative"
          >
            {/* 1. PRODUCT CANVAS - Rounded and Soft */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F9F8F6] rounded-[32px] transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5">
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative w-full h-full cursor-pointer overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* ACTION TOOLBAR - Floating Pills */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 translate-y-20 group-hover:translate-y-0 transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(
                      product.id,
                      product.sizes ? product.sizes[0] : "Standard",
                    );
                    showQuickAddToast(product); // THE LUXURY TOAST
                  }}
                  className="bg-white/90 backdrop-blur-md p-4 rounded-full text-[#1A1A1A] hover:bg-[#691C33] hover:text-white transition-all duration-300 shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-full text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span
                    className={`${montserrat.className} text-[10px] font-bold tracking-[0.2em] uppercase`}
                  >
                    View
                  </span>
                </button>
              </div>

              {/* WISHLIST */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product.id);
                }}
                className="absolute top-6 right-6 z-10 p-3 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-500 ${
                    isInWishlist(product.id)
                      ? "fill-[#691C33] text-[#691C33]"
                      : "text-black/40"
                  }`}
                />
              </button>

              {product.isNew && (
                <div className="absolute top-8 left-8">
                  <span
                    className={`${montserrat.className} text-[8px] tracking-[0.4em] text-[#691C33] uppercase font-bold bg-white/95 px-4 py-1.5 rounded-full shadow-sm`}
                  >
                    New
                  </span>
                </div>
              )}
            </div>

            {/* 2. PRODUCT METADATA */}
            <div className="mt-8 flex flex-col items-center text-center px-2">
              <span
                className={`${montserrat.className} text-[9px] tracking-[0.4em] text-gray-400 uppercase mb-2 font-semibold`}
              >
                {product.brand}
              </span>

              <h3
                className={`${italiana.className} text-2xl text-[#1A1A1A] mb-3 group-hover:text-[#691C33] transition-colors duration-500 leading-tight`}
              >
                {product.name}
              </h3>

              <div className="flex items-center gap-3">
                {product.salePrice ? (
                  <>
                    <span
                      className={`${montserrat.className} text-sm font-bold text-[#691C33]`}
                    >
                      ${product.salePrice}
                    </span>
                    <span
                      className={`${montserrat.className} text-xs text-gray-300 line-through`}
                    >
                      ${product.price}
                    </span>
                  </>
                ) : (
                  <span
                    className={`${montserrat.className} text-sm font-medium text-gray-600`}
                  >
                    ${product.price}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};

export default ProductGrid;
