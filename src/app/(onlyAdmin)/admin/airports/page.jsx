"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Airports() {
  const [airportsData, setAirportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [deleteId, setDeleteId] = useState(null);

  const router = useRouter();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchAirports = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?offset=${offset}&limit=${limit}&order=${order}&search=${debouncedSearchTerm}`
        );
        const data = await res.json();

        setAirportsData(data.airports);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching airports:", error);
        alert("Failed to fetch airports data.");
      }
      setLoading(false);
    };

    fetchAirports();
  }, [debouncedSearchTerm, order, offset, limit, deleteId]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setOffset(0);
  };

  const handleSort = (e) => {
    setOrder(e.target.value);
  };

  const handlePageChange = (newOffset) => {
    if (newOffset >= 0 && newOffset < total) {
      setOffset(newOffset);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this airport?")) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          alert("Airport deleted successfully");
          setDeleteId(id);
          setSearchTerm("");
        } else {
          const errorData = await response.json();
          alert(
            `Failed to delete airport: ${
              errorData.message || response.statusText
            }`
          );
        }
      } catch (error) {
        console.error("Error deleting airport:", error);
        alert("An error occurred while deleting the airport");
      }
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
          placeholder="Search airports..."
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
              <th className="px-4 py-2 border text-left font-semibold">Sl</th>
              <th className="px-4 py-2 border text-left font-semibold">Name</th>
              <th className="px-4 py-2 border text-left font-semibold">City</th>
              <th className="px-4 py-2 border text-left font-semibold">
                Country
              </th>
              <th className="px-4 py-2 border text-left font-semibold">IATA</th>
              <th className="px-4 py-2 border text-left font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="animate-pulse">
                  <td className="px-4 py-2 border">Loading...</td>
                  <td className="px-4 py-2 border">Loading...</td>
                  <td className="px-4 py-2 border">Loading...</td>
                  <td className="px-4 py-2 border">Loading...</td>
                  <td className="px-4 py-2 border">Loading...</td>
                  <td className="px-4 py-2 border">Loading...</td>
                </tr>
              ))
            ) : airportsData && airportsData.length > 0 ? (
              airportsData.map((airport, idx) => (
                <tr key={airport?._id} className="hover:bg-slate-50">
                  <td className="px-4 py-2 border">{idx + 1}</td>
                  <td className="px-4 py-2 border">{airport?.name}</td>
                  <td className="px-4 py-2 border">{airport?.city}</td>
                  <td className="px-4 py-2 border">{airport?.country}</td>
                  <td className="px-4 py-2 border">{airport?.iata}</td>
                  <td className="px-4 py-2 border flex items-center gap-2">
                    {/* Edit Button */}
                    <Button
                      size="sm"
                      onClick={() =>
                        router.push(`/admin/airports/${airport._id}`)
                      }
                      className="bg-green-600 rounded-md text-white hover:bg-green-700"
                    >
                      <SquarePen className="w-4 h-4" />
                    </Button>
                    {/* Delete Button */}
                    <Button
                      size="sm"
                      onClick={() => handleDelete(airport._id)}
                      className="bg-rose-600 rounded-md text-white hover:bg-rose-700"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </td>
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
