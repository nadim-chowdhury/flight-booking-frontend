"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import TravelerInfo from "@/components/TravelerInfo";
import ContactDetails from "@/components/ContactDetails";
import axios from "axios";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

export default function SelectedBookedFlightDetails() {
  const [flightData, setFlightData] = useState(null);
  console.log("SelectedFlightDetails ~ flightData:", flightData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  console.log("SelectedFlightDetails ~ passengerData:", passengerData);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { bookingId } = useParams(); // Get bookingId from the URL
  console.log("SelectedFlightDetails ~ bookingId:", bookingId);
  const view = searchParams.get("view");
  const token = useSelector((state) => state.user.token);

  const [baggageOpen, setBaggageOpen] = useState([]);

  useEffect(() => {
    const fetchFlightById = async () => {
      try {
        if (bookingId) {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${bookingId}`,
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

    if (bookingId) {
      fetchFlightById();
    }
  }, [bookingId]); // Only re-run if bookingId changes

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");
  //   // setSuccess(false);

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/passenger/bulk`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(passengerData),
  //       }
  //     );
  //     const paxData = await response.json();
  //     console.log("response--------", paxData);

  //     // const bookingResponse = await fetch(
  //     //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/create-flight-order`, // Your backend endpoint to create flight order
  //     //   {
  //     //     method: "POST",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //       Authorization: `Bearer ${token}`,
  //     //     },
  //     //     body: JSON.stringify({
  //     //       flightOffers: pricingData.flightOffers, // Send the confirmed flight offers
  //     //       travelers: [
  //     //         {
  //     //           id: "1",
  //     //           dateOfBirth: "1982-01-16",
  //     //           name: {
  //     //             firstName: "JORGE",
  //     //             lastName: "GONZALES",
  //     //           },
  //     //           gender: "MALE",
  //     //           contact: {
  //     //             emailAddress: "jorge.gonzales833@telefonica.es",
  //     //             phones: [
  //     //               {
  //     //                 deviceType: "MOBILE",
  //     //                 countryCallingCode: "34",
  //     //                 number: "480080076",
  //     //               },
  //     //             ],
  //     //           },
  //     //           documents: [
  //     //             {
  //     //               documentType: "PASSPORT",
  //     //               birthPlace: "Madrid",
  //     //               issuanceLocation: "Madrid",
  //     //               issuanceDate: "2015-04-14",
  //     //               number: "00000000",
  //     //               expiryDate: "2025-04-14",
  //     //               issuanceCountry: "ES",
  //     //               validityCountry: "ES",
  //     //               nationality: "ES",
  //     //               holder: true,
  //     //             },
  //     //           ],
  //     //         },
  //     //       ],
  //     //     }),
  //     //   }
  //     // );

  //     // if (!bookingResponse.ok) {
  //     //   throw new Error(
  //     //     `Booking API request failed with status ${bookingResponse.status}`
  //     //   );
  //     // }

  //     // const bookingData = await bookingResponse.json();
  //     // console.log("Booking data:", bookingData);
  //     setPassengerData([]);
  //     router.push("/bookings");
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (loading) {
  //   return <div className="min-h-screen">Loading...</div>; // Display a loading state while fetching
  // }

  // if (error) {
  //   return <div className="min-h-screen">{error}</div>; // Handle the error state
  // }

  // if (!flightData) {
  //   return <div className="min-h-screen">No flight data found</div>; // Handle the case where no flight data is found
  // }

  // return (
  //   <div className="max-w-6xl mx-auto px-4 my-8 md:my-16">
  //     {/* Header */}
  //     <div className="flex flex-col md:flex-row items-start justify-between gap-6">
  //       <h4 className="text-2xl font-bold text-rose-600">
  //         Review Your Booking
  //       </h4>
  //       <div className="flex items-center space-x-3">
  //         <span className="text-base cursor-pointer">Flight Selection</span>
  //         <svg
  //           width="9"
  //           height="15"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M0.91 16.92L7.43 10.4c0.77-0.77 0.77-2.03 0-2.83L0.91 1.08"
  //             stroke="#657491"
  //             strokeWidth="1.5"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //         <span className="text-base text-rose-600">Booking</span>
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
  //       {/* Left Side - Flight and Traveler Info */}
  //       <div className="col-span-2 space-y-6">
  //         {/* Dynamic Flight Details */}
  //         {(flightData?.flightCombination || [1])?.map((flight, index) => (
  //           <div className="bg-slate-50 border rounded-lg" key={index}>
  //             <div className="border-b p-4 flex justify-between items-center">
  //               <h4 className="font-bold text-lg text-sky-600">
  //                 {flight?.flightDetails?.[0]?.flightInformation?.location?.[0]
  //                   ?.locationId || "Departure"}{" "}
  //                 -
  //                 {flight?.flightDetails?.[0]?.flightInformation?.location?.[1]
  //                   ?.locationId || "Arrival"}
  //               </h4>
  //               <button
  //                 onClick={() => toggleBaggageDetails(index)}
  //                 className="bg-rose-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-rose-700"
  //               >
  //                 {baggageOpen[index] ? "Hide Baggage" : "View Baggage"}
  //               </button>
  //             </div>
  //             <div className="p-4">
  //               <div className="flex flex-col sm:flex-row justify-between md:items-center border-b pb-4">
  //                 <div className="flex items-center">
  //                   <Image
  //                     src={`https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${
  //                       flight?.flightDetails?.[0]?.flightInformation?.companyId
  //                         ?.marketingCarrierCode || "BG"
  //                     }.png`}
  //                     alt={
  //                       flight?.flightDetails?.[0]?.flightInformation?.companyId
  //                         ?.marketingCarrier || "Airline"
  //                     }
  //                     width={60}
  //                     height={60}
  //                   />
  //                   <div className="ml-4">
  //                     <p className="text-slate-600 text-sm">
  //                       {flight?.flightDetails?.[0]?.flightInformation
  //                         ?.companyId?.marketingCarrier || "Airline Name"}
  //                     </p>
  //                     <p className="text-lg font-semibold">
  //                       {flight?.flightDetails?.[0]?.flightInformation
  //                         ?.flightOrtrainNumber || "Flight Number"}
  //                     </p>
  //                     <div className="flex flex-col md:flex-row md:space-x-2">
  //                       <p className="text-sm font-medium">
  //                         Aircraft:{" "}
  //                         {flight?.flightDetails?.[0]?.flightInformation
  //                           ?.productDetail?.equipmentType || "Aircraft Type"}
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <p className="text-slate-800 text-sm mt-2 sm:mt-0">
  //                   Class:{" "}
  //                   {flight?.flightDetails?.[0]?.flightInformation
  //                     ?.addProductDetail?.cabinClass || "Class"}
  //                 </p>
  //               </div>

  //               <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
  //                 <div className="text-start sm:text-left w-full">
  //                   <p className="text-sky-400 text-sm">Depart</p>
  //                   <p className="text-lg font-semibold">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.productDateTime?.timeOfDeparture || "00:00"}
  //                   </p>
  //                   <p className="text-sm font-bold text-sky-400">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.productDateTime?.dateOfDepartureString || "Date"}
  //                   </p>
  //                   <p className="text-lg font-bold">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.location?.[0]?.locationId || "Departure Location"}
  //                   </p>
  //                   <p className="text-slate-800">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.location?.[0]?.airportName || "Airport Name"}
  //                   </p>
  //                 </div>

  //                 <div className="text-center my-4 sm:my-0 w-full">
  //                   <p className="text-sky-400 text-sm">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.productDateTime?.journeyTime || "Journey Time"}{" "}
  //                     min
  //                   </p>
  //                   <p className="text-slate-800">1 Stop</p>
  //                   <Image
  //                     src="/plane.png"
  //                     alt="plane-image"
  //                     className="rounded"
  //                     width={1280}
  //                     height={720}
  //                   />
  //                 </div>

  //                 <div className="text-end w-full">
  //                   <p className="text-sky-400 text-sm">Arrive</p>
  //                   <p className="text-lg font-semibold">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.productDateTime?.timeOfArrival || "00:00"}
  //                   </p>
  //                   <p className="text-sm font-bold text-sky-400">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.productDateTime?.dateOfArrivalString || "Date"}
  //                   </p>
  //                   <p className="text-lg font-bold">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.location?.[1]?.locationId || "Arrival Location"}
  //                   </p>
  //                   <p className="text-slate-800">
  //                     {flight?.flightDetails?.[0]?.flightInformation
  //                       ?.location?.[1]?.airportName || "Airport Name"}
  //                   </p>
  //                 </div>
  //               </div>

  //               {baggageOpen[index] && (
  //                 <div className="mt-4 p-4 bg-white border rounded-lg">
  //                   <h5 className="font-semibold text-sky-600">
  //                     Baggage Details
  //                   </h5>
  //                   <p className="text-slate-800 mt-2">
  //                     Checked Bags:{" "}
  //                     {flightData?.baggage?.[0]?.ADT?.freeAllowance || "N/A"} x{" "}
  //                     {flightData?.baggage?.[0]?.ADT?.unitQualifier || "N/A"}
  //                   </p>
  //                   <p className="text-slate-800">
  //                     Carry-on:{" "}
  //                     {flightData?.baggage?.[0]?.ADT?.cabinBaggage || "N/A"}
  //                   </p>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         ))}

  //         {view !== "bookings" && (
  //           <>
  //             {/* Traveler Information */}
  //             <ContactDetails />
  //             {flightData?.baggage?.map((traveler, index) => (
  //               <TravelerInfo
  //                 key={index}
  //                 travelerType={traveler.travelerType || "Traveler"}
  //                 travelerId={index + 1}
  //                 setPassengerData={(details) => {
  //                   // Update the passenger data at the specific index
  //                   setPassengerData((prevData) => {
  //                     const updatedData = [...prevData];
  //                     updatedData[index] = details;
  //                     return updatedData;
  //                   });
  //                 }}
  //               />
  //             ))}
  //           </>
  //         )}
  //       </div>

  //       {/* Right Side - Fare Summary */}
  //       <div>
  //         <div className="bg-slate-50 border rounded-lg p-6 mt-6 md:mt-0">
  //           <h4 className="text-xl font-semibold">Fare Summary</h4>
  //           <div className="space-y-2 mt-4">
  //             <p className="">
  //               Base Fare: $
  //               {(flightData?.fareSummary?.totalFareAmount || 0) / 100}
  //             </p>
  //             <p className="">
  //               Taxes: ${(flightData?.fareSummary?.totalTaxAmount || 0) / 100}
  //             </p>
  //             <p className="font-semibold">
  //               Total Fare: $
  //               {(flightData?.fareSummary?.totalFareAmount +
  //                 flightData?.fareSummary?.totalTaxAmount || 0) / 100}
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {view !== "bookings" && (
  //       <button
  //         onClick={handleSubmit}
  //         className="bg-rose-600 text-white px-4 py-2 w-full mt-6 rounded transition duration-200 hover:bg-rose-700"
  //       >
  //         Confirm
  //       </button>
  //     )}
  //   </div>
  // );

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
      // const savedPassengerData = await passengerResponse.json();
      // console.log("Passenger Data Saved:", savedPassengerData);

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
            flightOffers: flightData.flightOffers, // Send the confirmed flight offers from the state
            travelers: passengerData.map((passenger, index) => ({
              id: `${index + 1}`,
              dateOfBirth: passenger.dateOfBirth,
              name: {
                firstName: passenger.firstName,
                lastName: passenger.lastName,
              },
              gender: passenger.title === "Mr" ? "MALE" : "FEMALE",
              contact: {
                emailAddress: "example@mail.com", // Add a dynamic email here based on your app
                phones: [
                  {
                    deviceType: "MOBILE",
                    countryCallingCode: "1", // Set based on passenger's country code
                    number: "1234567890", // Replace with passenger's actual number
                  },
                ],
              },
              documents: passenger.passportNumber
                ? [
                    {
                      documentType: "PASSPORT",
                      number: passenger.passportNumber,
                      expiryDate: passenger.passportExpiry,
                      issuanceCountry: "US", // Set based on your logic
                      nationality: "US", // Set based on your logic
                      holder: true,
                    },
                  ]
                : [],
            })),
          }),
        }
      );

      // Check for errors in flight order response
      if (!flightOrderResponse.ok) {
        throw new Error(
          `Booking API request failed with status ${flightOrderResponse.status}`
        );
      }

      const bookingData = await flightOrderResponse.json();
      console.log("Booking Data:", bookingData);

      const bookFLight = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData.data),
        }
      );
      console.log("handleSubmit ~ bookFLight:", bookFLight.data);

      // Reset state and redirect
      setPassengerData([]);
      router.push("/bookings"); // Redirect to the bookings page after successful booking
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
          {flightData?.flightOffers?.map((offer, index) => (
            <div className="bg-slate-50 border rounded-lg" key={index}>
              <div className="border-b p-4 flex justify-between items-center">
                <h4 className="font-bold text-lg text-sky-600">
                  {offer?.itineraries?.[0]?.segments?.[0]?.departure
                    ?.iataCode || "Departure"}{" "}
                  -{" "}
                  {offer?.itineraries?.[0]?.segments?.[0]?.arrival?.iataCode ||
                    "Arrival"}
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
                      src={`https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${
                        offer?.itineraries?.[0]?.segments?.[0]?.carrierCode ||
                        "BG"
                      }.png`}
                      alt={
                        offer?.itineraries?.[0]?.segments?.[0]?.carrierCode ||
                        "Airline"
                      }
                      width={60}
                      height={60}
                    />
                    <div className="ml-4">
                      <p className="text-slate-600 text-sm">
                        {offer?.itineraries?.[0]?.segments?.[0]?.carrierCode ||
                          "Airline"}
                      </p>
                      <p className="text-lg font-semibold">
                        {offer?.itineraries?.[0]?.segments?.[0]?.number ||
                          "Flight Number"}
                      </p>
                      <p className="text-sm font-medium">
                        Aircraft:{" "}
                        {offer?.itineraries?.[0]?.segments?.[0]?.aircraft
                          ?.code || "Aircraft Type"}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-800 text-sm mt-2 sm:mt-0">
                    Class: Economy
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
                  <div className="text-start sm:text-left w-full">
                    <p className="text-sky-400 text-sm">Depart</p>
                    <p className="text-lg font-semibold">
                      {new Date(
                        offer?.itineraries?.[0]?.segments?.[0]?.departure?.at
                      ).toLocaleTimeString()}
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                      {new Date(
                        offer?.itineraries?.[0]?.segments?.[0]?.departure?.at
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold">
                      {
                        offer?.itineraries?.[0]?.segments?.[0]?.departure
                          ?.iataCode
                      }
                    </p>
                    <p className="text-slate-800">
                      {offer?.itineraries?.[0]?.segments?.[0]?.departure
                        ?.terminal || "Terminal"}
                    </p>
                  </div>

                  <div className="text-center my-4 sm:my-0 w-full">
                    <p className="text-sky-400 text-sm">
                      {offer?.itineraries?.[0]?.segments?.[0]?.duration ||
                        "Duration"}{" "}
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
                      {new Date(
                        offer?.itineraries?.[0]?.segments?.[0]?.arrival?.at
                      ).toLocaleTimeString()}
                    </p>
                    <p className="text-sm font-bold text-sky-400">
                      {new Date(
                        offer?.itineraries?.[0]?.segments?.[0]?.arrival?.at
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-lg font-bold">
                      {
                        offer?.itineraries?.[0]?.segments?.[0]?.arrival
                          ?.iataCode
                      }
                    </p>
                    <p className="text-slate-800">
                      {offer?.itineraries?.[0]?.segments?.[0]?.arrival
                        ?.terminal || "Terminal"}
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
                      {offer?.pricingOptions?.includedCheckedBagsOnly
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

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

              {/* Fees Calculation */}
              <p>
                Fees: $
                {flightData?.flightOffers?.[0]?.price?.fees?.reduce(
                  (acc, fee) => acc + parseFloat(fee.amount),
                  0
                ) || "0.00"}
              </p>

              {/* Total Fare */}
              <p className="font-semibold">
                Total Fare: $
                {flightData?.flightOffers?.[0]?.price?.grandTotal || "N/A"}
              </p>

              {/* Additional Services (if any) */}
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
          className="bg-rose-600 text-white px-4 py-2 w-full mt-6 rounded transition duration-200 hover:bg-rose-700 h-10 flex justify-center items-center"
        >
          {loading ? <span className="loader_css_xtype"></span> : "Confirm"}
        </button>
      )}
    </div>
  );
}
