"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_BOOKINGS } from "../graphql/query";
import { mocksBookingList } from "../utils/demoData";
import { UPDATE_BOOKING_STATUS } from "../graphql/mutation";

export default function BookingList() {
  const { data, loading, error } = useQuery(GET_BOOKINGS);
  const [updateBookingStatus] = useMutation(UPDATE_BOOKING_STATUS, {
    refetchQueries: [{ query: GET_BOOKINGS }],
  });
  const { register, handleSubmit } = useForm();

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const onSubmit = async (formData) => {
    await updateBookingStatus({
      variables: { id: formData.id, status: formData.status },
    });
  };

  return (
    <div>
      <h2>Booking Management</h2>
      <ul>
        {mocksBookingList.bookings.map((booking) => (
          <li key={booking.id}>
            <p>
              Flight: {booking.flight.airline} from {booking.flight.from} to{" "}
              {booking.flight.to}
            </p>
            <p>User: {booking.user.username}</p>
            <p>Status: {booking.status}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" value={booking.id} {...register("id")} />
              <select {...register("status")}>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button type="submit">Update Status</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
