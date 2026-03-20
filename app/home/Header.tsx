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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "New Arrivals", id: "new-arrivals" },
    { name: "Collections", id: "collections" },
    { name: "Shop", id: "shop" },
    { name: "Discovery", id: "discovery" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Space for the header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-700 ease-in-out ${
          isScrolled
            ? "h-16 md:h-20 bg-[#691C33]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "h-24 md:h-28 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative">
          {/* LEFT: Desktop Nav */}
          <div className="flex-1 flex items-center">
            <nav className="hidden lg:flex gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`${montserrat.className} text-[9px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-white transition-all group relative`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full" />
                </button>
              ))}
            </nav>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* CENTER: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={isScrolled ? 40 : 55}
                height={isScrolled ? 40 : 55}
                className="brightness-0 invert object-contain transition-all duration-500"
              />
            </button>
          </div>

          {/* RIGHT: Icons */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 group"
            >
              <Heart
                size={20}
                className={`transition-colors ${wishlist.length > 0 ? "fill-white text-white" : "text-white/80 group-hover:text-white"}`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-white text-[#691C33] text-[8px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 group"
            >
              <ShoppingBag
                size={20}
                className="text-white/80 group-hover:text-white"
              />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-white text-[#691C33] text-[8px] min-w-[14px] h-[14px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[599]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] z-[600] bg-[#691C33] p-10 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-20">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={45}
                  height={45}
                  className="brightness-0 invert"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X size={30} />
                </button>
              </div>
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-3xl font-light text-white italic tracking-widest"
                  >
                    {link.name}
                  </motion.button>
                ))}
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
