"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function UpdatePlane() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const { planeId } = useParams(); // Getting the planeId from the params
  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPlane = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/planes/${planeId}`
        );
        const data = await response.json();

        // Set form data using setValue for react-hook-form
        setValue("name", data.name);
        setValue("code", data.code);
        setValue("additional_code", data.additional_code);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching plane data:", error);
        setLoading(false);
      }
    };

    fetchPlane();
  }, [planeId, setValue]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/planes/${planeId}`,
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

      alert("Plane updated successfully!");
      router.push("/admin/planes");
    } catch (error) {
      console.error("Error updating plane:", error);
      alert("Failed to update plane. Please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-16">
      <h1 className="text-3xl font-bold mb-8">Update Plane</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-slate-50 border p-6 rounded-lg"
      >
        {/* Plane Name */}
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

        {/* Plane Code */}
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
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Update Plane"}
        </button>
      </form>
    </div>
  );
}
