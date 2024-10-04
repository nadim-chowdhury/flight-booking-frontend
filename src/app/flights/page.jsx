"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import FlightSearch from "../../components/FlightSearch";
import FlightDetails from "../../components/FlightDetails";
import {
  flightsDemoDataMultiCity,
  flightsDemoDataOneway,
  flightsDemoDataReturn,
} from "../../utils/demoData";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function AllFlights() {
  const [searchPayload, setSearchPayload] = useState(null);
  const [flights, setFlights] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");
  const [filterOption, setFilterOption] = useState("all");

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

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
        flights,
        passengers: {
          adults: searchParams.get("adults"),
          children: searchParams.get("children") || 0,
          infants: searchParams.get("infants") || 0,
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    } else if (searchType === "return-trip") {
      payload = {
        departureCity: searchParams.get("departureCity"),
        destinationCity: searchParams.get("destinationCity"),
        departureDate: searchParams.get("departureDate"),
        returnDate: searchParams.get("returnDate"),
        passengers: {
          adults: searchParams.get("adults"),
          children: searchParams.get("children") || 0,
          infants: searchParams.get("infants") || 0,
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    } else if (searchType === "one-way") {
      payload = {
        departureCity: searchParams.get("departureCity"),
        destinationCity: searchParams.get("destinationCity"),
        departureDate: searchParams.get("departureDate"),
        passengers: {
          adults: searchParams.get("adults"),
          children: searchParams.get("children") || 0,
          infants: searchParams.get("infants") || 0,
        },
        seatType: searchParams.get("seatType") || "economy",
      };
    }

    setSearchPayload(payload);

    console.log("Payload for API call:", payload);
  }, [searchParams]);

  const handleFlightsFound = (foundFlights) => {
    setFlights(foundFlights);
  };

  const sortFlights = (flights) => {
    return flights.sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      } else if (sortOption === "price-desc") {
        return b.price - a.price;
      } else if (sortOption === "duration-asc") {
        return a.duration - b.duration;
      } else if (sortOption === "duration-desc") {
        return b.duration - a.duration;
      }
      return 0;
    });
  };

  const filterFlights = (flights) => {
    if (filterOption === "all") return flights;
    return flights.filter((flight) => flight.airline === filterOption);
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

      <h2 className="mt-10 text-4xl md:text-[2.5rem] font-bold mb-4">
        Search Results
      </h2>
      {/* <div className="w-full mb-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={8}
          slidesPerView={12}
          // centeredSlides={true}
          navigation={{
            prevEl: ".custom-prev", // Assign custom previous button
            nextEl: ".custom-next", // Assign custom next button
          }}
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 5,
              spaceBetween: 8,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 8,
              spaceBetween: 8,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 10,
              spaceBetween: 12,
            },
            // when window width is >= 1280px
            1280: {
              slidesPerView: 12,
              spaceBetween: 12,
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-sky-50 border rounded-md px-2 py-1 flex items-center gap-2">
                <Image
                  src="https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/BG.png"
                  alt="air-logo"
                  className="rounded"
                  width={24}
                  height={24}
                />
                <span>BG</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

      {/* Sort and Filter Options */}
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

      {/* Flight List */}
      <div className="w-full">
        {sortFlights(filterFlights(flights)).map((flight, idx) => (
          <FlightDetails key={idx} flightData={flight} />
        ))}
      </div>

      {[1, 2, 3, 4, 5, 6].map((item, idx) => (
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
      ))}
    </div>
  );
}
