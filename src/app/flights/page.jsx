"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FlightSearch from "../../components/FlightSearch";
import FlightDetails from "../../components/FlightDetails";
import {
  flightsDemoDataMultiCity,
  flightsDemoDataOneway,
  flightsDemoDataReturn,
} from "../../utils/demoData";

export default function AllFlights() {
  const [searchPayload, setSearchPayload] = useState(null);
  const [flights, setFlights] = useState([]);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    if (!searchParams) return;

    let payload = {};

    const searchType = searchParams.get("type");

    if (searchType === "multi-city") {
      const flights = [];
      let flightIndex = 1;

      while (searchParams.get(`flight${flightIndex}DepartureCity`)) {
        flights.push({
          departureCity: searchParams.get(`flight${flightIndex}DepartureCity`),
          destinationCity: searchParams.get(
            `flight${flightIndex}DestinationCity`
          ),
          departureDate: searchParams.get(`flight${flightIndex}DepartureDate`),
        });
        flightIndex++;
      }

      payload = {
        flights,
        passengers: {
          adults: searchParams.get("adults"),
          children: searchParams.get("children") || 0,
          infants: searchParams.get("infants") || 0,
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    } else if (searchType === "return-trip") {
      payload = {
        departureCity: searchParams.get("departureCity"),
        destinationCity: searchParams.get("destinationCity"),
        departureDate: searchParams.get("departureDate"),
        returnDate: searchParams.get("returnDate"),
        passengers: {
          adults: searchParams.get("adults"),
          children: searchParams.get("children") || 0,
          infants: searchParams.get("infants") || 0,
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    } else if (searchType === "one-way") {
      payload = {
        departureCity: searchParams.get("departureCity"),
        destinationCity: searchParams.get("destinationCity"),
        departureDate: searchParams.get("departureDate"),
        passengers: {
          adults: searchParams.get("adults"),
          children: searchParams.get("children") || 0,
          infants: searchParams.get("infants") || 0,
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    }

    setSearchPayload(payload);

    console.log("Payload for API call:", payload);
  }, [searchParams]);

  const handleFlightsFound = (foundFlights) => {
    setFlights(foundFlights);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 flex flex-col gap-2 mb-16">
      <div className="py-12">
        {/* <h2 className="text-center tracking-wide text-3xl md:text-5xl font-bold mb-8">
          Book Your Next Flight
        </h2> */}
        {/* <p className="mb-8">
            Find the best deals on flights to your favorite destinations.
          </p> */}
        <div className="bg-slate-50 rounded-lg border">
          <FlightSearch onFlightsFound={handleFlightsFound} />
        </div>
      </div>

      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => (
        <>
          {type === "one-way" && (
            <FlightDetails
              key={idx}
              flightData={type === "one-way" && flightsDemoDataOneway}
            />
          )}
          {type === "return-trip" && (
            <FlightDetails
              key={idx}
              flightData={type === "return-trip" && flightsDemoDataReturn}
            />
          )}
          {type === "multi-city" && (
            <FlightDetails
              key={idx}
              flightData={type === "multi-city" && flightsDemoDataMultiCity}
            />
          )}
        </>
      ))}
    </div>
  );
}
