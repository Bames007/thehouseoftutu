"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  size?: string | number;
  quantity: number;
}

export interface WishlistItem {
  id: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  addToCart: (id: string, size?: string | number) => void;
  addToWishlist: (id: string) => void;
  removeFromCart: (id: string, size?: string | number) => void;
  removeFromWishlist: (id: string) => void;
  updateCartQuantity: (
    id: string,
    size: string | number | undefined,
    delta: number,
  ) => void;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // --- HYDRATION & PERSISTENCE ---
  useEffect(() => {
    const savedCart = localStorage.getItem("luxury_cart");
    const savedWish = localStorage.getItem("luxury_wishlist");

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // SAFETY GUARD: If old 'number' IDs exist, clear them to prevent crashes
        if (parsed.length > 0 && typeof parsed[0].id === "number") {
          localStorage.removeItem("luxury_cart");
        } else {
          setCart(parsed);
        }
      } catch (e) {
        console.error("Cart hydration failed", e);
      }
    }

    if (savedWish) {
      try {
        setWishlist(JSON.parse(savedWish));
      } catch (e) {
        console.error("Wishlist hydration failed", e);
      }
    }

    setIsHydrated(true);
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("luxury_cart", JSON.stringify(cart));
      localStorage.setItem("luxury_wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist, isHydrated]);

  // --- HANDLERS ---
  const addToCart = (id: string, size?: string | number) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { id, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size?: string | number) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  const updateCartQuantity = (
    id: string,
    size: string | number | undefined,
    delta: number,
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const addToWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.some((i) => i.id === id) ? prev : [...prev, { id }],
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        cartCount: cart.reduce((acc, item) => acc + item.quantity, 0),
        wishlistCount: wishlist.length,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        updateCartQuantity,
        isInWishlist,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
