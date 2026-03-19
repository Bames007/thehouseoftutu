"use client";

import { useCart } from "../home/context/CartContext";
import { products } from "../home/data/products";
import { Product } from "../home/Shop";
import Image from "next/image";
import Link from "next/link";
import { italiana } from "@/app/utils/constant";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ChevronLeft, Lock, Truck } from "lucide-react";

type CartItemWithDetails = Product & {
  quantity: number;
  size: number | undefined;
};

// Interface for the custom Input component
interface FloatingInputProps {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return {
        ...product,
        quantity: item.quantity,
        size: item.size,
      };
    })
    .filter((item): item is CartItemWithDetails => item !== null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Artificial delay for luxury feel
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Order confirmed. Welcome to the House of Tutu.");
    clearCart();
    router.push("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center py-12">
        <div className="text-center px-4">
          <h1 className={`${italiana.className} text-5xl text-[#691C33] mb-6`}>
            Your Selection is Empty
          </h1>
          <Link
            href="/#shop"
            className="inline-block border border-[#691C33] text-[#691C33] px-10 py-4 uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-[#691C33] hover:text-white transition-all duration-500"
          >
            Return to Boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/#shop"
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#691C33] mb-12 transition-colors"
        >
          <ChevronLeft className="w-3 h-3" /> Back to Boutique
        </Link>

        <h1
          className={`${italiana.className} text-5xl md:text-6xl text-[#1A1A1A] mb-12`}
        >
          Secure <span className="italic text-[#691C33]">Checkout</span>
        </h1>

        <div className="grid lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <section>
                <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-gray-200" /> Delivery Information
                </h2>
                <div className="grid gap-6">
                  <FloatingInput
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                  />
                  <FloatingInput
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                  />
                  <FloatingInput
                    label="Address"
                    required
                    value={formData.address}
                    onChange={(v) => setFormData({ ...formData, address: v })}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <FloatingInput
                      label="City"
                      required
                      value={formData.city}
                      onChange={(v) => setFormData({ ...formData, city: v })}
                    />
                    <FloatingInput
                      label="Postal Code"
                      required
                      value={formData.zip}
                      onChange={(v) => setFormData({ ...formData, zip: v })}
                    />
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#691C33] text-white py-6 uppercase text-[11px] tracking-[0.5em] font-bold hover:bg-[#4a1424] transition-all disabled:opacity-50 shadow-xl shadow-[#691C33]/10"
              >
                {isSubmitting
                  ? "Processing..."
                  : `Complete Purchase — $${total.toFixed(2)}`}
              </button>

              <div className="flex items-center justify-center gap-8 opacity-40">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  <Lock className="w-3 h-3" /> Encrypted
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
                  <Truck className="w-3 h-3" /> Worldwide Shipping
                </div>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-5"
          >
            <div className="bg-white border border-gray-100 p-8 rounded-sm sticky top-32">
              <h2 className="text-[11px] uppercase tracking-[0.4em] font-bold text-gray-900 mb-8 text-center">
                Your Order
              </h2>
              <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-gray-50 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider">
                          {item.name}
                        </h4>
                        <p className="text-[9px] text-gray-400 uppercase mt-1">
                          {item.brand}
                        </p>
                        {item.size && (
                          <p className="text-[9px] text-gray-400 mt-1">
                            {item.size}ml
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between w-full border-t border-gray-50 pt-2">
                        <span className="text-[9px] text-gray-500 uppercase">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-xs font-bold">
                          $
                          {(
                            (item.salePrice || item.price) * item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? "Complimentary"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-4 border-t border-gray-900">
                  <span className="uppercase tracking-widest text-[10px]">
                    Total
                  </span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({
  label,
  type = "text",
  required,
  value,
  onChange,
}: FloatingInputProps) {
  return (
    <div className="relative border-b border-gray-200 focus-within:border-[#691C33] transition-colors group">
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder=" "
        className="block w-full pt-6 pb-2 bg-transparent text-sm focus:outline-none"
      />
      <label className="absolute top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-gray-400 transform -translate-y-8 scale-75 origin-[0] transition-all group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-8 group-focus:scale-75 group-focus:text-[#691C33]">
        {label}
      </label>
    </div>
  );
}
