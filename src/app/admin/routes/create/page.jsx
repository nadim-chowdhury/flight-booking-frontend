"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoute() {
  const [formData, setFormData] = useState({
    airline_code: "",
    airline_id: "",
    departure_airport: "",
    departure_airport_id: "",
    arrival_airport: "",
    arrival_airport_id: "",
    codeshare: "N", // Default to "N" (No) for codeshare
    stops: 0,
    equipment: "",
    flight_number: "",
  });

  const [submitting, setSubmitting] = useState(false); // Add submitting state
  const router = useRouter(); // To navigate after success

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Disable form submission while processing

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/routes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the formData as JSON
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Route Created:", data);

      alert("Route created successfully!");
      router.push("/admin/routes"); // Redirect to route list after success
    } catch (error) {
      console.error("Error creating route:", error);
      alert("Failed to create route. Please try again.");
    } finally {
      setSubmitting(false); // Re-enable form submission
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Route</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Airline Code */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="airline_code">
            Airline Code
          </label>
          <input
            id="airline_code"
            name="airline_code"
            value={formData.airline_code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airline code"
            required
          />
        </div>

        {/* Airline ID */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="airline_id">
            Airline ID
          </label>
          <input
            id="airline_id"
            name="airline_id"
            value={formData.airline_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter airline ID"
            required
          />
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
              name="departure_airport"
              value={formData.departure_airport}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter departure airport"
              required
            />
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
              name="departure_airport_id"
              value={formData.departure_airport_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter departure airport ID"
              required
            />
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
              name="arrival_airport"
              value={formData.arrival_airport}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter arrival airport"
              required
            />
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
              name="arrival_airport_id"
              value={formData.arrival_airport_id}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter arrival airport ID"
              required
            />
          </div>
        </div>

        {/* Codeshare */}
        <div>
          <label className="block mb-1 font-semibold">Codeshare</label>
          <select
            name="codeshare"
            value={formData.codeshare}
            onChange={handleChange}
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
            name="stops"
            value={formData.stops}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter number of stops"
            required
          />
        </div>

        {/* Equipment */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="equipment">
            Equipment
          </label>
          <input
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
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
            name="flight_number"
            value={formData.flight_number}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter flight number"
            required
          />
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
