import "./globals.css";
import ClientReduxWrapper from "./redux/ClientReduxWrapper";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
import OTPInput from "@/components/OTPInput";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Larkon – Ecommerce Admin",
  description: "Larkon ecommerce admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}
      >
        <ClientReduxWrapper>
          <OTPInput>
            {children}
          </OTPInput>
        </ClientReduxWrapper>
      </body>
    </html>
  );
}