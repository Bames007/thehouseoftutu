"use client";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

export default function CartProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="bottom-right"
        gutter={20}
        toastOptions={{
          className: "luxury-toast-container",
        }}
      />
    </CartProvider>
  );
}
