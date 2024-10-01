"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  Minus,
  Check,
  Trash,
  Search,
} from "lucide-react";
import { cn } from "../lib/utils";
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
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function MultiCitySearch() {
  const [flights, setFlights] = useState([
    { departureCity: "", destinationCity: "", departureDate: null },
  ]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("economy");
  const [openPopovers, setOpenPopovers] = useState({});
  const [searchInput, setSearchInput] = useState({});
  const [loadingAirports, setLoadingAirports] = useState({});
  const [airportData, setAirportData] = useState({});
  // const [searchDepartureAirport, setSearchDepartureAirport] = useState("");
  // const [searchDestinationAirport, setSearchDestinationAirport] = useState("");
  // const [loadingDepartureAirports, setLoadingDepartureAirports] =
  //   useState(false);
  // const [loadingDestinationAirports, setLoadingDestinationAirports] =
  //   useState(false);
  // const [departureAirportsData, setDepartureAirportsData] = useState([]);
  // const [destinationAirportsData, setDestinationAirportsData] = useState([]);
  // const [debouncedSearchDeparture, setDebouncedSearchDeparture] = useState("");
  // const [debouncedSearchDestination, setDebouncedSearchDestination] =
  //   useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchDeparture(searchDepartureAirport);
  //   }, 500);
  //   return () => clearTimeout(handler);
  // }, [searchDepartureAirport]);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchDestination(searchDestinationAirport);
  //   }, 500);
  //   return () => clearTimeout(handler);
  // }, [searchDestinationAirport]);

  useEffect(() => {
    const debouncedSearch = (index, field) => {
      if (!searchInput[`${index}-${field}`]) return;
      setLoadingAirports((prev) => ({ ...prev, [`${index}-${field}`]: true }));

      const fetchAirports = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?search=${
              searchInput[`${index}-${field}`]
            }`
          );
          const data = await res.json();
          setAirportData((prev) => ({
            ...prev,
            [`${index}-${field}`]: data?.airports || [],
          }));
        } catch (error) {
          console.error("Error fetching airports:", error);
        } finally {
          setLoadingAirports((prev) => ({
            ...prev,
            [`${index}-${field}`]: false,
          }));
        }
      };
      fetchAirports();
    };

    // Debounce delay
    const timeoutId = setTimeout(() => {
      Object.keys(searchInput).forEach((key) => {
        const [index, field] = key.split("-");
        debouncedSearch(index, field);
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  // useEffect(() => {
  //   if (!debouncedSearchDeparture) return;
  //   setLoadingDepartureAirports(true);
  //   const fetchDepartureAirports = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?search=${debouncedSearchDeparture}`
  //       );
  //       const data = await res.json();
  //       setDepartureAirportsData(data?.airports || []);
  //     } catch (error) {
  //       console.error("Error fetching departure airports:", error);
  //     } finally {
  //       setLoadingDepartureAirports(false);
  //     }
  //   };
  //   fetchDepartureAirports();
  // }, [debouncedSearchDeparture]);

  // useEffect(() => {
  //   if (!debouncedSearchDestination) return;
  //   setLoadingDestinationAirports(true);
  //   const fetchDestinationAirports = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/airports?search=${debouncedSearchDestination}`
  //       );
  //       const data = await res.json();
  //       setDestinationAirportsData(data?.airports || []);
  //     } catch (error) {
  //       console.error("Error fetching destination airports:", error);
  //     } finally {
  //       setLoadingDestinationAirports(false);
  //     }
  //   };
  //   fetchDestinationAirports();
  // }, [debouncedSearchDestination]);

  useEffect(() => {
    const flightSegments = [];
    let i = 1;
    while (
      searchParams.get(`flight${i}DepartureCity`) &&
      searchParams.get(`flight${i}DestinationCity`) &&
      searchParams.get(`flight${i}DepartureDate`)
    ) {
      const departureCity = searchParams.get(`flight${i}DepartureCity`);
      const destinationCity = searchParams.get(`flight${i}DestinationCity`);
      const departureDate = searchParams.get(`flight${i}DepartureDate`);

      flightSegments.push({
        departureCity,
        destinationCity,
        departureDate: parseISO(departureDate),
      });
      i++;
    }
    if (flightSegments.length > 0) setFlights(flightSegments);

    const adultsParam = parseInt(searchParams.get("adults")) || 1;
    const childrenParam = parseInt(searchParams.get("children")) || 0;
    const infantsParam = parseInt(searchParams.get("infants")) || 0;
    const seatTypeParam = searchParams.get("seatType") || "economy";

    setAdults(adultsParam);
    setChildren(childrenParam);
    setInfants(infantsParam);
    setSeatType(seatTypeParam);
  }, [searchParams]);

  // const handleFlightChange = (index, field, value) => {
  //   const newFlights = [...flights];
  //   newFlights[index][field] = value;
  //   setFlights(newFlights);
  // };

  const handleSearchInputChange = (index, field, value) => {
    setSearchInput((prev) => ({ ...prev, [`${index}-${field}`]: value }));
  };

  // const addFlightSegment = () => {
  //   setFlights([
  //     ...flights,
  //     { departureCity: "", destinationCity: "", departureDate: null },
  //   ]);
  // };

  // const removeFlightSegment = (index) => {
  //   const newFlights = flights.filter((_, i) => i !== index);
  //   setFlights(newFlights);
  // };

  // const togglePopover = (index, field, value) => {
  //   setOpenPopovers((prev) => ({
  //     ...prev,
  //     [`${index}-${field}`]: value,
  //   }));
  // };

  // const handleMultiCitySearch = (e) => {
  //   e.preventDefault();

  //   const incompleteSegment = flights.some(
  //     (flight) =>
  //       !flight.departureCity ||
  //       !flight.destinationCity ||
  //       !flight.departureDate
  //   );
  //   if (incompleteSegment || !adults) {
  //     alert("Please fill in all fields");
  //     return;
  //   }

  //   const query = {
  //     adults,
  //     children,
  //     infants,
  //     seatType,
  //   };

  //   flights.forEach((flight, index) => {
  //     query[`flight${index + 1}DepartureCity`] = flight.departureCity;
  //     query[`flight${index + 1}DestinationCity`] = flight.destinationCity;
  //     query[`flight${index + 1}DepartureDate`] = flight.departureDate;
  //   });

  //   const queryString = new URLSearchParams(query).toString();
  //   router.push(`/flights?type=multi-city&${queryString}`);
  // };

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

  const togglePopover = (index, field, value) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [`${index}-${field}`]: value,
    }));
  };

  const handleMultiCitySearch = (e) => {
    e.preventDefault();

    const incompleteSegment = flights.some(
      (flight) =>
        !flight.departureCity ||
        !flight.destinationCity ||
        !flight.departureDate
    );
    if (incompleteSegment || !adults) {
      alert("Please fill in all fields");
      return;
    }

    const query = {
      adults,
      children,
      infants,
      seatType,
    };

    flights.forEach((flight, index) => {
      query[`flight${index + 1}DepartureCity`] = flight.departureCity;
      query[`flight${index + 1}DestinationCity`] = flight.destinationCity;
      query[`flight${index + 1}DepartureDate`] = flight.departureDate;
    });

    const queryString = new URLSearchParams(query).toString();
    router.push(`/flights?type=multi-city&${queryString}`);
  };

  return (
    <div className="rounded-lg md:pt-6">
      <form onSubmit={handleMultiCitySearch}>
        {flights.map((flight, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex flex-col md:grid md:grid-cols-4 md:grow gap-4">
                {/* Departure City */}
                <div className="w-full">
                  <Label
                    htmlFor="departureCity"
                    className="block text-sm text-start font-medium mb-2 text-slate-700"
                  >
                    Departure City
                  </Label>
                  <Popover
                    open={openPopovers[`${index}-departureCity`] || false}
                    onOpenChange={(open) =>
                      togglePopover(index, "departureCity", open)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full text-black/60 justify-start"
                      >
                        <span className="truncate">
                          {flight?.departureCity
                            ? airportData[`${index}-departureCity`]?.find(
                                (airport) =>
                                  airport.iata === flight?.departureCity
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
                            value={searchInput[`${index}-departureCity`] || ""}
                            onChange={(e) =>
                              handleSearchInputChange(
                                index,
                                "departureCity",
                                e.target.value
                              )
                            }
                            className="w-full border-l rounded-none border-r-0 border-t-0 border-b-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>

                        <CommandList>
                          {loadingAirports[`${index}-departureCity`] ? (
                            <CommandEmpty>Loading...</CommandEmpty>
                          ) : airportData[`${index}-departureCity`]?.length >
                            0 ? (
                            <CommandGroup>
                              {airportData[`${index}-departureCity`].map(
                                (airport) => (
                                  <CommandItem
                                    key={airport.id}
                                    value={airport.iata}
                                    onSelect={(iata) => {
                                      handleFlightChange(
                                        index,
                                        "departureCity",
                                        iata
                                      );
                                      handleSearchInputChange(
                                        index,
                                        "departureCity",
                                        ""
                                      );
                                      togglePopover(
                                        index,
                                        "departureCity",
                                        false
                                      );
                                    }}
                                  >
                                    {airport.name} ({airport.iata}) -{" "}
                                    {airport.city}
                                  </CommandItem>
                                )
                              )}
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
                  <Popover
                    open={openPopovers[`${index}-destinationCity`] || false}
                    onOpenChange={(open) =>
                      togglePopover(index, "destinationCity", open)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full text-black/60 justify-start"
                      >
                        <span className="truncate">
                          {flight?.destinationCity
                            ? airportData[`${index}-destinationCity`]?.find(
                                (airport) =>
                                  airport.iata === flight?.destinationCity
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
                            value={
                              searchInput[`${index}-destinationCity`] || ""
                            }
                            onChange={(e) =>
                              handleSearchInputChange(
                                index,
                                "destinationCity",
                                e.target.value
                              )
                            }
                            className="w-full border-l rounded-none border-r-0 border-t-0 border-b-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </div>

                        <CommandList>
                          {loadingAirports[`${index}-destinationCity`] ? (
                            <CommandEmpty>Loading...</CommandEmpty>
                          ) : airportData[`${index}-destinationCity`]?.length >
                            0 ? (
                            <CommandGroup>
                              {airportData[`${index}-destinationCity`].map(
                                (airport) => (
                                  <CommandItem
                                    key={airport.id}
                                    value={airport.iata}
                                    onSelect={(iata) => {
                                      handleFlightChange(
                                        index,
                                        "destinationCity",
                                        iata
                                      );
                                      handleSearchInputChange(
                                        index,
                                        "destinationCity",
                                        ""
                                      );
                                      togglePopover(
                                        index,
                                        "destinationCity",
                                        false
                                      );
                                    }}
                                  >
                                    {airport.name} ({airport.iata}) -{" "}
                                    {airport.city}
                                  </CommandItem>
                                )
                              )}
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
                          !flight.departureDate && "text-black/60"
                        )}
                      >
                        {flight.departureDate ? (
                          format(flight.departureDate, "PPP")
                        ) : (
                          <>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span className="font-medium">Select Date</span>
                          </>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={flight.departureDate}
                        onSelect={(date) =>
                          handleFlightChange(
                            index,
                            "departureDate",
                            format(date, "yyyy-MM-dd")
                          )
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
                            className="block text-sm text-start font-medium mt-1 text-slate-700"
                          >
                            Children
                          </Label>
                          <div className="flex items-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() =>
                                setChildren(Math.max(0, children - 1))
                              }
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
                            className="block text-sm text-start font-medium mt-1 text-slate-700"
                          >
                            Infants
                          </Label>
                          <div className="flex items-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() =>
                                setInfants(Math.max(0, infants - 1))
                              }
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
                                <SelectItem value="business">
                                  Business
                                </SelectItem>
                                <SelectItem value="first-class">
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
              </div>

              {/* Separator */}
              {index === 0 && flights.length > 1 && (
                <Separator className="mt-1 bg-sky-400 h-1 rounded-full md:hidden" />
              )}

              {/* Remove Segment Button */}
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeFlightSegment(index)}
                  className="bg-rose-600/90 hover:bg-rose-600 text-white"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}

              {/* Add Segment Button */}
              {index === 0 && (
                <Button
                  type="button"
                  onClick={addFlightSegment}
                  className="bg-slate-800 hover:bg-slate-700 text-white rounded-md hidden md:block"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}

              {/* Add Segment Button */}
              {index === flights.length - 1 && (
                <Button
                  type="button"
                  onClick={addFlightSegment}
                  className="bg-slate-800 hover:bg-slate-700 text-white rounded-md md:hidden"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}

              {/* Search Button */}
              {index === flights.length - 1 && (
                <Button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white rounded-md md:hidden"
                >
                  Search flights
                </Button>
              )}
            </div>
          </div>
        ))}

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
