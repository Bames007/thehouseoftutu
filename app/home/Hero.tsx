"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Italiana, Montserrat } from "next/font/google";
import { ArrowRight } from "lucide-react";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const Hero = () => {
  const { scrollY } = useScroll();

  // Parallax offsets
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -120]);
  const scale = useTransform(scrollY, [0, 500], [1.1, 1.2]);

  return (
    <section className="relative min-h-[110vh] flex items-center bg-[#FDFBF9] overflow-hidden">
      {/* 1. ARCHITECTURAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#691C33] clip-path-luxury hidden lg:block opacity-95" />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 text-[12rem] font-bold text-black/[0.02] select-none uppercase leading-none tracking-tighter"
        >
          Essence
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* 2. TEXT CONTENT: THE "VOICE" */}
          <div className="w-full lg:w-5/12 mt-20 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-12 bg-[#691C33]"></span>
                <span
                  className={`${montserrat.className} text-[10px] tracking-[0.5em] uppercase font-bold text-[#691C33]`}
                >
                  Maison de la Parfum
                </span>
              </div>

              <h1
                className={`${italiana.className} text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] text-[#1a1a1a] mb-8`}
              >
                The Art of <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="italic text-[#691C33]"
                >
                  Presence.
                </motion.span>
              </h1>

              <p
                className={`${montserrat.className} text-sm text-gray-500 max-w-sm leading-relaxed mb-12 uppercase tracking-[0.15em]`}
              >
                Curating the world’s rarest olfactory experiences. A legacy of
                scent, bottled for the modern icon.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative px-10 py-5 bg-[#691C33] text-white overflow-hidden transition-all duration-500 rounded-sm">
                  <div className="absolute inset-0 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                  <span
                    className={`relative z-10 ${montserrat.className} text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-3`}
                  >
                    Shop Collection{" "}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </span>
                </button>
                <button
                  className={`px-10 py-5 border border-gray-200 text-[#1a1a1a] ${montserrat.className} text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-500 rounded-sm`}
                >
                  The Story
                </button>
              </div>
            </motion.div>
          </div>

          {/* 3. VISUAL COMPOSITION: THE "SOUL" */}
          <div className="w-full lg:w-7/12 relative h-[550px] md:h-[750px]">
            {/* Main Image with Parallax Zoom */}
            <motion.div
              style={{ y: y2 }}
              className="relative z-20 w-[85%] h-full ml-auto overflow-hidden shadow-[40px_40px_100px_rgba(0,0,0,0.2)] rounded-sm"
            >
              <motion.div style={{ scale }} className="h-full w-full">
                <Image
                  src="/ramatu.jpeg"
                  alt="Luxury Fragrance"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              {/* Soft overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Floating Detail Image - Depicting gold/liquid luxury */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="absolute -bottom-12 left-0 z-30 w-[45%] h-[40%] border-[15px] border-white shadow-2xl hidden md:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
                alt="Golden Perfume Detail"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Animated Rotating Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 right-0 lg:-right-12 z-40 w-40 h-40 flex items-center justify-center opacity-90"
            >
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full fill-white lg:fill-[#691C33]"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[8.5px] uppercase tracking-[0.18em] font-bold">
                  <textPath xlinkHref="#circlePath">
                    • Pure Essence • Limited Release • Handcrafted Luxury •
                  </textPath>
                </text>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. LUXURY INDICATORS */}
      <div className="absolute bottom-10 left-8 hidden sm:flex items-center gap-12">
        <div className="flex flex-col items-center gap-6">
          <span className="text-[9px] text-gray-400 rotate-90 tracking-[0.4em] uppercase font-bold">
            Explore
          </span>
          <motion.div
            animate={{ height: [0, 50, 0], y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-[1px] bg-[#691C33]"
          />
        </div>
      </div>

      <style jsx global>{`
        .clip-path-luxury {
          clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
};

export default Hero;
