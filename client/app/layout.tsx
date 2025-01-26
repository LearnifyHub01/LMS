'use client'
import "./globals.css";
import {Poppins} from "next/font/google";
import {Josefin_Sans} from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Providers";
import {SessionProvider} from "next-auth/react"

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],  // You can include more subsets like 'cyrillic' if needed
  variable: "--font-poppins",
  weight: ["400", "500","600", "700"],  
});

const josefin = Josefin_Sans({
  subsets: ["latin", "latin-ext"],  // Add more subsets as needed
  variable: "--font-josefin-sans",
  weight: ["400", "500","600", "700"],  
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300` }>
        <Providers>
          <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-center" reverseOrder={false}/>
        </ThemeProvider>
        </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
