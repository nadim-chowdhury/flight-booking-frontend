"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default function Bookings() {
  return (
    <div className="max-w-6xl mx-auto px-4 my-16 min-h-[90vh]">
      <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>

      <div className="p-4 bg-slate-50 rounded-lg border">
        <Table className="border">
          <TableCaption>A list of your recent flight bookings.</TableCaption>
          <TableHeader>
            <TableRow className="bg-white border rounded-t-md text-slate-800">
              <TableHead className="w-[100px]">Airline</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Booking Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mocks.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">
                  {booking.flight.airline}
                </TableCell>
                <TableCell>{booking.flight.from}</TableCell>
                <TableCell>{booking.flight.to}</TableCell>
                <TableCell>
                  {new Date(booking.flight.departureTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(booking.flight.arrivalTime).toLocaleString()}
                </TableCell>
                <TableCell>{booking.flight.duration}</TableCell>
                <TableCell className="text-right">
                  {new Date(booking.bookingTime).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>End of Booking List</TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      </div>
    </div>
  );
}
