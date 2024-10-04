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

  const formattedPrice = `BDT ${fareSummary?.totalFareAmount || 0}`;

  const handleBookFlight = () => {};

  return (
    <div className="flight-details bg-slate-50 rounded-lg border mb-4 py-4">
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
                  src={marketingCarrierLogo}
                  alt="air-logo"
                  className="rounded"
                  width={48}
                  height={48}
                />
                <p className="mt-2 text-sm font-medium text-sky-600">
                  {flight?.companyId?.marketingCarrier}
                </p>
              </div>

              <div className="depart border-t pt-3 md:border-t-0 md:pt-0">
                <p className="text-sm text-sky-600">Depart</p>
                <p className="text-xl font-bold text-slate-800">
                  {flight?.productDateTime?.timeOfDeparture}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {flight?.productDateTime?.dateOfDepartureString}
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {flight?.location[0]?.city} ({flight?.location[0]?.cityCode})
                </p>
              </div>

              <div className="non-stop text-center">
                <p className="text-sm text-sky-600">
                  {flight?.productDateTime?.segmentTime}
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
                  {flight?.productDateTime?.timeOfArrival}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {flight?.productDateTime?.dateOfArrivalString}
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {flight?.location[1]?.city} ({flight?.location[1]?.cityCode})
                </p>
              </div>

              {index === 0 ? (
                <div className="price text-start md:text-end">
                  <p className="text-sm text-sky-600">Price</p>
                  <p className="text-xl font-bold text-slate-800">
                    {formattedPrice}
                  </p>
                  <p className="font-medium text-xs text-green-600">
                    {fareSummary?.refundable
                      ? "Refundable"
                      : "Partially Refundable"}
                  </p>
                </div>
              ) : (
                <div className="price text-end hidden md:block">
                  <p className="text-sm text-slate-50">Price</p>
                  <p className="text-xl font-bold text-slate-50">
                    {formattedPrice}
                  </p>
                </div>
              )}
            </div>

            {index === 0 ? (
              <div
                onClick={handleBookFlight}
                className="view-details mb-4 absolute top-0 right-0 md:relative"
              >
                <Link
                  href={`/flights/${flight?.location[0]?.city}-${flight?.location[0]?.cityCode}`}
                >
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
            {/* <div className="flex items-center justify-between bg-white border rounded-full py-1 px-4">
              <p className="font-medium text-xs text-green-600">
                {fareSummary?.refundable
                  ? "Refundable"
                  : "Partially Refundable"}
              </p>
              <button
                className="font-medium text-rose-600 flex items-center gap-1 text-xs"
                onClick={() => toggleDetails(index)}
              >
                <span>Flight Details</span>
                {detailsOpen[index] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div> */}

            {/* {detailsOpen[index] && (
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
            )} */}
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
