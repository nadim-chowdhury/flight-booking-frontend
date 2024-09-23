"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Button } from "../components/ui/button";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl px-4 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold tracking-tight uppercase">
            Travel<span className="text-blue-600">Buddy</span>
          </h1>
        </Link>

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            <Link href="/bookings">
              <span className="text-gray-700 hover:text-blue-600 hover:underline">
                Bookings
              </span>
            </Link>
            {/* <Link href="/">
            <span className="text-gray-700 hover:text-blue-600 hover:underline">
              Deals
            </span>
          </Link> */}
            <Link href="/about">
              <span className="text-gray-700 hover:text-blue-600 hover:underline">
                About
              </span>
            </Link>
            <Link href="/contact">
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button onClick={toggleNav} size="sm">
            {navOpen ? (
              <AiOutlineClose size={20} className="" />
            ) : (
              <AiOutlineMenu size={20} className="" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {navOpen && (
        <nav className="md:hidden bg-gray-50 border-t">
          <ul className="space-y-4 px-4 py-4 flex flex-col justify-center items-center">
            <li>
              <Link href="/bookings">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  Bookings
                </span>
              </Link>
            </li>
            {/* <li>
              <Link href="/deals">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  Deals
                </span>
              </Link>
            </li> */}
            <li>
              <Link href="/about">
                <span className="block text-gray-700 hover:text-blue-600 hover:underline">
                  About
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
                <span className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center">
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
