"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cities } from "../utils/all-cities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FlightMap from "./FlightMap";
import MapModal from "./MapModal";

export default function MostVisitedCity() {
  const [departureAirport, setDepartureAirport] = useState(null);
  const [destinationAirport, setDestinationAirport] = useState(null);
  const [depMapModalOpen, setDepMapModalOpen] = useState(false);

  const router = useRouter();

  const getDepartureDate = () => {
    const today = new Date();
    const departureDate = new Date(today.setDate(today.getDate() + 2));
    return departureDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const redirectToFlights = (departureAirport, destinationAirport) => {
    if (!departureAirport || !destinationAirport) return;

    const departureDate = getDepartureDate();

    const link = `/flights?type=one-way&departureCity=${
      departureAirport.iata_code
    }&departureCityFullName=${departureAirport.city.toUpperCase()}&destinationCity=${
      destinationAirport.iata_code
    }&destinationCityFullName=${destinationAirport.name.toUpperCase()}&departureDate=${departureDate}&adults=1&children=0&infants=0&seatType=economy`;

    router.push(link);
  };

  useEffect(() => {
    if (departureAirport && destinationAirport) {
      //   setDepMapModalOpen(false);
      redirectToFlights(departureAirport, destinationAirport);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departureAirport, destinationAirport]);

  return (
    <div className="max-w-6xl px-4 mx-auto text-center pt-16">
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="text-3xl font-extrabold mb-12">Most Visited Cities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city, index) => (
          <div
            key={index}
            className="relative bg-sky-50 border rounded-lg overflow-hidden group duration-300"
          >
            {/* City Image */}
            <Image
              src={city.image}
              alt={city.name}
              width={1280}
              height={720}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              {/* City Name */}
              <h3 className="text-xl font-semibold text-gray-900">
                {city.name}
              </h3>
              {/* City Description */}
              <p className="mt-2 text-sm text-gray-700">{city.description}</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-80 p-4 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white duration-300">
              <h3 className="text-2xl font-bold">{city.name}</h3>
              <p className="text-sm mt-2">{city.description}</p>
              <p className="text-sm mt-2">Country: {city.country}</p>
              {/* "See Flights" Button */}
              <button
                onClick={() => {
                  setDepMapModalOpen(true);
                  setDestinationAirport(city.airport);
                }}
                className="mt-4 inline-block bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
              >
                See Flights
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      <MapModal
        isOpen={depMapModalOpen}
        onClose={() => setDepMapModalOpen(false)}
        title="Select Departure Airport"
      >
        <FlightMap setSelectedAirport={setDepartureAirport} />
      </MapModal>
    </div>
  );
}
