"use client";

import { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Power } from "lucide-react";
import { userLogout } from "@/redux/slices/userSlice"; // Import the logout action

const navLinks = [
  { href: "/bookings", label: "Bookings" },
  { href: "/profile", label: "Profile" },
  { href: "/admin", label: "Admin Panel" },
  { href: "/login", label: "Login" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

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
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-8 font-medium">
              {navLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  // Uncomment this code to conditionally render the Admin Panel link
                  // className={
                  //   link.href === "/admin" && userInfo.role !== "admin"
                  //     ? "hidden"
                  //     : "block"
                  // }
                >
                  <span className="hover:text-sky-600 hover:underline">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          )}

          {/* Call to Action Button */}
          <div className="hidden md:flex gap-2">
            {isAuthenticated ? (
              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white"
                onClick={handleLogout}
              >
                <Power className="w-5 h-5" />
              </Button>
            ) : (
              <Link href="/login">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                  Login
                </Button>
              </Link>
            )}
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
              {navLinks.slice(0, -1).map((link) => (
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

              {isAuthenticated && (
                <li>
                  <Button
                    className="bg-sky-600 hover:bg-sky-700 text-white"
                    onClick={handleLogout}
                  >
                    <Power className="w-5 h-5 mr-2" />
                    Log Out
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
