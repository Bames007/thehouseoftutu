"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Italiana, Montserrat, Reenie_Beanie } from "next/font/google"; // Added a signature font
import { Sparkles, ArrowRight, Quote } from "lucide-react";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const signatureFont = Reenie_Beanie({ weight: "400", subsets: ["latin"] });

const About = () => {
  const { scrollYProgress } = useScroll();
  const yImage1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="about"
      className="relative py-24 md:py-48 bg-[#FCFAF8] overflow-hidden"
    >
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] select-none">
        <h2
          className={`${italiana.className} text-[22vw] leading-none text-[#691C33]`}
        >
          Heritage
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          {/* 1. ASYMMETRIC IMAGE COLLAGE */}
          <div className="w-full lg:w-1/2 relative h-[650px] md:h-[850px]">
            {/* Primary Image: Perfume Crafting */}
            <motion.div
              style={{ y: yImage1 }}
              className="absolute left-0 top-0 w-[85%] h-[75%] z-10 shadow-2xl overflow-hidden rounded-sm group"
            >
              <Image
                src="https://images.unsplash.com/photo-1719176010035-17729577d496?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Master Perfumer Lab"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                unoptimized // Use this if you don't want to configure next.config.js immediately
              />
            </motion.div>

            {/* Secondary Image: Raw Ingredients */}
            <motion.div
              style={{ y: yImage2 }}
              className="absolute right-0 bottom-12 w-1/2 h-1/2 z-20 shadow-2xl overflow-hidden border-[15px] border-white rounded-sm"
            >
              <Image
                src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Botanical Elements"
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>

            {/* Floating Quote Box */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-[-10px] lg:left-[-60px] z-30 bg-[#691C33] p-10 md:p-14 shadow-2xl"
            >
              <Quote className="text-white/10 w-16 h-16 absolute top-2 left-2" />
              <p
                className={`${italiana.className} text-white text-2xl md:text-3xl italic leading-tight relative z-10`}
              >
                "Scent is the <br />
                <span className="opacity-70">unspoken language</span> <br />
                of the soul."
              </p>
            </motion.div>
          </div>

          {/* 2. NARRATIVE CONTENT */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`${montserrat.className} text-[10px] tracking-[0.6em] text-[#691C33] font-bold uppercase`}
                >
                  Est. 2015 — Abuja, Nigeria
                </span>
                <Sparkles className="w-4 h-4 text-[#691C33] opacity-40 animate-pulse" />
              </div>

              <h2
                className={`${italiana.className} text-5xl md:text-7xl lg:text-[5.5rem] text-[#1A1A1A] mb-10 leading-[0.95]`}
              >
                Crafting{" "}
                <span className="italic text-[#691C33]">Immortality</span>{" "}
                <br />
                in a Bottle.
              </h2>

              <div
                className={`${montserrat.className} space-y-8 text-gray-500 leading-relaxed text-sm md:text-base`}
              >
                <p className="border-l-4 border-[#691C33] pl-8 italic text-gray-800 text-lg">
                  The House of Tutu began as an obsession with the invisible.
                  Our founder, returning from the labs of Grasse, sought to fuse
                  French precision with the untamed raw materials of Africa.
                </p>
                <p>
                  Today, we serve as a global bridge for olfactory excellence.
                  Every atmosphere we touch becomes a masterpiece.
                </p>
              </div>

              {/* Founder Signature Section */}
              <div className="mt-10 flex flex-col gap-2">
                <span
                  className={`${montserrat.className} text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold`}
                >
                  Founder & Master Perfumer
                </span>
                <p
                  className={`${signatureFont.className} text-5xl text-[#691C33] opacity-80 mt-[-5px]`}
                >
                  Ramatu Shehu
                </p>
              </div>

              {/* 3. STATS GRID */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-100">
                {[
                  { label: "Heritage", value: "10+" },
                  { label: "Boutiques", value: "30+" },
                  { label: "Blends", value: "150+" },
                ].map((stat, i) => (
                  <div key={i} className="group">
                    <div
                      className={`${italiana.className} text-4xl text-[#691C33]`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`${montserrat.className} text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ gap: "32px" }}
                className="mt-16 flex items-center gap-6 text-[#691C33] group"
              >
                <span
                  className={`${montserrat.className} text-xs font-bold uppercase tracking-[0.4em]`}
                >
                  Explore Our Legacy
                </span>
                <div className="flex items-center">
                  <div className="w-16 h-[1px] bg-[#691C33] group-hover:w-24 transition-all duration-700" />
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
