import type { Metadata } from "next";
import { gothamOffice, italiana } from "./utils/constant";
import Header from "./home/Header";
import Footer from "./home/Footer";
import CartProviderWrapper from "./home/CartProviderWrapper";
import "./globals.css";

function getCanonicalUrl(path: string = "") {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://thehouseoftutu.com";
  return `${baseUrl}${path}`;
}

export const metadata: Metadata = {
  title: {
    default: "The House of Tutu | Luxury Perfumes & Fragrances",
    template: "%s | The House of Tutu",
  },
  description:
    "Discover the world's finest luxury perfumes at The House of Tutu. Shop exclusive fragrances, new arrivals, and best sellers. Free shipping on orders over $100.",
  keywords: [
    "luxury perfume",
    "fragrance",
    "perfume store",
    "The House of Tutu",
    "Nigeria perfume",
    "designer scents",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: getCanonicalUrl(),
    siteName: "The House of Tutu",
    title: "The House of Tutu | Luxury Perfumes & Fragrances",
    description:
      "Discover the world's finest luxury perfumes at The House of Tutu.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The House of Tutu - Luxury Perfumes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The House of Tutu | Luxury Perfumes",
    description: "Discover the world's finest luxury perfumes.",
    images: ["/og-image.png"],
    creator: "@thehouseoftutu",
  },
  alternates: { canonical: getCanonicalUrl() },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "The House of Tutu",
    description:
      "Discover the world's finest luxury perfumes at The House of Tutu.",
    url: getCanonicalUrl(),
    logo: getCanonicalUrl("/logo.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-911-264-4027",
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.instagram.com/houseoftutu/",
      "https://www.facebook.com/houseoftutu/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${gothamOffice.className} ${italiana.className} scroll-smooth`}
      // 1. FIX: Added to prevent browser extension hydration errors
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        <CartProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <Header />
            {/* 2. FIX: Added pt-20 to ensure content starts under the fixed header */}
            <main role="main" className="flex-grow pt-20 md:pt-28">
              {children}
            </main>
            <Footer />
          </div>
        </CartProviderWrapper>
      </body>
    </html>
  );
}
