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
  ChevronRight,
} from "lucide-react";
import { Italiana, Montserrat } from "next/font/google";
import Image from "next/image";
import { products } from "./data/products";
import { useCart } from "./context/CartContext";
import { showQuickAddToast } from "../utils/toast";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

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
          className="fixed inset-0 z-[400] bg-white flex flex-col items-center justify-start md:justify-center p-4 md:p-12 overflow-y-auto"
        >
          {/* Close Button - Responsive Position */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 md:top-10 md:right-10 text-black hover:rotate-90 transition-transform p-3 z-[500] bg-white/80 backdrop-blur-md rounded-full border border-gray-100"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="max-w-6xl w-full pt-20 md:pt-0">
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-center"
              >
                <span
                  className={`${montserrat.className} text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] text-[#691C33] uppercase mb-4 md:mb-6 block font-bold`}
                >
                  Phase {currentStep + 1} of {steps.length}
                </span>

                <h2
                  className={`${italiana.className} text-4xl md:text-6xl lg:text-8xl mb-12 md:mb-16 text-[#1A1A1A] leading-tight px-4`}
                >
                  {steps[currentStep].question}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4">
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="group p-8 md:p-12 rounded-[24px] md:rounded-[32px] border border-gray-100 hover:border-[#691C33] transition-all duration-500 flex items-center md:flex-col justify-between md:justify-center gap-4 bg-gray-50/50 hover:bg-white hover:shadow-xl active:scale-95"
                    >
                      <span
                        className={`${montserrat.className} uppercase text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.3em] font-bold text-[#1A1A1A]`}
                      >
                        {opt.label}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white md:hidden flex items-center justify-center border border-gray-100">
                        <ChevronRight className="w-4 h-4 text-[#691C33]" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* --- HIGH-END RESULT CARD --- */
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center pb-12"
              >
                <span
                  className={`${montserrat.className} text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.6em] text-[#691C33] uppercase mb-6 block font-bold`}
                >
                  Discovery Complete
                </span>

                <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row items-stretch text-left border border-gray-100 min-h-[500px] md:min-h-[600px]">
                  {/* Left/Top: Product Image */}
                  <div className="w-full lg:w-1/2 relative bg-[#F9F8F6] flex items-center justify-center p-12 md:p-16 aspect-square lg:aspect-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1 }}
                      className="relative w-full h-full max-h-[300px] md:max-h-full"
                    >
                      <Image
                        src={result.image}
                        alt={result.name}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                    <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/90 backdrop-blur-md text-[#691C33] px-4 py-2 md:px-6 md:py-2.5 rounded-full text-[9px] md:text-[10px] tracking-[0.2em] font-bold shadow-sm">
                      98% Match
                    </div>
                  </div>

                  {/* Right/Bottom: Content */}
                  <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-white">
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="h-[1px] w-8 md:w-12 bg-[#691C33]" />
                      <p
                        className={`${montserrat.className} text-[#691C33] text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em]`}
                      >
                        {result.brand}
                      </p>
                    </div>

                    <h3
                      className={`${italiana.className} text-4xl md:text-6xl lg:text-7xl mb-6 md:mb-8 text-black leading-tight`}
                    >
                      {result.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12">
                      <span className="text-[9px] md:text-[10px] px-4 py-2 bg-gray-50 text-gray-500 uppercase tracking-widest rounded-full font-bold border border-gray-100">
                        {answers.vibe} Family
                      </span>
                      <span className="text-[9px] md:text-[10px] px-4 py-2 bg-gray-50 text-gray-500 uppercase tracking-widest rounded-full font-bold border border-gray-100">
                        {answers.occasion} Wear
                      </span>
                    </div>

                    <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 md:mb-16 font-light italic">
                      "A selection tailored to your essence, merging luxury with
                      unparalleled resonance."
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                      <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 bg-[#1A1A1A] hover:bg-[#691C33] text-white py-5 md:py-6 rounded-[16px] md:rounded-[20px] text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:bg-gray-200"
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
                        className="px-8 md:px-10 py-5 md:py-6 rounded-[16px] md:rounded-[20px] border border-gray-100 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-gray-50 transition-colors"
                      >
                        Browse
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="mt-12 md:mt-16 flex items-center gap-3 text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-gray-300 hover:text-black mx-auto transition-colors font-bold group"
                >
                  <RefreshCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
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
