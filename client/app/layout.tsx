// 'use client'
//  import "./globals.css";
//  import {Poppins} from "next/font/google";
//  import {Josefin_Sans} from "next/font/google";
//  import { ThemeProvider } from "./utils/theme-provider";
//  import { Toaster } from "react-hot-toast";
//  import { Providers } from "./Providers";
//  import {SessionProvider} from "next-auth/react"
//  import Loader from "./components/Loader/Loader"
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
// import { SocketProvider } from '@/context/SocketProvider';

// const poppins = Poppins({
//   subsets: ["latin", "latin-ext"],  
//   variable: "--font-poppins",
//   weight: ["400", "500","600", "700"],  
// });

// const josefin = Josefin_Sans({
//   subsets: ["latin", "latin-ext"],  
//   variable: "--font-josefin-sans",
//   weight: ["400", "500","600", "700"],  
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300` }>
//         <Providers>
//           <SessionProvider>
//         <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
//           <SocketProvider>

      
//          <Custom>
//           {children}
//          </Custom>

//           <Toaster position="top-center" reverseOrder={false}/>
//           </SocketProvider>
//         </ThemeProvider>
//         </SessionProvider>
//         </Providers>
//       </body>
//     </html>
//   );
// }

// const Custom : React.FC<{children : React.ReactNode}> = ({children})=>{
//   const { isLoading, data: user } = useLoadUserQuery({});

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <SocketProvider user={session?.user}>{children}</SocketProvider>
//   );
// }

"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Providers";
import { SessionProvider } from "next-auth/react";
import Loader from "./components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { SocketProvider } from "@/context/SocketProvider";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-josefin-sans",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >

        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  const user = useSelector((state: RootState) => state.auth.user);

  return isLoading ? (
    <Loader />
  ) : (
    <SocketProvider user={user}>{children}</SocketProvider> // ✅ Pass `user`, not `session?.user`
  );
};
