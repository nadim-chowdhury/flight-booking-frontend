"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <div className="">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">About Us</h1>
        <p className="text-lg mb-6">
          Welcome to FlightX, your trusted flight booking system. We are
          dedicated to providing the best travel booking experience with a
          user-friendly platform, competitive prices, and reliable service.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Our Mission
        </h2>
        <p className="mb-6">
          At FlightX, our mission is to simplify air travel booking by offering
          a seamless and hassle-free experience. We strive to connect travelers
          with their dream destinations through a variety of airlines and travel
          options.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside mb-6">
          <li>
            Easy-to-use platform for booking domestic and international flights.
          </li>
          <li>Transparent pricing with no hidden fees.</li>
          <li>
            24/7 customer support to assist you with all your travel needs.
          </li>
          <li>
            Secure payment options to ensure your information is protected.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Our Story
        </h2>
        <p className="mb-6">
          Founded in 2024, FlightX was born out of the need for a modern and
          flexible flight booking system that caters to both business and
          leisure travelers. With a passion for travel and technology, our team
          has built a platform that makes flight bookings more accessible to
          everyone.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Contact Us
        </h2>
        <p className="">
          If you have any questions or need assistance, feel free to reach out
          to our support team at
          <Link href="mailto:support@flightx.com" className="text-sky-600">
            {" "}
            support@flightx.com
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
