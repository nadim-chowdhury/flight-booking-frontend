"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AllFlights() {
  const [searchPayload, setSearchPayload] = useState(null);

  const searchParams = useSearchParams();

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

  return <div></div>;
}
