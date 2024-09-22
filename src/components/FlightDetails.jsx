"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FareSummary from "./FareSummary";
import SearchFlightDetails from "./SearchFlightDetails";

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

  const formattedPrice = `BDT ${fareSummary?.totalFareAmount || 0}`;

  return (
    <div className="flight-details bg-slate-50 rounded-lg border mb-4 pt-4">
      {flightDetailsData.map(({ flight, marketingCarrierLogo }, index) => (
        <div key={index} className="px-3 pb-4">
          <div className="flight-content flex gap-4 justify-between flex-wrap border-b">
            <div className="air-logo mb-4">
              <Image
                src={marketingCarrierLogo}
                alt="air-logo"
                className="rounded"
                width={60}
                height={60}
              />
              <p className="mt-2 text-sm font-medium text-blue-500">
                {flight?.companyId?.marketingCarrier}
              </p>
            </div>

            <div className="depart">
              <p className="text-sm text-blue-500">Depart</p>
              <p className="text-xl font-bold text-gray-800">
                {flight?.productDateTime?.timeOfDeparture}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {flight?.productDateTime?.dateOfDepartureString}
              </p>
              <p className="text-lg text-gray-800">
                {flight?.location[0]?.city} ({flight?.location[0]?.cityCode})
              </p>
            </div>

            <div className="non-stop text-center">
              <p className="text-sm text-blue-500">
                {flight?.productDateTime?.segmentTime}
              </p>
              {/* <Image
                src="/assets/img/non-stop-shape.png"
                alt="Non-stop icon"
                width={30}
                height={30}
              /> */}
              <p className="text-sm text-gray-800">Non Stop</p>
            </div>

            <div className="arrive">
              <p className="text-sm text-blue-500">Arrive</p>
              <p className="text-xl font-bold text-gray-800">
                {flight?.productDateTime?.timeOfArrival}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {flight?.productDateTime?.dateOfArrivalString}
              </p>
              <p className="text-lg text-gray-800">
                {flight?.location[1]?.city} ({flight?.location[1]?.cityCode})
              </p>
            </div>

            {index === 0 && (
              <div className="price">
                <p className="text-sm text-blue-500">Price</p>
                <p className="text-xl font-bold text-gray-800">
                  {formattedPrice}
                </p>
              </div>
            )}

            <div className="view-details mb-4">
              <button className="book-now-btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                Book Now
              </button>
            </div>
          </div>

          <div className="accordion mt-4">
            <div className="flex justify-between">
              <p className="font-bold text-sm text-green-600">
                {fareSummary?.refundable
                  ? "Refundable"
                  : "Partially Refundable"}
              </p>
              <button
                className="font-bold text-red-600"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                Flight Details
              </button>
            </div>

            {detailsOpen && (
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
