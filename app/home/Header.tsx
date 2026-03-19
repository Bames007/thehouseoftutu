"use client";
import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../home/context/CartContext";
import Image from "next/image";
import CartModal from "./modals/CartModal";
import WishlistModal from "./modals/WishListModal";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const Header = () => {
  const { cart, wishlist } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for a "luxury" transition
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
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

  const navLinks = [
    { name: "Shop", id: "shop-section" },
    { name: "Collections", id: "collections-section" },
    { name: "Discovery", id: "discovery-section" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          isScrolled
            ? "h-16 bg-[#691C33]/90 backdrop-blur-md shadow-xl"
            : "h-24 bg-[#691C33]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`${montserrat.className} text-[10px] uppercase tracking-[0.3em] font-bold text-white/70 hover:text-white transition-all relative group`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative transition-transform duration-500 hover:scale-105"
            >
              <Image
                src="/logo.png"
                alt="The House of Tutu"
                width={isScrolled ? 40 : 55}
                height={isScrolled ? 40 : 55}
                className="brightness-0 invert object-contain transition-all duration-500"
              />
            </button>
          </div>

          {/* Icons Area */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-white/80 hover:text-white transition-transform active:scale-90"
            >
              <Heart
                className={`w-5 h-5 ${wishlist.length > 0 ? "fill-white text-white" : ""}`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-white text-[#691C33] text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white/80 hover:text-white transition-transform active:scale-90"
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-white text-[#691C33] text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#5a182c] border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/80 text-[12px] uppercase tracking-[0.4em] font-bold text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
};

export default Header;
