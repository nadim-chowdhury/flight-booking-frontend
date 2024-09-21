"use client";

import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="bg-white border-b sticky top-0">
      <div className="container mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight uppercase">
            Travel<span className="text-blue-600">Buddy</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 hover:underline">
              Flights
            </span>
          </Link>
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 hover:underline">
              Deals
            </span>
          </Link>
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 hover:underline">
              About Us
            </span>
          </Link>
          <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 hover:underline">
              Contact
            </span>
          </Link>
        </nav>

        {/* Call to Action Button */}
        <div className="hidden md:flex gap-2">
          <Link href="/login">
            <Button className="bg-blue-600">Login</Button>
          </Link>
          {/* <Link href="/register">
            <Button className="bg-blue-600">Register</Button>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button onClick={toggleNav}>
            {navOpen ? (
              <AiOutlineClose size={24} className="" />
            ) : (
              <AiOutlineMenu size={24} className="" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {navOpen && (
        <nav className="md:hidden bg-gray-100 border-b">
          <ul className="space-y-4 px-4 py-4 flex flex-col justify-center items-center">
            <li>
              <Link href="/flights">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  Flights
                </span>
              </Link>
            </li>
            <li>
              <Link href="/deals">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  Deals
                </span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  About Us
                </span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  Contact
                </span>
              </Link>
            </li>
            <li>
              <Link href="/login">
                <span className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-sky-700 text-center">
                  Login
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
