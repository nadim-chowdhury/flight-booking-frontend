"use client";

import { useQuery } from "@apollo/client";
import { GET_USER_BOOKINGS } from "@/graphql/query";
import { useEffect, useState } from "react";

const mocks = [
  {
    id: "booking1",
    flight: {
      airline: "Airline A",
      from: "City A",
      to: "City B",
      departureTime: "2024-08-01T10:00:00Z",
      arrivalTime: "2024-08-01T12:00:00Z",
      duration: "2h",
    },
    bookingTime: "2024-07-25T15:30:00Z",
  },
  {
    id: "booking2",
    flight: {
      airline: "Airline B",
      from: "City C",
      to: "City D",
      departureTime: "2024-08-05T09:00:00Z",
      arrivalTime: "2024-08-05T11:00:00Z",
      duration: "2h",
    },
    bookingTime: "2024-07-26T16:45:00Z",
  },
];

export default function Bookings({ userId }) {
  const { data, loading, error } = useQuery(GET_USER_BOOKINGS, {
    variables: { userId },
  });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {mocks.map((booking) => (
        <div key={booking.id}>
          <p>Airline: {booking.flight.airline}</p>
          <p>From: {booking.flight.from}</p>
          <p>To: {booking.flight.to}</p>
          <p>Departure: {booking.flight.departureTime}</p>
          <p>Arrival: {booking.flight.arrivalTime}</p>
          <p>Duration: {booking.flight.duration}</p>
          <p>Booking Time: {booking.bookingTime}</p>
        </div>
      ))}
    </div>
  );
}
