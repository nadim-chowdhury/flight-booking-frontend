import { Inter } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "../lib/ApolloProviderWrapper";
import StoreProviderWrapper from "../lib/StoreProviderWrapper";
import Header from "../components/Header";
// import Footer from "../components/Footer";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flight Booking App",
  description: "Developed by Nadim Chowdhury - https://nadim.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-700`}>
        <ApolloProviderWrapper>
          <StoreProviderWrapper>
            <Header />
            <Suspense>{children}</Suspense>
            {/* <Footer /> */}
            <div className="bg-slate-900 text-white py-4 text-center">
              <p>
                &copy; {new Date().getFullYear()} Travel Buddy. All rights
                reserved.
              </p>
            </div>
          </StoreProviderWrapper>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
