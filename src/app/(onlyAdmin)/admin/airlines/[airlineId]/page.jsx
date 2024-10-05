"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function UpdateAirline() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);

  const { airlineId } = useParams();
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchAirline = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airlines/${airlineId}`
        );
        const data = await response.json();

        // Set form data using setValue for react-hook-form
        setValue("name", data.name);
        setValue("alias", data.alias);
        setValue("iata", data.iata);
        setValue("icao", data.icao);
        setValue("callsign", data.callsign);
        setValue("country", data.country);
        setValue("active", data.active);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching airline data:", error);
        setLoading(false);
      }
    };

    fetchAirline();
  }, [airlineId, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airlines/${airlineId}`,
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

      alert("Airline updated successfully!");
      router.push("/admin/airlines");
    } catch (error) {
      console.error("Error updating airline:", error);
      alert("Failed to update airline. Please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Update Airline</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Airline Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Airline name is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airline name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="alias">
            Alias
          </label>
          <input
            id="alias"
            {...register("alias")}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter alias"
          />
        </div>

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
                  message: "IATA code must be 3 characters",
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
                  message: "ICAO code must be 4 characters",
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

        <div>
          <label className="block mb-1 font-semibold" htmlFor="callsign">
            Callsign
          </label>
          <input
            id="callsign"
            {...register("callsign")}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter callsign"
          />
        </div>

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

        <div>
          <label className="block mb-1 font-semibold">Active</label>
          <select
            {...register("active", { required: true })}
            className="w-full p-2 border rounded-md"
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Update Airline"}
        </button>
      </form>
    </div>
  );
}
