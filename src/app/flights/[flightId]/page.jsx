"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import TravelerInfo from "@/components/TravelerInfo";
import ContactDetails from "@/components/ContactDetails";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

export default function SelectedFlightDetails() {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengerData, setPassengerData] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const { flightId } = useParams(); // Get flightId from the URL
  const view = searchParams.get("view");
  const token = useSelector((state) => state.user.token);

  const [baggageOpen, setBaggageOpen] = useState([]);

  useEffect(() => {
    const fetchFlightById = async () => {
      try {
        if (flightId) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flights/${flightId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setFlightData(response.data); // Set the flight data received from the API
          setBaggageOpen(
            Array(response.data?.flightCombination?.length || 0).fill(false)
          ); // Initialize baggageOpen state with the correct length
          setLoading(false); // Set loading to false once the data is fetched
        }
      } catch (error) {
        setError("Failed to fetch flight data");
        setLoading(false); // Set loading to false on error
      }
    };

    if (flightId) {
      fetchFlightById(); // Trigger the API call when we have the id
    }
  }, [flightId]);

  const toggleBaggageDetails = (index) => {
    setBaggageOpen((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  // const travelers = [{ type: "Adult" }, { type: "Child" }, { type: "Infant" }];
  const travelers = [{ type: "Adult" }];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/passenger`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passengerData),
        }
      );
      const paxData = await response.json();
      console.log("response--------", paxData);

      if (response.ok) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              flightId: flightId,
              passengerId: paxData._id,
              numberOfSeats: Math.floor(Math.random() * 10),
            }),
          }
        );
        const bookData = await res.json();
        console.log("res--------", bookData);
      }

      // const data = await response.json();
      // setSuccess(true);
      // Optionally reset form or show confirmation message
      setPassengerData({});
      router.push("/bookings");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen">Loading...</div>; // Display a loading state while fetching
  }

  if (error) {
    return <div className="min-h-screen">{error}</div>; // Handle the error state
  }

  if (!flightData) {
    return <div className="min-h-screen">No flight data found</div>; // Handle the case where no flight data is found
  }

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 md:my-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <h4 className="text-2xl font-bold text-rose-600">
          Review Your Booking
        </h4>
        <div className="flex items-center space-x-3">
          <span className="text-base cursor-pointer">Flight Selection</span>
          <svg
            width="9"
            height="15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.91 16.92L7.43 10.4c0.77-0.77 0.77-2.03 0-2.83L0.91 1.08"
              stroke="#657491"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-base text-rose-600">Booking</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
        {/* Left Side - Flight and Traveler Info */}
        <div className="col-span-2 space-y-6">
          {/* Dynamic Flight Details */}
          {flightData?.flightCombination?.map((flight, index) => (
            <div className="bg-slate-50 border rounded-lg" key={index}>
              <div className="border-b p-4 flex justify-between items-center">
                <h4 className="font-bold text-lg text-sky-600">
                  {
                    flight?.flightDetails?.[0]?.flightInformation?.location?.[0]
                      ?.locationId
                  }
                  -
                  {
                    flight?.flightDetails?.[0]?.flightInformation?.location?.[1]
                      ?.locationId
                  }
                </h4>
                <button
                  onClick={() => toggleBaggageDetails(index)}
                  className="bg-rose-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-rose-700"
                >
                  {baggageOpen[index] ? "Hide Baggage" : "View Baggage"}
                </button>
              </div>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between md:items-center border-b pb-4">
                  <div className="flex items-center">
                    <Image
                      src={`https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${flight?.flightDetails?.[0]?.flightInformation?.companyId?.marketingCarrierCode}.png`}
                      alt={
                        flight?.flightDetails?.[0]?.flightInformation?.companyId
                          ?.marketingCarrier
                      }
                      width={60}
                      height={60}
                    />
                    <div className="ml-4">
                      <p className="text-slate-600 text-sm">
                        {
                          flight?.flightDetails?.[0]?.flightInformation
                            ?.companyId?.marketingCarrier
                        }
                      </p>
                      <p className="text-lg font-semibold">
                        {
                          flight?.flightDetails?.[0]?.flightInformation
                            ?.flightOrtrainNumber
                        }
                      </p>
                      <div className="flex flex-col md:flex-row md:space-x-2">
                        <p className="text-sm font-medium">
                          Aircraft:{" "}
                          {
                            flight?.flightDetails?.[0]?.flightInformation
                              ?.productDetail?.equipmentType
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-800 text-sm mt-2 sm:mt-0">
                    Class:{" "}
                    {
                      flight?.flightDetails?.[0]?.flightInformation
                        ?.addProductDetail?.cabinClass
                    }
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
                  <div className="text-start sm:text-left w-full">
                    <p className="text-sky-400 text-sm">Depart</p>
                    <p className="text-lg font-semibold">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.productDateTime?.timeOfDeparture
                      }
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.productDateTime?.dateOfDepartureString
                      }
                    </p>
                    <p className="text-lg font-bold">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.location?.[0]?.locationId
                      }
                    </p>
                    <p className="text-slate-800">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.location?.[0]?.airportName
                      }
                    </p>
                  </div>

                  <div className="text-center my-4 sm:my-0 w-full">
                    <p className="text-sky-400 text-sm">
                      {flight?.flightDetails?.[0]?.flightInformation
                        ?.productDateTime?.journeyTime || 0}{" "}
                      min
                    </p>
                    <p className="text-slate-800">1 Stop</p>
                    <Image
                      src="/plane.png"
                      alt="plane-image"
                      className="rounded"
                      width={1280}
                      height={720}
                    />
                  </div>

                  <div className="text-end w-full">
                    <p className="text-sky-400 text-sm">Arrive</p>
                    <p className="text-lg font-semibold">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.productDateTime?.timeOfArrival
                      }
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.productDateTime?.dateOfArrivalString
                      }
                    </p>
                    <p className="text-lg font-bold">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.location?.[1]?.locationId
                      }
                    </p>
                    <p className="text-slate-800">
                      {
                        flight?.flightDetails?.[0]?.flightInformation
                          ?.location?.[1]?.airportName
                      }
                    </p>
                  </div>
                </div>

                {baggageOpen[index] && (
                  <div className="mt-4 p-4 bg-white border rounded-lg">
                    <h5 className="font-semibold text-sky-600">
                      Baggage Details
                    </h5>
                    <p className="text-slate-800 mt-2">
                      Checked Bags:{" "}
                      {flightData?.baggage?.[0]?.ADT?.freeAllowance} x{" "}
                      {flightData?.baggage?.[0]?.ADT?.unitQualifier}
                    </p>
                    <p className="text-slate-800">
                      Carry-on: {flightData?.baggage?.[0]?.ADT?.cabinBaggage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {view !== "bookings" && (
            <>
              {/* Traveler Information */}
              <ContactDetails />
              {travelers.map((traveler, index) => (
                <TravelerInfo
                  key={index}
                  travelerType={traveler.type}
                  travelerId={index + 1}
                  setPassengerData={setPassengerData}
                />
              ))}
            </>
          )}
        </div>

        {/* Right Side - Fare Summary */}
        <div>
          <div className="bg-slate-50 border rounded-lg p-6 mt-6 md:mt-0">
            <h4 className="text-xl font-semibold">Fare Summary</h4>
            <div className="space-y-2 mt-4">
              <p className="">
                Base Fare: $
                {(flightData?.fareSummary?.totalFareAmount || 0) / 100}
              </p>
              <p className="">
                Taxes: ${(flightData?.fareSummary?.totalTaxAmount || 0) / 100}
              </p>
              <p className="font-semibold">
                Total Fare: $
                {((flightData?.fareSummary?.totalFareAmount || 0) +
                  (flightData?.fareSummary?.totalTaxAmount || 0)) /
                  100}
              </p>
            </div>
          </div>
        </div>
      </div>

      {view !== "bookings" && (
        <button
          onClick={handleSubmit}
          className="bg-rose-600 text-white px-4 py-2 w-full mt-6 rounded transition duration-200 hover:bg-rose-700"
        >
          Confirm
        </button>
      )}
    </div>
  );
}
