"use client";
import { motion } from "framer-motion";
import { italiana, gothamOffice } from "@/app/utils/constant";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <section id="contact" className="py-32 bg-[#FAF9F6]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* LEFT SIDE: THE INVITATION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span
              className={`${montserrat.className} text-[10px] tracking-[0.5em] text-[#691C33] font-bold uppercase mb-6 block`}
            >
              Private Client Relations
            </span>
            <h2
              className={`${italiana.className} text-5xl md:text-7xl text-[#1A1A1A] mb-8 leading-tight`}
            >
              Inquire <br /> <span className="italic">With Us</span>
            </h2>
            <p className="text-gray-500 max-w-md leading-loose mb-12">
              Our specialists are available to assist with bespoke fragrance
              selections, corporate gifting, or any inquiries regarding our
              permanent collections.
            </p>

            <div className="space-y-10">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#691C33] group-hover:border-[#691C33] transition-all">
                  <MapPin className="w-4 h-4 group-hover:text-white" />
                </div>
                <div>
                  <p
                    className={`${montserrat.className} text-[10px] tracking-widest uppercase font-bold text-gray-400`}
                  >
                    Abuja Flagship
                  </p>
                  <p className="text-sm">Plot 123, Lakeview Estate, Abuja</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#691C33] group-hover:border-[#691C33] transition-all">
                  <Mail className="w-4 h-4 group-hover:text-white" />
                </div>
                <div>
                  <p
                    className={`${montserrat.className} text-[10px] tracking-widest uppercase font-bold text-gray-400`}
                  >
                    Email
                  </p>
                  <p className="text-sm">concierge@thehouseoftutu.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: THE BESPOKE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)]"
          >
            <form className="space-y-12">
              <div className="relative border-b border-gray-100 focus-within:border-[#691C33] transition-colors pb-2">
                <label
                  className={`${montserrat.className} text-[9px] tracking-[0.3em] uppercase font-bold text-gray-400`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent pt-2 focus:outline-none text-sm font-light"
                  placeholder="Hauwa Mohammed"
                />
              </div>
              <div className="relative border-b border-gray-100 focus-within:border-[#691C33] transition-colors pb-2">
                <label
                  className={`${montserrat.className} text-[9px] tracking-[0.3em] uppercase font-bold text-gray-400`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-transparent pt-2 focus:outline-none text-sm font-light"
                  placeholder="hauwa@example.com"
                />
              </div>
              <div className="relative border-b border-gray-100 focus-within:border-[#691C33] transition-colors pb-2">
                <label
                  className={`${montserrat.className} text-[9px] tracking-[0.3em] uppercase font-bold text-gray-400`}
                >
                  How can we assist?
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent pt-2 focus:outline-none text-sm font-light resize-none"
                  placeholder="Inquiry about Oud Royale..."
                />
              </div>
              <button
                type="submit"
                className="group flex items-center gap-4 bg-[#1A1A1A] text-white px-10 py-5 hover:bg-[#691C33] transition-all"
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
