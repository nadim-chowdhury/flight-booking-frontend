"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function MultiCitySearch() {
  const [flights, setFlights] = useState([
    { departureCity: "", destinationCity: "", departureDate: "" },
  ]);
  const [passengers, setPassengers] = useState(1);

  const handleFlightChange = (index, field, value) => {
    const newFlights = [...flights];
    newFlights[index][field] = value;
    setFlights(newFlights);
  };

  const addFlightSegment = () => {
    setFlights([
      ...flights,
      { departureCity: "", destinationCity: "", departureDate: "" },
    ]);
  };

  const removeFlightSegment = (index) => {
    const newFlights = flights.filter((_, i) => i !== index);
    setFlights(newFlights);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Basic validation
    const incompleteSegment = flights.some(
      (flight) =>
        !flight.departureCity ||
        !flight.destinationCity ||
        !flight.departureDate
    );
    if (incompleteSegment || !passengers) {
      alert("Please fill in all fields");
      return;
    }

    // You can pass the form data to the API or flight search function here
    const searchParams = {
      flights,
      passengers,
    };

    console.log("Search Params:", searchParams);
    // For now, just log the data, but you can pass it to an API for searching flights
  };

  return (
    <div className="rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Multi-City Flight Search
      </h2>

      <form onSubmit={handleSearch}>
        {flights.map((flight, index) => (
          <div
            key={index}
            className="flex flex-col md:items-end md:justify-end md:flex-row gap-4 mb-4"
          >
            {/* Departure City */}
            <div className="flex-1">
              <Label
                htmlFor={`departureCity-${index}`}
                className="block text-sm text-start font-medium text-gray-700"
              >
                Departure City
              </Label>
              <Input
                type="text"
                id={`departureCity-${index}`}
                value={flight.departureCity}
                onChange={(e) =>
                  handleFlightChange(index, "departureCity", e.target.value)
                }
                placeholder="Enter Departure City"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
                required
              />
            </div>

            {/* Destination City */}
            <div className="flex-1">
              <Label
                htmlFor={`destinationCity-${index}`}
                className="block text-sm text-start font-medium text-gray-700"
              >
                Destination City
              </Label>
              <Input
                type="text"
                id={`destinationCity-${index}`}
                value={flight.destinationCity}
                onChange={(e) =>
                  handleFlightChange(index, "destinationCity", e.target.value)
                }
                placeholder="Enter Destination City"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
                required
              />
            </div>

            {/* Departure Date */}
            <div className="flex-1">
              <Label
                htmlFor={`departureDate-${index}`}
                className="block text-sm text-start font-medium text-gray-700"
              >
                Departure Date
              </Label>
              <Input
                type="date"
                id={`departureDate-${index}`}
                value={flight.departureDate}
                onChange={(e) =>
                  handleFlightChange(index, "departureDate", e.target.value)
                }
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
                required
              />
            </div>

            {/* Remove Segment Button */}
            {flights.length > 1 && (
              <Button
                type="button"
                onClick={() => removeFlightSegment(index)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        {/* Add Segment Button */}
        <div className="mb-4">
          <Button type="button" onClick={addFlightSegment} className="w-full">
            Add Another Flight
          </Button>
        </div>

        {/* Passengers */}
        <div className="flex-1 mb-4">
          <Label
            htmlFor="passengers"
            className="block text-sm text-start font-medium text-gray-700"
          >
            Passengers
          </Label>
          <Input
            type="number"
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            min="1"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
            required
          />
        </div>

        {/* Search Button */}
        <Button type="submit" className="w-full">
          Search Flights
        </Button>
      </form>
    </div>
  );
}
