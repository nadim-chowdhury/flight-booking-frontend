"use client";

import { useState } from "react";
import Image from "next/image";
import TravelerInfo from "../../../components/TravelerInfo";
import ContactDetails from "../../../components/ContactDetails";

export default function SelectedFlightDetails() {
  const flightsData = [
    {
      departureCity: "Dhaka",
      departureCityCode: "DAC",
      departureTime: "15:00",
      departureDate: "Fri, 25 Oct 2024",
      arrivalCity: "Delhi",
      arrivalCityCode: "DEL",
      arrivalTime: "16:55",
      arrivalDate: "Fri, 25 Oct 2024",
      airlineLogo:
        "https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/AI.png",
      airlineName: "Air India",
      flightNumber: "AI 228",
      class: "Economy Class",
      aircraft: "Airbus A320",
      operatedBy: "AI",
      duration: "2 hours 25 minutes",
      stops: "Non Stop",
      baggage: "2 checked bags (23kg each) + 1 carry-on (7kg)",
    },
    {
      departureCity: "Delhi",
      departureCityCode: "DEL",
      departureTime: "06:05",
      departureDate: "Mon, 28 Oct 2024",
      arrivalCity: "Dubai",
      arrivalCityCode: "DXB",
      arrivalTime: "08:00",
      arrivalDate: "Mon, 28 Oct 2024",
      airlineLogo:
        "https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/AI.png",
      airlineName: "Air India",
      flightNumber: "AI 929",
      class: "Economy Class",
      aircraft: "Boeing 787-8",
      operatedBy: "AI",
      duration: "3 hours 55 minutes",
      stops: "Non Stop",
      baggage: "2 checked bags (23kg each) + 1 carry-on (7kg)",
    },
  ];

  const travelersData = [
    { type: "Adult" },
    { type: "Child" },
    { type: "Infant" },
  ];

  const [baggageOpen, setBaggageOpen] = useState(
    Array(flightsData.length).fill(false)
  );

  const toggleBaggageDetails = (index) => {
    setBaggageOpen((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const travelers = travelersData || [
    { type: "Adult" },
    { type: "Child" },
    { type: "Infant" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 md:my-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <h4 className="text-2xl font-bold text-rose-600">
          Review Your Booking
        </h4>
        <div className="flex items-center space-x-3">
          <span className="text-base cursor-pointer">Flight Selection</span>
          <svg
            width="9"
            height="15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.91 16.92L7.43 10.4c0.77-0.77 0.77-2.03 0-2.83L0.91 1.08"
              stroke="#657491"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-base text-rose-600">Booking</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
        {/* Left Side - Flight and Traveler Info */}
        <div className="col-span-2 space-y-6">
          {/* Dynamic Flight Details */}
          {flightsData?.map((flight, index) => (
            <div className="bg-slate-50 border rounded-lg" key={index}>
              <div className="border-b p-4 flex justify-between items-center">
                <h4 className="font-bold text-lg text-sky-600">
                  {flight.departureCityCode}-{flight.arrivalCityCode}
                </h4>
                <button
                  onClick={() => toggleBaggageDetails(index)}
                  className="bg-rose-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-rose-700"
                >
                  {baggageOpen[index] ? "Hide Baggage" : "View Baggage"}
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between md:items-center border-b pb-4">
                  <div className="flex items-center">
                    <Image
                      src={flight.airlineLogo}
                      alt={flight.airlineName}
                      width={60}
                      height={60}
                    />
                    <div className="ml-4">
                      <p className="text-slate-600 text-sm">
                        {flight.airlineName}
                      </p>
                      <p className="text-lg font-semibold">
                        {flight.flightNumber}
                      </p>
                      <div className="flex flex-col md:flex-row md:space-x-2">
                        <p className="text-sm font-medium">
                          Aircraft: {flight.aircraft}
                        </p>
                        <p className="text-sm font-medium">
                          Operated by: {flight.operatedBy}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-800 text-sm mt-2 sm:mt-0">
                    {flight.class}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
                  <div className="text-start sm:text-left w-full">
                    <p className="text-sky-400 text-sm">Depart</p>
                    <p className="text-lg font-semibold">
                      {flight.departureTime}
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                      {flight.departureDate}
                    </p>
                    <p className="text-lg font-bold">
                      {flight.departureCityCode}
                    </p>
                    <p className="text-slate-800">{flight.departureCity}</p>
                  </div>

                  <div className="text-center my-4 sm:my-0 w-full">
                    <p className="text-sky-400 text-sm">{flight.duration}</p>
                    <p className="text-slate-800">{flight.stops}</p>
                    <Image
                      src="/plane.png"
                      alt="plane-image"
                      className="rounded"
                      width={1280}
                      height={720}
                    />
                  </div>

                  <div className="text-end w-full">
                    <p className="text-sky-400 text-sm">Arrive</p>
                    <p className="text-lg font-semibold">
                      {flight.arrivalTime}
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                      {flight.arrivalDate}
                    </p>
                    <p className="text-lg font-bold">
                      {flight.arrivalCityCode}
                    </p>
                    <p className="text-slate-800">{flight.arrivalCity}</p>
                  </div>
                </div>

                {baggageOpen[index] && (
                  <div className="mt-4 p-4 bg-white border rounded-lg">
                    <h5 className="font-semibold text-sky-600">
                      Baggage Details
                    </h5>
                    <p className="text-slate-800 mt-2">{flight.baggage}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Traveler Information */}
          <ContactDetails />
          {travelers.map((traveler, index) => (
            <TravelerInfo key={index} travelerType={traveler.type} />
          ))}
        </div>

        {/* Right Side - Fare Summary */}
        <div>
          <div className="bg-slate-50 border rounded-lg p-6 mt-6 md:mt-0">
            <h4 className="text-xl font-semibold">Fare Summary</h4>
            <div className="space-y-2 mt-4">
              <p className="">Base Fare: $200</p>
              <p className="">Taxes: $50</p>
              <p className="font-semibold">Total Fare: $250</p>
            </div>
          </div>
        </div>
      </div>

      <button className="bg-rose-600 text-white px-4 py-2 w-full mt-6 rounded transition duration-200 hover:bg-rose-700">
        Confirm
      </button>
    </div>
  );
}
