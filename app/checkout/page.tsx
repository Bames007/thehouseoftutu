"use client";

import { useCart } from "../home/context/CartContext";
import { products } from "../home/data/products";
import { Product } from "../home/Shop";
import Image from "next/image";
import Link from "next/link";
import { Italiana, Montserrat } from "next/font/google";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Lock, Truck, CheckCircle2, FileText } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

// Types
type CartItemWithDetails = Product & {
  quantity: number;
  size: string | number | undefined;
};

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId] = useState(
    `HT-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
  );

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
      return { ...product, quantity: item.quantity, size: item.size };
    })
    .filter((item): item is CartItemWithDetails => item !== null);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.salePrice || item.price) * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const getDynamicThankYou = () => {
    const names = cartItems.map((i) => i.name.toLowerCase());
    if (names.some((n) => n.includes("oud")))
      return "May the deep, soul-stirring notes of our Oud bring timeless elegance to your space.";
    if (names.some((n) => n.includes("rose") || n.includes("floral")))
      return "We hope this delicate bouquet of scents blooms beautifully in your collection.";
    if (cartItems.length > 2)
      return "A truly magnificent selection. Your curation reflects a profound appreciation for olfactory art.";
    return "Thank you for welcoming our artisanal scents into your world.";
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const brandColor = "#691C33";
    const lightGray = "#F9F8F6";
    const logoUrl = "/logo.png";

    const img = new (window.Image as any)();
    img.src = logoUrl;

    img.onload = () => {
      // --- 1. BRAND HEADER & LOGO ---
      doc.setFillColor(lightGray);
      doc.rect(0, 0, 210, 65, "F");

      try {
        doc.addImage(img, "PNG", 90, 12, 30, 30);
      } catch (e) {
        console.error("Logo not found", e);
      }

      doc.setTextColor(brandColor);
      doc.setFont("times", "italic");
      doc.setFontSize(24);
      doc.text("The House of Tutu", 105, 52, { align: "center", charSpace: 1 });

      // --- 2. DETAILS ---
      doc.setTextColor("#1A1A1A");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("INVOICE TO:", 20, 80);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(formData.name.toUpperCase(), 20, 87);
      doc.text(formData.address.toUpperCase(), 20, 92);
      doc.text(`${formData.city.toUpperCase()}, ${formData.zip}`, 20, 97);

      doc.setFont("helvetica", "bold");
      doc.text("ORDER REFERENCE:", 140, 80);
      doc.setFont("helvetica", "normal");
      doc.text(`ID: ${orderId}`, 140, 87);
      doc.text(`DATE: ${new Date().toLocaleDateString()}`, 140, 92);

      // --- 3. TABLE ---
      autoTable(doc, {
        startY: 110,
        head: [["DESCRIPTION", "SIZE", "QTY", "UNIT", "TOTAL"]],
        body: cartItems.map((item) => [
          item.name.toUpperCase(),
          item.size ? `${item.size}ML` : "STD",
          item.quantity,
          `$${(item.salePrice || item.price).toFixed(2)}`,
          `$${((item.salePrice || item.price) * item.quantity).toFixed(2)}`,
        ]),
        theme: "plain",
        headStyles: { textColor: brandColor, fontStyle: "bold", fontSize: 8 },
        styles: {
          font: "helvetica",
          fontSize: 9,
          cellPadding: 5,
          textColor: "#444444",
        },
        columnStyles: {
          4: { halign: "right", fontStyle: "bold", textColor: "#1A1A1A" },
        },
        didDrawPage: (data) => {
          doc.setDrawColor(230, 230, 230);
          doc.line(20, data.cursor?.y || 110, 190, data.cursor?.y || 110);
        },
      });

      // --- 4. SUMMARY & DYNAMIC NOTE ---
      const finalY = (doc as any).lastAutoTable.finalY + 15;

      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor("#666666");
      const splitNote = doc.splitTextToSize(getDynamicThankYou(), 80);
      doc.text(splitNote, 20, finalY + 5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("SUBTOTAL", 140, finalY + 5);
      doc.text(`$${subtotal.toFixed(2)}`, 190, finalY + 5, { align: "right" });
      doc.text("SHIPPING", 140, finalY + 12);
      doc.text(
        shipping === 0 ? "COMPLIMENTARY" : `$${shipping.toFixed(2)}`,
        190,
        finalY + 12,
        { align: "right" },
      );

      doc.setFillColor(brandColor);
      doc.rect(135, finalY + 18, 60, 12, "F");
      doc.setTextColor("#FFFFFF");
      doc.setFont("helvetica", "bold");
      doc.text("TOTAL", 140, finalY + 25.5);
      doc.text(`$${total.toFixed(2)}`, 190, finalY + 25.5, { align: "right" });

      // --- 5. SIGNATURE ---
      const bottomY = 255;
      doc.setTextColor(brandColor);
      doc.setFont("times", "italic");
      doc.setFontSize(28);
      doc.text("Ramatu Shehu", 105, bottomY + 15, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor("#CCCCCC");
      doc.text("THE HOUSE OF TUTU  |  BOUTIQUE RECEIPT", 105, 285, {
        align: "center",
        charSpace: 0.5,
      });

      doc.save(`HouseOfTutu_Invoice_${orderId}.pdf`);
    };
  };

  // Auto-download trigger
  useEffect(() => {
    if (showSuccess) {
      generatePDF();
    }
  }, [showSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 2500));
    setShowSuccess(true);
    setIsSubmitting(false);
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6 text-center">
        <h1
          className={`${italiana.className} text-4xl text-[#691C33] mb-8 uppercase tracking-widest`}
        >
          Boutique Empty
        </h1>
        <Link
          href="/#shop"
          className="px-10 py-4 border border-[#691C33] text-[#691C33] text-[10px] tracking-[0.4em] font-bold hover:bg-[#691C33] hover:text-white transition-all"
        >
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-10 pb-20 md:pt-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <Link
          href="/#shop"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-[#691C33] mb-8 transition-colors"
        >
          <ChevronLeft size={12} /> Return to Boutique
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <h1
              className={`${italiana.className} text-5xl md:text-7xl text-[#1A1A1A] mb-12`}
            >
              Checkout
            </h1>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-black/5 space-y-12"
            >
              <div className="space-y-8">
                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#691C33]">
                  Shipping Information
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <FloatingInput
                    label="Full Name"
                    value={formData.name}
                    onChange={(val: string) =>
                      setFormData({ ...formData, name: val })
                    }
                    required
                  />
                  <FloatingInput
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(val: string) =>
                      setFormData({ ...formData, email: val })
                    }
                    required
                  />
                </div>
                <FloatingInput
                  label="Street Address"
                  value={formData.address}
                  onChange={(val: string) =>
                    setFormData({ ...formData, address: val })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-8">
                  <FloatingInput
                    label="City"
                    value={formData.city}
                    onChange={(val: string) =>
                      setFormData({ ...formData, city: val })
                    }
                    required
                  />
                  <FloatingInput
                    label="Zip Code"
                    value={formData.zip}
                    onChange={(val: string) =>
                      setFormData({ ...formData, zip: val })
                    }
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1A1A1A] text-white py-6 rounded-2xl uppercase text-[11px] tracking-[0.5em] font-bold hover:bg-[#691C33] transition-all duration-700 shadow-xl"
              >
                {isSubmitting
                  ? "Securing Order..."
                  : `Place Order — $${total.toFixed(2)}`}
              </button>
            </form>
          </motion.div>

          {/* SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32"
          >
            <div className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm">
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-8 text-center text-gray-400">
                Your Selection
              </h2>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex gap-4 group"
                  >
                    <div className="relative w-16 h-20 bg-[#F9F8F6] rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                        {item.brand}
                      </span>
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] text-gray-500">
                          Qty {item.quantity}
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
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-[10px] uppercase text-gray-400 tracking-widest">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase text-gray-400 tracking-widest">
                  <span>Delivery</span>
                  <span>
                    {shipping === 0
                      ? "Complimentary"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-900 mt-2">
                  <span className={`${italiana.className} text-2xl`}>
                    Total
                  </span>
                  <span className="text-2xl font-light text-[#691C33]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#691C33]/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-lg p-12 rounded-[50px] text-center shadow-2xl relative"
            >
              <CheckCircle2
                size={60}
                className="mx-auto mb-6 text-green-500 animate-bounce"
                strokeWidth={1}
              />
              <h2
                className={`${italiana.className} text-5xl mb-4 text-[#1A1A1A]`}
              >
                Magnifique
              </h2>
              <p className="text-gray-500 text-sm mb-10 leading-relaxed px-4">
                An essence of luxury is heading your way. Your receipt is
                downloading automatically.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={generatePDF}
                  className="flex items-center justify-center gap-3 bg-[#691C33] text-white py-6 rounded-2xl uppercase text-[10px] tracking-[0.4em] font-bold shadow-lg hover:bg-[#4a1424] transition-all"
                >
                  <FileText size={18} /> Get Your Receipt
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    router.push("/");
                  }}
                  className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 py-4 hover:text-black transition-colors"
                >
                  Return to Maison
                </button>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-100 italic text-[#691C33] text-3xl font-serif">
                Ramatu Shehu
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="relative border-b border-gray-200 focus-within:border-[#691C33] transition-all group">
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
      <label className="absolute top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-gray-400 transform -translate-y-8 scale-90 origin-[0] transition-all group-placeholder-shown:translate-y-0 group-placeholder-shown:scale-100 group-focus:-translate-y-8 group-focus:scale-90 group-focus:text-[#691C33]">
        {label}
      </label>
    </div>
  );
}
