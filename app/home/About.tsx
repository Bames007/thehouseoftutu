"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Italiana, Montserrat, Reenie_Beanie } from "next/font/google";
import { Sparkles, ArrowRight, Quote } from "lucide-react";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const signatureFont = Reenie_Beanie({ weight: "400", subsets: ["latin"] });

const About = () => {
  const { scrollYProgress } = useScroll();

  // Smoother springs for mobile touch-scrolling
  const yImage1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 100,
    damping: 30,
  });
  const yImage2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      id="about"
      className="relative py-16 md:py-32 lg:py-48 bg-[#FCFAF8] overflow-hidden"
    >
      {/* Background Decorative Text - Hidden on very small screens to avoid clutter */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] select-none hidden sm:block">
        <h2
          className={`${italiana.className} text-[22vw] leading-none text-[#691C33]`}
        >
          Heritage
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20 lg:gap-32">
          {/* 1. ASYMMETRIC IMAGE COLLAGE */}
          <div className="w-full lg:w-1/2 relative h-[500px] sm:h-[650px] md:h-[750px] lg:h-[850px]">
            {/* Primary Image */}
            <motion.div
              style={{ y: yImage1 }}
              className="absolute left-0 top-0 w-[80%] lg:w-[85%] h-[70%] lg:h-[75%] z-10 shadow-2xl overflow-hidden rounded-sm group"
            >
              <Image
                src="https://images.unsplash.com/photo-1719176010035-17729577d496?q=80&w=627&auto=format&fit=crop"
                alt="Master Perfumer Lab"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                unoptimized
              />
            </motion.div>

            {/* Secondary Image - Scaled down for mobile */}
            <motion.div
              style={{ y: yImage2 }}
              className="absolute right-0 bottom-8 lg:bottom-12 w-[45%] lg:w-1/2 h-[40%] lg:h-1/2 z-20 shadow-2xl overflow-hidden border-[8px] md:border-[15px] border-white rounded-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=687&auto=format&fit=crop"
                alt="Botanical Elements"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            {/* Floating Quote Box - Repositioned for Mobile Visibility */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute top-[60%] lg:top-1/2 left-[-12px] md:left-[-30px] lg:left-[-60px] z-30 bg-[#691C33] p-6 md:p-10 lg:p-14 shadow-2xl max-w-[200px] md:max-w-xs lg:max-w-none"
            >
              <Quote className="text-white/10 w-8 h-8 md:w-16 md:h-16 absolute top-2 left-2" />
              <p
                className={`${italiana.className} text-white text-lg md:text-2xl lg:text-3xl italic leading-tight relative z-10`}
              >
                "Scent is the <br className="hidden md:block" />
                <span className="opacity-70">unspoken language</span>{" "}
                <br className="hidden md:block" />
                of the soul."
              </p>
            </motion.div>
          </div>

          {/* 2. NARRATIVE CONTENT */}
          <div className="w-full lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`${montserrat.className} text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] text-[#691C33] font-bold uppercase`}
                >
                  Est. 2015 — Abuja, Nigeria
                </span>
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#691C33] opacity-40" />
              </div>

              <h2
                className={`${italiana.className} text-4xl md:text-6xl lg:text-[5.5rem] text-[#1A1A1A] mb-8 lg:mb-10 leading-[1.1] lg:leading-[0.95]`}
              >
                Crafting{" "}
                <span className="italic text-[#691C33]">Immortality</span>{" "}
                <br className="hidden sm:block" />
                in a Bottle.
              </h2>

              <div
                className={`${montserrat.className} space-y-6 md:space-y-8 text-gray-500 leading-relaxed text-sm md:text-base`}
              >
                <p className="border-l-2 md:border-l-4 border-[#691C33] pl-4 md:pl-8 italic text-gray-800 text-base md:text-lg">
                  The House of Tutu began as an obsession with the invisible.
                  Our founder sought to fuse French precision with the untamed
                  raw materials of Africa.
                </p>
                <p className="hidden md:block">
                  Today, we serve as a global bridge for olfactory excellence.
                  Every atmosphere we touch becomes a masterpiece.
                </p>
              </div>

              {/* Founder Signature Section */}
              <div className="mt-10 flex flex-col gap-1">
                <span
                  className={`${montserrat.className} text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold`}
                >
                  Founder & Master Perfumer
                </span>
                <p
                  className={`${signatureFont.className} text-4xl md:text-5xl text-[#691C33] opacity-80`}
                >
                  Ramatu Shehu
                </p>
              </div>

              {/* 3. STATS GRID - Optimized for Mobile (Scrollable or Stacked) */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-100">
                {[
                  { label: "Heritage", value: "10+" },
                  { label: "Boutiques", value: "30+" },
                  { label: "Blends", value: "150+" },
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div
                      className={`${italiana.className} text-2xl md:text-4xl text-[#691C33]`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`${montserrat.className} text-[7px] md:text-[8px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-gray-400 font-bold`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-12 md:mt-16 flex items-center gap-4 md:gap-6 text-[#691C33] group w-full sm:w-auto justify-start"
              >
                <span
                  className={`${montserrat.className} text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]`}
                >
                  Explore Our Legacy
                </span>
                <div className="flex items-center">
                  <div className="w-12 md:w-16 h-[1px] bg-[#691C33] lg:group-hover:w-24 transition-all duration-700" />
                  <ArrowRight className="w-4 h-4 ml-[-5px]" />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
