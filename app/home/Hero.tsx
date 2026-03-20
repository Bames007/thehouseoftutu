"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useSpring(useTransform(scrollY, [0, 500], [0, -60]), {
    stiffness: 100,
    damping: 30,
  });
  const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

  return (
    <section className="relative min-h-screen lg:min-h-[110vh] flex items-center bg-[#FDFBF9] overflow-hidden pt-20 lg:pt-0">
      {/* 1. ARCHITECTURAL BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#691C33] clip-path-luxury hidden lg:block opacity-95" />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-10 lg:top-20 left-4 lg:left-10 text-[5rem] md:text-[8rem] lg:text-[12rem] font-bold text-black/[0.03] select-none uppercase leading-none tracking-tighter whitespace-nowrap"
        >
          Essence
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          {/* 2. TEXT CONTENT */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 lg:mb-8">
                <span className="h-[1px] w-8 lg:w-12 bg-[#691C33]"></span>
                <span
                  className={`${montserrat.className} text-[9px] lg:text-[10px] tracking-[0.4em] lg:tracking-[0.5em] uppercase font-bold text-[#691C33]`}
                >
                  Maison de la Parfum
                </span>
              </div>

              <h1
                className={`${italiana.className} text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] lg:leading-[0.85] text-[#1a1a1a] mb-6 lg:mb-8`}
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
                className={`${montserrat.className} text-[11px] lg:text-sm text-gray-500 max-w-xs lg:max-w-sm mx-auto lg:mx-0 leading-relaxed mb-10 lg:mb-12 uppercase tracking-[0.15em]`}
              >
                Curating the world’s rarest olfactory experiences. A legacy of
                scent, bottled for the modern icon.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6">
                <button className="group relative w-full sm:w-auto px-10 py-5 bg-[#691C33] text-white overflow-hidden rounded-sm transition-transform active:scale-95">
                  <div className="absolute inset-0 w-0 bg-black transition-all duration-500 lg:group-hover:w-full" />
                  <span
                    className={`relative z-10 ${montserrat.className} text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-3`}
                  >
                    Shop Collection <ArrowRight className="w-4 h-4" />
                  </span>
                </button>

                <button
                  className={`w-full sm:w-auto px-10 py-5 border border-gray-200 text-[#1a1a1a] ${montserrat.className} text-[10px] font-bold tracking-[0.3em] uppercase transition-colors active:bg-black active:text-white rounded-sm`}
                >
                  The Story
                </button>
              </div>
            </motion.div>
          </div>

          {/* 3. VISUAL COMPOSITION */}
          <div className="w-full lg:w-7/12 relative h-[400px] md:h-[600px] lg:h-[750px] order-1 lg:order-2">
            <motion.div
              style={{ y: y2 }}
              className="relative z-20 w-full lg:w-[85%] h-full lg:ml-auto overflow-hidden shadow-2xl rounded-sm"
            >
              <motion.div style={{ scale }} className="h-full w-full relative">
                <Image
                  src="/ramatu.jpeg"
                  alt="Luxury Fragrance"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
            </motion.div>

            {/* Floating Detail Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute -bottom-6 -left-4 lg:left-0 z-30 w-[40%] h-[35%] border-[8px] lg:border-[15px] border-white shadow-xl hidden sm:block"
            >
              <Image
                src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
                alt="Golden Perfume Detail"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* TOP ROTATING LOGO */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-4 lg:-right-16 z-40 w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 p-4 lg:p-6"
            >
              <div className="relative w-full h-full grayscale opacity-80 brightness-50 contrast-125 lg:brightness-100 lg:grayscale-0 lg:opacity-100">
                <Image
                  src="/logo-white.png"
                  alt="The House of Tutu Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM ROTATING LOGO & INDICATOR */}
      <div className="absolute bottom-10 left-8 flex flex-col items-center gap-6 z-50">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 lg:w-20 lg:h-20 opacity-30"
        >
          <Image
            src="/logo.png"
            alt="Maison Emblem"
            width={80}
            height={80}
            className="object-contain grayscale"
          />
        </motion.div>

        <div className="hidden lg:flex flex-col items-center gap-4">
          <span className="text-[9px] text-gray-400 rotate-90 tracking-[0.4em] uppercase font-bold">
            Scroll
          </span>
          <motion.div
            animate={{ height: [0, 40, 0], y: [0, 10, 0] }}
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
