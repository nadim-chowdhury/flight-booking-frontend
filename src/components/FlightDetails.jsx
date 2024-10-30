"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import FareSummary from "./FareSummary";
import SearchFlightDetails from "./SearchFlightDetails";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useSelector, useStore } from "react-redux";

export default function FlightDetails({
  flightData,
  searchPayload,
  bookFLight,
  setBookFLight,
  viewBookings,
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [pricingResponse, setPricingResponse] = useState({});
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [allAirportsInfo, setAllAirportsInfo] = useState([]);
  const [allAirlinesData, setAllAirlinesData] = useState([]);

  const router = useRouter();
  const token = useSelector((state) => state.user.token);
  const flightDetailsData = flightData?.itineraries?.[0]?.segments || [];

  useEffect(() => {
    setAllAirportsInfo(JSON.parse(localStorage.getItem("allAirportsDataMain")));
    setAllAirlinesData(JSON.parse(localStorage.getItem("allAirlinesDataMain")));
  }, []);

  const toggleDetails = () => {
    setDetailsOpen((prevState) => !prevState);
  };

  const formattedPrice = flightData?.price?.grandTotal
    ? `$ ${flightData.price.grandTotal}`
    : "N/A";

  const handleBookFlight = async () => {
    setBookFLight(flightData); // Set flight data for booking

    try {
      setBookLoading(true);

      // Step 1: Confirm the Flight Price with Amadeus
      const pricingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/flight-pricing`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            flightOffers: [flightData],
          }),
        }
      );

      if (!pricingResponse.ok) {
        throw new Error(
          `Pricing API request failed with status ${pricingResponse.status}`
        );
      }

      const pricingData = await pricingResponse.json();
      setPricingResponse(pricingData);
      setPricingModalOpen(true);
    } catch (error) {
      console.error("Failed to book flight", error);
    } finally {
      setBookLoading(false);
    }
  };

  const closePricingModal = () => {
    setPricingModalOpen(false);
  };

  const handleProceed = (pricingDataId) => {
    setPricingModalOpen(false);
    router.push(`/flights/${pricingDataId}`);
  };

  return (
    <div className="flight-details bg-gradient-to-br from-rose-50 to-sky-50 rounded-lg border mb-4 py-4 relative">
      {flightDetailsData?.map((segment, index) => (
        <div key={index} className="px-4">
          <div className="flight-content flex gap-8 justify-between items-center relative">
            <div
              className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8 items-center ${
                index > 0 && "border-t pt-4 md:pt-2 mt-4 md:mt-2"
              }`}
            >
              <div className="air-logo">
                <Image
                  src={`https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${segment?.carrierCode}.png`}
                  alt="air-logo"
                  className="rounded bg-white"
                  width={48}
                  height={48}
                />
                <p className="mt-2 text-sm font-medium text-sky-600">
                  {segment?.carrierCode || "Airline Name"}
                  {" - "}
                  {
                    allAirlinesData?.find(
                      (item) => item.iata === segment?.carrierCode
                    )?.name
                  }
                </p>
              </div>

              <div className="depart border-t pt-3 md:border-t-0 md:pt-0">
                <p className="text-sm text-sky-600">Depart</p>
                <p className="text-xl font-bold text-slate-800">
                  {new Date(segment?.departure?.at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "00:00"}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {new Date(segment?.departure?.at).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  ) || "00 Jan, 0000"}
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {
                    allAirportsInfo?.find(
                      (item) => item.iata_code === segment.departure.iataCode
                    )?.name
                  }
                  &nbsp; ({segment?.departure?.iataCode || "ABC"})
                </p>
              </div>

              <div className="non-stop text-center">
                <p className="text-sm text-sky-600">
                  {segment?.duration || "Duration"}
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
                  {new Date(segment?.arrival?.at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }) || "00:00"}
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  {new Date(segment?.arrival?.at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }) || "00 Jan, 0000"}
                </p>

                <p className="text-sm font-medium text-slate-800">
                  {
                    allAirportsInfo?.find(
                      (item) => item.iata_code === segment.arrival.iataCode
                    )?.name
                  }
                  &nbsp; ({segment?.arrival?.iataCode || "XYZ"})
                </p>
              </div>

              {index === 0 ? (
                <div className="price text-start md:text-end">
                  <p className="text-sm text-sky-600">Price</p>
                  <p className="text-xl font-bold text-slate-800">
                    {formattedPrice}
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

            {/* {index === 0 && (
              <div className="view-details mb-4 absolute top-0 right-0 md:relative">
                <Button
                  size="sm"
                  onClick={handleBookFlight}
                  disabled={bookLoading}
                  className="book-now-btn bg-sky-600 hover:bg-sky-700 text-white transition w-[94px]"
                >
                  {bookLoading ? (
                    <span className="loader_css_xtype"></span>
                  ) : (
                    " Book Now"
                  )}
                </Button>
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
            )} */}

            {index === 0 ? (
              <div
                // onClick={handleBookFlight}
                className="view-details mb-4 absolute top-0 right-0 md:relative"
              >
                {/* <Link href={`/flights/${123}`}> */}

                {!viewBookings && (
                  <Button
                    size="sm"
                    onClick={handleBookFlight}
                    disabled={bookLoading}
                    className="book-now-btn bg-sky-600 hover:bg-sky-700 text-white transition w-[94px]"
                  >
                    {bookLoading ? (
                      <span className="loader_css_xtype"></span>
                    ) : (
                      " Book Now"
                    )}
                  </Button>
                )}

                {/* </Link> */}
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
                  // onClick={handleBookFlight}
                  // disabled={bookLoading}
                  className="book-now-btn bg-transparent hover:bg-transparent text-transparent transition cursor-default"
                >
                  Book Now
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      {detailsOpen && (
        <div className="mt-4 px-4">
          <Tabs defaultValue="flight-details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-200 border">
              <TabsTrigger value="flight-details">Flight Details</TabsTrigger>
              <TabsTrigger value="fare-summary">Fare Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="flight-details">
              <SearchFlightDetails
                searchFlightDetailsData={flightDetailsData}
                airportData={allAirportsInfo}
                airlineData={allAirlinesData}
              />
            </TabsContent>
            <TabsContent value="fare-summary">
              <FareSummary
                fareSummary={{
                  price: flightData?.price,
                  travelerPricings: flightData?.travelerPricings,
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {pricingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold text-rose-600">
                Flight Final Pricing Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Total Price:</span>
                <span className="font-semibold text-lg">
                  $
                  {pricingResponse?.flightOffers?.[0]?.price?.grandTotal ||
                    "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Base Price:</span>
                <span className="text-gray-700">
                  ${pricingResponse?.flightOffers?.[0]?.price?.base || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Taxes & Fees:</span>
                <span className="text-gray-700">
                  $
                  {(
                    (pricingResponse?.flightOffers?.[0]?.price?.grandTotal ||
                      0) -
                    (pricingResponse?.flightOffers?.[0]?.price?.base || 0)
                  ).toFixed(2) || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-2">
              <button
                onClick={closePricingModal}
                className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => handleProceed(pricingResponse?._id)}
                className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
