"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_FLIGHTS } from "@/graphql/query";
import { format } from "date-fns";
import OneWaySearch from "./OneWaySearch";
import ReturnSearch from "./ReturnSearch";
import MultiCitySearch from "./MultiCitySearch";

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <OneWaySearch />
      <ReturnSearch />
      <MultiCitySearch />
    </div>
  );
}
