import { Inter } from "next/font/google";
import "./globals.css";
// import ApolloProviderWrapper from "../lib/ApolloProviderWrapper";
import StoreProviderWrapper from "../lib/StoreProviderWrapper";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CookieProvider from "../lib/CookieProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flight Booking App",
  description: "Developed by Nadim Chowdhury - https://nadim.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-slate-700`}>
        {/* <ApolloProviderWrapper> */}
        <StoreProviderWrapper>
          <CookieProvider>
            <Header />
            <main className="px-4 pb-4 md:px-6 md:pb-6">
              <Suspense>{children}</Suspense>
            </main>
            <Footer />
            {/* <div className="bg-slate-900 text-white py-4 text-center">
              <p>
                &copy; {new Date().getFullYear()} Travel Buddy. All rights
                reserved.
              </p>
            </div> */}
            <ToastContainer position="bottom-right" />
          </CookieProvider>
        </StoreProviderWrapper>
        {/* </ApolloProviderWrapper> */}
      </body>
    </html>
  );
}
