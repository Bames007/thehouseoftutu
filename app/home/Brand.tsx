"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Globe, Trophy } from "lucide-react";
import { Italiana, Montserrat } from "next/font/google";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const brands = [
  {
    name: "The House of Tutu",
    logo: "/logo-red.png",
    origin: "Paris, France",
    founded: "2012",
    story:
      "Born from the desire to merge classical ballet aesthetics with high-perfumery, The House of Tutu creates ethereal, movement-inspired scents.",
    philosophy: "Elegance in every drop.",
  },
  {
    name: "Aroma24/7",
    logo: "/ramatu.jpeg",
    origin: "Dubai, UAE",
    founded: "2008",
    story:
      "A pioneer in scent branding, Aroma24/7 captures the essence of luxury spaces, bringing five-star resort atmosphere into your sanctuary.",
    philosophy: "Defining spaces through scent.",
  },
  {
    name: "Sky Perfumes",
    logo: "/logo5.jpeg",
    origin: "London, UK",
    founded: "2015",
    story:
      "Dedicated to the 'Upper Atmosphere' of scent—light, ozonic, and uplifting fragrances designed for the modern dreamer.",
    philosophy: "Limitless horizons.",
  },
  {
    name: "Oud Royale",
    logo: "/logo4.jpeg",
    origin: "Grasse, France",
    founded: "1994",
    story:
      "Masters of the dark arts of Agarwood. Oud Royale sources the rarest resins to create bold, regal compositions.",
    philosophy: "The liquid gold of perfumery.",
  },
  {
    name: "Neroli & Co.",
    logo: "/logo3.jpeg",
    origin: "Milan, Italy",
    founded: "2019",
    story:
      "Focusing exclusively on the bright, citrusy notes of the Mediterranean, celebrating Italian summers and sunshine.",
    philosophy: "Brightness bottled.",
  },
  {
    name: "Black Ambre",
    logo: "/logo2.jpeg",
    origin: "New York, USA",
    founded: "2021",
    story:
      "An avant-garde house exploring the intersection of industrial aesthetics and organic amber notes.",
    philosophy: "Depth in darkness.",
  },
];

const Brands = () => {
  const [selectedBrand, setSelectedBrand] = useState<(typeof brands)[0] | null>(
    null,
  );

  return (
    <section
      id="brands"
      className="py-24 bg-white border-y border-black/[0.05] overflow-hidden"
    >
      <div className="container mx-auto px-6 mb-20 text-center">
        <span
          className={`${montserrat.className} text-[10px] tracking-[0.6em] text-[#691C33] font-bold uppercase mb-4 opacity-90`}
        >
          Global Affiliates
        </span>
        <h2
          className={`${italiana.className} text-4xl md:text-5xl text-[#1A1A1A]`}
        >
          The <span className="italic">Curated</span> Circle
        </h2>
      </div>

      {/* Infinite Ticker */}
      <div className="relative flex items-center mb-12 group">
        <motion.div
          className="flex whitespace-nowrap gap-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          {[...brands, ...brands].map((brand, index) => (
            <button
              key={`${brand.name}-${index}`}
              onClick={() => setSelectedBrand(brand)}
              className="relative h-20 w-44 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer flex-shrink-0"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            </button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedBrand && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBrand(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl rounded-sm"
            >
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-6 right-6 text-black/40 hover:text-black z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full bg-gray-100">
                  <Image
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="p-10 flex flex-col justify-center">
                  <h3
                    className={`${italiana.className} text-3xl text-black mb-4`}
                  >
                    {selectedBrand.name}
                  </h3>
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-black/40">
                      <Globe className="w-3 h-3" /> {selectedBrand.origin}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-black/40">
                      <Trophy className="w-3 h-3" /> {selectedBrand.founded}
                    </div>
                  </div>
                  <p
                    className={`${montserrat.className} text-sm text-black/60 leading-relaxed mb-8 italic`}
                  >
                    "{selectedBrand.story}"
                  </p>
                  <div className="pt-6 border-t border-black/5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#691C33] font-bold mb-2">
                      Philosophy
                    </p>
                    <p
                      className={`${italiana.className} text-xl text-black/80`}
                    >
                      {selectedBrand.philosophy}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Brands;
