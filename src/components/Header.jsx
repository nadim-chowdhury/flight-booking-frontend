"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import SearchFlightsLoading from "@/components/SearchFlightsLoading";
import { useSelector, useDispatch } from "react-redux";
import { Power } from "lucide-react";
import { userLogout } from "@/redux/slices/userSlice"; // Import the logout action
import { setAirports, setLoading } from "../redux/slices/airportSlice";
import { fetchAllAirports } from "@/lib/fetchAirports";
import { getUniqueAirports } from "../lib/getUniqueAirports";
import { allAirlinesDataMain } from "@/utils/all-airlines-data";
import { allAirportsDataMain } from "@/utils/all-airports-data";
import { allCountriesDataMain } from "@/utils/all-countries-data";
import { allPlanesDataMain } from "@/utils/all-planes-data";

const navLinks = [
  { href: "/bookings", label: "Bookings" },
  { href: "/profile", label: "Profile" },
  { href: "/admin", label: "Admin Panel" },
  { href: "/login", label: "Login" },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [allAirports, setallAirports] = useState([]);
  const [loadingAirports, setLoadingAirports] = useState(false);
  const [windowLoaded, setWindowLoaded] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isSearchFlights = useSelector((state) => state.searchFlights);
  const userInfo = useSelector((state) => state.user.userInfo);
  const {
    data: airports,
    loading,
    error,
  } = useSelector((state) => state.airports);

  // useEffect(() => {
  //   dispatch(fetchAllAirports("")); // Dispatch the action when the searchTerm changes
  // }, [dispatch]);

  useEffect(() => {
    const defaultKeyword = "airport"; // Default search term for the initial load
    fetchAllAirports(
      defaultKeyword,
      setallAirports,
      setLoadingAirports,
      "airports" // Updated to use "airports" type as per your backend API
    );

    localStorage.setItem(
      "allAirlinesDataMain",
      JSON.stringify(allAirlinesDataMain)
    );
    localStorage.setItem(
      "allAirportsDataMain",
      JSON.stringify(allAirportsDataMain)
    );
    localStorage.setItem(
      "allCountriesDataMain",
      JSON.stringify(allCountriesDataMain)
    );
    localStorage.setItem(
      "allPlanesDataMain",
      JSON.stringify(allPlanesDataMain)
    );

    // Listen to the window load event
    window.addEventListener("load", handleWindowLoad);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("load", handleWindowLoad);
    };
  }, []);

  useEffect(() => {
    if (allAirports && allAirports.length > 0) {
      // Filter out duplicate airports by iataCode
      const uniqueAirports = getUniqueAirports(allAirports);

      // Dispatch the unique airports to the Redux store
      dispatch(setAirports(uniqueAirports));
    }
  }, [allAirports, dispatch]);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const handleWindowLoad = () => {
    setWindowLoaded(false);
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
            <nav className="hidden md:flex space-x-6 font-medium">
              {navLinks.slice(0, -1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.href === "/admin" && userInfo.role !== "admin"
                      ? "hidden"
                      : "block"
                  }
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
                className="bg-sky-600 hover:bg-sky-700 text-white rounded-full"
                onClick={handleLogout}
                size="sm"
              >
                <Power className="w-5 h-5" />
                {/* Log Out */}
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
              {navLinks.map((link) => {
                const showLink =
                  (isAuthenticated && link.href !== "/login") ||
                  (!isAuthenticated && link.href === "/login");

                return (
                  showLink && (
                    <li key={link.href}>
                      <Link href={link.href} onClick={() => setNavOpen(false)}>
                        <span
                          className={`block hover:text-slate-100 ${
                            link.href === "/login"
                              ? "px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 text-center"
                              : ""
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  )
                );
              })}

              {isAuthenticated && (
                <li>
                  <Button
                    className="bg-sky-600 hover:bg-sky-700 text-white rounded-full"
                    onClick={handleLogout}
                  >
                    <Power className="w-5 h-5" />
                    {/* Log Out */}
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>

      {(isSearchFlights.isLoading || loadingAirports || windowLoaded) && (
        <div
          className={`absolute top-0 left-0 w-full h-screen bg-white z-50 flex items-center justify-center`}
        >
          <SearchFlightsLoading />
        </div>
      )}
    </header>
  );
}
