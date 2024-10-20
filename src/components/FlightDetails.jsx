"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FareSummary from "./FareSummary";
import SearchFlightDetails from "./SearchFlightDetails";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

export default function FlightDetails({ flightData, searchPayload }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  const toggleDetails = () => {
    setDetailsOpen((prevState) => !prevState);
  };

  const formattedPrice = `$ ${fareSummary?.totalFareAmount || 0}`;

  const handleBookFlight = () => {};

  return (
    <div className="flight-details bg-gradient-to-br from-rose-50 to-sky-50 rounded-lg border mb-4 py-4">
      {flightDetailsData.map(({ flight, marketingCarrierLogo }, index) => (
        <div key={index} className="px-4">
          <div className="flight-content flex gap-8 justify-between items-center relative">
            <div
              className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8 items-center ${
                index > 0 && "border-t pt-4 md:pt-2 mt-4 md:mt-2"
              }`}
            >
              <div className="air-logo">
                <Image
                  src={marketingCarrierLogo || "/placeholder-airline-logo.png"} // Placeholder logo
                  alt="air-logo"
                  className="rounded bg-white"
                  width={48}
                  height={48}
                />
                <p className="mt-2 text-sm font-medium text-sky-600">
                  {flight?.companyId?.marketingCarrier || "Airline Name"}
                </p>
              </div>

              <div className="depart border-t pt-3 md:border-t-0 md:pt-0">
                <p className="text-sm text-sky-600">Depart</p>
                <p className="text-xl font-bold text-slate-800">
                  {flight?.productDateTime?.timeOfDeparture || "00:00"}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {flight?.productDateTime?.dateOfDepartureString ||
                    "YYYY-MM-DD"}
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {flight?.location[0]?.city || "City"} (
                  {flight?.location[0]?.cityCode || "ABC, Any City"})
                </p>
              </div>

              <div className="non-stop text-center">
                <p className="text-sm text-sky-600">
                  {flight?.productDateTime?.segmentTime || "Duration"}
                </p>
                <p className="text-sm text-slate-800">Non Stop</p>
                <Image
                  src="/plane.png"
                  alt="plane-image"
                  className="rounded"
                  width={1280}
                  height={720}
                />
              </div>

              <div className="arrive text-end">
                <p className="text-sm text-sky-600">Arrive</p>
                <p className="text-xl font-bold text-slate-800">
                  {flight?.productDateTime?.timeOfArrival || "00:00"}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {flight?.productDateTime?.dateOfArrivalString || "YYYY-MM-DD"}
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {flight?.location[1]?.city || "City"} (
                  {flight?.location[1]?.cityCode || "XYZ, Any City"})
                </p>
              </div>

              {index === 0 ? (
                <div className="price text-start md:text-end">
                  <p className="text-sm text-sky-600">Price</p>
                  <p className="text-xl font-bold text-slate-800">
                    {formattedPrice || "N/A"}
                  </p>
                  <p className="font-medium text-xs text-green-600">
                    {fareSummary?.refundable
                      ? "Refundable"
                      : "Partially Refundable"}{" "}
                  </p>
                </div>
              ) : (
                <div className="price text-end hidden md:block">
                  <p className="text-sm text-slate-50">Price</p>
                  <p className="text-xl font-bold text-slate-50">
                    {formattedPrice || "N/A"}
                  </p>
                </div>
              )}
            </div>

            {index === 0 ? (
              <div
                onClick={handleBookFlight}
                className="view-details mb-4 absolute top-0 right-0 md:relative"
              >
                <Link href={`/flights/${123}`}>
                  <Button
                    size="sm"
                    className="book-now-btn bg-sky-600 hover:bg-sky-700 text-white transition"
                  >
                    Book Now
                  </Button>
                </Link>
                <button
                  className="font-medium text-white bg-orange-600 rounded-md pl-3 pr-2 flex items-center gap-1 text-xs mt-2 w-full justify-center"
                  onClick={() => toggleDetails(index)}
                >
                  <span>Details</span>
                  {detailsOpen ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
              </div>
            ) : (
              <div className="view-details mb-4 hidden md:block">
                <Button
                  size="sm"
                  className="book-now-btn bg-slate-50 hover:bg-slate-50 text-white transition cursor-default"
                >
                  Book Now
                </Button>
              </div>
            )}
          </div>

          <div className="accordion">
            {/* Accordion details code goes here */}
          </div>
        </div>
      ))}

      {/* Render Details only once after all flight segments */}
      {detailsOpen && (
        <div className="mt-4 px-4">
          <Tabs defaultValue="flight-details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-200 border">
              <TabsTrigger value="flight-details">Flight Details</TabsTrigger>
              <TabsTrigger value="fare-summary">Fare Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="flight-details">
              <SearchFlightDetails
                searchFlightDetailsData={flightDetailsData.map(
                  (flightData) => flightData.flight
                )}
              />
            </TabsContent>
            <TabsContent value="fare-summary">
              <FareSummary fareSummary={fareSummary} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
