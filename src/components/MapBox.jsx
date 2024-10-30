"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxExample = () => {
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const allAirportsDataMain = localStorage.getItem("allAirportsDataMain");
      if (allAirportsDataMain) {
        const parsedData = JSON.parse(allAirportsDataMain);

        // Convert latitude and longitude to numbers
        const formattedData = parsedData.map((airport) => ({
          ...airport,
          latitude: parseFloat(airport.latitude),
          longitude: parseFloat(airport.longitude),
        }));

        setAirports(formattedData);
        setFilteredAirports(formattedData); // Set initial filtered list
      }
    }
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom: 9,
      });

      // Update visible airports based on map bounds
      mapRef.current.on("move", () => {
        const bounds = mapRef.current.getBounds();
        const visibleAirports = airports.filter((airport) =>
          bounds.contains([airport.longitude, airport.latitude])
        );
        setFilteredAirports(visibleAirports);
      });
    }
  }, [airports]);

  useEffect(() => {
    // Remove existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add new markers for filtered airports
    filteredAirports.forEach((airport) => {
      const el = document.createElement("div");
      el.className = "airport-marker";
      el.style.cursor = "pointer";
      el.style.color = "blue";
      el.innerHTML = "✈️ " + airport.name;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([airport.longitude, airport.latitude])
        .addTo(mapRef.current);

      el.addEventListener("click", () => {
        setSelectedAirport(airport);
      });

      markersRef.current.push(marker);
    });
  }, [filteredAirports]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const matchingAirports = airports.filter((airport) =>
        airport.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredAirports(matchingAirports);
    } else {
      setFilteredAirports(airports); // Reset to all airports if search is cleared
    }
  };

  return (
    <div className="mt-4">
      {/* Search input for filtering airports */}
      <input
        type="text"
        placeholder="Search for an airport..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", width: "100%" }}
        className="border px-4 py-2"
      />

      <div ref={mapContainerRef} style={{ width: "100%", height: "360px" }} />

      {selectedAirport && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <h3>Selected Airport</h3>
          <p>Name: {selectedAirport.name}</p>
          <p>
            Location: {selectedAirport.city}, {selectedAirport.country}
          </p>
          <p>
            Coordinates: {selectedAirport.latitude}, {selectedAirport.longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapboxExample;
