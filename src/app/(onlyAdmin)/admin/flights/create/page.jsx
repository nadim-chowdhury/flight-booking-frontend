"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function CreateFlight() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/create`,
        {
          method: "POST",
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

      const data = await response.json();

      alert("Flight created successfully!");
      router.push("/admin/flights");
    } catch (error) {
      console.error("Error creating flight:", error);
      alert("Failed to create flight. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Flight</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Airline Name */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="airline">
            Airline
          </label>
          <input
            id="airline"
            {...register("airline", { required: "Airline name is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airline name"
          />
          {errors.airline && (
            <p className="text-red-500 text-sm">{errors.airline.message}</p>
          )}
        </div>

        {/* From (Departure Airport) */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="from">
            Departure Airport
          </label>
          <input
            id="from"
            {...register("from", { required: "Departure airport is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter departure airport code"
          />
          {errors.from && (
            <p className="text-red-500 text-sm">{errors.from.message}</p>
          )}
        </div>

        {/* To (Arrival Airport) */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="to">
            Arrival Airport
          </label>
          <input
            id="to"
            {...register("to", { required: "Arrival airport is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter arrival airport code"
          />
          {errors.to && (
            <p className="text-red-500 text-sm">{errors.to.message}</p>
          )}
        </div>

        {/* Available Seats */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="availableSeats">
            Available Seats
          </label>
          <input
            id="availableSeats"
            {...register("availableSeats", {
              required: "Number of available seats is required",
              valueAsNumber: true,
            })}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter number of available seats"
          />
          {errors.availableSeats && (
            <p className="text-red-500 text-sm">
              {errors.availableSeats.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Departure Time */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="departureTime">
              Departure Time
            </label>
            <input
              id="departureTime"
              {...register("departureTime", {
                required: "Departure time is required",
              })}
              className="w-full p-2 border rounded-md"
              type="datetime-local"
            />
            {errors.departureTime && (
              <p className="text-red-500 text-sm">
                {errors.departureTime.message}
              </p>
            )}
          </div>

          {/* Arrival Time */}
          <div>
            <label className="block mb-1 font-semibold" htmlFor="arrivalTime">
              Arrival Time
            </label>
            <input
              id="arrivalTime"
              {...register("arrivalTime", {
                required: "Arrival time is required",
              })}
              className="w-full p-2 border rounded-md"
              type="datetime-local"
            />
            {errors.arrivalTime && (
              <p className="text-red-500 text-sm">
                {errors.arrivalTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="duration">
            Duration
          </label>
          <input
            id="duration"
            {...register("duration", {
              required: "Flight duration is required",
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter duration (e.g., '7 hours 30 minutes')"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>

        {/* Flight Number */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="flightNumber">
            Flight Number
          </label>
          <input
            id="flightNumber"
            {...register("flightNumber", {
              required: "Flight number is required",
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter flight number"
          />
          {errors.flightNumber && (
            <p className="text-red-500 text-sm">
              {errors.flightNumber.message}
            </p>
          )}
        </div>

        {/* Equipment Type */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="equipmentType">
            Equipment Type
          </label>
          <input
            id="equipmentType"
            {...register("equipmentType", {
              required: "Equipment type is required",
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter equipment type (e.g., 'Boeing 777-300')"
          />
          {errors.equipmentType && (
            <p className="text-red-500 text-sm">
              {errors.equipmentType.message}
            </p>
          )}
        </div>

        {/* Electronic Ticketing */}
        <div>
          <label
            className="block mb-1 font-semibold"
            htmlFor="electronicTicketing"
          >
            Electronic Ticketing
          </label>
          <select
            id="electronicTicketing"
            {...register("electronicTicketing", { required: true })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Cabin Class */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="cabinClass">
            Cabin Class
          </label>
          <input
            id="cabinClass"
            {...register("cabinClass", { required: "Cabin class is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter cabin class (e.g., 'Economy')"
          />
          {errors.cabinClass && (
            <p className="text-red-500 text-sm">{errors.cabinClass.message}</p>
          )}
        </div>

        {/* Fare Basis */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="fareBasis">
            Fare Basis
          </label>
          <input
            id="fareBasis"
            {...register("fareBasis", { required: "Fare basis is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter fare basis"
          />
          {errors.fareBasis && (
            <p className="text-red-500 text-sm">{errors.fareBasis.message}</p>
          )}
        </div>

        {/* Technical Stop */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="techstop">
            Technical Stop
          </label>
          <input
            id="techstop"
            {...register("techstop")}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter technical stop details (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Flight"}
        </button>
      </form>
    </div>
  );
}
