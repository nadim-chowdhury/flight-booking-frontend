"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_FLIGHT, UPDATE_FLIGHT } from "@/graphql/mutation";

export default function FlightForm({ flight, onCompleted }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: flight || {
      airline: "",
      from: "",
      to: "",
      departureTime: "",
      arrivalTime: "",
      availableSeats: 0,
    },
  });
  const [createFlight] = useMutation(CREATE_FLIGHT, { onCompleted });
  const [updateFlight] = useMutation(UPDATE_FLIGHT, { onCompleted });

  const onSubmit = async (formData) => {
    if (flight) {
      await updateFlight({ variables: { id: flight.id, input: formData } });
    } else {
      await createFlight({ variables: { input: formData } });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Airline:</label>
        <input type="text" {...register("airline")} required />
      </div>
      <div>
        <label>From:</label>
        <input type="text" {...register("from")} required />
      </div>
      <div>
        <label>To:</label>
        <input type="text" {...register("to")} required />
      </div>
      <div>
        <label>Departure Time:</label>
        <input type="datetime-local" {...register("departureTime")} required />
      </div>
      <div>
        <label>Arrival Time:</label>
        <input type="datetime-local" {...register("arrivalTime")} required />
      </div>
      <div>
        <label>Available Seats:</label>
        <input type="number" {...register("availableSeats")} required />
      </div>
      <button type="submit">{flight ? "Update" : "Add"} Flight</button>
    </form>
  );
}
