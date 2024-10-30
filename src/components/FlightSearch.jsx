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
import { useRouter, useSearchParams } from "next/navigation";

export default function FlightSearch({ onFlightsFound }) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="p-6">
      <Tabs defaultValue={type || "one-way"}>
        <div className="flex items-start md:justify-start w-full">
          <TabsList className="bg-rose-600/90 text-white p-2 h-11 w-full sm:w-auto">
            <TabsTrigger value="one-way">One Way</TabsTrigger>
            <TabsTrigger value="return-trip">Return Trip</TabsTrigger>
            <TabsTrigger value="multi-city">Multi City</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="one-way">
          <OneWaySearch />
        </TabsContent>
        <TabsContent value="return-trip">
          <ReturnSearch />
        </TabsContent>
        <TabsContent value="multi-city">
          <MultiCitySearch />
        </TabsContent>
      </Tabs>
    </div>
  );
}
