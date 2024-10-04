"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAirline() {
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    iata: "",
    icao: "",
    callsign: "",
    country: "",
    active: "Y",
  });
  const [submitting, setSubmitting] = useState(false); // Add submitting state
  const router = useRouter(); // To navigate after success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Disable form submission while processing

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airlines`,
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
      console.log("Airline Created:", data);

      alert("Airline created successfully!");
      router.push("/admin/airlines"); // Redirect to airline list after success
    } catch (error) {
      console.error("Error creating airline:", error);
      alert("Failed to create airline. Please try again.");
    } finally {
      setSubmitting(false); // Re-enable form submission
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Airline</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Airline Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter airline name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="alias">
            Alias
          </label>
          <input
            id="alias"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
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

        <div>
          <label className="block mb-1 font-semibold" htmlFor="callsign">
            Callsign
          </label>
          <input
            id="callsign"
            name="callsign"
            value={formData.callsign}
            onChange={handleChange}
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
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter country"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Active</label>
          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <button
          type="submit"
          className={`bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 ${
            submitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={submitting} // Disable button while submitting
        >
          {submitting ? "Submitting..." : "Create Airline"}
        </button>
      </form>
    </div>
  );
}
