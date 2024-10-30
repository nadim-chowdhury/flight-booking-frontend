import Image from "next/image";

export default function SearchFlightDetails({
  searchFlightDetailsData,
  airportData,
  airlineData,
}) {
  return (
    <div className="mt-3 border rounded-md">
      {searchFlightDetailsData?.map((flight, index) => {
        // Extract relevant data from the flight details
        const departure = flight.departure || {};
        const arrival = flight.arrival || {};

        // Find matching airport data
        const departureAirport = airportData.find(
          (airport) => airport.iata_code === departure.iataCode
        ) || {
          name: "Unknown Airport",
          city: "Unknown City",
          country: "Unknown Country",
        };

        const arrivalAirport = airportData.find(
          (airport) => airport.iata_code === arrival.iataCode
        ) || {
          name: "Unknown Airport",
          city: "Unknown City",
          country: "Unknown Country",
        };

        // Find matching airline data
        const airline = airlineData.find(
          (airline) => airline.iata === flight.carrierCode
        ) || { name: "Unknown Airline", id: "Unknown" };

        const marketingCarrierLogo = `https://fe-pub.s3.ap-southeast-1.amazonaws.com/airlineimages/128/${flight.carrierCode}.png`;

        return (
          <div key={index}>
            <h3
              className={`border-b px-3 py-2 font-bold ${
                index > 0 && "border-t"
              }`}
            >
              {`${departureAirport.city || "Departure City"} to ${
                arrivalAirport.city || "Arrival City"
              }, ${new Date(departure.at).toLocaleDateString() || "Date"}`}
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
                  {airline.name || "Airline"}
                  &nbsp;|&nbsp;
                  <span className="">
                    {flight.carrierCode || "Code"} |{" "}
                    {flight.number || "Flight Number"}
                  </span>
                </p>
                <p className="text-sm font-bold">
                  Aircraft: {flight.aircraft?.code || "Aircraft Type"}
                </p>
                <p className="text-xs font-bold">
                  Operated by:{" "}
                  {flight.operating?.carrierCode || "Operating Carrier"}
                </p>
              </div>
            </div>

            {/* Departure and Arrival details */}
            <div className="px-3 py-2">
              <div className="flex items-center pb-2 gap-6 mb-1 overflow-x-scroll whitespace-nowrap md:overflow-x-auto">
                <div className="text-start text-wrap w-full">
                  <p className="text-xs font-bold text-sky-600">Departure:</p>
                  <p className="text-sm font-medium">
                    {departureAirport.name} ({departure.iataCode || "ABC"})
                  </p>
                  <p className="text-sm font-medium">
                    {departureAirport.city} {", "} {departureAirport.country}
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(departure.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) || "00:00"}{" "}
                    -{" "}
                    {new Date(departure.at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }) || "Date"}
                  </p>
                </div>

                <div className="border-r border-l h-12"></div>

                <div className="text-end text-wrap w-full">
                  <p className="text-xs font-bold text-sky-600">Arrival:</p>
                  <p className="text-sm font-medium">
                    {arrivalAirport.name} ({arrival.iataCode || "XYZ"})
                  </p>
                  <p className="text-sm font-medium">
                    {arrivalAirport.city} {", "} {arrivalAirport.country}
                  </p>
                  <p className="text-sm font-medium">
                    {new Date(arrival.at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }) || "00:00"}{" "}
                    -{" "}
                    {new Date(arrival.at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }) || "Date"}
                  </p>
                </div>
              </div>
              <p className="text-xs font-bold capitalize text-center">
                Duration: {flight.duration || "N/A"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
