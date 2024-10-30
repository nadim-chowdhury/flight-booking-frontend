"use client";

import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

export default function MapBox() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8,
    width: "100%",
    height: "400px",
  });
  const [airports, setAirports] = useState([]);

  // Load airport data from localStorage only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const allAirportsDataMain = localStorage.getItem("allAirportsDataMain");
      if (allAirportsDataMain) {
        setAirports(JSON.parse(allAirportsDataMain));
      }
    }
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      style={{ width: "100%", height: "400px" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onMove={(event) => setViewport(event.viewState)}
    >
      {airports.map((airport, index) => (
        <Marker
          key={index}
          latitude={airport?.latitude}
          longitude={airport?.longitude}
        >
          <div style={{ color: "blue" }}>✈️</div>
        </Marker>
      ))}
    </ReactMapGL>
  );
}
