"use client";

import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { SEARCH_FLIGHTS } from "../graphql/query";
import OneWaySearch from "./OneWaySearch";
import ReturnSearch from "./ReturnSearch";
import MultiCitySearch from "./MultiCitySearch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function FlightSearch({ onFlightsFound }) {
  const { register, handleSubmit } = useForm();
  const [searchFlights, { data, loading, error }] =
    useLazyQuery(SEARCH_FLIGHTS);

  const onSubmit = async (formData) => {
    const { from, to, departureDate } = formData;
    await searchFlights({
      variables: {
        from,
        to,
        departureDate: format(new Date(departureDate), "yyyy-MM-dd"),
      },
    });
  };

  useEffect(() => {
    if (data) {
      onFlightsFound(data.searchFlights);
    }
  }, [data, onFlightsFound]);

  return (
    <div className="bg-white p-6 rounded-lg border">
      <Tabs defaultValue="oneway">
        <div className="flex items-start md:justify-start justify-center w-full">
          <TabsList className="bg-red-600 text-white p-2 h-11">
            <TabsTrigger value="oneway">One Way</TabsTrigger>
            <TabsTrigger value="return">Round Trip</TabsTrigger>
            <TabsTrigger value="multicity">Multi City</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="oneway">
          <OneWaySearch />
        </TabsContent>
        <TabsContent value="return">
          <ReturnSearch />
        </TabsContent>
        <TabsContent value="multicity">
          <MultiCitySearch />
        </TabsContent>
      </Tabs>
    </div>
  );
}
