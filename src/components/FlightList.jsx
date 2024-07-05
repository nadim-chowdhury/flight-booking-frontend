import { useMutation } from "@apollo/client";
import { BOOK_FLIGHT } from "../graphql/queries";

export default function FlightList({ flights, userId }) {
  const [bookFlight] = useMutation(BOOK_FLIGHT);

  const handleBook = async (flightId) => {
    try {
      await bookFlight({ variables: { flightId, userId } });
      alert("Flight booked successfully!");
    } catch (error) {
      console.error("Booking failed", error);
    }
  };

  return (
    <div>
      <h2>Available Flights</h2>
      {flights.map((flight) => (
        <div key={flight.id}>
          <p>Airline: {flight.airline}</p>
          <p>From: {flight.from}</p>
          <p>To: {flight.to}</p>
          <p>Departure: {flight.departureTime}</p>
          <p>Arrival: {flight.arrivalTime}</p>
          <p>Duration: {flight.duration}</p>
          <p>Price: ${flight.price}</p>
          <button onClick={() => handleBook(flight.id)}>Book Flight</button>
        </div>
      ))}
    </div>
  );
}
