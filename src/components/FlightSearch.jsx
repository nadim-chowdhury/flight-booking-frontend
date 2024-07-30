"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_FLIGHTS } from "@/graphql/query";
import { format } from "date-fns";

export default function FlightSearch({ onFlightsFound }) {
  const { register, handleSubmit } = useForm();
  const [searchFlights, { data, loading, error }] =
    useLazyQuery(SEARCH_FLIGHTS);

  const onSubmit = async (formData) => {
    const { from, to, departureDate } = formData;
    await searchFlights({
      variables: {
        from,
        to,
        departureDate: format(new Date(departureDate), "yyyy-MM-dd"),
      },
    });

    if (data) {
      onFlightsFound(data.searchFlights);
    }
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>From:</label>
          <input type="text" {...register("from")} required />
        </div>
        <div>
          <label>To:</label>
          <input type="text" {...register("to")} required />
        </div>
        <div>
          <label>Departure Date:</label>
          <input type="date" {...register("departureDate")} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}

// import { useQuery, useMutation } from '@apollo/client';
// import { GET_FLIGHTS, DELETE_FLIGHT } from '@/graphql/query';

// export default function FlightList({ onEdit }) {
//   const { data, loading, error } = useQuery(GET_FLIGHTS);
//   const [deleteFlight] = useMutation(DELETE_FLIGHT, {
//     refetchQueries: [{ query: GET_FLIGHTS }],
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleDelete = async (id) => {
//     await deleteFlight({ variables: { id } });
//   };

//   return (
//     <div>
//       <h2>Flights</h2>
//       <ul>
//         {data.flights.map((flight) => (
//           <li key={flight.id}>
//             <div>
//               <p>Airline: {flight.airline}</p>
//               <p>From: {flight.from}</p>
//               <p>To: {flight.to}</p>
//               <p>Departure Time: {new Date(flight.departureTime).toLocaleString()}</p>
//               <p>Arrival Time: {new Date(flight.arrivalTime).toLocaleString()}</p>
//               <p>Available Seats: {flight.availableSeats}</p>
//               <button onClick={() => onEdit(flight)}>Edit</button>
//               <button onClick={() => handleDelete(flight.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
