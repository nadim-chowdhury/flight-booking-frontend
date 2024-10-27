"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");
  const [limit, setLimit] = useState(5); // Limit per page
  const [offset, setOffset] = useState(0); // Starting index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { bookingId } = useParams();
  const token = useSelector((state) => state.user.token);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     return redirect("/");
  //   }
  // }, [isAuthenticated]);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();
        setBookings(responseData.bookings || []); // Ensure bookings array is set even if empty
        setFilteredBookings(responseData.bookings || []); // Set filtered bookings initially
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // Handle search term changes
  useEffect(() => {
    const filtered = bookings.filter((booking) => {
      // Implement search logic here if needed
      return true; // Placeholder logic for now
    });
    setFilteredBookings(filtered);
    setOffset(0); // Reset to first page after filtering
  }, [searchTerm, bookings]);

  // Handle sorting
  const handleSort = (e) => {
    const sortOrder = e.target.value;
    setOrder(sortOrder);
    const sortedBookings = [...filteredBookings].sort((a, b) => {
      if (sortOrder === "ASC") {
        return new Date(a.bookingDate) - new Date(b.bookingDate);
      } else {
        return new Date(b.bookingDate) - new Date(a.bookingDate);
      }
    });
    setFilteredBookings(sortedBookings);
  };

  // Pagination logic
  const handlePageChange = (newOffset) => {
    if (newOffset >= 0 && newOffset < filteredBookings.length) {
      setOffset(newOffset);
    }
  };

  // Get current page bookings
  const paginatedBookings = filteredBookings.slice(offset, offset + limit);

  // Handle date change in calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toDateString();
  };

  // Extract booked dates for flight departure times
  const bookedDates = bookings.map((booking) =>
    formatDate(booking.bookingDate)
  );

  // Check if a flight is on the selected date
  const isFlightOnDate = (date) => {
    const formattedDate = formatDate(date);
    return bookedDates.includes(formattedDate);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>

      {/* Calendar */}
      <div className="mb-6 w-full">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === "month" ? (
              isFlightOnDate(date) ? (
                <p className="text-green-600 font-bold">Flight</p>
              ) : (
                <p className="text-slate-500">No Flight</p>
              )
            ) : null
          }
          className="calendar-component"
        />
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search bookings..."
        className="border p-2 w-full rounded-md bg-slate-100"
      />

      {/* Sort dropdown */}
      <select
        value={order}
        onChange={handleSort}
        className="border p-2 mb-4 rounded-md mt-4"
      >
        <option value="ASC">Sort by Date (Earliest)</option>
        <option value="DESC">Sort by Date (Latest)</option>
      </select>

      {/* Bookings Table */}
      {/* {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-slate-200">
              <tr>
                <th className="border px-4 py-2 text-left">Airline</th>
                <th className="border px-4 py-2 text-left">From</th>
                <th className="border px-4 py-2 text-left">To</th>
                <th className="border px-4 py-2 text-left">Departure</th>
                <th className="border px-4 py-2 text-left">Arrival</th>
              </tr>
            </thead>

            <tbody>
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => (
                  <tr key={booking._id} className="bg-white">
                    <td className="border px-4 py-2 font-medium">
                      <Link
                        href={`/bookings/${booking._id}?view=bookings`}
                        className="hover:underline text-sky-600"
                      >
                        {booking.flightOffers[0]?.source || "Unknown Airline"}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">
                      {booking.flightOffers[0]?.itineraries[0]?.segments[0]
                        ?.departure.iataCode || "Unknown"}
                    </td>
                    <td className="border px-4 py-2">
                      {booking.flightOffers[0]?.itineraries[0]?.segments[0]
                        ?.arrival.iataCode || "Unknown"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(
                        booking.flightOffers[0]?.itineraries[0]?.segments[0]?.departure.at
                      ).toLocaleString() || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(
                        booking.flightOffers[0]?.itineraries[0]?.segments[0]?.arrival.at
                      ).toLocaleString() || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )} */}

      {/* Bookings Table */}
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-slate-200">
              <tr>
                <th className="border px-4 py-2 text-left">Id</th>
                <th className="border px-4 py-2 text-left">From</th>
                <th className="border px-4 py-2 text-left">To</th>
                <th className="border px-4 py-2 text-left">Departure</th>
                <th className="border px-4 py-2 text-left">Arrival</th>
                <th className="border px-4 py-2 text-left whitespace-nowrap">
                  Flight Number
                </th>
                <th className="border px-4 py-2 text-left whitespace-nowrap">
                  Price (USD)
                </th>
                <th className="border px-4 py-2 text-left">Duration</th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking, idx) => {
                  const itinerary = booking.flightOffers[0]?.itineraries[0];
                  const segments = itinerary?.segments || [];
                  const firstSegment = segments[0];
                  const lastSegment = segments[segments.length - 1];

                  return (
                    <tr key={booking._id} className="bg-white">
                      <td className="border px-4 py-2 font-medium">
                        <Link
                          href={`/bookings/${booking._id}?view=bookings`}
                          className="hover:underline text-sky-600"
                        >
                          {booking._id || "Unknown"}
                        </Link>
                      </td>
                      <td className="border px-4 py-2">
                        {firstSegment?.departure.iataCode || "Unknown"}
                      </td>
                      <td className="border px-4 py-2">
                        {lastSegment?.arrival.iataCode || "Unknown"}
                      </td>
                      <td className="border px-4 py-2">
                        {firstSegment?.departure.at
                          ? new Date(firstSegment.departure.at).toLocaleString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                        ,{" "}
                        {firstSegment?.departure.at
                          ? new Date(
                              firstSegment.departure.at
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {lastSegment?.arrival.at
                          ? new Date(lastSegment.arrival.at).toLocaleString(
                              "en-US",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "N/A"}
                        ,{" "}
                        {lastSegment?.arrival.at
                          ? new Date(lastSegment.arrival.at).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {`${firstSegment?.carrierCode || ""} ${
                          firstSegment?.number || "N/A"
                        }`}
                      </td>
                      <td className="border px-4 py-2">
                        {booking.flightOffers[0]?.price?.total || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {firstSegment?.duration || "N/A"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-4 flex justify-between items-center">
        <span className="">
          Page {Math.floor(offset / limit) + 1} of{" "}
          {Math.ceil(filteredBookings.length / limit)}
        </span>
        <div className="space-x-2">
          <button
            disabled={offset <= 0}
            onClick={() => handlePageChange(offset - limit)}
            className={`px-4 py-2 border rounded-md ${
              offset <= 0
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-sky-500 text-white hover:bg-sky-700"
            }`}
          >
            Previous
          </button>
          <button
            disabled={offset + limit >= filteredBookings.length}
            onClick={() => handlePageChange(offset + limit)}
            className={`px-4 py-2 border rounded-md ${
              offset + limit >= filteredBookings.length
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-sky-500 text-white hover:bg-sky-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
