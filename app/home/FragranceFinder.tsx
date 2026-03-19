"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Wind,
  Flame,
  TreePine,
  RefreshCw,
  ShoppingBag,
  Check,
} from "lucide-react";
import { Italiana, Montserrat } from "next/font/google";
import Image from "next/image";
import { products } from "./data/products";
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "./CartProviderWrapper";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

// Steps config...
const steps = [
  {
    id: "vibe",
    question: "How should your presence feel?",
    options: [
      {
        label: "Ethereal & Airy",
        value: "fresh",
        icon: <Wind className="w-5 h-5" />,
      },
      {
        label: "Bold & Magnetic",
        value: "oriental",
        icon: <Flame className="w-5 h-5" />,
      },
      {
        label: "Earthly & Grounded",
        value: "woody",
        icon: <TreePine className="w-5 h-5" />,
      },
      {
        label: "Bright & Energetic",
        value: "citrus",
        icon: <Sparkles className="w-5 h-5" />,
      },
    ],
  },
  {
    id: "occasion",
    question: "When will you wear this?",
    options: [
      { label: "Daily Rituals", value: "casual" },
      { label: "Gala & Evening", value: "formal" },
      { label: "Midnight Encounters", value: "intimate" },
    ],
  },
];

const FragranceFinder = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { addToCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: value };
    setAnswers(newAnswers);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const match =
        products.find((p) => p.category?.toLowerCase() === newAnswers.vibe) ||
        products[0];
      setResult(match);
    }
  };

  const handleAddToCart = () => {
    if (!result) return;
    setIsAdding(true);
    addToCart(result.id, result.sizes?.[0]);
    showQuickAddToast(result);
    setTimeout(() => setIsAdding(false), 2000);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] bg-white flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-10 right-10 text-black hover:rotate-90 transition-transform p-3 z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-6xl w-full">
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-center"
              >
                <span
                  className={`${montserrat.className} text-[10px] tracking-[0.6em] text-[#691C33] uppercase mb-6 block font-bold`}
                >
                  Phase {currentStep + 1}
                </span>
                <h2
                  className={`${italiana.className} text-5xl md:text-8xl mb-16 text-[#1A1A1A]`}
                >
                  {steps[currentStep].question}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="group p-12 rounded-[32px] border border-gray-100 hover:border-[#691C33] transition-all duration-500 flex flex-col items-center gap-6 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-black/5"
                    >
                      {/* {opt.icon && (
                        <div className="text-black group-hover:text-[#691C33] transition-colors scale-125">
                          {opt.icon}
                        </div>
                      )} */}
                      <span
                        className={`${montserrat.className} uppercase text-[11px] tracking-[0.3em] font-bold`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* --- HIGH-END RESULT CARD --- */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <span
                  className={`${montserrat.className} text-[11px] tracking-[0.6em] text-[#691C33] uppercase mb-6 block font-bold`}
                >
                  Discovery Complete
                </span>
                <div className="bg-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row items-stretch text-left border border-gray-100 min-h-[600px]">
                  {/* Left: Product Image */}
                  <div className="lg:w-1/2 relative bg-[#F9F8F6] flex items-center justify-center p-16">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1 }}
                      className="relative w-full aspect-square"
                    >
                      <Image
                        src={result.image}
                        alt={result.name}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                    <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md text-[#691C33] px-6 py-2.5 rounded-full text-[10px] tracking-[0.3em] font-bold shadow-sm">
                      98% Match
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-[1px] w-12 bg-[#691C33]" />
                      <p
                        className={`${montserrat.className} text-[#691C33] text-[12px] font-bold uppercase tracking-[0.4em]`}
                      >
                        {result.brand}
                      </p>
                    </div>

                    <h3
                      className={`${italiana.className} text-6xl md:text-7xl mb-8 text-black leading-[1.1]`}
                    >
                      {result.name}
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-12">
                      <span className="text-[10px] px-5 py-2.5 bg-gray-50 text-gray-500 uppercase tracking-widest rounded-full font-bold border border-gray-100">
                        {answers.vibe} Family
                      </span>
                      <span className="text-[10px] px-5 py-2.5 bg-gray-50 text-gray-500 uppercase tracking-widest rounded-full font-bold border border-gray-100">
                        {answers.occasion} Wear
                      </span>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed mb-16 font-light italic">
                      "A selection tailored to your essence, merging luxury with
                      unparalleled emotional resonance."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 bg-[#1A1A1A] hover:bg-[#691C33] text-white py-6 rounded-[20px] text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-[#691C33]/20 disabled:bg-gray-200"
                      >
                        {isAdding ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" /> Add — $
                            {result.price}
                          </>
                        )}
                      </button>
                      <button
                        onClick={onClose}
                        className="px-10 py-6 rounded-[20px] border border-gray-100 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-gray-50 transition-colors"
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="mt-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.5em] text-gray-300 hover:text-black mx-auto transition-colors font-bold group"
                >
                  <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />{" "}
                  Start Re-Discovery
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FragranceFinder;
