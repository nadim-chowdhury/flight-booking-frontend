"use client";

import Image from "next/image";
import TravelerInfo from "../../../components/TravelerInfo";
import ContactDetails from "../../../components/ContactDetails";

export default function SelectedFlightDetails() {
  const travelers = [{ type: "Adult" }, { type: "Child" }, { type: "Infant" }];

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 md:my-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <h4 className="text-2xl font-bold text-red-600">Review Your Booking</h4>
        <div className="flex items-center space-x-3">
          <span className="text-base text-gray-700 cursor-pointer">
            Flight Selection
          </span>
          <svg
            width="9"
            height="14"
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
          <span className="text-base text-red-600">Booking</span>
          <svg
            width="9"
            height="14"
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
          <span className="text-base text-gray-700">Payment</span>
        </div>
      </div>

      {/* Flight Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 mt-6">
        {/* Left Side - Flight and Traveler Info */}
        <div className="col-span-2">
          {/* Flight 1 */}
          <div className="bg-slate-50 border rounded-lg">
            <div className="border-b p-4 flex justify-between items-center">
              <h4 className="font-bold text-lg text-blue-600">DAC-DEL</h4>
              <button className="bg-red-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-red-700">
                View Baggage
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <Image
                    src="https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/AI.png"
                    alt="Air India"
                    width={60}
                    height={60}
                  />
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm">Air India</p>
                    <p className="text-lg font-semibold">AI | 228</p>
                    <div className="flex space-x-2">
                      <p className="text-sm font-bold">Aircraft: Airbus A320</p>
                      <p className="text-sm font-bold">Operated by: AI</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 mt-2 sm:mt-0">Economy Class</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center py-4">
                <div className="text-center sm:text-left">
                  <p className="text-blue-400 text-sm">Depart</p>
                  <p className="text-lg font-semibold">15:00</p>
                  <p className="text-sm font-bold text-blue-400">
                    Fri, 25 Oct 2024
                  </p>
                  <p className="text-lg font-bold">DAC</p>
                  <p className="text-gray-800">Dhaka</p>
                </div>
                <div className="text-center my-4 sm:my-0">
                  <p className="text-blue-400 text-sm">2 hours 25 minutes</p>
                  <p className="text-gray-800">Non Stop</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-blue-400 text-sm">Arrive</p>
                  <p className="text-lg font-semibold">16:55</p>
                  <p className="text-sm font-bold text-blue-400">
                    Fri, 25 Oct 2024
                  </p>
                  <p className="text-lg font-bold">DEL</p>
                  <p className="text-gray-800">Delhi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Flight 2 */}
          <div className="bg-slate-50 border rounded-lg mt-6">
            <div className="border-b p-4 flex justify-between items-center">
              <h4 className="font-bold text-lg text-blue-600">DEL-DXB</h4>
              <button className="bg-red-600 text-white px-3 py-1 rounded transition duration-200 hover:bg-red-700">
                View Baggage
              </button>
            </div>
            <div className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center border-b py-4">
                <div className="flex items-center">
                  <Image
                    src="https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/AI.png"
                    alt="Air India"
                    width={60}
                    height={60}
                  />
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm">Air India</p>
                    <p className="text-lg font-semibold">AI | 929</p>
                    <div className="flex space-x-2">
                      <p className="text-sm font-bold">
                        Aircraft: Boeing 787-8
                      </p>
                      <p className="text-sm font-bold">Operated by: AI</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 mt-2 sm:mt-0">Economy Class</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center py-4">
                <div className="text-center sm:text-left">
                  <p className="text-blue-400 text-sm">Depart</p>
                  <p className="text-lg font-semibold">06:05</p>
                  <p className="text-sm font-bold text-blue-400">
                    Mon, 28 Oct 2024
                  </p>
                  <p className="text-lg font-bold">DEL</p>
                  <p className="text-gray-800">Delhi</p>
                </div>
                <div className="text-center my-4 sm:my-0">
                  <p className="text-blue-400 text-sm">3 hours 55 minutes</p>
                  <p className="text-gray-800">Non Stop</p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-blue-400 text-sm">Arrive</p>
                  <p className="text-lg font-semibold">08:00</p>
                  <p className="text-sm font-bold text-blue-400">
                    Mon, 28 Oct 2024
                  </p>
                  <p className="text-lg font-bold">DXB</p>
                  <p className="text-gray-800">Dubai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Information */}
          <ContactDetails />
          {travelers.map((traveler, index) => (
            <TravelerInfo key={index} travelerType={traveler.type} />
          ))}
        </div>

        {/* Right Side - Fare Summary */}
        <div>
          <div className="bg-slate-50 border rounded-lg p-6 mt-6 md:mt-0">
            <h4 className="text-xl font-semibold">Fare Summary</h4>
            <div className="mt-4">
              <p>Base Fare</p>
              <p className="text-gray-800">USD 200</p>
            </div>
            <div className="mt-2">
              <p>Taxes</p>
              <p className="text-gray-800">USD 50</p>
            </div>
            <hr className="my-4" />
            <div className="font-bold text-lg">
              <p>Total Fare</p>
              <p className="text-gray-800">USD 250</p>
            </div>
          </div>
        </div>
      </div>

      <button className="bg-red-600 text-white px-4 py-2 w-full mt-6 rounded transition duration-200 hover:bg-red-700">
        Confirm
      </button>
    </div>
  );
}
