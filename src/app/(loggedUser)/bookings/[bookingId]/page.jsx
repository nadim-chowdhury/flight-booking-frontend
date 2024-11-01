"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import TravelerInfo from "@/components/TravelerInfo";
import ContactDetails from "@/components/ContactDetails";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FlightDetails from "@/components/FlightDetails";
import SearchFlightsLoading from "@/components/SearchFlightsLoading";
import TripChecklist from "@/components/TripChecklist";

export default function SelectedBookedFlightDetails() {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  const [baggageOpen, setBaggageOpen] = useState([]);
  const [allAirportsInfo, setAllAirportsInfo] = useState([]);
  const [bookFLight, setBookFLight] = useState({});
  const [searchPayload, setSearchPayload] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookingId } = useParams();
  const view = searchParams.get("view");
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchFlightData = async () => {
      if (!bookingId) return;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setFlightData(response.data);
        setBaggageOpen(
          Array(response.data?.flightOffers?.length || 0).fill(false)
        );
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch flight data");
        setLoading(false);
      }
    };

    fetchFlightData();
    setAllAirportsInfo(JSON.parse(localStorage.getItem("allAirportsDataMain")));
  }, [bookingId]);

  // useEffect(() => {
  //   if (flightData?.baggage) {
  //     setPassengerData(new Array(flightData.baggage.length).fill({}));
  //   }
  // }, [flightData]);

  // const toggleBaggageDetails = (index) => {
  //   setBaggageOpen((prev) => {
  //     const updated = [...prev];
  //     updated[index] = !updated[index];
  //     return updated;
  //   });
  // };

  // const getAirportDetailsByIATA = (iataCode) => {
  //   const airport = allAirportsInfo.find(
  //     (airport) => airport.iata_code === iataCode
  //   );
  //   return airport
  //     ? {
  //         name: airport.name,
  //         city: airport.city,
  //         country: airport.country,
  //       }
  //     : {
  //         name: "Airport Name",
  //         city: "City",
  //         country: "Country",
  //       };
  // };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SearchFlightsLoading />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 md:my-16 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <h4 className="text-2xl font-bold text-rose-600">Booked Flight</h4>
      </div>

      <div className="mt-6">
        {flightData?.flightOffers?.map((flight, idx) => (
          <FlightDetails
            key={idx}
            flightData={flight}
            searchPayload={searchPayload}
            bookFLight={bookFLight}
            setBookFLight={setBookFLight}
            viewBookings={true}
          />
        ))}
      </div>

      <TripChecklist />
    </div>
  );
}
