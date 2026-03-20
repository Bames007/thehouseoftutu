"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { gothamOffice, italiana } from "@/app/utils/constant";
import { Home, RotateCw, Sparkles, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
    // Detect touch device to disable "flashlight" logic
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    if (!window.matchMedia("(pointer: coarse)").matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return <div className="min-h-screen bg-[#691C33]" />;

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#691C33] ${!isTouch ? "cursor-none" : ""}`}
    >
      {/* 1. ADAPTIVE SPOTLIGHT (Mouse follow or Ambient Pulse) */}
      {!isTouch ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-30 opacity-60"
          style={{
            background: `radial-gradient(circle 250px at ${springX}px ${springY}px, rgba(255,255,255,0.12), transparent 80%)`,
          }}
        />
      ) : (
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="pointer-events-none fixed inset-0 z-30 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1),transparent_70%)]"
        />
      )}

      {/* 2. RESPONSIVE BACKGROUND 404 */}
      <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden pointer-events-none">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 2 }}
          className={`${italiana.className} text-[45vw] lg:text-[40vw] text-white font-black leading-none`}
        >
          404
        </motion.h1>
      </div>

      <div className="container relative z-40 mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* RIGHT: THE LIQUID BOTTLE (Moved to top on Mobile for visual impact) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative order-1 lg:order-2 flex justify-center items-center h-[350px] md:h-[450px] lg:h-[600px] w-full"
          >
            <div className="relative w-40 h-56 md:w-60 md:h-80">
              {/* Bottle Body */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl rounded-[40px] md:rounded-[60px] border border-white/30 shadow-2xl overflow-hidden">
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-0.5, 0.5, -0.5] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent"
                />
              </div>

              {/* BOTTLE CAP */}
              <motion.div
                animate={{ y: [-2, -8, -2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 w-14 h-8 md:w-20 md:h-12 bg-white/10 backdrop-blur-md rounded-t-lg border border-white/20"
              />

              {/* PARTICLES (Optimized count for mobile) */}
              <AnimatePresence>
                {[...Array(isTouch ? 3 : 5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.8, 0], y: -120, x: (i - 1) * 30 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 1.2,
                    }}
                    className="absolute top-0 left-1/2"
                  >
                    <Droplets className="w-3 h-3 md:w-4 md:h-4 text-white/30 blur-[0.5px]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* LEFT: EDITORIAL CONTENT */}
          <div className="text-center lg:text-left order-2 lg:order-1 flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className={`${gothamOffice.className} text-[8px] md:text-[10px] tracking-[0.5em] text-white/50 font-bold uppercase block mb-3 md:mb-4`}
              >
                Fragrance Note: Missing
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${italiana.className} text-4xl md:text-6xl lg:text-8xl text-white mb-6 md:mb-8 leading-[1.1]`}
            >
              A Fleeting <br className="hidden md:block" />
              <span className="italic opacity-70">Enigma.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.6 }}
              className={`${gothamOffice.className} text-white text-sm md:text-base lg:text-lg max-w-[280px] md:max-w-md mb-8 md:mb-12 leading-relaxed font-light`}
            >
              The trail you followed has dissipated into the air. This essence
              was too rare to be captured in a single link.
            </motion.p>

            {/* RESPONSIVE BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto items-center"
            >
              <Link href="/" className="w-full sm:w-auto">
                <motion.button
                  whileHover={!isTouch ? { scale: 1.05 } : {}}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:w-auto px-10 py-4 md:px-12 md:py-5 overflow-hidden rounded-full border border-white/20 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] transition-all bg-white/5 lg:bg-transparent"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Home className="w-3 h-3 md:w-4 md:h-4" /> Home Atelier
                  </span>
                  {!isTouch && (
                    <>
                      <motion.div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <style jsx>{`
                        .group:hover span {
                          color: #691c33;
                        }
                      `}</style>
                    </>
                  )}
                </motion.button>
              </Link>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] py-2"
              >
                <RotateCw className="w-3 h-3 md:w-4 md:h-4" /> Respray Scent
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FOOTER LABEL - Hidden on very small screens to save space */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden xs:flex items-center gap-4 w-max"
      >
        <div className="h-px w-8 md:w-12 bg-white" />
        <span
          className={`${gothamOffice.className} text-[7px] md:text-[9px] tracking-[0.4em] text-white uppercase`}
        >
          The House of Tutu Paris
        </span>
        <div className="h-px w-8 md:w-12 bg-white" />
      </motion.div>
    </div>
  );
}
