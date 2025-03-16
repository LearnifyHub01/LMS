import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from '@/app/utils/Toaster'

export default function myApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => console.log("✅ Razorpay SDK loaded")}
      />
      <Component {...pageProps} />
    </>
  );
}
