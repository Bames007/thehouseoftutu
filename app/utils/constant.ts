import { Alex_Brush, Italiana, Montserrat, Poppins } from "next/font/google";

export const gothamOffice = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: true,
});

export const italiana = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});

export const alexBrush = Alex_Brush({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});

export const monteserrat = Montserrat({
  weight: ["400"],
  subsets: ["latin"],
  preload: true,
});
