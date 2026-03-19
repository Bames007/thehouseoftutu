"use client";
import { motion } from "framer-motion";
import { gothamOffice } from "../utils/constant";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const shopLinks = [
    { name: "All Perfumes", href: "#shop" },
    { name: "New Arrivals", href: "#new" },
    { name: "Gift Sets", href: "/gifts" },
  ];

  const brandLinks = [
    { name: "Our Story", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "FAQs", href: "/faq" },
  ];

  return (
    <footer className="bg-[#691C33] text-white relative overflow-hidden pt-20 pb-10">
      {/* BACKGROUND DECOR */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url('/pattern.png')`,
          backgroundSize: "400px",
        }}
      />

      {/* GIANT LOGO WATERMARK */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.05] pointer-events-none">
        <Image
          src="/logo-white.png"
          alt="watermark"
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-1 space-y-6">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-xl font-bold tracking-tighter">
              The House of Tutu
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Curating rare olfactive experiences for the global connoisseur.
              From Abuja to the world.
            </p>
          </div>

          {/* SHOP LINKS */}
          <div className="space-y-6">
            <h4
              className={`text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 ${gothamOffice.className}`}
            >
              Collections
            </h4>
            <ul className="space-y-4">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-2 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <h4
              className={`text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 ${gothamOffice.className}`}
            >
              Concierege
            </h4>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/30" /> +234 911 264 4027
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/30" />{" "}
                info@thehouseoftutu.com
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-white/30" /> Abuja, Nigeria
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="space-y-6">
            <h4
              className={`text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 ${gothamOffice.className}`}
            >
              Newsletter
            </h4>
            <form className="relative">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-white/5 border-b border-white/20 py-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold hover:text-white/50 transition-colors">
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] text-white/40 uppercase font-bold">
          <p>© {new Date().getFullYear()} House of Tutu</p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
          <p className="opacity-30 italic">By EBCom Tech</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
