"use client";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../home/context/CartContext";
import Image from "next/image";
import CartModal from "./modals/CartModal";
import WishlistModal from "./modals/WishListModal";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: ["400", "700"], subsets: ["latin"] });

const Header = () => {
  const { cart, wishlist } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Shop", id: "shop-section" },
    { name: "Collections", id: "collections-section" },
    { name: "Discovery", id: "discovery-section" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-700 ease-in-out ${
          isScrolled
            ? "h-16 md:h-20 bg-[#691C33]/85 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "h-20 md:h-28 bg-[#691C33] border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* LEFT: Nav (Desktop) / Menu (Mobile/iPad) */}
          <div className="flex-1 flex items-center">
            <nav className="hidden lg:flex gap-8 xl:gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() =>
                    document
                      .getElementById(link.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`${montserrat.className} text-[10px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-white transition-all group relative`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                </button>
              ))}
            </nav>
            {/* Show Menu button on both Mobile and iPad (hidden only on Large Desktop) */}
            <button
              className="lg:hidden text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* CENTER: Logo (Responsive Scaling) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <Image
                src="/logo.png"
                alt="The House of Tutu"
                width={isScrolled ? 35 : 45}
                height={isScrolled ? 35 : 45}
                className="brightness-0 invert object-contain transition-all duration-700 md:w-[55px] md:h-[55px] lg:w-[60px] lg:h-[60px]"
                style={{
                  width: isScrolled
                    ? "clamp(30px, 5vw, 40px)"
                    : "clamp(40px, 8vw, 55px)",
                }}
              />
            </button>
          </div>

          {/* RIGHT: Icons */}
          <div className="flex-1 flex items-center justify-end gap-2 md:gap-5">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 group transition-transform active:scale-90"
            >
              <Heart
                size={20}
                strokeWidth={1.5}
                className={`transition-colors ${wishlist.length > 0 ? "fill-white text-white" : "text-white/80 group-hover:text-white"}`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-white text-[#691C33] text-[7px] md:text-[8px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 group transition-transform active:scale-90"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="text-white/80 group-hover:text-white transition-colors"
              />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-white text-[#691C33] text-[7px] md:text-[8px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE/IPAD DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[290]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[400px] z-[300] bg-[#691C33] p-10 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="brightness-0 invert"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:rotate-90 transition-transform duration-300"
                >
                  <X size={28} />
                </button>
              </div>
              <div className="flex flex-col gap-10">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      document
                        .getElementById(link.id)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-left text-2xl md:text-3xl font-light text-white italic tracking-[0.1em] hover:translate-x-2 transition-transform"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
              <div className="mt-auto border-t border-white/10 pt-8">
                <p className="text-[10px] tracking-widest text-white/40 uppercase mb-4 font-bold">
                  Follow Our Journey
                </p>
                <div className="flex gap-6 text-white/60">
                  <span className="text-xs uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                    Instagram
                  </span>
                  <span className="text-xs uppercase tracking-widest hover:text-white transition-colors cursor-pointer">
                    Facebook
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Header;
