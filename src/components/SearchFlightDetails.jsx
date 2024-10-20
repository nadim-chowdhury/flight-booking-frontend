import Image from "next/image";

export default function SearchFlightDetails({ searchFlightDetailsData }) {
  console.log(
    "SearchFlightDetails ~ searchFlightDetailsData:",
    searchFlightDetailsData
  );

  return (
    <div className="mt-3 border rounded-md">
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
            <h3
              className={`border-b px-3 py-2 font-bold ${
                index > 0 && "border-t"
              }`}
            >
              {`${departureLocation?.city || "Departure City"} to ${
                arrivalLocation?.city || "Arrival City"
              }, ${dateOfDepartureString || "Date"}`}
            </h3>
            <div className="px-3 py-2 flex items-start border-b space-x-3 overflow-x-scroll whitespace-nowrap md:overflow-x-auto">
              <Image
                src={marketingCarrierLogo || "/placeholder-airline-logo.png"}
                alt="air-logo"
                width={480}
                height={480}
                className="h-12 w-12 rounded-lg object-contain"
              />
              <div>
                <p className="mb-1 font-bold">
                  {flight?.companyId?.marketingCarrier || "Airline"}
                  &nbsp;|&nbsp;
                  <span className="">
                    {flight?.companyId?.marketingCarrierCode || "Code"}
                    {flight?.productDetails?.flightNumber &&
                      ` | ${
                        flight?.productDetails?.flightNumber || "Flight Number"
                      }`}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Aircraft:{" "}
                  {flight?.productDetail?.equipmentType || "Aircraft Type"}
                </p>
                <p className="text-xs font-bold">
                  Operated by:{" "}
                  {flight?.companyId?.operatingCarrier || "Operating Carrier"}
                </p>
                <p className="text-xs font-bold">
                  Flight Class:{" "}
                  {flight?.addProductDetail?.cabinClass || "Class"}
                </p>
                <p className="text-xs font-bold">
                  Available Seats:{" "}
                  {flight?.addProductDetail?.availableSeats || "N/A"}
                </p>
              </div>
            </div>

            {/* Departure and Arrival details */}
            <div className="px-3 py-2">
              <div className="flex items-center pb-2 gap-6 mb-1 overflow-x-scroll whitespace-nowrap md:overflow-x-auto">
                <div className="text-start text-wrap w-full">
                  <p className="text-xs font-bold text-sky-600">Departure:</p>
                  <p className="text-sm font-medium">
                    {departureLocation?.airportName || "Departure Airport"} (
                    {departureLocation?.cityCode || "ABC"})
                  </p>
                  <p className="text-sm font-medium">
                    {departureLocation?.countryName || "Country"}
                  </p>
                  <p className="text-sm font-medium">
                    {timeOfDeparture || "00:00"} -{" "}
                    {dateOfDepartureString || "Date"}
                  </p>
                </div>

                <div className="border-r border-l h-12"></div>

                <div className="text-end text-wrap w-full">
                  <p className="text-xs font-bold text-sky-600">Arrival:</p>
                  <p className="text-sm font-medium">
                    {arrivalLocation?.airportName || "Arrival Airport"} (
                    {arrivalLocation?.cityCode || "XYZ"})
                  </p>
                  <p className="text-sm font-medium">
                    {arrivalLocation?.countryName || "Country"}
                  </p>
                  <p className="text-sm font-medium">
                    {timeOfArrival || "00:00"} - {dateOfArrivalString || "Date"}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold capitalize text-center">
                Baggage Info: {flight?.baggage?.checkIn || "N/A"} checked-in,{" "}
                {flight?.baggage?.cabin || "N/A"} cabin
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
