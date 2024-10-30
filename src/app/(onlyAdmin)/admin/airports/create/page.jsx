"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function CreateAirport() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  // Handle form submission
  const onSubmit = async (formData) => {
    setSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports`,
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

      alert("Airport created successfully!");
      router.push("/admin/airports");
    } catch (error) {
      console.error("Error creating airport:", error);
      alert("Failed to create airport. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Airport</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Airport Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Airport name is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airport name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="city">
            City
          </label>
          <input
            id="city"
            {...register("city", { required: "City is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="country">
            Country
          </label>
          <input
            id="country"
            {...register("country", { required: "Country is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter country"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* IATA & ICAO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="iata">
              IATA Code
            </label>
            <input
              id="iata"
              {...register("iata", {
                required: "IATA code is required",
                maxLength: {
                  value: 3,
                  message: "IATA code must be 3 characters long",
                },
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter IATA code"
            />
            {errors.iata && (
              <p className="text-red-500 text-sm">{errors.iata.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="icao">
              ICAO Code
            </label>
            <input
              id="icao"
              {...register("icao", {
                required: "ICAO code is required",
                maxLength: {
                  value: 4,
                  message: "ICAO code must be 4 characters long",
                },
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter ICAO code"
            />
            {errors.icao && (
              <p className="text-red-500 text-sm">{errors.icao.message}</p>
            )}
          </div>
        </div>

        {/* Latitude & Longitude */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="latitude">
              Latitude
            </label>
            <input
              id="latitude"
              {...register("latitude", { required: "Latitude is required" })}
              className="w-full p-2 border rounded-md"
              type="number"
              step="any"
              placeholder="Enter latitude"
            />
            {errors.latitude && (
              <p className="text-red-500 text-sm">{errors.latitude.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="longitude">
              Longitude
            </label>
            <input
              id="longitude"
              {...register("longitude", { required: "Longitude is required" })}
              className="w-full p-2 border rounded-md"
              type="number"
              step="any"
              placeholder="Enter longitude"
            />
            {errors.longitude && (
              <p className="text-red-500 text-sm">{errors.longitude.message}</p>
            )}
          </div>
        </div>

        {/* Altitude */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="altitude">
            Altitude
          </label>
          <input
            id="altitude"
            {...register("altitude", { required: "Altitude is required" })}
            className="w-full p-2 border rounded-md"
            type="number"
            step="1"
            placeholder="Enter altitude"
          />
          {errors.altitude && (
            <p className="text-red-500 text-sm">{errors.altitude.message}</p>
          )}
        </div>

        {/* Timezone */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="timezone">
            Timezone (UTC Offset)
          </label>
          <input
            id="timezone"
            {...register("timezone", { required: "Timezone is required" })}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter timezone (e.g., -5 for EST)"
          />
          {errors.timezone && (
            <p className="text-red-500 text-sm">{errors.timezone.message}</p>
          )}
        </div>

        {/* DST & TZ */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="dst">
              Daylight Saving Time (DST)
            </label>
            <input
              id="dst"
              {...register("dst", {
                required: "DST is required",
                maxLength: {
                  value: 1,
                  message: "DST must be 1 character",
                },
              })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter DST"
            />
            {errors.dst && (
              <p className="text-red-500 text-sm">{errors.dst.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="tz">
              Timezone Name (TZ)
            </label>
            <input
              id="tz"
              {...register("tz", { required: "Timezone name is required" })}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter timezone name (e.g., America/New_York)"
            />
            {errors.tz && (
              <p className="text-red-500 text-sm">{errors.tz.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Create Airport"}
        </button>
      </form>
    </div>
  );
}
