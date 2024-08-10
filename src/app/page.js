"use client";

import { useState } from "react";
import FlightSearch from "@/components/FlightSearch";
import FlightList from "@/components/FlightList";
import { useRouter } from "next/navigation";

export default function Home() {
  const [flights, setFlights] = useState([]);
  const router = useRouter();
  const userId = "current-user-id"; // Replace with the actual logged-in user ID

  const handleFlightsFound = (foundFlights) => {
    setFlights(foundFlights);
  };

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Book Your Next Flight</h1>
          <p className="text-lg mb-8">
            Find the best deals on flights to your favorite destinations.
          </p>
          <FlightSearch onFlightsFound={handleFlightsFound} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Best Prices</h3>
              <p>We offer competitive prices for all destinations worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p>
                Our team is here to help you with any questions at any time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Easy Booking</h3>
              <p>
                Book flights quickly and easily with our user-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">
                &quot;This platform made booking my flight so easy and
                stress-free!&quot;
              </p>
              <p className="font-semibold">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4">
                &quot;I found the best deal on my flight thanks to this
                site!&quot;
              </p>
              <p className="font-semibold">- Jane Smith</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight List Section */}
      {flights.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold mb-8">Available Flights</h2>
              <FlightList flights={flights} userId={userId} />
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Book Your Flight?
          </h2>
          <p className="text-lg mb-8">
            Sign up now and get access to exclusive deals!
          </p>
          <button
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg"
            onClick={() => router.push("/signup")}
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
