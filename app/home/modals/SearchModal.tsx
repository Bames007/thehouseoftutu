"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ArrowRight, TrendingUp, Wind } from "lucide-react";
import { italiana, gothamOffice } from "@/app/utils/constant";
import { useState } from "react";

const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [query, setQuery] = useState("");

  const trending = [
    { name: "Oud Royale", note: "Deep Wood" },
    { name: "Silk Musk", note: "Floral" },
    { name: "Amber Night", note: "Oriental" },
    { name: "Desert Rose", note: "Spicy" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-[#1A1A1A]/95 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 top-0 z-[301] bg-[#691C33] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-8 md:p-12">
              <span
                className={`${italiana.className} text-white/20 text-xl tracking-widest`}
              >
                THE HOUSE OF TUTU
              </span>
              <button
                onClick={onClose}
                className="group p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full relative"
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="What scent captures your mood?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`${italiana.className} w-full bg-transparent border-b border-white/10 py-8 text-4xl md:text-7xl text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 transition-all text-center`}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-1 bg-white rounded-full"
                  />
                </div>
              </motion.div>

              {/* Discovery Section */}
              <div className="mt-20 w-full grid md:grid-cols-2 gap-20">
                {/* Trending Items */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-8 text-white/40">
                    <TrendingUp className="w-4 h-4" />
                    <span
                      className={`${gothamOffice.className} text-[10px] uppercase tracking-[0.4em] font-bold`}
                    >
                      Trending Now
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    {trending.map((item, idx) => (
                      <motion.button
                        key={item.name}
                        whileHover={{ x: 10 }}
                        className="flex items-end justify-between group border-b border-white/5 pb-4"
                      >
                        <span
                          className={`${italiana.className} text-2xl text-white/80 group-hover:text-white transition-colors`}
                        >
                          {item.name}
                        </span>
                        <span className="text-[10px] text-white/20 uppercase tracking-widest pb-1 group-hover:text-[#fff] transition-colors">
                          {item.note}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Suggestions / Visual */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="hidden md:block"
                >
                  <div className="bg-white/5 rounded-[40px] p-10 border border-white/10 relative overflow-hidden group">
                    <Wind className="absolute -top-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
                    <h4
                      className={`${italiana.className} text-2xl text-white mb-4`}
                    >
                      Fragrance Finder
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed mb-8">
                      Not sure what you're looking for? Let our scent curator
                      guide you through our collection.
                    </p>
                    <button className="flex items-center gap-3 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:gap-5 transition-all">
                      Start Discovery <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="p-12 text-center">
              <p className="text-white/20 text-[9px] uppercase tracking-[0.5em]">
                Press ESC to close or click outside
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
