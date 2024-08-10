"use client";

import { useState, useEffect } from "react";
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
  };

  useEffect(() => {
    if (data) {
      onFlightsFound(data.searchFlights);
    }
  }, [data, onFlightsFound]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Search Flights</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            From:
          </label>
          <input
            type="text"
            {...register("from", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter departure city"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To:</label>
          <input
            type="text"
            {...register("to", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter destination city"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Departure Date:
          </label>
          <input
            type="date"
            {...register("departureDate", { required: true })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}
      </form>
    </div>
  );
}
