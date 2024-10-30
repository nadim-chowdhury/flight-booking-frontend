"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Image from "next/image";
import FlightSearch from "@/components/FlightSearch";
import FlightDetails from "@/components/FlightDetails";
import {
  flightsDemoDataMultiCity,
  flightsDemoDataOneway,
  flightsDemoDataReturn,
} from "@/utils/demoData";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  searchFlightsStart,
  searchFlightsSuccess,
} from "@/redux/slices/searchFlightsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AllFlights() {
  const [searchPayload, setSearchPayload] = useState(null);
  const [flights, setFlights] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");
  const [filterOption, setFilterOption] = useState("all");
  const [loading, setLoading] = useState(false);
  const [bookFLight, setBookFLight] = useState({});

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.searchFlights);

  useEffect(() => {
    if (!searchParams) return;

    let payload = {};
    const searchType = searchParams.get("type");

    if (searchType === "multi-city") {
      const flights = [];
      let flightIndex = 1;

      while (searchParams.get(`flight${flightIndex}DepartureCity`)) {
        flights.push({
          departureCity: searchParams.get(`flight${flightIndex}DepartureCity`),
          destinationCity: searchParams.get(
            `flight${flightIndex}DestinationCity`
          ),
          departureDate: searchParams.get(`flight${flightIndex}DepartureDate`),
        });
        flightIndex++;
      }

      payload = {
        type: searchParams.get("type"),
        flights,
        passengers: {
          adults: searchParams.get("adults") || "0",
          children: searchParams.get("children") || "0",
          infants: searchParams.get("infants") || "0",
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    } else if (searchType === "return-trip") {
      payload = {
        type: searchParams.get("type"),
        departureCity: searchParams.get("departureCity"),
        destinationCity: searchParams.get("destinationCity"),
        departureDate: searchParams.get("departureDate"),
        returnDate: searchParams.get("returnDate"),
        passengers: {
          adults: searchParams.get("adults") || "0",
          children: searchParams.get("children") || "0",
          infants: searchParams.get("infants") || "0",
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    } else if (searchType === "one-way") {
      payload = {
        type: searchParams.get("type"),
        departureCity: searchParams.get("departureCity"),
        destinationCity: searchParams.get("destinationCity"),
        departureDate: searchParams.get("departureDate"),
        passengers: {
          adults: searchParams.get("adults") || "0",
          children: searchParams.get("children") || "0",
          infants: searchParams.get("infants") || "0",
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    }

    if (Object.keys(payload).length > 0) {
      setSearchPayload(payload);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchPayload) {
      const fetchFlights = async (sPayload) => {
        // setLoading(true); // Start loading
        // setError(null); // Reset any previous error
        dispatch(searchFlightsStart());
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/search`,
            sPayload,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setFlights(response.data);
        } catch (error) {
          setFlights([]);
          console.error("API call failed:", error);
          // setError("Failed to fetch flights. Please try again later.");
        } finally {
          // setLoading(false); // Stop loading
          dispatch(searchFlightsSuccess());
        }
      };
      fetchFlights(searchPayload);
    }
  }, [dispatch, searchPayload]);

  const handleFlightsFound = (foundFlights) => {
    setFlights(foundFlights);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 flex flex-col gap-2 mb-16">
      <div className="pt-12">
        {/* <h2 className="text-center tracking-wide text-3xl md:text-5xl font-bold mb-8">
          Book Your Next Flight
        </h2> */}
        {/* <p className="mb-8">
            Find the best deals on flights to your favorite destinations.
          </p> */}
        <div className="bg-slate-50 rounded-lg border">
          <FlightSearch onFlightsFound={handleFlightsFound} />
        </div>
      </div>

      {flights.length < 1 ? (
        <h2 className="mt-10 text-4xl md:text-[2.5rem] font-bold mb-4 text-rose-500">
          No Results Found
        </h2>
      ) : (
        <h2 className="mt-10 text-4xl md:text-[2.5rem] font-bold mb-4">
          Search Results
        </h2>
      )}

      {/* Loading and Error States */}
      {/* {loading && <p className="text-center text-2xl">Loading flights...</p>}
      {error && <p className="text-red-500">{error}</p>} */}

      {/* Sort and Filter Options */}
      {!loading && !error && flights.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <div>
              <label className="font-semibold text-slate-600">Sort by:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="ml-2 p-2 border rounded-md"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-asc">Duration: Shortest</option>
                <option value="duration-desc">Duration: Longest</option>
              </select>
            </div>
            <div>
              <label className="font-semibold text-slate-600">Filter by:</label>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="ml-2 p-2 border rounded-md"
              >
                <option value="all">All Airlines</option>
                <option value="Airline1">Airline 1</option>
                <option value="Airline2">Airline 2</option>
                <option value="Airline3">Airline 3</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Flight List */}
      <div className="w-full">
        {flights?.data?.map((flight, idx) => (
          <FlightDetails
            key={idx}
            flightData={flight}
            searchPayload={searchPayload}
            bookFLight={bookFLight}
            setBookFLight={setBookFLight}
          />
        ))}
      </div>

      {/* {[1, 2, 3, 4, 5, 6].map((item, idx) => (
        <div key={idx}>
          {type === "one-way" && (
            <FlightDetails
              key={idx}
              flightData={type === "one-way" && flightsDemoDataOneway}
            />
          )}
          {type === "return-trip" && (
            <FlightDetails
              key={idx}
              flightData={type === "return-trip" && flightsDemoDataReturn}
            />
          )}
          {type === "multi-city" && (
            <FlightDetails
              key={idx}
              flightData={type === "multi-city" && flightsDemoDataMultiCity}
            />
          )}
        </div>
      ))} */}
    </div>
  );
}
