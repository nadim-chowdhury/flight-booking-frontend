"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Airports() {
  const [airportsData, setAirportsData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [total, setTotal] = useState(0); // Total number of records
  const [limit, setLimit] = useState(10); // Number of records per page
  const [offset, setOffset] = useState(0); // Current offset for pagination
  const [order, setOrder] = useState("ASC"); // Sort order (ASC/DESC)
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // Debounced search term

  // Debounce search term to limit API requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // Clear debounce timer on input change
    };
  }, [searchTerm]);

  // Fetch airports data based on search, sorting, pagination
  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?offset=${offset}&limit=${limit}&order=${order}&search=${debouncedSearchTerm}`
        );
        const data = await res.json();

        setAirportsData(data.airports);
        setTotal(data.total); // Assuming the API returns the total number of records
      } catch (error) {
        console.error("Error fetching airports data:", error);
        setAirportsData([]); // Clear data on error
        setTotal(0); // Reset total on error
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchAirports();
  }, [debouncedSearchTerm, order, offset, limit]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setOffset(0); // Reset pagination when search changes
  };

  // Handle sort order change
  const handleSort = (e) => {
    setOrder(e.target.value);
    setOffset(0); // Reset pagination when sorting changes
  };

  // Handle page change for pagination
  const handlePageChange = (newOffset) => {
    if (newOffset >= 0 && newOffset < total) {
      setOffset(newOffset);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <h1 className="text-2xl font-bold mb-4">Airports</h1>

      <div className="flex items-center gap-4 mb-4">
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search airlines..."
          className="border p-2 w-full rounded-md bg-slate-100"
        />

        <Link href="/admin/airports/create">
          <Button>Create Airport</Button>
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

      {/* Airports Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 border text-left font-semibold">Id</th>
              <th className="px-4 py-2 border text-left font-semibold">Name</th>
              <th className="px-4 py-2 border text-left font-semibold">City</th>
              <th className="px-4 py-2 border text-left font-semibold">
                Country
              </th>
              <th className="px-4 py-2 border text-left font-semibold">IATA</th>
              <th className="px-4 py-2 border text-left font-semibold">ICAO</th>
              <th className="px-4 py-2 border text-left font-semibold">
                Timezone
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
                  <td className="px-4 py-2 border text-white">00</td>
                  <td className="px-4 py-2 border text-white">00</td>
                  <td className="px-4 py-2 border text-white">00</td>
                </tr>
              ))
            ) : airportsData.length > 0 ? (
              airportsData.map((airport) => (
                <tr key={airport?.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 border">{airport?.id}</td>
                  <td className="px-4 py-2 border">{airport?.name}</td>
                  <td className="px-4 py-2 border">{airport?.city}</td>
                  <td className="px-4 py-2 border">{airport?.country}</td>
                  <td className="px-4 py-2 border">{airport?.iata}</td>
                  <td className="px-4 py-2 border">{airport?.icao}</td>
                  <td className="px-4 py-2 border">{airport?.tz}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No airports found.
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
