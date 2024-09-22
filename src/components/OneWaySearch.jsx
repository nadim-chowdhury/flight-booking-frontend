"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Minus, Check } from "lucide-react";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { allAirportsData } from "../utils/all-airports-data";
import { useRouter, useSearchParams } from "next/navigation";

export default function OneWaySearch() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("economy");
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    const departureCityParam = searchParams.get("departureCity");
    const destinationCityParam = searchParams.get("destinationCity");
    const departureDateParam = searchParams.get("departureDate");
    const adultsParam = searchParams.get("adults");
    const childrenParam = searchParams.get("children");
    const infantsParam = searchParams.get("infants");
    const seatTypeParam = searchParams.get("seatType");

    if (departureCityParam) setDepartureCity(departureCityParam);
    if (destinationCityParam) setDestinationCity(destinationCityParam);
    if (departureDateParam) setDepartureDate(departureDateParam);
    if (adultsParam) setAdults(Number(adultsParam));
    if (childrenParam) setChildren(Number(childrenParam));
    if (infantsParam) setInfants(Number(infantsParam));
    if (seatTypeParam) setSeatType(seatTypeParam);
  }, [searchParams]);

  const handleOneWaySearch = (e) => {
    e.preventDefault();

    if (!departureCity || !destinationCity || !departureDate || !adults) {
      alert("Please fill in all required fields");
      return;
    }

    const query = {
      departureCity,
      destinationCity,
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
    <div className="rounded-lg md:pt-6">
      <form onSubmit={handleOneWaySearch}>
        <div className="flex flex-col md:grid md:grid-cols-4 md:items-end gap-4">
          {/* Departure City */}
          <div className="w-full">
            <Label
              htmlFor="departureCity"
              className="block text-sm text-start font-medium text-gray-700 mb-2"
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
                    {departureCity
                      ? allAirportsData.find(
                          (airport) => airport.iata_code === departureCity
                        )?.name
                      : "Select City"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Airport" />
                  <CommandList>
                    <CommandEmpty>No airport found.</CommandEmpty>
                    <CommandGroup>
                      {allAirportsData.map((airport) => (
                        <CommandItem
                          key={airport.id}
                          value={airport.iata_code}
                          onSelect={(iata) => {
                            setDepartureCity(
                              iata === departureCity ? "" : iata
                            );
                            setOpenDeparture(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              departureCity === airport.iata_code
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {airport.name} ({airport.iata_code}) - {airport.city}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Destination City */}
          <div className="w-full">
            <Label
              htmlFor="destinationCity"
              className="block text-sm text-start font-medium text-gray-700 mb-2"
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
                    {destinationCity
                      ? allAirportsData.find(
                          (airport) => airport.iata_code === destinationCity
                        )?.name
                      : "Select City"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search Airport" />
                  <CommandList>
                    <CommandEmpty>No airport found.</CommandEmpty>
                    <CommandGroup>
                      {allAirportsData.map((airport) => (
                        <CommandItem
                          key={airport.id}
                          value={airport.iata_code}
                          onSelect={(iata) => {
                            setDestinationCity(
                              iata === destinationCity ? "" : iata
                            );
                            setOpenDestination(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              destinationCity === airport.iata_code
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {airport.name} ({airport.iata_code}) - {airport.city}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Departure Date */}
          <div className="w-full">
            <Label
              htmlFor="departureCity"
              className="block text-sm text-start font-medium text-gray-700 mb-2"
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
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Travellers & Seat Type */}
          <div className="w-full">
            <Label
              htmlFor="departureCity"
              className="block text-sm text-start font-medium text-gray-700 mb-2"
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
                    className="block text-sm text-start font-medium text-gray-700"
                  >
                    Adults
                  </Label>
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
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
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Passengers: Children */}
                <div className="w-full">
                  <Label
                    htmlFor="children"
                    className="block text-sm text-start font-medium text-gray-700 mt-1"
                  >
                    Children
                  </Label>
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setChildren(Math.max(0, children - 1))}
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
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Passengers: Infants */}
                <div className="w-full">
                  <Label
                    htmlFor="infants"
                    className="block text-sm text-start font-medium text-gray-700 mt-1"
                  >
                    Infants
                  </Label>
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
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
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Seat Type */}
                <div className="mt-2">
                  <Label
                    htmlFor="infants"
                    className="block text-sm text-start font-medium text-gray-700 my-1"
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
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md md:hidden"
          >
            Search flights
          </Button>
        </div>

        {/* Search Button */}
        <div className="md:flex md:items-center md:justify-end hidden">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-md mt-6"
          >
            Search flights
          </Button>
        </div>
      </form>
    </div>
  );
}
