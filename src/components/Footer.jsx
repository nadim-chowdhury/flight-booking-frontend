"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useState } from "react";

const footerData = {
  about: {
    title: "Travel Buddy",
    description:
      "Your trusted partner for seamless flight bookings and travel deals worldwide.",
  },
  socialLinks: [
    { name: "Facebook", icon: FaFacebook, href: "https://facebook.com" },
    { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
    { name: "Twitter", icon: FaTwitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com" },
  ],
  quickLinks: [
    { name: "Flights", href: "/flights" },
    { name: "Deals", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  supportLinks: [
    { name: "FAQ", href: "/" },
    { name: "Terms & Conditions", href: "/" },
    { name: "Privacy Policy", href: "/" },
    { name: "Help Center", href: "/" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-4">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              {footerData.about.title}
            </h3>
            <p className="mb-6">{footerData.about.description}</p>

            {/* Social Links */}
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {footerData.socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link key={index} href={link.href}>
                    <Icon
                      size={24}
                      className="text-slate-400 hover:text-white"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span className="hover:text-white">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              {footerData.supportLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span className="hover:text-white">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Email Subscription Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Our Newsletter
            </h3>
            <p className="text-sm mb-4">
              Stay updated with the latest flight deals and travel tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-2 py-1 bg-slate-800 text-slate-300 border border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-slate-600"
              />
              <button
                type="submit"
                className="bg-sky-600/50 hover:bg-sky-700 text-white px-4 py-1 rounded transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-slate-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {footerData.about.title}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
