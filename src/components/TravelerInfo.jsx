"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TravelerInfo({
  travelerType,
  travelerId,
  setPassengerData,
}) {
  const [travelerDetails, setTravelerDetails] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiry: "",
    cabin: "ECONOMY",
    fareBasis: "",
    includedCheckedBags: 1,
  });
  const [searchPax, setSearchPax] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchedTravellers, setSearchedTravellers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const token = useSelector((state) => state.user.token);
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
  const formattedSixMonthsFromNow = format(sixMonthsFromNow, "yyyy-MM-dd");

  // Debounce search term with useEffect and useState
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchPax);
    }, 500); // Adjust delay as needed (500 ms)

    // Clear timeout if user types within the delay
    return () => clearTimeout(handler);
  }, [searchPax]);

  useEffect(() => {
    const searchPassenger = async (searchTerm) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/passenger/search?name=${searchTerm}&passportNumber=${searchTerm}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Search failed");

        const searchResult = await response.json();

        setSearchedTravellers(searchResult);

        // if (searchResult && searchResult.length > 0) {
        //   setTravelerDetails({
        //     ...travelerDetails,
        //     ...searchResult[0],
        //   });
        // }
      } catch (err) {
        console.error("Error fetching passenger:", err.message);
      } finally {
        setOpen(true);
      }
    };

    if (debouncedSearchTerm) {
      searchPassenger(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "searchPax") {
      setSearchPax(value);
    } else if (
      name === "passportExpiry" &&
      new Date(value) < sixMonthsFromNow
    ) {
      return;
    } else {
      setTravelerDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setPassengerData(travelerDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelerDetails]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="mt-6 bg-slate-50 border rounded-lg p-4">
      <div className="flex flex-col gap-2 md:flex-row items-center justify-between pb-2 mb-4 border-b">
        <h4 className="font-semibold text-lg text-slate-800 w-full">
          {travelerType} Information - {travelerId}
        </h4>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full md:w-2/3 justify-between"
            >
              {value
                ? `${travelerDetails.firstName} ${travelerDetails.lastName}`
                : "Search passenger"}
              {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
              {/* 
              <input
                type="text"
                name="searchPax"
                placeholder="Search Passenger by Name or Passport"
                value={searchPax}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              /> */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <div className="flex items-center border-b">
                <Search className="h-4 w-4 mx-3" />
                <Input
                  type="text"
                  name="searchPax"
                  placeholder="Search by Name or Passport"
                  value={searchPax}
                  onChange={handleInputChange}
                  className="w-full border-l rounded-none border-r-0 border-t-0 border-b-0 focus:ring-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              {/* <CommandInput
                placeholder="Search passenger"
                type="text"
                name="searchPax"
                // placeholder="Search Passenger by Name or Passport"
                value={searchPax}
                onChange={handleInputChange}
                // className="w-full border rounded-lg p-2"
              /> */}
              <CommandList>
                <CommandEmpty>No passenger found.</CommandEmpty>
                <CommandGroup>
                  {searchedTravellers.map((data) => (
                    <CommandItem
                      key={data.value}
                      value={data.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setTravelerDetails({
                          ...travelerDetails,
                          title: data.title,
                          firstName: data.firstName,
                          lastName: data.lastName,
                          dateOfBirth: formatDate(data.dateOfBirth), // Format date of birth
                          passportNumber: data.passportNumber || "", // Check for passport number
                          passportExpiry: formatDate(data.passportExpiry || ""),
                        });
                        setOpen(false);
                      }}
                    >
                      {/* <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === data.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      /> */}
                      ({data.passportNumber}) {data.firstName} {data.lastName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Traveler Info Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <select
            name="title"
            value={travelerDetails.title}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">{travelerDetails.title || "Select Title"}</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={travelerDetails.dateOfBirth}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="mb-4">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={travelerDetails.firstName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={travelerDetails.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>

      {/* Passport Details (Only for Adults) */}
      {travelerType === "ADULT" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block mb-2">Passport Number</label>
            <input
              type="text"
              name="passportNumber"
              value={travelerDetails.passportNumber}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Passport Expiry</label>
            <input
              type="date"
              name="passportExpiry"
              value={travelerDetails.passportExpiry}
              onChange={handleInputChange}
              min={formattedSixMonthsFromNow}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
      )}

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="mb-4">
          <label className="block mb-2">Cabin Class</label>
          <select
            name="cabin"
            value={travelerDetails.cabin}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Included Checked Bags</label>
          <input
            type="number"
            name="includedCheckedBags"
            value={travelerDetails.includedCheckedBags}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
      </div>
    </div>
  );
}
