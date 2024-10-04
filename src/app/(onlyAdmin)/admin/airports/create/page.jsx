"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter to navigate after form submission

export default function CreateAirport() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    iata: "",
    icao: "",
    latitude: "",
    longitude: "",
    altitude: "",
    timezone: "",
    dst: "",
    tz: "",
    type: "airport",
    source: "OurAirports",
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports`,
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
      console.log("Airport Created:", data);

      alert("Airport created successfully!");
      router.push("/admin/airports"); // Redirect to airport list after success
    } catch (error) {
      console.error("Error creating airport:", error);
      alert("Failed to create airport. Please try again.");
    } finally {
      setSubmitting(false); // Re-enable form submission
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Airport</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Airport Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airport name"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="city">
            City
          </label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter city"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="country">
            Country
          </label>
          <input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter country"
            required
          />
        </div>

        {/* IATA & ICAO */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="iata">
              IATA Code
            </label>
            <input
              id="iata"
              name="iata"
              value={formData.iata}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter IATA code"
              maxLength={3}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="icao">
              ICAO Code
            </label>
            <input
              id="icao"
              name="icao"
              value={formData.icao}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter ICAO code"
              maxLength={4}
              required
            />
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
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter latitude"
              step="any"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="longitude">
              Longitude
            </label>
            <input
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="number"
              placeholder="Enter longitude"
              step="any"
              required
            />
          </div>
        </div>

        {/* Altitude */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="altitude">
            Altitude
          </label>
          <input
            id="altitude"
            name="altitude"
            value={formData.altitude}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter altitude"
            step="1"
            required
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="timezone">
            Timezone (UTC Offset)
          </label>
          <input
            id="timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="number"
            placeholder="Enter timezone (e.g., -5 for EST)"
            required
          />
        </div>

        {/* DST & TZ */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="dst">
              Daylight Saving Time (DST)
            </label>
            <input
              id="dst"
              name="dst"
              value={formData.dst}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter DST"
              maxLength={1}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="tz">
              Timezone Name (TZ)
            </label>
            <input
              id="tz"
              name="tz"
              value={formData.tz}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              type="text"
              placeholder="Enter timezone name (e.g., America/New_York)"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting} // Disable button while submitting
        >
          {submitting ? "Submitting..." : "Create Airport"}
        </button>
      </form>
    </div>
  );
}
