"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  ArrowUp,
} from "lucide-react";
import { Montserrat, Italiana } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});
const italiana = Italiana({ weight: "400", subsets: ["latin"] });

const Footer = () => {
  return (
    <footer className="bg-[#691C33] text-white relative overflow-hidden pt-16 md:pt-24 pb-8">
      {/* Dynamic Watermark Scaling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-bold text-white/[0.02] pointer-events-none select-none uppercase tracking-tighter whitespace-nowrap hidden md:block">
        TUTU
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-24">
          {/* BRAND: Spans full width on Mobile, half on iPad, 4 cols on Desktop */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6 md:space-y-8">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={60}
              height={60}
              className="opacity-90 md:w-[70px] md:h-[70px]"
            />
            <h3
              className={`${italiana.className} text-3xl md:text-5xl tracking-tight leading-tight max-w-sm`}
            >
              Curating <span className="italic">Scents</span> of Distinction.
            </h3>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#691C33] transition-all duration-500 active:scale-90"
              >
                <Instagram size={16} />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#691C33] transition-all duration-500 active:scale-90"
              >
                <Facebook size={16} />
              </Link>
            </div>
          </div>

          {/* SHOP LINKS */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <h4
              className={`${montserrat.className} text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-white/40`}
            >
              Boutique
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                "All Perfumes",
                "New Arrivals",
                "Signature Sets",
                "Discovery Box",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-xs md:text-sm text-white/60 hover:text-white transition-colors duration-300 font-light tracking-wide"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <h4
              className={`${montserrat.className} text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-white/40`}
            >
              Concierge
            </h4>
            <div className="space-y-5 text-xs md:text-sm text-white/60 font-light tracking-wide">
              <div className="flex items-start gap-4">
                <MapPin
                  size={16}
                  className="mt-0.5 text-white/30 flex-shrink-0"
                />
                <p className="leading-relaxed">
                  Suite 204, Lakeview Plaza,
                  <br />
                  Jabi, Abuja, Nigeria
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={16} className="text-white/30 flex-shrink-0" />
                <p>+234 911 264 4027</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={16} className="text-white/30 flex-shrink-0" />
                <p className="break-all">concierge@thehouseoftutu.com</p>
              </div>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-6 md:space-y-8">
            <h4
              className={`${montserrat.className} text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold text-white/40`}
            >
              Stay Inspired
            </h4>
            <p className="text-xs md:text-sm text-white/60 font-light leading-relaxed">
              Join our inner circle for early access to rare editions and
              olfactive stories.
            </p>
            <form className="relative group max-w-sm sm:max-w-none">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-white/20 py-4 text-[10px] tracking-[0.2em] focus:outline-none focus:border-white transition-colors uppercase font-bold"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[0.3em] hover:text-white/50 transition-colors">
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR: Mobile Center Stack -> Desktop Row */}
        <div className="border-t border-white/5 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-12">
            <p className="text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">
              © {new Date().getFullYear()} House of Tutu
            </p>
            <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-bold text-white/30 hover:text-white transition-all active:scale-95"
          >
            Back to top{" "}
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
