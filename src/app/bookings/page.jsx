"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  console.log("Bookings ~ bookings:", bookings);
  const [filteredBookings, setFilteredBookings] = useState([]);
  console.log("Bookings ~ filteredBookings:", filteredBookings);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");
  const [limit, setLimit] = useState(5); // Limit per page
  const [offset, setOffset] = useState(0); // Starting index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.user.token);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/all`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();
        console.log("fetchBookings ~ responseData:", responseData);

        setBookings(responseData);
        setFilteredBookings(responseData); // Initially set filtered bookings to all bookings
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
      // const airline = booking.flight.marketingCarrier.name.toLowerCase();
      // const from = booking.flight.flightSummary[0].fromCity.toLowerCase();
      // const to = booking.flight.flightSummary[0].toCity.toLowerCase();
      //   return (
      //     airline.includes(searchTerm.toLowerCase()) ||
      //     from.includes(searchTerm.toLowerCase()) ||
      //     to.includes(searchTerm.toLowerCase())
      //   );
    });
    setFilteredBookings(bookings);
    setOffset(0); // Reset to first page after filtering
  }, [searchTerm, bookings]);

  // Handle sorting
  const handleSort = (e) => {
    const sortOrder = e.target.value;
    setOrder(sortOrder);
    const sortedBookings = [...filteredBookings].sort((a, b) => {
      if (sortOrder === "ASC") {
        return (
          new Date(
            a.flight.flightCombination[0].flightDetails[0].flightInformation.productDateTime.dateOfDepartureString
          ) -
          new Date(
            b.flight.flightCombination[0].flightDetails[0].flightInformation.productDateTime.dateOfDepartureString
          )
        );
      } else {
        return (
          new Date(
            b.flight.flightCombination[0].flightDetails[0].flightInformation.productDateTime.dateOfDepartureString
          ) -
          new Date(
            a.flight.flightCombination[0].flightDetails[0].flightInformation.productDateTime.dateOfDepartureString
          )
        );
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
  console.log("Bookings ~ paginatedBookings:", paginatedBookings);

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
    formatDate(
      booking.flightCombination[0].flightDetails[0].flightInformation
        .productDateTime.dateOfDepartureString
    )
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
          tileContent={({ date, view }) => {
            if (view === "month") {
              return isFlightOnDate(date) ? (
                <p className="text-green-600 font-bold">Flight</p>
              ) : (
                <p className="text-slate-500">No Flight</p>
              );
            }
          }}
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
        <option value="ASC">Sort by Departure (Earliest)</option>
        <option value="DESC">Sort by Departure (Latest)</option>
      </select>

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
                <th className="border px-4 py-2 text-left">Airline</th>
                <th className="border px-4 py-2 text-left">From</th>
                <th className="border px-4 py-2 text-left">To</th>
                <th className="border px-4 py-2 text-left">Departure</th>
                <th className="border px-4 py-2 text-left">Arrival</th>
                {/* <th className="border px-4 py-2 text-left">Duration</th>
                <th className="border px-4 py-2 text-right">Booking Time</th> */}
              </tr>
            </thead>

            <tbody>
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking) => (
                  <tr key={booking._id} className="bg-white">
                    <td className="border px-4 py-2 font-medium">
                      <Link
                        href={`/flights/${booking._id}?view=bookings`}
                        className="hover:underline text-sky-600"
                      >
                        {booking.airline || "Airline Name"}
                      </Link>
                    </td>
                    <td className="border px-4 py-2">
                      {booking.from || "Unknown"}
                    </td>
                    <td className="border px-4 py-2">
                      {booking.to || "Unknown"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(
                        booking.flightCombination[0].flightDetails[0].flightInformation.productDateTime.dateOfDepartureString
                      ).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(
                        booking.flightCombination[0].flightDetails[0].flightInformation.productDateTime.dateOfArrivalString
                      ).toLocaleString()}
                    </td>
                    {/* <td className="border px-4 py-2">
                      {
                        booking.flightCombination[0].flightDetails[0]
                          .flightInformation.segmentTime
                      }
                    </td> */}
                    {/* <td className="border px-4 py-2 text-right">
                      {new Date(
                        booking.bookingDate || booking._id.getTimestamp()
                      ).toLocaleString()}
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
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
