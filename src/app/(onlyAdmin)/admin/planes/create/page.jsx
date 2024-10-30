"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CreatePlane() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Initialize react-hook-form for validation
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false); // Add submitting state
  const token = useSelector((state) => state.user.token);

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitting(true); // Disable form submission while processing

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/planes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data), // Send form data as JSON
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();

      alert("Plane created successfully!");
      router.push("/admin/planes"); // Redirect to planes list after success
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
        onSubmit={handleSubmit(onSubmit)} // Handle form submission using react-hook-form
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Plane Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Plane name is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter plane name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Code */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="code">
            Code
          </label>
          <input
            id="code"
            {...register("code", {
              required: "Plane code is required",
              maxLength: {
                value: 5,
                message: "Code should not exceed 5 characters",
              },
            })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter plane code"
          />
          {errors.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
        </div>

        {/* Additional Code */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="additional_code">
            Additional Code
          </label>
          <input
            id="additional_code"
            {...register("additional_code")}
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
