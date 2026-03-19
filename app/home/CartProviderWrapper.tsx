"use client";
import { CartProvider } from "./context/CartContext";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";

// --- THE LUXURY "FOOD" TOAST ---
export const showQuickAddToast = (product: any) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible
            ? "animate-in fade-in slide-in-from-bottom-5"
            : "animate-out fade-out slide-out-to-bottom-5"
        } max-w-sm w-full bg-white/95 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] 
        rounded-[24px] pointer-events-auto flex items-center p-3 border border-white/20`}
      >
        {/* Rounded Image Container */}
        <div className="flex-shrink-0 h-20 w-16 relative overflow-hidden rounded-[16px] shadow-sm bg-[#F3F2F0]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="ml-4 flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-3 h-3 text-[#691C33]" />
            <span className="text-[9px] font-bold text-[#691C33] uppercase tracking-[0.2em]">
              Added to Bag
            </span>
          </div>
          <p className="text-[13px] font-semibold text-black leading-tight truncate max-w-[150px]">
            {product.name}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider font-medium">
            {product.brand}
          </p>
        </div>

        {/* Action Area */}
        <div className="flex flex-col items-center ml-2 pl-3 border-l border-gray-100">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="p-2 text-gray-300 hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    {
      duration: 3500,
      position: "bottom-right",
    },
  );
};

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="bottom-right"
        gutter={20} // Added more space between multiple toasts
        toastOptions={{
          className: "luxury-toast-container",
        }}
      />
    </CartProvider>
  );
}
