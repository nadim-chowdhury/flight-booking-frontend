"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Minus, Check } from "lucide-react";
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
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { allAirportsData } from "../utils/all-airports-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function ReturnSearch() {
  const [departureCity, setDepartureCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("Economy");
  const [openDeparture, setOpenDeparture] = useState(false);
  const [openDestination, setOpenDestination] = useState(false);
  const [date, setDate] = useState(null);
  const [returnTripDate, setReturnTripDate] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !departureCity ||
      !destinationCity ||
      !departureDate ||
      !returnDate ||
      !passengers
    ) {
      alert("Please fill in all fields");
      return;
    }

    const searchParams = {
      departureCity,
      destinationCity,
      departureDate,
      returnDate,
      passengers,
    };

    console.log("Search Params:", searchParams);
    // API call for flight search can be added here
  };

  return (
    <div className="rounded-lg md:py-6">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:items-end gap-4"
      >
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
                className="w-full text-black justify-start"
              >
                {departureCity
                  ? allAirportsData.find(
                      (airport) => airport.iata_code === departureCity
                    )?.name
                  : "Select Departure City"}
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
                          setDepartureCity(iata === departureCity ? "" : iata);
                          setOpenDeparture(false);
                        }}
                      >
                        <Check
                          className={`mr-2 h-4 w-4 ${
                            departureCity === airport.iata_code
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
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
                className="w-full text-black justify-start"
              >
                {destinationCity
                  ? allAirportsData.find(
                      (airport) => airport.iata_code === destinationCity
                    )?.name
                  : "Select Destination City"}
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
                          className={`mr-2 h-4 w-4 ${
                            destinationCity === airport.iata_code
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
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
            htmlFor="departureDate"
            className="block text-sm text-start font-medium text-gray-700 mb-2"
          >
            Departure Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal text-black ${
                  !date && "text-black"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Select Departure Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setDepartureDate(format(selectedDate, "yyyy-MM-dd"));
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date */}
        <div className="w-full">
          <Label
            htmlFor="returnDate"
            className="block text-sm text-start font-medium text-gray-700 mb-2"
          >
            Return Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal text-black ${
                  !returnTripDate && "text-black"
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnTripDate ? (
                  format(returnTripDate, "PPP")
                ) : (
                  <span>Select Return Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={returnTripDate}
                onSelect={(selectedDate) => {
                  setReturnTripDate(selectedDate);
                  setReturnDate(format(selectedDate, "yyyy-MM-dd"));
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
            Travellers & Seat Type
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-black w-full justify-start"
              >
                {`${adults + children + infants} & ${seatType}`}
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
                <Select onValueChange={(value) => setSeatType(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Seat Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Economy">Economy</SelectItem>
                      <SelectItem value="Premium Economy">
                        Premium Economy
                      </SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="First Class">First Class</SelectItem>
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
          className="w-[140px] bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Search Flights
        </Button>
      </form>
    </div>
  );
}
