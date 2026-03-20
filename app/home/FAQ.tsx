"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Italiana, Montserrat } from "next/font/google";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const faqs = [
  {
    question: "International Logistics",
    answer:
      "We provide secure, insured shipping to over 50 global destinations via our boutique couriers. Typical transit time for international orders is 5-7 business days.",
  },
  {
    question: "The Return Policy",
    answer:
      "Unopened creations in original packaging may be returned within 30 days of receipt. Due to the artisanal nature of our scents, opened products cannot be returned.",
  },
  {
    question: "Authenticity & Sourcing",
    answer:
      "Every bottle is tracked from origin to user. We deal only in 100% certified essences, sourced sustainably from heritage growers in Grasse and the Middle East.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="text-center mb-16 md:mb-24">
          <h2
            className={`${italiana.className} text-4xl md:text-6xl text-[#1A1A1A] mb-6`}
          >
            Client <span className="italic text-[#691C33]">Essentials</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#691C33]/30 mx-auto" />
        </header>

        <div className="space-y-0 border-t border-gray-100">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-100 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-8 md:py-10 text-left group active:bg-gray-50/50 md:hover:bg-transparent transition-colors"
              >
                <span
                  className={`${montserrat.className} text-[11px] md:text-[13px] tracking-[0.2em] md:tracking-widest uppercase font-bold pr-6 transition-colors ${openIndex === index ? "text-[#691C33]" : "text-gray-900"}`}
                >
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 text-[#691C33]" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-300 group-hover:text-[#691C33] transition-colors" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 text-gray-500 leading-relaxed text-sm md:text-base max-w-2xl font-light">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
