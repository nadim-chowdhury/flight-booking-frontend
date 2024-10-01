"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import FlightSearch from "../components/FlightSearch";
// import FlightList from "../components/FlightList";

export default function Home() {
  const [flights, setFlights] = useState([]);

  const router = useRouter();
  const userId = "current-user-id";

  const handleFlightsFound = (foundFlights) => {
    setFlights(foundFlights);
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1521086248378-5fe2b23c8b23?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-no-repeat min-h-[95vh] text-white py-8 md:py-16">
        <div className="max-w-6xl px-4 mx-auto text-center tracking-wide">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Book Your Next Flight
          </h2>
          {/* <p className="mb-8">
            Find the best deals on flights to your favorite destinations.
          </p> */}
          <div className="bg-white rounded-lg border">
            <FlightSearch onFlightsFound={handleFlightsFound} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-sky-50 border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Best Prices</h3>
              <p>We offer competitive prices for all destinations worldwide.</p>
            </div>
            <div className="bg-sky-50 border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p>
                Our team is here to help you with any questions at any time.
              </p>
            </div>
            <div className="bg-sky-50 border p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Easy Booking</h3>
              <p>
                Book flights quickly and easily with our user-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover text-white">
        <div className="max-w-6xl px-4 mx-auto py-16 text-center bg-gradient-to-r from-transparent via-black/50 to-transparent">
          <h2 className="text-3xl font-bold mb-4 tracking-wider">
            Ready to Book Your Flight?
          </h2>
          <p className="mb-8">Sign up now and get access to exclusive deals!</p>
          <Button
            onClick={() => router.push("/register")}
            className="bg-sky-600 hover:bg-sky-700"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-6xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sky-50 border p-6 rounded-lg">
              <p className="mb-4">
                &quot;This platform made booking my flight so easy and
                stress-free!&quot;
              </p>
              <p className="font-semibold">- John Doe</p>
            </div>
            <div className="bg-sky-50 border p-6 rounded-lg">
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
      {/* {flights.length >= 0 && (
        <section className="py-16">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="bg-sky-100 p-6 rounded-lg">
              <h2 className="text-3xl font-bold mb-8">Available Flights</h2>
              <FlightList flights={flights} userId={userId} />
            </div>
          </div>
        </section>
      )} */}
    </div>
  );
}
