"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import { gothamOffice } from "@/app/utils/constant";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import toast from "react-hot-toast";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistModal = ({ isOpen, onClose }: WishlistModalProps) => {
  // Destructured addToCart and other methods from useCart
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  // FIXED: Comparison now uses string IDs (p.id === item.id)
  const wishlistItems = wishlist
    .map((item) => products.find((p) => String(p.id) === String(item.id)))
    .filter(
      (product): product is NonNullable<typeof product> => product !== null,
    );

  // FIXED: Parameter type changed to string
  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    toast.error("Removed from wishlist", {
      style: {
        borderRadius: "0px",
        background: "#1A1A1A",
        color: "#fff",
        fontSize: "12px",
      },
    });
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      // FIXED: Added a fallback for the size parameter
      const defaultSize = product.sizes ? product.sizes[0] : "Standard";
      addToCart(product.id, defaultSize);
    });
    toast.success("Everything moved to your cart!", {
      icon: "✨",
      style: {
        borderRadius: "0px",
        background: "#fff",
        color: "#691C33",
        fontSize: "12px",
        fontWeight: "bold",
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          <motion.div
            key="modal"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-[#691C33] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Elegant Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-white/10 rounded-full">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <h2
                      className={`${gothamOffice.className} text-xl font-bold text-white tracking-tight`}
                    >
                      My Favorites
                    </h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                      {wishlistItems.length} curated{" "}
                      {wishlistItems.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {wishlistItems.length > 0 ? (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="space-y-6"
                  >
                    {wishlistItems.map((item) => (
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          show: { opacity: 1, y: 0 },
                        }}
                        key={item.id}
                        className="group flex gap-5 bg-white/5 hover:bg-white/[0.08] border border-white/5 p-4 transition-all duration-500"
                      >
                        <div className="relative w-20 h-24 bg-white/10 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                          <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] mb-1">
                            {item.brand}
                          </p>
                          <h3 className="text-white text-sm font-bold tracking-wide mb-2">
                            {item.name}
                          </h3>
                          <p className="text-white/80 font-medium text-sm">
                            ${item.salePrice || item.price}
                          </p>
                        </div>

                        <div className="flex flex-col justify-between items-end">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-white/20 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              addToCart(
                                item.id,
                                item.sizes ? item.sizes[0] : "Standard",
                              );
                              toast.success("Added to cart");
                            }}
                            className="bg-white/10 hover:bg-white p-2 rounded-full text-white hover:text-[#691C33] transition-all duration-300"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Heart className="w-12 h-12 text-white/10 mb-6 stroke-[1px]" />
                    <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-widest">
                      Empty Sanctuary
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed max-w-[240px] mb-8">
                      Your scent wishlist is currently empty. Explore our
                      collection to find your next signature aroma.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-[#691C33] transition-all duration-500"
                    >
                      Explore Fragrances
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-8 border-t border-white/10 bg-black/10">
                  <button
                    onClick={handleAddAllToCart}
                    className="w-full bg-white text-[#691C33] py-5 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-opacity-90 transition-all flex items-center justify-center gap-3 shadow-2xl"
                  >
                    Move All to Cart <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistModal;
