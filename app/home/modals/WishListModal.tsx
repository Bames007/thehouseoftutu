"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Trash2, ShoppingCart, ArrowRight, Wind } from "lucide-react";
import Image from "next/image";
import { gothamOffice } from "@/app/utils/constant";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import { showQuickAddToast } from "@/app/utils/toast"; // Using your luxury toast
import toast from "react-hot-toast";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistModal = ({ isOpen, onClose }: WishlistModalProps) => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  // Prevent scroll when wishlist is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const wishlistItems = wishlist
    .map((item) => products.find((p) => String(p.id) === String(item.id)))
    .filter(
      (product): product is NonNullable<typeof product> => product !== null,
    );

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    toast.error("Removed from sanctuary", {
      style: {
        borderRadius: "12px",
        background: "#1A1A1A",
        color: "#fff",
        fontSize: "12px",
        letterSpacing: "0.1em",
      },
    });
  };

  const handleAddToCart = (product: any) => {
    const defaultSize = product.sizes ? product.sizes[0] : "Standard";
    addToCart(product.id, defaultSize);
    showQuickAddToast(product); // Trigger your luxury notification
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      const defaultSize = product.sizes ? product.sizes[0] : "Standard";
      addToCart(product.id, defaultSize);
    });

    // Luxury collective toast
    toast.success("Collective moved to cart", {
      icon: "✨",
      style: {
        borderRadius: "12px",
        background: "#fff",
        color: "#691C33",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "0.1em",
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[600] bg-[#1A1A1A]/60 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[601] w-full max-w-md bg-[#691C33] shadow-[-20px_0_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col"
          >
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Heart className="w-6 h-6 text-white fill-white/20 animate-pulse" />
                    <Wind className="absolute -top-1 -right-1 w-3 h-3 text-white/60" />
                  </div>
                  <div>
                    <h2
                      className={`${gothamOffice.className} text-xl font-bold text-white tracking-tight uppercase`}
                    >
                      Sanctuary
                    </h2>
                    <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] mt-1">
                      {wishlistItems.length} curated{" "}
                      {wishlistItems.length === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="group p-2 bg-white/5 hover:bg-white rounded-full transition-all duration-500"
                >
                  <X className="w-5 h-5 text-white group-hover:text-[#691C33] transition-colors" />
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {wishlistItems.length > 0 ? (
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      show: { transition: { staggerChildren: 0.12 } },
                    }}
                  >
                    {wishlistItems.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          show: { opacity: 1, x: 0 },
                        }}
                        className="group relative flex gap-4 bg-white/5 hover:bg-white/[0.08] p-4 rounded-2xl border border-white/5 transition-all duration-500"
                      >
                        <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 shadow-lg">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>

                        <div className="flex-1 py-1">
                          <p className="text-white/30 text-[8px] uppercase tracking-[0.3em] mb-1 font-bold">
                            {item.brand}
                          </p>
                          <h3 className="text-white text-sm font-medium tracking-wide mb-3">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold text-sm">
                              ${item.salePrice || item.price}
                            </span>
                            {item.salePrice && (
                              <span className="text-white/30 text-xs line-through">
                                ${item.price}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between items-end pb-1">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2 text-white/20 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleAddToCart(item)}
                            className="bg-white/10 hover:bg-white p-3 rounded-xl text-white hover:text-[#691C33] transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-8">
                    <div className="relative mb-8">
                      <Heart className="w-16 h-16 text-white/5 stroke-[1px]" />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute inset-0 bg-white/5 blur-2xl rounded-full"
                      />
                    </div>
                    <h3 className="text-white font-bold text-sm uppercase tracking-[0.4em] mb-3">
                      Empty Sanctuary
                    </h3>
                    <p className="text-white/40 text-[11px] leading-relaxed font-light mb-10">
                      Your scent wishlist awaits its first masterpiece. Discover
                      the collection to find your next olfactory signature.
                    </p>
                    <button
                      onClick={onClose}
                      className="w-full py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-[#691C33] transition-all duration-700 rounded-full"
                    >
                      Browse Collection
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              {wishlistItems.length > 0 && (
                <div className="p-8 bg-black/20 border-t border-white/5">
                  <button
                    onClick={handleAddAllToCart}
                    className="w-full bg-white text-[#691C33] py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
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
