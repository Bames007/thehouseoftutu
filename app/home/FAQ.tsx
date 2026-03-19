"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { italiana } from "@/app/utils/constant";
import { Plus, Minus } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: ["300", "500"], subsets: ["latin"] });

const faqs = [
  {
    question: "International Logistics",
    answer:
      "We provide secure, insured shipping to over 50 global destinations via our boutique couriers.",
  },
  {
    question: "The Return Policy",
    answer:
      "Unopened creations may be returned within 30 days. We prioritize the integrity of our scents.",
  },
  {
    question: "Authenticity & Sourcing",
    answer:
      "Every bottle is tracked from origin to user. We deal only in 100% certified essences.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="text-center mb-24">
          <h2 className={`${italiana.className} text-5xl text-[#1A1A1A] mb-6`}>
            Client <span className="italic">Essentials</span>
          </h2>
          <div className="w-12 h-[1px] bg-[#691C33] mx-auto" />
        </header>

        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-t border-gray-100 last:border-b transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-10 text-left group"
              >
                <span
                  className={`${montserrat.className} text-[13px] tracking-widest uppercase font-bold ${openIndex === index ? "text-[#691C33]" : "text-gray-900"} transition-colors`}
                >
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-4 h-4 text-[#691C33]" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-300 group-hover:text-[#691C33]" />
                )}
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
                    <div className="pb-10 text-gray-500 leading-loose text-sm max-w-2xl">
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
