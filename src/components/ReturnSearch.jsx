"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  Minus,
  Check,
  Search,
} from "lucide-react";
import { Calendar } from "../components/ui/calendar";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReturnSearch() {
  const [departureCity, setDepartureCity] = useState("");
  const [departureCityFullName, setDepartureCityFullName] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [destinationCityFullName, setDestinationCityFullName] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("economy");
  const [departureAirportsData, setDepartureAirportsData] = useState([]);
  const [destinationAirportsData, setDestinationAirportsData] = useState([]);
  const [loadingDepartureAirports, setLoadingDepartureAirports] =
    useState(false);
  const [loadingDestinationAirports, setLoadingDestinationAirports] =
    useState(false);
  const [searchDepartureAirport, setSearchDepartureAirport] = useState("");
  const [searchDestinationAirport, setSearchDestinationAirport] = useState("");
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [debouncedSearchDeparture, setDebouncedSearchDeparture] = useState("");
  const [debouncedSearchDestination, setDebouncedSearchDestination] =
    useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchDeparture(searchDepartureAirport);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchDepartureAirport]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchDestination(searchDestinationAirport);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchDestinationAirport]);

  useEffect(() => {
    if (!debouncedSearchDeparture) return;
    const fetchDepartureAirports = async () => {
      setLoadingDepartureAirports(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?search=${debouncedSearchDeparture}`
        );
        const data = await res.json();
        setDepartureAirportsData(data?.airports || []);
      } catch (error) {
        console.error("Error fetching departure airports:", error);
      } finally {
        setLoadingDepartureAirports(false);
      }
    };
    fetchDepartureAirports();
  }, [debouncedSearchDeparture]);

  useEffect(() => {
    if (!debouncedSearchDestination) return;
    const fetchDestinationAirports = async () => {
      setLoadingDestinationAirports(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?search=${debouncedSearchDestination}`
        );
        const data = await res.json();
        setDestinationAirportsData(data?.airports || []);
      } catch (error) {
        console.error("Error fetching destination airports:", error);
      } finally {
        setLoadingDestinationAirports(false);
      }
    };
    fetchDestinationAirports();
  }, [debouncedSearchDestination]);

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
    const returnDateParam = searchParams.get("returnDate");
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
    if (returnDateParam) setReturnDate(returnDateParam);
    if (adultsParam) setAdults(Number(adultsParam));
    if (childrenParam) setChildren(Number(childrenParam));
    if (infantsParam) setInfants(Number(infantsParam));
    if (seatTypeParam) setSeatType(seatTypeParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchDepartureAirports = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?offset=0&limit=10&order=ASC`
        );
        const data = await res.json();
        setDepartureAirportsData(data?.airports || []);
        setDestinationAirportsData(data?.airports || []);
      } catch (error) {
        console.error("Failed to fetch departure airports:", error);
      }
    };

    fetchDepartureAirports();
  }, []);

  const handleReturnTripSearch = (e) => {
    e.preventDefault();

    if (
      !departureCity ||
      !destinationCity ||
      !departureDate ||
      !returnDate ||
      !adults
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const query = {
      departureCity,
      departureCityFullName,
      destinationCity,
      destinationCityFullName,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      seatType,
    };

    const queryString = new URLSearchParams(query).toString();
    router.push(`/flights?type=return-trip&${queryString}`);
  };

  return (
    <div className="rounded-lg pt-2 md:pt-6">
      <form onSubmit={handleReturnTripSearch}>
        <div className="flex flex-col md:grid md:grid-cols-5 md:items-end gap-4">
          {/* Departure City */}
          <div className="w-full">
            <Label
              htmlFor="departureCity"
              className="block text-sm text-start font-medium mb-2 text-slate-700"
            >
              Departure City
            </Label>
            <Popover open={openDeparture} onOpenChange={setOpenDeparture}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDeparture}
                  className="w-full text-black/60 justify-start"
                >
                  <span className="truncate">
                    {departureCityFullName && departureCityFullName}
                    {departureCity
                      ? departureAirportsData?.find(
                          (airport) => airport?.iata === departureCity
                        )?.name
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
                    {loadingDepartureAirports ? (
                      <CommandEmpty>Loading...</CommandEmpty>
                    ) : departureAirportsData?.length > 0 ? (
                      <CommandGroup>
                        {departureAirportsData?.map((airport) => (
                          <CommandItem
                            key={airport?.id}
                            value={airport?.iata}
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
                            {airport?.name} ({airport?.iata && airport?.iata}) -{" "}
                            {airport?.city}
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
            <Label
              htmlFor="destinationCity"
              className="block text-sm text-start font-medium mb-2 text-slate-700"
            >
              Destination City
            </Label>
            <Popover open={openDestination} onOpenChange={setOpenDestination}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openDestination}
                  className="w-full text-black/60 justify-start"
                >
                  <span className="truncate">
                    {destinationCityFullName && destinationCityFullName}
                    {destinationCity
                      ? destinationAirportsData?.find(
                          (airport) => airport?.iata === destinationCity
                        )?.name
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
                    {loadingDestinationAirports ? (
                      <CommandEmpty>Loading...</CommandEmpty>
                    ) : destinationAirportsData?.length > 0 ? (
                      <CommandGroup>
                        {destinationAirportsData?.map((airport) => (
                          <CommandItem
                            key={airport?.id}
                            value={airport?.iata}
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
                            {airport?.name} ({airport?.iata && airport?.iata}) -{" "}
                            {airport?.city}
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
                  variant="outline"
                  className={`w-full justify-start text-left font-normal text-black/60 ${
                    !departureDate && "text-black/60"
                  }`}
                >
                  {departureDate ? (
                    format(departureDate, "PPP")
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                      <span>Select Date</span>{" "}
                    </>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={(selectedDate) =>
                    setDepartureDate(format(selectedDate, "yyyy-MM-dd"))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Return Date */}
          <div className="w-full">
            <Label
              htmlFor="returnDate"
              className="block text-sm text-start font-medium mb-2 text-slate-700"
            >
              Return Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal text-black/60 ${
                    !returnDate && "text-black/60"
                  }`}
                >
                  {returnDate ? (
                    format(returnDate, "PPP")
                  ) : (
                    <>
                      <CalendarIcon className="mr-2 h-4 w-4" />{" "}
                      <span>Select Date</span>{" "}
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={(selectedDate) =>
                    setReturnDate(format(selectedDate, "yyyy-MM-dd"))
                  }
                  initialFocus
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
                    >
                      {" "}
                      <Minus className="w-4 h-4" />{" "}
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
                    >
                      {" "}
                      <Plus className="w-4 h-4" />{" "}
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
                    >
                      {" "}
                      <Minus className="w-4 h-4" />{" "}
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
                    >
                      {" "}
                      <Plus className="w-4 h-4" />{" "}
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
                    >
                      {" "}
                      <Minus className="w-4 h-4" />{" "}
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
                    >
                      {" "}
                      <Plus className="w-4 h-4" />{" "}
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
            Search flights
          </Button>
        </div>

        {/* Search Button */}
        <div className="md:flex md:items-center md:justify-end mt-6 hidden">
          <Button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white rounded-md"
          >
            Search flights
          </Button>
        </div>
      </form>
    </div>
  );
}
