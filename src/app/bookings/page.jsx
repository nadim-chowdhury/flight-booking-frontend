import { useQuery } from "@apollo/client";
import { GET_USER_BOOKINGS } from "../graphql/queries";
import { useEffect, useState } from "react";

export default function Bookings({ userId }) {
  const { data, loading, error } = useQuery(GET_USER_BOOKINGS, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Your Bookings</h2>
      {data.userBookings.map((booking) => (
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
