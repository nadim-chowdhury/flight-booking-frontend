"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  Minus,
  Check,
  Trash,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { allAirportsData } from "@/utils/all-airports-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function MultiCitySearch() {
  const [flights, setFlights] = useState([
    { departureCity: "", destinationCity: "", departureDate: null },
  ]);
  const [passengers, setPassengers] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("Economy");

  const handleFlightChange = (index, field, value) => {
    const newFlights = [...flights];
    newFlights[index][field] = value;
    setFlights(newFlights);
  };

  const addFlightSegment = () => {
    setFlights([
      ...flights,
      { departureCity: "", destinationCity: "", departureDate: null },
    ]);
  };

  const removeFlightSegment = (index) => {
    const newFlights = flights.filter((_, i) => i !== index);
    setFlights(newFlights);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const incompleteSegment = flights.some(
      (flight) =>
        !flight.departureCity ||
        !flight.destinationCity ||
        !flight.departureDate
    );
    if (incompleteSegment || !passengers) {
      alert("Please fill in all fields");
      return;
    }

    const searchParams = {
      flights,
      passengers,
      seatType,
    };

    console.log("Search Params:", searchParams);
  };

  return (
    <div className="rounded-lg md:py-6">
      <form onSubmit={handleSearch} className="space-y-4">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="flex flex-col md:items-end md:justify-end md:flex-row gap-4"
          >
            {/* Departure City */}
            <div className="w-full">
              <Label
                htmlFor="departureCity"
                className="block text-sm text-start font-medium text-gray-700 mb-2"
              >
                Departure City
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full text-black justify-start"
                  >
                    {flight.departureCity
                      ? allAirportsData.find(
                          (airport) =>
                            airport.iata_code === flight.departureCity
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
                              handleFlightChange(index, "departureCity", iata);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                flight.departureCity === airport.iata_code
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {airport.name} ({airport.iata_code}) -{" "}
                            {airport.city}
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full text-black justify-start"
                  >
                    {flight.destinationCity
                      ? allAirportsData.find(
                          (airport) =>
                            airport.iata_code === flight.destinationCity
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
                              handleFlightChange(
                                index,
                                "destinationCity",
                                iata
                              );
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                flight.destinationCity === airport.iata_code
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {airport.name} ({airport.iata_code}) -{" "}
                            {airport.city}
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
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal text-black",
                      !flight.departureDate && "text-black"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {flight.departureDate ? (
                      format(flight.departureDate, "PPP")
                    ) : (
                      <span className="font-medium">Pick Departure Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={flight.departureDate}
                    onSelect={(date) =>
                      handleFlightChange(index, "departureDate", date)
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Travellers & Seat Type */}
            {index === 0 && (
              <div className="w-full">
                <Label
                  htmlFor="travellers"
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
                            <SelectItem value="First Class">
                              First Class
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}

            {/* Search Button */}
            {index === 0 && (
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Search Flights
              </Button>
            )}

            {/* Remove Segment Button */}
            {index > 0 && (
              <Button
                type="button"
                onClick={() => removeFlightSegment(index)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash className="w-4 h-4" />
              </Button>
            )}

            {/* Add Segment Button */}
            {index === flights.length - 1 && (
              <Button
                type="button"
                onClick={addFlightSegment}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
