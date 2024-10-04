"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Planes() {
  const [planesData, setPlanesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch planes data based on search, sorting, and pagination
  useEffect(() => {
    const fetchPlanes = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/planes?offset=${offset}&limit=${limit}&order=${order}&search=${debouncedSearchTerm}`
      );
      const data = await res.json();

      setPlanesData(data.planes);
      setTotal(data.total);
      setLoading(false);
    };

    fetchPlanes();
  }, [debouncedSearchTerm, order, offset, limit]);

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setOffset(0); // Reset pagination when search changes
  };

  // Handle sort selection
  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  // Handle page change
  const handlePageChange = (newOffset) => {
    if (newOffset >= 0 && newOffset < total) {
      setOffset(newOffset);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <h1 className="text-2xl font-bold mb-4">Planes</h1>

      <div className="flex items-center gap-4 mb-4">
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search airlines..."
          className="border p-2 w-full rounded-md bg-slate-100"
        />

        <Link href="/admin/planes/create">
          <Button>Create Plane</Button>
        </Link>
      </div>

      {/* Sort dropdown */}
      <select
        value={order}
        onChange={handleSort}
        className="border p-2 mb-4 rounded-md"
      >
        <option value="ASC">Sort by Name (A-Z)</option>
        <option value="DESC">Sort by Name (Z-A)</option>
      </select>

      {/* Planes Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 border text-left font-semibold">Id</th>
              <th className="px-4 py-2 border text-left font-semibold">Name</th>
              <th className="px-4 py-2 border text-left font-semibold">Code</th>
              <th className="px-4 py-2 border text-left font-semibold">
                Additional Code
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <tr key={item}>
                  <td className="px-4 py-2 border text-white">00</td>
                  <td className="px-4 py-2 border text-white">00</td>
                  <td className="px-4 py-2 border text-white">00</td>
                  <td className="px-4 py-2 border text-white">00</td>
                </tr>
              ))
            ) : planesData.length > 0 ? (
              planesData.map((plane) => (
                <tr key={plane?.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 border">{plane?.id}</td>
                  <td className="px-4 py-2 border">{plane?.name}</td>
                  <td className="px-4 py-2 border">{plane?.code}</td>
                  <td className="px-4 py-2 border">{plane?.additional_code}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No planes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between items-center">
        <span className="">
          Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
        </span>
        <div className="space-x-2">
          <button
            disabled={offset <= 0}
            onClick={() => handlePageChange(offset - limit)}
            className={`px-4 py-2 border rounded-md ${
              offset <= 0
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-sky-600 text-white hover:bg-sky-700"
            }`}
          >
            Previous
          </button>
          <button
            disabled={offset + limit >= total}
            onClick={() => handlePageChange(offset + limit)}
            className={`px-4 py-2 border rounded-md ${
              offset + limit >= total
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-sky-600 text-white hover:bg-sky-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
