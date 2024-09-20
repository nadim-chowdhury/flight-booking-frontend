import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Travel Buddy
            </h3>
            <p className="text-gray-400">
              Your trusted partner for seamless flight bookings and travel deals
              worldwide.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="hover:text-white">Flights</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="hover:text-white">Deals</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="hover:text-white">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="hover:text-white">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="hover:text-white">FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="hover:text-white">Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="hover:text-white">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <span className="hover:text-white">Help Center</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <span
                href="https://facebook.com"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook size={24} />
              </span>
              <span
                href="https://instagram.com"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram size={24} />
              </span>
              <span
                href="https://twitter.com"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter size={24} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Travel Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
