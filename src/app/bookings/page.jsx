"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles
// import "./CalendarStyles.css"; // Custom styles for calendar

// Mock data for booked flights
const mocks = [
  {
    id: "booking1",
    flight: {
      airline: "Airline A",
      from: "City A",
      to: "City B",
      departureTime: "2024-08-01T10:00:00Z",
      arrivalTime: "2024-08-01T12:00:00Z",
      duration: "2h",
    },
    bookingTime: "2024-07-25T15:30:00Z",
  },
  {
    id: "booking2",
    flight: {
      airline: "Airline B",
      from: "City C",
      to: "City D",
      departureTime: "2024-08-05T09:00:00Z",
      arrivalTime: "2024-08-05T11:00:00Z",
      duration: "2h",
    },
    bookingTime: "2024-07-26T16:45:00Z",
  },
];

// Function to format flight date to just the day (ignore time)
function formatDate(dateString) {
  return new Date(dateString).toDateString();
}

// Extract flight dates for easy comparison
const bookedDates = mocks.map((booking) =>
  formatDate(booking.flight.departureTime)
);

export default function Bookings() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState(mocks);
  const [order, setOrder] = useState("ASC");
  const [limit, setLimit] = useState(5); // Limit per page
  const [offset, setOffset] = useState(0); // Starting index
  const [total, setTotal] = useState(mocks.length); // Total number of bookings

  // Search filter logic
  useEffect(() => {
    const filtered = mocks.filter((booking) => {
      const airline = booking.flight.airline.toLowerCase();
      const from = booking.flight.from.toLowerCase();
      const to = booking.flight.to.toLowerCase();
      return (
        airline.includes(searchTerm.toLowerCase()) ||
        from.includes(searchTerm.toLowerCase()) ||
        to.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredBookings(filtered);
    setTotal(filtered.length);
    setOffset(0); // Reset to first page after filtering
  }, [searchTerm]);

  // Sorting logic
  const handleSort = (e) => {
    const sortOrder = e.target.value;
    setOrder(sortOrder);
    const sortedBookings = [...filteredBookings].sort((a, b) => {
      if (sortOrder === "ASC") {
        return (
          new Date(a.flight.departureTime) - new Date(b.flight.departureTime)
        );
      } else {
        return (
          new Date(b.flight.departureTime) - new Date(a.flight.departureTime)
        );
      }
    });
    setFilteredBookings(sortedBookings);
  };

  // Pagination logic
  const handlePageChange = (newOffset) => {
    if (newOffset >= 0 && newOffset < total) {
      setOffset(newOffset);
    }
  };

  // Get current page bookings
  const paginatedBookings = filteredBookings.slice(offset, offset + limit);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isFlightOnDate = (date) => {
    const formattedDate = formatDate(date);
    return bookedDates.includes(formattedDate);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>

      <div className="mb-6 w-full">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={({ date, view }) => {
            if (view === "month") {
              return isFlightOnDate(date) ? (
                <p className="text-green-600 font-bold">Flight</p>
              ) : (
                <p className="text-slate-500">No events</p>
              );
            }
          }}
          className="calendar-component" // Add this class to the calendar for custom styling
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead className="bg-slate-200">
            <tr>
              <th className="border px-4 py-2 text-left">Airline</th>
              <th className="border px-4 py-2 text-left">From</th>
              <th className="border px-4 py-2 text-left">To</th>
              <th className="border px-4 py-2 text-left">Departure</th>
              <th className="border px-4 py-2 text-left">Arrival</th>
              <th className="border px-4 py-2 text-left">Duration</th>
              <th className="border px-4 py-2 text-right">Booking Time</th>
            </tr>
          </thead>

          <tbody>
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((booking) => (
                <tr key={booking.id} className="bg-white">
                  <td className="border px-4 py-2 font-medium">
                    {booking.flight.airline}
                  </td>
                  <td className="border px-4 py-2">{booking.flight.from}</td>
                  <td className="border px-4 py-2">{booking.flight.to}</td>
                  <td className="border px-4 py-2">
                    {new Date(booking.flight.departureTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(booking.flight.arrivalTime).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    {booking.flight.duration}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {new Date(booking.bookingTime).toLocaleString()}
                  </td>
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
                : "bg-sky-500 text-white hover:bg-sky-700"
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
