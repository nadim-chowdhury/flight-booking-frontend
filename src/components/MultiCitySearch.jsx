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
  MapPin,
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
import { useDispatch, useSelector } from "react-redux";
import { fetchAirports } from "@/lib/fetchAirports";
import { searchFlightsStart } from "@/redux/slices/searchFlightsSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MapboxExample from "./MapBox";

export default function MultiCitySearch() {
  const [flights, setFlights] = useState([
    {
      departureCity: "",
      departureCityFullName: "",
      destinationCity: "",
      destinationCityFullName: "",
      departureDate: null,
    },
  ]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [seatType, setSeatType] = useState("economy");
  const [openPopovers, setOpenPopovers] = useState({});
  const [searchInput, setSearchInput] = useState({});
  const [airportData, setAirportData] = useState({});
  const [loadingAirports, setLoadingAirports] = useState({});
  const [loadingInitialAirports, setLoadingInitialAirports] = useState({});
  const [departureAirportsData, setDepartureAirportsData] = useState([]);
  const [destinationAirportsData, setDestinationAirportsData] = useState([]);
  const [mapModalOpen, setMapModalOpen] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  // const { isLoading, error } = useSelector((state) => state.searchFlights);
  const {
    data: airports,
    loading,
    error,
  } = useSelector((state) => state.airports);

  // Fetch default airports for initial load (both departure and destination)
  useEffect(() => {
    // const defaultKeyword = "airport"; // Default search term for the initial load
    // Fetch Departure Airports
    // fetchAirports(defaultKeyword, setDepartureAirportsData, setLoadingAirports);

    // Fetch Destination Airports
    // fetchAirports(
    //   defaultKeyword,
    //   setDestinationAirportsData,
    //   setLoadingInitialAirports
    // );

    setDepartureAirportsData(airports);
    setDestinationAirportsData(airports);
    // setLoadingAirports(false);
    // setLoadingInitialAirports(false);
  }, [airports]);

  // // Handle Airport Search with Debouncing for each flight segment
  // useEffect(() => {
  //   const debouncedSearch = (index, field) => {
  //     const searchTerm = searchInput[`${index}-${field}`];
  //     if (!searchTerm) return;

  //     // Set loading state for the specific input field
  //     setLoadingAirports((prev) => ({ ...prev, [`${index}-${field}`]: true }));

  //     const fetchAirportsForSearch = async () => {
  //       try {
  //         const res = await fetch(
  //           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/airports?keyword=${searchTerm}`
  //         );
  //         const data = await res.json();
  //         setAirportData((prev) => ({
  //           ...prev,
  //           [`${index}-${field}`]: data?.data || [], // Use correct field structure from API response
  //         }));
  //       } catch (error) {
  //         console.error("Error fetching airports:", error);
  //       } finally {
  //         setLoadingAirports((prev) => ({
  //           ...prev,
  //           [`${index}-${field}`]: false,
  //         }));
  //       }
  //     };

  //     fetchAirportsForSearch();
  //   };

  //   // Debounce delay for each search input
  //   const timeoutId = setTimeout(() => {
  //     Object.keys(searchInput).forEach((key) => {
  //       const [index, field] = key.split("-");
  //       debouncedSearch(index, field);
  //     });
  //   }, 500); // 500ms debounce

  //   return () => clearTimeout(timeoutId);
  // }, [searchInput]); // Re-run effect when searchInput changes

  useEffect(() => {
    const debouncedSearch = (index, field) => {
      const searchTerm = searchInput[`${index}-${field}`];
      if (!searchTerm) return;

      // Set loading state for the specific input field
      setLoadingAirports((prev) => ({ ...prev, [`${index}-${field}`]: true }));

      const fetchAirportsForSearch = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/airports?keyword=${searchTerm}`
          );
          const data = await res.json();

          // Clear previous data and set the new results
          if (data?.data?.length > 0) {
            setAirportData((prev) => ({
              ...prev,
              [`${index}-${field}`]: data?.data || [], // Update the airport data if results are found
            }));
          } else {
            // Clear airport data when no results are found
            setAirportData((prev) => ({
              ...prev,
              [`${index}-${field}`]: [], // Clear the airport data if no results
            }));
          }
        } catch (error) {
          console.error("Error fetching airports:", error);
        } finally {
          setLoadingAirports((prev) => ({
            ...prev,
            [`${index}-${field}`]: false,
          }));
        }
      };

      fetchAirportsForSearch();
    };

    // Debounce delay for each search input
    const timeoutId = setTimeout(() => {
      Object.keys(searchInput).forEach((key) => {
        const [index, field] = key.split("-");
        debouncedSearch(index, field);
      });
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchInput]); // Re-run effect when searchInput changes

  useEffect(() => {
    const flightSegments = [];
    let i = 1;

    while (
      searchParams.get(`flight${i}DepartureCity`) &&
      searchParams.get(`flight${i}DepartureCityFullName`) &&
      searchParams.get(`flight${i}DestinationCity`) &&
      searchParams.get(`flight${i}DestinationCityFullName`) &&
      searchParams.get(`flight${i}DepartureDate`)
    ) {
      const departureCity = searchParams.get(`flight${i}DepartureCity`);
      const departureCityFullName = searchParams.get(
        `flight${i}DepartureCityFullName`
      );
      const destinationCity = searchParams.get(`flight${i}DestinationCity`);
      const destinationCityFullName = searchParams.get(
        `flight${i}DestinationCityFullName`
      );
      const departureDate = searchParams.get(`flight${i}DepartureDate`);

      flightSegments.push({
        departureCity,
        departureCityFullName,
        destinationCity,
        destinationCityFullName,
        departureDate: departureDate,
      });
      i++;
    }

    if (flightSegments.length > 0) {
      setFlights(flightSegments);
    }

    const departureCityParam = searchParams.get("departureCity");
    const departureCityFullNameParam = searchParams.get(
      "departureCityFullName"
    );
    const destinationCityParam = searchParams.get("destinationCity");
    const destinationCityFullNameParam = searchParams.get(
      "destinationCityFullName"
    );
    const departureDateParam = searchParams.get("departureDate");

    if (
      departureCityParam ||
      departureCityFullNameParam ||
      destinationCityParam ||
      destinationCityFullNameParam ||
      departureDateParam
    ) {
      setFlights((prevFlights) => {
        const updatedFlights = [...prevFlights];
        updatedFlights[0] = {
          ...updatedFlights[0],
          departureCity: departureCityParam || updatedFlights[0].departureCity,
          departureCityFullName:
            departureCityFullNameParam ||
            updatedFlights[0].departureCityFullName,
          destinationCity:
            destinationCityParam || updatedFlights[0].destinationCity,
          destinationCityFullName:
            destinationCityFullNameParam ||
            updatedFlights[0].destinationCityFullName,
          departureDate: departureDateParam
            ? departureDateParam
            : updatedFlights[0].departureDate,
        };
        return updatedFlights;
      });
    }

    const adultsParam = parseInt(searchParams.get("adults")) || 1;
    const childrenParam = parseInt(searchParams.get("children")) || 0;
    const infantsParam = parseInt(searchParams.get("infants")) || 0;
    const seatTypeParam = searchParams.get("seatType") || "economy";

    setAdults(adultsParam);
    setChildren(childrenParam);
    setInfants(infantsParam);
    setSeatType(seatTypeParam);
  }, [searchParams]);

  const handleSearchInputChange = (index, field, value) => {
    setSearchInput((prev) => ({ ...prev, [`${index}-${field}`]: value }));
  };

  const handleFlightChange = (index, field, value, fullName = null) => {
    const newFlights = [...flights];
    newFlights[index][field] = value;

    if (fullName) {
      if (field === "departureCity") {
        newFlights[index]["departureCityFullName"] = fullName;
      } else if (field === "destinationCity") {
        newFlights[index]["destinationCityFullName"] = fullName;
      }
    }

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

    dispatch(searchFlightsStart());

    const query = { adults, children, infants, seatType };

    flights.forEach((flight, index) => {
      query[`flight${index + 1}DepartureCity`] = flight.departureCity;
      query[`flight${index + 1}DepartureCityFullName`] =
        flight.departureCityFullName;
      query[`flight${index + 1}DestinationCity`] = flight.destinationCity;
      query[`flight${index + 1}DestinationCityFullName`] =
        flight.destinationCityFullName;
      query[`flight${index + 1}DepartureDate`] = flight.departureDate;
    });

    const queryString = new URLSearchParams(query).toString();
    router.push(`/flights?type=multi-city&${queryString}`);
  };

  return (
    <div className="rounded-lg pt-2 md:pt-6">
      <form onSubmit={handleMultiCitySearch}>
        {flights.map((flight, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex flex-col md:grid md:grid-cols-4 md:grow gap-4">
                {/* Departure City */}
                <div className="w-full">
                  <div className="flex items-center justify-start gap-2 mb-2">
                    <Label
                      htmlFor="departureCity"
                      className="block text-sm text-start font-medium text-slate-700"
                    >
                      Departure City
                    </Label>
                  </div>

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
                          {flight?.departureCityFullName
                            ? `${flight.departureCityFullName} - ${flight.departureCity}`
                            : flight.departureCity
                            ? `${
                                departureAirportsData.find(
                                  (airport) =>
                                    airport.iataCode === flight.departureCity
                                )?.name || "Unknown Airport"
                              } - ${flight.departureCity}`
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
                          {loadingAirports[`${index}-departureCity`] ||
                          loading ? (
                            <CommandEmpty>
                              <span className="loader_wave"></span>
                            </CommandEmpty>
                          ) : airportData[`${index}-departureCity`]?.length >
                            0 ? (
                            <CommandGroup>
                              {airportData[`${index}-departureCity`].map(
                                (airport) => (
                                  <CommandItem
                                    key={airport.id}
                                    value={airport.iataCode}
                                    onSelect={(iataCode) => {
                                      handleFlightChange(
                                        index,
                                        "departureCity",
                                        iataCode,
                                        airport.name
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
                                    {airport.name} ({airport.iataCode}) -{" "}
                                    {airport.address?.cityName}
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          ) : departureAirportsData.length > 0 &&
                            !searchInput[`${index}-departureCity`] ? (
                            <CommandGroup>
                              {departureAirportsData?.map((airport) => (
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
                                    togglePopover(
                                      index,
                                      "departureCity",
                                      false
                                    );
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
                  </div>

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
                          {flight?.destinationCityFullName
                            ? `${flight.destinationCityFullName} - ${flight.destinationCity}`
                            : flight.destinationCity
                            ? `${
                                destinationAirportsData.find(
                                  (airport) =>
                                    airport.iataCode === flight.destinationCity
                                )?.name || "Unknown Airport"
                              } - ${flight.destinationCity}`
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
                          {loadingAirports[`${index}-destinationCity`] ||
                          loading ? (
                            <CommandEmpty>
                              <span className="loader_wave"></span>
                            </CommandEmpty>
                          ) : airportData[`${index}-destinationCity`]?.length >
                            0 ? (
                            <CommandGroup>
                              {airportData[`${index}-destinationCity`].map(
                                (airport) => (
                                  <CommandItem
                                    key={airport.id}
                                    value={airport.iataCode}
                                    onSelect={(iataCode) => {
                                      handleFlightChange(
                                        index,
                                        "destinationCity",
                                        iataCode,
                                        airport.name
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
                                    {airport.name} ({airport.iataCode}) -{" "}
                                    {airport.address?.cityName}
                                  </CommandItem>
                                )
                              )}
                            </CommandGroup>
                          ) : destinationAirportsData.length > 0 &&
                            !searchInput[`${index}-destinationCity`] ? (
                            <CommandGroup>
                              {destinationAirportsData?.map((airport) => (
                                <CommandItem
                                  key={airport?.id}
                                  value={airport?.iataCode}
                                  onSelect={(iataCode) => {
                                    handleFlightChange(
                                      index,
                                      "destinationCity",
                                      iataCode,
                                      airport?.name
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
                          !flights[index]?.departureDate && "text-black/60"
                        )}
                      >
                        {flights[index]?.departureDate ? (
                          typeof flights[index].departureDate === "string" ? (
                            format(
                              parseISO(flights[index].departureDate),
                              "PPP"
                            )
                          ) : (
                            format(flights[index].departureDate, "PPP")
                          )
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
                        selected={
                          // Handle if departureDate is a string or Date object
                          flights[index]?.departureDate
                            ? typeof flights[index].departureDate === "string"
                              ? parseISO(flights[index].departureDate)
                              : flights[index].departureDate
                            : undefined
                        }
                        onSelect={(date) =>
                          handleFlightChange(
                            index,
                            "departureDate",
                            format(date, "yyyy-MM-dd")
                          )
                        }
                        initialFocus
                        disabled={(date) => date < new Date()}
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
                              onClick={() =>
                                setChildren(Math.max(0, children - 1))
                              }
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
                              onClick={() =>
                                setInfants(Math.max(0, infants - 1))
                              }
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
                  className="bg-rose-600/90 hover:bg-rose-600 text-white rounded-full"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}

              {/* Add Segment Button */}
              {index === 0 && (
                <Button
                  type="button"
                  onClick={addFlightSegment}
                  className="bg-slate-800 hover:bg-slate-700 text-white hidden md:block rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}

              {/* Add Segment Button */}
              {index === flights.length - 1 && (
                <Button
                  type="button"
                  onClick={addFlightSegment}
                  className="bg-slate-800 hover:bg-slate-700 text-white rounded-full md:hidden"
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
                  Search Flights
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
            Search Flights
          </Button>
        </div>
      </form>
    </div>
  );
}
