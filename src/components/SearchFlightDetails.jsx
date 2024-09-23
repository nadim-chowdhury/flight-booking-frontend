import Image from "next/image";

export default function SearchFlightDetails({ searchFlightDetailsData }) {
  return (
    <div className="my-3 mx-1 border border-gray-300 rounded-md">
      {searchFlightDetailsData?.map((flight, index) => {
        const {
          timeOfDeparture,
          dateOfDepartureString,
          timeOfArrival,
          dateOfArrivalString,
        } = flight?.productDateTime || {};

        const departureLocation = flight?.location?.[0];
        const arrivalLocation = flight?.location?.[1];
        const marketingCarrierLogo = `https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${flight?.companyId?.marketingCarrierCode}.png`;

        return (
          <div key={index}>
            <h3 className="border-b border-gray-300 px-3 py-2 font-bold">
              {`${departureLocation?.city} to ${arrivalLocation?.city}, ${dateOfDepartureString}`}
            </h3>
            <div className="px-3 py-2 flex items-start border-b border-gray-300 space-x-3 overflow-x-scroll whitespace-nowrap md:overflow-x-auto">
              <Image
                src={marketingCarrierLogo}
                alt="air-logo"
                width={480}
                height={480}
                className="h-12 w-12 rounded-lg object-contain"
              />
              <div>
                <p className="mb-1 font-bold">
                  {flight?.companyId?.marketingCarrier}{" "}
                  <span className="font-normal ml-4">
                    {flight?.companyId?.marketingCarrierCode}
                    {flight?.productDetails?.flightNumber &&
                      ` | ${flight?.productDetails?.flightNumber}`}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Aircraft: {flight?.productDetails?.aircraft}
                </p>
                <p className="text-xs font-bold">
                  Operated by: {flight?.companyId?.operatingCarrier}
                </p>
                <p className="text-xs font-bold">
                  Flight Class: {flight?.class}
                </p>
                <p className="text-xs font-bold">
                  Available Seats: {flight?.availableSeats}
                </p>
              </div>
            </div>

            {/* Departure and Arrival details */}
            <div className="px-3 py-2">
              <div className="flex gap-4 justify-between mb-2 overflow-x-scroll whitespace-nowrap md:overflow-x-auto">
                <div>
                  <p className="text-xs font-bold">Departure:</p>
                  <p className="text-sm font-medium">
                    {departureLocation?.airportName} (
                    {departureLocation?.cityCode})
                  </p>
                  <p className="text-sm font-medium">
                    {departureLocation?.countryName}
                  </p>
                  <p className="text-sm font-medium">
                    {timeOfDeparture} - {dateOfDepartureString}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold">Arrival:</p>
                  <p className="text-sm font-medium">
                    {arrivalLocation?.airportName} ({arrivalLocation?.cityCode})
                  </p>
                  <p className="text-sm font-medium">
                    {arrivalLocation?.countryName}
                  </p>
                  <p className="text-sm font-medium">
                    {timeOfArrival} - {dateOfArrivalString}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold capitalize">
                Baggage Info: {flight?.baggage?.checkIn} checked-in,{" "}
                {flight?.baggage?.cabin} cabin
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
