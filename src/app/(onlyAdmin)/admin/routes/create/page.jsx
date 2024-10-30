"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function CreateRoute() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();

      alert("Route created successfully!");
      router.push("/admin/routes");
    } catch (error) {
      console.error("Error creating route:", error);
      alert("Failed to create route. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Route</h1>
      <form
        onSubmit={handleSubmit(onSubmit)} // Handle form submit using react-hook-form
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
              maxLength: {
                value: 2,
                message: "Airline code should be exactly 2 characters long",
              },
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airline code"
          />
          {errors.airline_code && (
            <span className="text-red-600">{errors.airline_code.message}</span>
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
            <span className="text-red-600">{errors.airline_id.message}</span>
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
                maxLength: {
                  value: 3,
                  message: "Departure airport code must be 3 characters",
                },
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter departure airport"
            />
            {errors.departure_airport && (
              <span className="text-red-600">
                {errors.departure_airport.message}
              </span>
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
                validate: (value) =>
                  value > 0 || "Departure airport ID must be a positive number",
              })}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter departure airport ID"
            />
            {errors.departure_airport_id && (
              <span className="text-red-600">
                {errors.departure_airport_id.message}
              </span>
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
                maxLength: {
                  value: 3,
                  message: "Arrival airport code must be 3 characters",
                },
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter arrival airport"
            />
            {errors.arrival_airport && (
              <span className="text-red-600">
                {errors.arrival_airport.message}
              </span>
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
                validate: (value) =>
                  value > 0 || "Arrival airport ID must be a positive number",
              })}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter arrival airport ID"
            />
            {errors.arrival_airport_id && (
              <span className="text-red-600">
                {errors.arrival_airport_id.message}
              </span>
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
            <span className="text-red-600">{errors.stops.message}</span>
          )}
        </div>

        {/* Equipment */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="equipment">
            Equipment
          </label>
          <input
            id="equipment"
            {...register("equipment", {
              required: "Equipment is required",
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter equipment"
          />
          {errors.equipment && (
            <span className="text-red-600">{errors.equipment.message}</span>
          )}
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
            <span className="text-red-600">{errors.flight_number.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting} // Disable button while submitting
        >
          {submitting ? "Submitting..." : "Create Route"}
        </button>
      </form>
    </div>
  );
}
