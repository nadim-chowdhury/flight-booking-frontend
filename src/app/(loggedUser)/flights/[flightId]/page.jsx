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
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import StripeComponent from "@/components/StripeComponent";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function SelectedFlightDetails() {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  const [stripeToken, setStripeToken] = useState(null);
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const [allAirportsInfo, setAllAirportsInfo] = useState([]);
  const [baggageOpen, setBaggageOpen] = useState([]);
  const [createFlightError, setcreateFlightError] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const { flightId } = useParams();
  const view = searchParams.get("view");
  const token = useSelector((state) => state.user.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    const fetchFlightById = async () => {
      try {
        if (flightId) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/flight-pricing/${flightId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setFlightData(response.data); // Set the flight data received from the API
          setBaggageOpen(
            Array(response.data?.flightOffers?.length || 0).fill(false)
          );
          setLoading(false);
        }
      } catch (error) {
        setError("Failed to fetch flight data");
        setLoading(false);
      }
    };

    if (flightId) {
      fetchFlightById();
    }

    setAllAirportsInfo(JSON.parse(localStorage.getItem("allAirportsDataMain")));
  }, [flightId]); // Only re-run if flightId changes

  // Initialize the array based on the number of travelers (flightData.baggage)
  useEffect(() => {
    if (flightData?.baggage) {
      setPassengerData(new Array(flightData.baggage.length).fill({}));
    }
  }, [flightData]);

  const toggleBaggageDetails = (index) => {
    setBaggageOpen((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Step 1: Save Passenger Data
      const passengerResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/passenger/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(passengerData),
        }
      );

      if (!passengerResponse.ok) {
        throw new Error("Failed to save passenger data");
      }

      // Step 2: Create Flight Order using confirmed flight offers
      const flightOrderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/create-flight-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            flightOffers: flightData.flightOffers,
            travelers: passengerData.map((passenger, index) => ({
              id: `${index + 1}`,
              dateOfBirth: passenger.dateOfBirth,
              name: {
                firstName: passenger.firstName,
                lastName: passenger.lastName,
              },
              gender: passenger.title === "Mr" ? "MALE" : "FEMALE",
              contact: {
                emailAddress: passenger.email || "test@email.com",
                phones: [
                  {
                    deviceType: "MOBILE",
                    countryCallingCode: passenger.countryCode || "1",
                    number: passenger.phoneNumber || "1234567890",
                  },
                ],
              },
              documents: passenger.passportNumber
                ? [
                    {
                      documentType: "PASSPORT",
                      number: passenger.passportNumber || "ABC54321",
                      expiryDate: passenger.passportExpiry,
                      issuanceCountry: passenger.issuanceCountry || "US",
                      nationality: passenger.nationality || "US",
                      holder: true,
                    },
                  ]
                : [],
            })),
          }),
        }
      );

      if (!flightOrderResponse.ok) {
        throw new Error(
          `Booking API request failed with status ${flightOrderResponse.status}`
        );
      }

      const bookingData = await flightOrderResponse.json();
      setBookingData(bookingData);

      setStripeModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlestripePayment = async () => {
    // Step 4: Save the booking details in your database
    const bookFlightResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userInfo.id,
          ...bookingData.data,
          paymentId: stripeToken, // Save payment ID for reference
        }),
      }
    );

    if (!bookFlightResponse.ok) {
      throw new Error(
        `Booking save request failed with status ${bookFlightResponse.status}`
      );
    }

    // Reset state and redirect to bookings page
    setPassengerData([]);
    router.push("/bookings");
  };

  const getAirportDetailsByIATA = (iataCode) => {
    const airport = allAirportsInfo.find(
      (airport) => airport.iata_code === iataCode
    );
    return airport
      ? {
          name: airport.name,
          city: airport.city,
          country: airport.country,
        }
      : {
          name: "Airport Name",
          city: "City",
          country: "Country",
        };
  };

  return (
    <Elements stripe={stripePromise}>
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
            {flightData?.flightOffers?.map((offer, index) => {
              const segment = offer?.itineraries?.[0]?.segments?.[0];

              const departureTime = new Date(
                segment?.departure?.at
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              const departureDate = new Date(
                segment?.departure?.at
              ).toLocaleDateString([], {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              const arrivalTime = new Date(
                segment?.arrival?.at
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              const arrivalDate = new Date(
                segment?.arrival?.at
              ).toLocaleDateString([], {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              // Get details for departure and arrival airports
              const departureDetails = getAirportDetailsByIATA(
                segment?.departure?.iataCode
              );
              const arrivalDetails = getAirportDetailsByIATA(
                segment?.arrival?.iataCode
              );

              return (
                <div className="bg-slate-50 border rounded-lg" key={index}>
                  <div className="border-b p-4 flex justify-between items-center">
                    <h4 className="font-bold text-lg text-sky-600">
                      {segment?.departure?.iataCode || "Departure"} -{" "}
                      {segment?.arrival?.iataCode || "Arrival"}
                    </h4>
                    <button
                      onClick={() => toggleBaggageDetails(index)}
                      className="bg-rose-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-rose-700"
                    >
                      {baggageOpen[index] ? "Hide Baggage" : "View Baggage"}
                    </button>
                  </div>

                  <div className="p-4">
                    {/* Flight Information */}
                    <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
                      <div className="flex items-center">
                        <Image
                          src={`https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${
                            segment?.carrierCode || "BG"
                          }.png`}
                          alt={segment?.carrierCode || "Airline"}
                          width={60}
                          height={60}
                        />
                        <div className="ml-4">
                          <p className="text-slate-600 text-sm">
                            {segment?.carrierCode || "Airline"}
                          </p>
                          <p className="text-lg font-semibold">
                            {segment?.number || "Flight Number"}
                          </p>
                          <p className="text-sm font-medium">
                            Aircraft: {segment?.aircraft?.code || "Type"}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-800 text-sm mt-2 sm:mt-0">
                        Class: Economy
                      </p>
                    </div>

                    {/* Departure and Arrival Information */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 md:gap-8 items-center pt-4">
                      {/* Departure */}
                      <div className="text-start w-full">
                        <p className="text-sky-400 text-sm">Depart</p>
                        <p className="text-lg font-semibold">{departureTime}</p>
                        <p className="text-sm font-bold text-sky-400">
                          {departureDate}
                        </p>
                        <p className="font-medium">
                          {segment?.departure?.iataCode} -{" "}
                          {departureDetails.name}, {departureDetails.city},{" "}
                          {departureDetails.country}
                        </p>
                        {/* <p className="text-slate-800">
                          {segment?.departure?.terminal || "Terminal"}
                        </p> */}
                      </div>

                      {/* Flight Duration and Stops */}
                      <div className="text-center my-4 w-full">
                        <p className="text-sky-400 text-sm">
                          {segment?.duration || "N/A"}
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

                      {/* Arrival */}
                      <div className="text-end w-full">
                        <p className="text-sky-400 text-sm">Arrive</p>
                        <p className="text-lg font-semibold">{arrivalTime}</p>
                        <p className="text-sm font-bold text-sky-400">
                          {arrivalDate}
                        </p>
                        <p className="font-medium">
                          {segment?.arrival?.iataCode} - {arrivalDetails.name},{" "}
                          {arrivalDetails.city}, {arrivalDetails.country}
                        </p>
                        {/* <p className="text-slate-800">
                          {segment?.arrival?.terminal || "Terminal"}
                        </p> */}
                      </div>
                    </div>

                    {/* Baggage Details */}
                    {baggageOpen[index] && (
                      <div className="mt-4 p-4 bg-white border rounded-lg">
                        <h5 className="font-semibold text-sky-600">
                          Baggage Details
                        </h5>
                        <p className="text-slate-800 mt-2">
                          Checked Bags:{" "}
                          {offer?.pricingOptions?.includedCheckedBagsOnly
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {view !== "bookings" && (
              <>
                <ContactDetails />
                {flightData?.flightOffers?.[0]?.travelerPricings?.map(
                  (traveler, index) => (
                    <TravelerInfo
                      key={index}
                      travelerType={traveler.travelerType}
                      travelerId={index + 1}
                      setPassengerData={(details) => {
                        setPassengerData((prevData) => {
                          const updatedData = [...prevData];
                          if (
                            JSON.stringify(updatedData[index]) !==
                            JSON.stringify(details)
                          ) {
                            updatedData[index] = details; // Update only if changes detected
                          }
                          return updatedData;
                        });
                      }}
                    />
                  )
                )}
              </>
            )}
          </div>

          {/* Right Side - Fare Summary */}
          <div>
            <div className="bg-slate-50 border rounded-lg p-6 mt-6 md:mt-0">
              <h4 className="text-xl font-semibold">Fare Summary</h4>
              <div className="space-y-2 mt-4">
                {/* Base Fare */}
                <p>
                  Base Fare: $
                  {flightData?.flightOffers?.[0]?.price?.base || "N/A"}
                </p>

                {/* Taxes Calculation */}
                <p>
                  Taxes: $
                  {flightData?.flightOffers?.[0]?.travelerPricings?.[0]?.price?.taxes
                    ?.reduce((acc, tax) => acc + parseFloat(tax.amount), 0)
                    .toFixed(2) || "0.00"}
                </p>

                {/* Grand Total */}
                <p className="font-semibold">
                  Total Fare: $
                  {flightData?.flightOffers?.[0]?.price?.grandTotal || "N/A"}
                </p>

                {/* Additional Information for Refundable Taxes */}
                {flightData?.flightOffers?.[0]?.travelerPricings?.[0]?.price
                  ?.refundableTaxes && (
                  <p className="text-gray-600 text-sm">
                    Refundable Taxes: $
                    {flightData.flightOffers[0].travelerPricings[0].price
                      .refundableTaxes || "N/A"}
                  </p>
                )}

                {/* Additional Details */}
                {flightData?.flightOffers?.[0]?.price?.additionalServices
                  ?.length > 0 && (
                  <div>
                    <h5 className="text-lg font-semibold mt-4">
                      Additional Services
                    </h5>
                    <ul className="list-disc pl-5 mt-2">
                      {flightData?.flightOffers?.[0]?.price?.additionalServices?.map(
                        (service, index) => (
                          <li key={index}>
                            {service.type}: ${service.amount}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {view !== "bookings" && (
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-rose-600 text-white px-4 py-2 w-full mt-6 rounded transition duration-200 hover:bg-rose-700 h-10 flex justify-center items-center disabled:bg-rose-400 disabled:hover:bg-rose-400"
          >
            {loading ? <span className="loader_css_xtype"></span> : "Confirm"}
          </button>
        )}
        {error && (
          <p className="mt-2 text-sm font-medium text-center text-rose-600">
            {error} {" - "} Check your provided data Again.
          </p>
        )}
        <p className="mt-2 text-sm text-center text-sky-600">
          Disable All Ad Blocker Before Payment
        </p>

        {stripeModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h2 className="text-xl font-semibold">Enter Payment Details</h2>
              </div>

              {/* Modal Content: Stripe Component */}
              <StripeComponent setStripeToken={setStripeToken} />

              {/* Modal Actions */}
              <div className="flex justify-center md:justify-end mt-6">
                <button
                  onClick={() => setStripeModalOpen(false)}
                  className="px-4 py-2 bg-slate-200 rounded mr-2 hover:bg-slate-100 md:w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handlestripePayment}
                  className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 md:w-full"
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Elements>
  );
}
