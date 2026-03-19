"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { gothamOffice, italiana } from "@/app/utils/constant";
import { useCart } from "../context/CartContext";
import { products } from "../data/products"; // Ensure this path points to your new 20 products
import { useRouter } from "next/navigation";

const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();
  const router = useRouter();

  // Link cart items with full product data
  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product
        ? { ...product, quantity: item.quantity, selectedSize: item.size }
        : null;
    })
    .filter((item): item is any => item !== null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0,
  );

  const FREE_SHIPPING_THRESHOLD = 200;
  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[151] w-full max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#691C33]" />
                  <h2
                    className={`${italiana.className} text-3xl text-[#1A1A1A]`}
                  >
                    Your <span className="italic">Bag</span>
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:rotate-90 transition-transform duration-300"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {cartItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-[#691C33]">
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? "Complimentary"
                        : `$${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} away from free shipping`}
                    </span>
                  </div>
                  <div className="h-[3px] w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${shippingProgress}%` }}
                      className="h-full bg-[#691C33]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#FAF9F6]">
              {cartItems.length > 0 ? (
                <div className="space-y-10">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}`}
                      layout
                      className="flex gap-6"
                    >
                      <div className="relative w-24 h-32 bg-white flex-shrink-0 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h3
                            className={`${gothamOffice.className} text-[11px] uppercase tracking-widest font-bold text-[#1A1A1A]`}
                          >
                            {item.name}
                          </h3>
                          <button
                            onClick={() =>
                              removeFromCart(item.id, item.selectedSize)
                            }
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter mb-4">
                          {item.brand}{" "}
                          {item.selectedSize && `• ${item.selectedSize}`}
                        </p>

                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-4 border border-black/5 bg-white px-3 py-1.5 rounded-full">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.selectedSize,
                                  -1,
                                )
                              }
                              className="text-gray-400 hover:text-black"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.selectedSize,
                                  1,
                                )
                              }
                              className="text-gray-400 hover:text-black"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            $
                            {(
                              (item.salePrice || item.price) * item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-30">
                  <ShoppingBag className="w-12 h-12 mb-4 stroke-1" />
                  <p className="uppercase text-[10px] tracking-[0.3em]">
                    Your bag is empty
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-white border-t border-black/5">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Subtotal
                  </span>
                  <span
                    className={`${italiana.className} text-4xl text-[#1A1A1A]`}
                  >
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    router.push("/checkout");
                  }}
                  className="w-full bg-[#1A1A1A] text-white py-6 rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-[#691C33] transition-colors duration-500"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
