"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { gothamOffice, italiana } from "@/app/utils/constant";
import { Home, RotateCw, Sparkles, Wind, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);

  // Mouse tracking for the "Luxury Spotlight"
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return <div className="min-h-screen bg-[#691C33]" />;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#691C33] cursor-none">
      {/* 1. MOUSE FOLLOW LIGHT (REVEAL EFFECT) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-60"
        style={{
          background: `radial-gradient(circle 300px at ${springX}px ${springY}px, rgba(255,255,255,0.15), transparent 80%)`,
        }}
      />

      {/* 2. DYNAMIC BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2 }}
          className={`${italiana.className} text-[30vw] md:text-[40vw] text-white font-black leading-none`}
        >
          404
        </motion.h1>
      </div>

      {/* 3. FLOATING PETALS / DUST */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: [0, 1000],
              x: [0, Math.sin(i) * 200],
              opacity: [0, 0.4, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 bg-white/20 blur-[1px] rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `-5%` }}
          />
        ))}
      </div>

      <div className="container relative z-40 mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: EDITORIAL CONTENT */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className={`${gothamOffice.className} text-[10px] tracking-[0.6em] text-white/50 font-bold uppercase block mb-4`}
              >
                Fragrance Note: Missing
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`${italiana.className} text-5xl md:text-8xl text-white mb-8 leading-tight`}
            >
              A Fleeting <br />
              <span className="italic opacity-70">Enigma.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.6 }}
              className={`${gothamOffice.className} text-white text-lg max-w-md mb-12 leading-relaxed font-light`}
            >
              The trail you followed has dissipated into the air. This essence
              was too rare to be captured in a single link.
            </motion.p>

            {/* BUTTONS WITH MAGNETIC FEEL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, letterSpacing: "0.4em" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Home className="w-4 h-4" /> Home Atelier
                  </span>
                  <motion.div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="absolute inset-0 z-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <style jsx>{`
                    .group:hover span {
                      color: #691c33;
                    }
                  `}</style>
                </motion.button>
              </Link>

              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ opacity: 1 }}
                className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-white transition-all"
              >
                <RotateCw className="w-4 h-4" /> Respray Scent
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT: THE LIQUID BOTTLE ART */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2 flex justify-center items-center h-[600px]"
          >
            {/* SPILLED PUDDLE EFFECT */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-20 w-80 h-20 bg-white/10 blur-3xl rounded-[100%]"
            />

            {/* THE BOTTLE */}
            <div className="relative w-60 h-80">
              {/* Bottle Body */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[60px] border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden">
                {/* Internal Liquid (Swaying) */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent"
                />

                {/* Refraction Lines */}
                <div className="absolute top-0 left-10 w-px h-full bg-white/10 rotate-12" />
                <div className="absolute top-0 right-20 w-px h-full bg-white/5 -rotate-6" />
              </div>

              {/* BOTTLE CAP (Floating slightly) */}
              <motion.div
                animate={{ y: [-5, -12, -5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-12 bg-white/10 backdrop-blur-md rounded-t-xl border border-white/20 flex items-center justify-center"
              >
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </motion.div>

              {/* FLOATING PARTICLES (SCENT) */}
              <AnimatePresence>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -150,
                      x: (i - 2) * 40,
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "circOut",
                    }}
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                  >
                    <Droplets className="w-4 h-4 text-white/40 blur-[1px]" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* FLOATING DECOR */}
            <motion.div
              animate={{
                rotate: 360,
                y: [0, -20, 0],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                y: { duration: 4, repeat: Infinity },
              }}
              className="absolute top-20 right-0 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER LABEL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4"
      >
        <div className="h-px w-12 bg-white" />
        <span
          className={`${gothamOffice.className} text-[9px] tracking-[0.5em] text-white uppercase`}
        >
          The House of Tutu Paris
        </span>
        <div className="h-px w-12 bg-white" />
      </motion.div>
    </div>
  );
}
