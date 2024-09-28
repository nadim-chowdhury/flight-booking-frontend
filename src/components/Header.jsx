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
          <h1 className="text-3xl font-bold tracking-tight uppercase">
            Travel<span className="text-blue-600">Buddy</span>
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-medium">
            {navLinks.slice(0, -1).map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-gray-700 hover:text-blue-600 hover:underline">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex gap-2">
            <Link href="/login">
              <Button className="bg-blue-600">Login</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button onClick={toggleNav} size="sm">
            {navOpen ? (
              <AiOutlineClose size={20} />
            ) : (
              <AiOutlineMenu size={20} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {navOpen && (
        <nav className="md:hidden bg-gray-50 border-t">
          <ul className="space-y-4 px-4 py-4 flex flex-col justify-center items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={`block text-gray-700 hover:text-blue-600 hover:underline ${
                      link.href === "/login"
                        ? "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
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
    </header>
  );
}
