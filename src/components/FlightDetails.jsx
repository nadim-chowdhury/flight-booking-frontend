"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FareSummary from "./FareSummary";
import SearchFlightDetails from "./SearchFlightDetails";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

export default function FlightDetails({ flightData }) {
  const [detailsOpen, setDetailsOpen] = useState([]);

  const { flightCombination, fareSummary } = flightData;

  const flightDetailsData = flightCombination.map((flightCombo, index) => {
    const flight = flightCombo?.flightDetails[0]?.flightInformation;
    const marketingCarrierLogo = `https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${flight?.companyId?.marketingCarrierCode}.png`;

    return {
      index,
      flight,
      marketingCarrierLogo,
    };
  });

  const toggleDetails = (index) => {
    setDetailsOpen((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  const formattedPrice = `BDT ${fareSummary?.totalFareAmount || 0}`;

  const handleBookFlight = () => {};

  return (
    <div className="flight-details bg-slate-50 rounded-lg border mb-4 pt-4">
      {flightDetailsData.map(({ flight, marketingCarrierLogo }, index) => (
        <div key={index} className="px-3 pb-4">
          <div className="flight-content flex gap-4 justify-between flex-wrap">
            <div className="air-logo mb-4">
              <Image
                src={marketingCarrierLogo}
                alt="air-logo"
                className="rounded"
                width={48}
                height={48}
              />
              <p className="mt-2 text-sm font-medium text-blue-600">
                {flight?.companyId?.marketingCarrier}
              </p>
            </div>

            <div className="depart">
              <p className="text-sm text-blue-600">Depart</p>
              <p className="text-xl font-bold text-gray-800">
                {flight?.productDateTime?.timeOfDeparture}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {flight?.productDateTime?.dateOfDepartureString}
              </p>
              <p className="text-sm font-medium text-gray-800">
                {flight?.location[0]?.city} ({flight?.location[0]?.cityCode})
              </p>
            </div>

            <div className="non-stop text-center">
              <p className="text-sm text-blue-600">
                {flight?.productDateTime?.segmentTime}
              </p>
              <p className="text-sm text-gray-800">Non Stop</p>
            </div>

            <div className="arrive">
              <p className="text-sm text-blue-600">Arrive</p>
              <p className="text-xl font-bold text-gray-800">
                {flight?.productDateTime?.timeOfArrival}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {flight?.productDateTime?.dateOfArrivalString}
              </p>
              <p className="text-sm font-medium text-gray-800">
                {flight?.location[1]?.city} ({flight?.location[1]?.cityCode})
              </p>
            </div>

            {index === 0 ? (
              <div className="price">
                <p className="text-sm text-blue-600">Price</p>
                <p className="text-xl font-bold text-gray-800">
                  {formattedPrice}
                </p>
              </div>
            ) : (
              <div className="price hidden md:block">
                <p className="text-sm text-slate-50">Price</p>
                <p className="text-xl font-bold text-slate-50">
                  {formattedPrice}
                </p>
              </div>
            )}

            {index === 0 ? (
              <div onClick={handleBookFlight} className="view-details mb-4">
                <Link
                  href={`/flights/${flight?.location[0]?.city}-${flight?.location[0]?.cityCode}`}
                >
                  <Button
                    size="sm"
                    className="book-now-btn bg-blue-600 hover:bg-blue-700 text-white transition"
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="view-details mb-4 hidden md:block">
                <button className="book-now-btn bg-slate-50 text-slate-50 font-bold py-2 px-4 rounded transition">
                  Book Now
                </button>
              </div>
            )}
          </div>

          <div className="accordion mt-4">
            <div className="flex items-center justify-between bg-white border rounded-md py-1 px-4">
              <p className="font-bold text-sm text-green-600">
                {fareSummary?.refundable
                  ? "Refundable"
                  : "Partially Refundable"}
              </p>
              <button
                className="font-bold text-red-600 flex items-center gap-1 text-sm"
                onClick={() => toggleDetails(index)}
              >
                <span>Flight Details</span>
                {detailsOpen[index] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>

            {detailsOpen[index] && (
              <Tabs defaultValue="flight-details" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 bg-slate-200 border">
                  <TabsTrigger value="flight-details">
                    Flight Details
                  </TabsTrigger>
                  <TabsTrigger value="fare-summary">Fare Summary</TabsTrigger>
                </TabsList>

                <TabsContent value="flight-details">
                  <SearchFlightDetails searchFlightDetailsData={[flight]} />
                </TabsContent>
                <TabsContent value="fare-summary">
                  <FareSummary fareSummary={fareSummary} />
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
