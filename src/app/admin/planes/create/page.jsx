"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePlane() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    additional_code: "",
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/planes`,
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
      console.log("Plane Created:", data);

      alert("Plane created successfully!");
      router.push("/admin/planes"); // Redirect to plane list after success
    } catch (error) {
      console.error("Error creating plane:", error);
      alert("Failed to create plane. Please try again.");
    } finally {
      setSubmitting(false); // Re-enable form submission
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Create Plane</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Plane Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter plane name"
            required
          />
        </div>

        {/* Code */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="code">
            Code
          </label>
          <input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter plane code"
            required
          />
        </div>

        {/* Additional Code */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="additional_code">
            Additional Code
          </label>
          <input
            id="additional_code"
            name="additional_code"
            value={formData.additional_code}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter additional code"
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
          {submitting ? "Submitting..." : "Create Plane"}
        </button>
      </form>
    </div>
  );
}
