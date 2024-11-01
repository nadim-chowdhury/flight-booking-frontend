"use client";

import { useEffect, useRef } from "react";
import { setLocalStorageAirports } from "@/redux/slices/localStorageAirportsSlice";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const MapboxExample = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const dispatch = useDispatch();
  const allAirports = useSelector((state) => state.localStorageAirports.data);
  console.log("MapboxExample ~ allAirports:", allAirports);

  useEffect(() => {
    const loadAirportsData = () => {
      const allAirportsDataMain = localStorage.getItem("allAirportsDataMain");
      if (allAirportsDataMain) {
        const parsedData = JSON.parse(allAirportsDataMain);
        dispatch(setLocalStorageAirports(parsedData));
      }
    };
    loadAirportsData();
  }, [dispatch]);

  useEffect(() => {
    if (map.current) return;

    const updateMarkers = () => {
      if (!map.current || !allAirports) return;

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      const bounds = map.current.getBounds();

      // Log bounds and all airports for debugging
      console.log("Map Bounds:", bounds);
      console.log("All Airports Data:", allAirports);

      // Filter airports within the map bounds
      const visibleAirports = allAirports.filter((airport) => {
        const lat = parseFloat(airport.latitude);
        const lng = parseFloat(airport.longitude);
        return bounds.contains([lng, lat]);
      });

      console.log("Visible Airports:", visibleAirports);

      visibleAirports.forEach((airport) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          `${airport.name} - ${airport.city}, ${airport.country}`
        );

        const marker = new mapboxgl.Marker({ color: "blue" })
          .setLngLat([
            parseFloat(airport.longitude),
            parseFloat(airport.latitude),
          ])
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current.push(marker);
      });
    };

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40],
      zoom: 6, // Increased initial zoom to show markers
    });

    map.current.on("moveend", updateMarkers);
  }, [allAirports]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100%", height: "420px" }} />
    </div>
  );
};

export default MapboxExample;
