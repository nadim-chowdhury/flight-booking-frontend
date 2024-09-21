"use client";

import { useMutation } from "@apollo/client";
import { BOOK_FLIGHT } from "../graphql/mutation";
import { flightsDemoData } from "../utils/flights-demo-data";

export default function FlightList({ userId }) {
  const [bookFlight] = useMutation(BOOK_FLIGHT);

  const handleBook = async (flightId) => {
    try {
      await bookFlight({ variables: { flightId, userId } });
      alert("Flight booked successfully!");
    } catch (error) {
      console.error("Booking failed", error);
      alert("Booking failed");
    }
  };

  return (
    <div className="md:p-6">
      {flightsDemoData?.map((flight) => (
        <div key={flight.id} className="mb-6 p-4 border rounded-lg bg-white">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {flight.airline}
              </p>
              <p className="text-sm text-gray-500">
                From: <span className="font-medium">{flight.from}</span>
              </p>
              <p className="text-sm text-gray-500">
                To: <span className="font-medium">{flight.to}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Departure: {flight.departureTime}
              </p>
              <p className="text-sm text-gray-500">
                Arrival: {flight.arrivalTime}
              </p>
              <p className="text-sm text-gray-500">
                Duration: {flight.duration}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-lg font-semibold text-gray-800">
              Price: ${flight.price}
            </p>
            <button
              onClick={() => handleBook(flight.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-sky-700"
            >
              Book Flight
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
