"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ReturnSearch() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !departureCity ||
      !destinationCity ||
      !departureDate ||
      !returnDate ||
      !passengers
    ) {
      alert("Please fill in all fields");
      return;
    }

    // You can pass the form data to the API or flight search function here
    const searchParams = {
      departureCity,
      destinationCity,
      departureDate,
      returnDate,
      passengers,
    };

    console.log("Search Params:", searchParams);
    // For now, just log the data, but you can pass it to an API for searching flights
  };

  return (
    <div className="rounded-lg md:py-6">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:items-end gap-4"
      >
        {/* Departure City */}
        <div className="flex-1">
          <Label
            htmlFor="departureCity"
            className="block text-sm text-start font-medium text-gray-700"
          >
            Departure City
          </Label>
          <Input
            type="text"
            id="departureCity"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            placeholder="Enter Departure City"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
            required
          />
        </div>

        {/* Destination City */}
        <div className="flex-1">
          <Label
            htmlFor="destinationCity"
            className="block text-sm text-start font-medium text-gray-700"
          >
            Destination City
          </Label>
          <Input
            type="text"
            id="destinationCity"
            value={destinationCity}
            onChange={(e) => setDestinationCity(e.target.value)}
            placeholder="Enter Destination City"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
            required
          />
        </div>

        {/* Departure Date */}
        <div className="flex-1">
          <Label
            htmlFor="departureDate"
            className="block text-sm text-start font-medium text-gray-700"
          >
            Departure Date
          </Label>
          <Input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
            required
          />
        </div>

        {/* Return Date */}
        <div className="flex-1">
          <Label
            htmlFor="returnDate"
            className="block text-sm text-start font-medium text-gray-700"
          >
            Return Date
          </Label>
          <Input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-slate-800"
            required
          />
        </div>

        {/* Passengers */}
        <div className="flex-1">
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
        <div className="flex-1">
          <Button type="submit" className="w-full">
            Search Flights
          </Button>
        </div>
      </form>
    </div>
  );
}
