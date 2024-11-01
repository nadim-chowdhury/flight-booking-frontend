"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  Minus,
  Search,
  MapPin,
} from "lucide-react";
import { Calendar } from "../components/ui/calendar";
import { cn } from "../lib/utils";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { fetchAmadeusAccessToken } from "@/lib/fetchAmadeusAccessToken";
import { fetchAirports } from "@/lib/fetchAirports";
import { searchFlightsStart } from "@/redux/slices/searchFlightsSlice";
import {
  setDepartureAirport,
  setDestinationAirport,
} from "@/redux/slices/selectAirportSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MapboxExample from "./MapBox";
import FlightMap from "./FlightMap";
import MapModal from "./MapModal";

export default function OneWaySearch() {
  const [departureCity, setDepartureCity] = useState("");
  const [departureCityFullName, setDepartureCityFullName] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationCityFullName, setDestinationCityFullName] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("economy");
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [departureAirportsData, setDepartureAirportsData] = useState([]);
  const [destinationAirportsData, setDestinationAirportsData] = useState([]);
  const [loadingDepartureAirports, setLoadingDepartureAirports] =
    useState(false);
  const [loadingDestinationAirports, setLoadingDestinationAirports] =
    useState(false);
  const [searchDepartureAirport, setSearchDepartureAirport] = useState("");
  const [searchDestinationAirport, setSearchDestinationAirport] = useState("");
  const [debouncedSearchDeparture, setDebouncedSearchDeparture] = useState("");
  const [debouncedSearchDestination, setDebouncedSearchDestination] =
    useState("");
  const [depMapModalOpen, setDepMapModalOpen] = useState(false);
  const [desMapModalOpen, setDesMapModalOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  // const { isLoading, error } = useSelector((state) => state.searchFlights);
  const {
    data: airports,
    loading,
    error,
  } = useSelector((state) => state.airports);
  const selectedAirportData = useSelector((state) => state.selectAirport);
  console.log("OneWaySearch ~ selectedAirportData:", selectedAirportData);

  useEffect(() => {
    if (selectedAirportData.departureAirport) {
      setDepartureCity(selectedAirportData.departureAirport.iata_code);
      setDepartureCityFullName(selectedAirportData.departureAirport.city);
      setDepMapModalOpen(false);
    }
    if (selectedAirportData.destinationAirport) {
      setDestinationCity(selectedAirportData.destinationAirport.iata_code);
      setDestinationCityFullName(selectedAirportData.destinationAirport.city);
      setDesMapModalOpen(false);
    }
  }, [selectedAirportData]);

  useEffect(() => {
    const departureCityParam =
      searchParams.get("departureCity") ||
      searchParams.get("flight1DepartureCity");
    const departureCityFullNameParam =
      searchParams.get("departureCityFullName") ||
      searchParams.get("flight1DepartureCityFullName");
    const destinationCityParam =
      searchParams.get("destinationCity") ||
      searchParams.get("flight1DestinationCity");
    const destinationCityFullNameParam =
      searchParams.get("destinationCityFullName") ||
      searchParams.get("flight1DestinationCityFullName");
    const departureDateParam =
      searchParams.get("departureDate") ||
      searchParams.get("flight1DepartureDate");
    const adultsParam = searchParams.get("adults");
    const childrenParam = searchParams.get("children");
    const infantsParam = searchParams.get("infants");
    const seatTypeParam = searchParams.get("seatType");

    if (departureCityParam) setDepartureCity(departureCityParam);
    if (departureCityFullNameParam)
      setDepartureCityFullName(departureCityFullNameParam);
    if (destinationCityParam) setDestinationCity(destinationCityParam);
    if (destinationCityFullNameParam)
      setDestinationCityFullName(destinationCityFullNameParam);
    if (departureDateParam) setDepartureDate(departureDateParam);
    if (adultsParam) setAdults(Number(adultsParam));
    if (childrenParam) setChildren(Number(childrenParam));
    if (infantsParam) setInfants(Number(infantsParam));
    if (seatTypeParam) setSeatType(seatTypeParam);

    // setAllAirportsInfo(JSON.parse(localStorage.getItem("allAirportsDataMain")));
  }, [searchParams]);

  // Fetch default airports for initial load (both departure and destination)
  useEffect(() => {
    // const defaultKeyword = "airport"; // Default search term for the initial load
    // fetchAirports(
    //   defaultKeyword,
    //   setDepartureAirportsData,
    //   setLoadingDepartureAirports,
    //   "airports" // Updated to use "airports" type as per your backend API
    // );
    // fetchAirports(
    //   defaultKeyword,
    //   setDestinationAirportsData,
    //   setLoadingDestinationAirports,
    //   "airports" // Updated to use "airports" type as per your backend API
    // );

    setDepartureAirportsData(airports);
    setDestinationAirportsData(airports);

    // setDepartureAirportsData(allAirportsInfo);
    // setDestinationAirportsData(allAirportsInfo);
  }, [airports]);

  // Fetch departure airports based on search input
  useEffect(() => {
    if (!debouncedSearchDeparture) return;
    fetchAirports(
      debouncedSearchDeparture,
      setDepartureAirportsData,
      setLoadingDepartureAirports,
      "airports" // Updated to use "airports" type
    );
  }, [debouncedSearchDeparture]);

  // Fetch destination airports based on search input
  useEffect(() => {
    if (!debouncedSearchDestination) return;
    fetchAirports(
      debouncedSearchDestination,
      setDestinationAirportsData,
      setLoadingDestinationAirports,
      "airports" // Updated to use "airports" type
    );
  }, [debouncedSearchDestination]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchDeparture(searchDepartureAirport);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchDepartureAirport]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchDestination(searchDestinationAirport);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchDestinationAirport]);

  const handleSelectDepAirport = (airport) => {
    dispatch(setDepartureAirport(airport));
  };

  const handleSelectDesAirport = (airport) => {
    dispatch(setDestinationAirport(airport));
  };

  const handleOneWaySearch = (e) => {
    e.preventDefault();

    if (!departureCity || !destinationCity || !departureDate || !adults) {
      alert("Please fill in all required fields");
      return;
    }

    dispatch(searchFlightsStart());

    const query = {
      departureCity,
      departureCityFullName,
      destinationCity,
      destinationCityFullName,
      departureDate,
      adults,
      children,
      infants,
      seatType,
    };

    const queryString = new URLSearchParams(query).toString();
    router.push(`/flights?type=one-way&${queryString}`);
  };

  return (
    <div className="rounded-lg pt-2 md:pt-6">
      <form onSubmit={handleOneWaySearch}>
        <div className="flex flex-col md:grid md:grid-cols-4 md:items-end gap-4">
          {/* Departure City */}
          <div className="w-full relative">
            <div className="flex items-center justify-start gap-2 mb-2">
              <Label
                htmlFor="departureCity"
                className="block text-sm text-start font-medium text-slate-700"
              >
                Departure City
              </Label>

              <div
                onClick={() => setDepMapModalOpen(true)}
                className="bg-rose-500 text-white rounded-full p-1 hover:bg-rose-700 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
              </div>

              <MapModal
                isOpen={depMapModalOpen}
                onClose={() => setDepMapModalOpen(false)}
                title="Select Depurture Airport"
              >
                <FlightMap setSelectedAirport={handleSelectDepAirport} />
              </MapModal>
            </div>

            <Popover open={openDeparture} onOpenChange={setOpenDeparture}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDeparture}
                  className="w-full text-black/60 justify-start"
                >
                  <span className="truncate">
                    {departureCityFullName
                      ? `${departureCityFullName} - ${departureCity}`
                      : departureCity
                      ? `${
                          departureAirportsData?.find(
                            (airport) => airport?.iataCode === departureCity
                          )?.name
                        } - ${departureCity}`
                      : "Select City"}
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[310px] p-0">
                <Command>
                  <div className="flex items-center border-b">
                    <Search className="h-4 w-4 mx-3" />
                    <Input
                      placeholder="Search Airport"
                      value={searchDepartureAirport}
                      onChange={(e) =>
                        setSearchDepartureAirport(e.target.value)
                      }
                      className="w-full border-l rounded-none border-r-0 border-t-0 border-b-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <CommandList>
                    {loadingDepartureAirports || loading ? (
                      <CommandEmpty>
                        <span className="loader_wave"></span>
                      </CommandEmpty>
                    ) : departureAirportsData?.length > 0 ? (
                      <CommandGroup>
                        {departureAirportsData?.map((airport) => (
                          <CommandItem
                            key={airport?.id}
                            value={airport?.iataCode}
                            onSelect={(iata) => {
                              setDepartureCity(
                                iata === departureCity ? "" : iata
                              );
                              setOpenDeparture(false);
                              setDepartureCityFullName(airport.name);
                              setSearchDepartureAirport("");
                            }}
                            className=""
                          >
                            {airport?.name} ({airport?.iataCode}) -{" "}
                            {airport?.address?.cityName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : !searchDepartureAirport ? (
                      <CommandGroup>
                        {airports?.map((airport) => (
                          <CommandItem
                            key={airport?.id}
                            value={airport?.iataCode}
                            onSelect={(iataCode) => {
                              handleFlightChange(
                                index,
                                "departureCity",
                                iataCode,
                                airport?.name
                              );
                              handleSearchInputChange(
                                index,
                                "departureCity",
                                ""
                              );
                              togglePopover(index, "departureCity", false);
                            }}
                          >
                            {airport?.name} ({airport?.iataCode}) -{" "}
                            {airport?.address?.cityName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : (
                      <CommandEmpty>No airports found.</CommandEmpty>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Destination City */}
          <div className="w-full">
            <div className="flex items-center justify-start gap-2 mb-2">
              <Label
                htmlFor="departureCity"
                className="block text-sm text-start font-medium text-slate-700"
              >
                Destination City
              </Label>

              <div
                onClick={() => setDesMapModalOpen(true)}
                className="bg-rose-500 text-white rounded-full p-1 hover:bg-rose-700 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <MapPin className="h-4 w-4" />
              </div>

              <MapModal
                isOpen={desMapModalOpen}
                onClose={() => setDesMapModalOpen(false)}
                title="Select Destination Airport"
              >
                <FlightMap setSelectedAirport={handleSelectDesAirport} />
              </MapModal>
            </div>

            <Popover open={openDestination} onOpenChange={setOpenDestination}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDestination}
                  className="w-full text-black/60 justify-start"
                >
                  <span className="truncate">
                    {destinationCityFullName
                      ? `${destinationCityFullName} - ${destinationCity}`
                      : destinationCity
                      ? `${
                          destinationAirportsData?.find(
                            (airport) => airport?.iataCode === destinationCity
                          )?.name || "Unknown Airport"
                        }`
                      : "Select City"}
                  </span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[310px] p-0">
                <Command>
                  <div className="flex items-center border-b">
                    <Search className="h-4 w-4 mx-3" />
                    <Input
                      placeholder="Search Airport"
                      value={searchDestinationAirport}
                      onChange={(e) =>
                        setSearchDestinationAirport(e.target.value)
                      }
                      className="w-full border-l rounded-none border-r-0 border-t-0 border-b-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>

                  <CommandList>
                    {loadingDestinationAirports || loading ? (
                      <CommandEmpty>
                        <span className="loader_wave"></span>
                      </CommandEmpty>
                    ) : destinationAirportsData?.length > 0 ? (
                      <CommandGroup>
                        {destinationAirportsData?.map((airport) => (
                          <CommandItem
                            key={airport?.id}
                            value={airport?.iataCode}
                            onSelect={(iata) => {
                              setDestinationCity(
                                iata === destinationCity ? "" : iata
                              );
                              setOpenDestination(false);
                              setDestinationCityFullName(airport.name);
                              setSearchDestinationAirport("");
                            }}
                            className=""
                          >
                            {airport?.name} ({airport?.iataCode}) -{" "}
                            {airport?.address?.cityName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : !searchDestinationAirport ? (
                      <CommandGroup>
                        {airports?.map((airport) => (
                          <CommandItem
                            key={airport?.id}
                            value={airport?.iataCode}
                            onSelect={(iataCode) => {
                              handleFlightChange(
                                index,
                                "departureCity",
                                iataCode,
                                airport?.name
                              );
                              handleSearchInputChange(
                                index,
                                "departureCity",
                                ""
                              );
                              togglePopover(index, "departureCity", false);
                            }}
                          >
                            {airport?.name} ({airport?.iataCode}) -{" "}
                            {airport?.address?.cityName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : (
                      <CommandEmpty>No airports found.</CommandEmpty>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Departure Date */}
          <div className="w-full">
            <Label
              htmlFor="departureDate"
              className="block text-sm text-start font-medium mb-2 text-slate-700"
            >
              Departure Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal text-black/60",
                    !departureDate && "text-black/60"
                  )}
                >
                  {departureDate ? (
                    format(departureDate, "PPP")
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Select Date</span>
                    </>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={(selectedDate) => {
                    setDepartureDate(format(selectedDate, "yyyy-MM-dd"));
                  }}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Travellers & Seat Type */}
          <div className="w-full">
            <Label
              htmlFor="travellers"
              className="block text-sm text-start font-medium mb-2 text-slate-700"
            >
              Travellers & Seat
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="text-black/60 w-full justify-start"
                >
                  {`${adults + children + infants} & ${
                    seatType === "economy"
                      ? "Economy"
                      : seatType === "business"
                      ? "Business"
                      : seatType === "first-class"
                      ? "First Class"
                      : seatType === "premium-economy"
                      ? "Premium Economy"
                      : ""
                  }`}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-60">
                {/* Passengers: Adults */}
                <div className="w-full">
                  <Label
                    htmlFor="adults"
                    className="block text-sm text-start font-medium text-slate-700"
                  >
                    Adults
                  </Label>
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      id="adults"
                      value={adults}
                      readOnly
                      className="mt-1 block w-full p-2 border rounded-md text-slate-800"
                      required
                    />
                    <Button
                      variant="outline"
                      onClick={() => setAdults(adults + 1)}
                      className="rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Passengers: Children */}
                <div className="w-full">
                  <Label
                    htmlFor="children"
                    className="block text-sm text-start font-medium mt-1 text-slate-700"
                  >
                    Children
                  </Label>
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      id="children"
                      value={children}
                      readOnly
                      className="mt-1 block w-full p-2 border rounded-md text-slate-800"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setChildren(children + 1)}
                      className="rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Passengers: Infants */}
                <div className="w-full">
                  <Label
                    htmlFor="infants"
                    className="block text-sm text-start font-medium mt-1 text-slate-700"
                  >
                    Infants
                  </Label>
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      id="infants"
                      value={infants}
                      readOnly
                      className="mt-1 block w-full p-2 border rounded-md text-slate-800"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setInfants(infants + 1)}
                      className="rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Seat Type */}
                <div className="mt-2">
                  <Label
                    htmlFor="seatType"
                    className="block text-sm text-start font-medium my-1 text-slate-700"
                  >
                    Select Seat Type
                  </Label>
                  <Select
                    value={seatType}
                    onValueChange={(value) => setSeatType(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Seat Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium-economy">
                          Premium Economy
                        </SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first-class">First Class</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white rounded-md md:hidden"
          >
            Search Flights
          </Button>
        </div>

        {/* Search Button */}
        <div className="md:flex md:items-center md:justify-end hidden">
          <Button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white rounded-md mt-6"
          >
            Search Flights
          </Button>
        </div>
      </form>
    </div>
  );
}
