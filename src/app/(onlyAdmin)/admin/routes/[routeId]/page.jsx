"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function UpdateRoute() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const { routeId } = useParams();
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routes/${routeId}`
        );
        const data = await response.json();

        // Set form data using setValue for react-hook-form
        setValue("airline_code", data.airline_code);
        setValue("airline_id", data.airline_id);
        setValue("departure_airport", data.departure_airport);
        setValue("departure_airport_id", data.departure_airport_id);
        setValue("arrival_airport", data.arrival_airport);
        setValue("arrival_airport_id", data.arrival_airport_id);
        setValue("codeshare", data.codeshare);
        setValue("stops", data.stops);
        setValue("equipment", data.equipment);
        setValue("flight_number", data.flight_number);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching route data:", error);
        setLoading(false);
      }
    };

    fetchRoute();
  }, [routeId, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routes/${routeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      alert("Route updated successfully!");
      router.push("/admin/routes");
    } catch (error) {
      console.error("Error updating route:", error);
      alert("Failed to update route. Please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Update Route</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Airline Code */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="airline_code">
            Airline Code
          </label>
          <input
            id="airline_code"
            {...register("airline_code", {
              required: "Airline code is required",
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airline code"
          />
          {errors.airline_code && (
            <p className="text-red-500 text-sm">
              {errors.airline_code.message}
            </p>
          )}
        </div>

        {/* Airline ID */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="airline_id">
            Airline ID
          </label>
          <input
            id="airline_id"
            {...register("airline_id", {
              required: "Airline ID is required",
              valueAsNumber: true,
              validate: (value) =>
                value > 0 || "Airline ID must be a positive number",
            })}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter airline ID"
          />
          {errors.airline_id && (
            <p className="text-red-500 text-sm">{errors.airline_id.message}</p>
          )}
        </div>

        {/* Departure Airport */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="departure_airport"
            >
              Departure Airport
            </label>
            <input
              id="departure_airport"
              {...register("departure_airport", {
                required: "Departure airport is required",
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter departure airport"
            />
            {errors.departure_airport && (
              <p className="text-red-500 text-sm">
                {errors.departure_airport.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="departure_airport_id"
            >
              Departure Airport ID
            </label>
            <input
              id="departure_airport_id"
              {...register("departure_airport_id", {
                required: "Departure airport ID is required",
                valueAsNumber: true,
              })}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter departure airport ID"
            />
            {errors.departure_airport_id && (
              <p className="text-red-500 text-sm">
                {errors.departure_airport_id.message}
              </p>
            )}
          </div>
        </div>

        {/* Arrival Airport */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="arrival_airport"
            >
              Arrival Airport
            </label>
            <input
              id="arrival_airport"
              {...register("arrival_airport", {
                required: "Arrival airport is required",
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter arrival airport"
            />
            {errors.arrival_airport && (
              <p className="text-red-500 text-sm">
                {errors.arrival_airport.message}
              </p>
            )}
          </div>

          <div>
            <label
              className="block mb-1 font-semibold"
              htmlFor="arrival_airport_id"
            >
              Arrival Airport ID
            </label>
            <input
              id="arrival_airport_id"
              {...register("arrival_airport_id", {
                required: "Arrival airport ID is required",
                valueAsNumber: true,
              })}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter arrival airport ID"
            />
            {errors.arrival_airport_id && (
              <p className="text-red-500 text-sm">
                {errors.arrival_airport_id.message}
              </p>
            )}
          </div>
        </div>

        {/* Codeshare */}
        <div>
          <label className="block mb-1 font-semibold">Codeshare</label>
          <select
            {...register("codeshare")}
            className="w-full p-2 border rounded-md"
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        {/* Stops */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="stops">
            Number of Stops
          </label>
          <input
            id="stops"
            {...register("stops", {
              required: "Number of stops is required",
              valueAsNumber: true,
              validate: (value) =>
                value >= 0 || "Stops must be zero or greater",
            })}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter number of stops"
          />
          {errors.stops && (
            <p className="text-red-500 text-sm">{errors.stops.message}</p>
          )}
        </div>

        {/* Equipment */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="equipment">
            Equipment
          </label>
          <input
            id="equipment"
            {...register("equipment")}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter equipment"
          />
        </div>

        {/* Flight Number */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="flight_number">
            Flight Number
          </label>
          <input
            id="flight_number"
            {...register("flight_number", {
              required: "Flight number is required",
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter flight number"
          />
          {errors.flight_number && (
            <p className="text-red-500 text-sm">
              {errors.flight_number.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Update Route"}
        </button>
      </form>
    </div>
  );
}
