import { Inter } from "next/font/google";
import "./globals.css";
import ApolloProviderWrapper from "@/lib/ApolloProviderWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreProviderWrapper from "../lib/StoreProviderWrapper";

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
            {children}
            <Footer />
          </StoreProviderWrapper>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
