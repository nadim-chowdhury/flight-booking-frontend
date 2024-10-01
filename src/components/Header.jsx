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

  // Define navigation links
  const navLinks = [
    { href: "/bookings", label: "Bookings" },
    { href: "/admin", label: "Admin Panel" },
    // { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl px-4 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold uppercase">
            Travel<span className="text-sky-600">Buddy</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            {navLinks.slice(0, -1).map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="hover:text-sky-600 hover:underline">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex gap-2">
            <Link href="/login">
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative">
          <Button
            onClick={toggleNav}
            size="sm"
            className="bg-sky-600 hover:bg-sky-700 text-white"
          >
            {navOpen ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {navOpen && (
          <nav className="md:hidden bg-sky-50 border-y absolute top-[68px] left-0 w-full">
            <ul className="space-y-4 px-4 py-6 flex flex-col justify-center items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className={`block hover:text-slate-500 ${
                        link.href === "/login"
                          ? "px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 text-center mt-2"
                          : ""
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
