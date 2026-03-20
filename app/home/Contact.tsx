"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Italiana, Montserrat } from "next/font/google";

const italiana = Italiana({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-[#FAF9F6]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* LEFT SIDE: INVITATION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span
                className={`${montserrat.className} text-[10px] tracking-[0.5em] text-[#691C33] font-bold uppercase mb-6 block`}
              >
                Private Client Relations
              </span>
              <h2
                className={`${italiana.className} text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1]`}
              >
                Inquire <br />{" "}
                <span className="italic text-[#691C33]">With Us</span>
              </h2>
            </div>

            <p className="text-gray-500 max-w-sm leading-relaxed text-sm md:text-base">
              Our specialists are available for bespoke fragrance selections,
              private consultations, or corporate gifting inquiries.
            </p>

            <div className="space-y-8 pt-6">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#691C33] group-hover:border-[#691C33] transition-all duration-500">
                  <MapPin className="w-4 h-4 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p
                    className={`${montserrat.className} text-[9px] tracking-widest uppercase font-bold text-gray-400 mb-1`}
                  >
                    Abuja Flagship
                  </p>
                  <p className="text-sm font-medium">
                    Plot 123, Lakeview Estate, Abuja
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#691C33] group-hover:border-[#691C33] transition-all duration-500">
                  <Mail className="w-4 h-4 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p
                    className={`${montserrat.className} text-[9px] tracking-widest uppercase font-bold text-gray-400 mb-1`}
                  >
                    Email Concierge
                  </p>
                  <p className="text-sm font-medium">
                    concierge@thehouseoftutu.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: BESPOKE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 lg:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.02)] rounded-2xl md:rounded-none"
          >
            <form className="space-y-10 md:space-y-12">
              <div className="relative border-b border-gray-100 focus-within:border-[#691C33] transition-colors pb-3">
                <label
                  className={`${montserrat.className} text-[9px] tracking-[0.2em] uppercase font-bold text-gray-400 block mb-2`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent focus:outline-none text-sm font-light placeholder:text-gray-200"
                  placeholder="Hauwa Mohammed"
                />
              </div>

              <div className="relative border-b border-gray-100 focus-within:border-[#691C33] transition-colors pb-3">
                <label
                  className={`${montserrat.className} text-[9px] tracking-[0.2em] uppercase font-bold text-gray-400 block mb-2`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent focus:outline-none text-sm font-light placeholder:text-gray-200"
                  placeholder="hauwa@example.com"
                />
              </div>

              <div className="relative border-b border-gray-100 focus-within:border-[#691C33] transition-colors pb-3">
                <label
                  className={`${montserrat.className} text-[9px] tracking-[0.2em] uppercase font-bold text-gray-400 block mb-2`}
                >
                  Message
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-transparent focus:outline-none text-sm font-light resize-none placeholder:text-gray-200"
                  placeholder="Tell us how we can assist..."
                />
              </div>

              <button
                type="submit"
                className="group w-full md:w-auto flex items-center justify-center gap-6 bg-[#1A1A1A] text-white px-10 py-5 md:py-6 hover:bg-[#691C33] transition-all duration-500 active:scale-95"
              >
                <span
                  className={`${montserrat.className} text-[10px] tracking-[0.4em] uppercase font-bold`}
                >
                  Submit Inquiry
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
