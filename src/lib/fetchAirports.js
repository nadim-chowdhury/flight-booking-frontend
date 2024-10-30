// export const fetchAirports = async (
//   searchTerm,
//   setAirportData,
//   setLoading,
//   endpoint // This is "airports" or "airlines", etc.
// ) => {
//   setLoading(true);
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/aviation-edge/${endpoint}?search=${searchTerm}&offset=0&limit=10&order=ASC`
//     );

//     if (!res.ok) {
//       throw new Error(`API request failed with status ${res.status}`);
//     }

//     const data = await res.json();
//     setAirportData(data?.data || []); // Adjust based on your backend's response format
//   } catch (error) {
//     console.error(`Failed to fetch data from ${endpoint}:`, error);
//   } finally {
//     setLoading(false);
//   }
// };

import { getUniqueAirports } from "./getUniqueAirports";

export const fetchAirports = async (
  searchTerm,
  setAirportData,
  setLoading = null // Default value is null if no function is passed
) => {
  if (setLoading) {
    setLoading(true); // Call setLoading only if it's provided
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/airports?keyword=${searchTerm}`
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    setAirportData(getUniqueAirports(data?.data) || []);
  } catch (error) {
    console.error("Failed to fetch airports:", error);
  } finally {
    if (setLoading) {
      setLoading(false); // Call setLoading only if it's provided
    }
  }
};

export const fetchAllAirports = async (
  searchTerm,
  setAirportData,
  setLoading = null // Default value is null if no function is passed
) => {
  if (setLoading) {
    setLoading(true); // Call setLoading only if it's provided
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/all-airports?keyword=${searchTerm}`
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    setAirportData(getUniqueAirports(data?.data) || []);
  } catch (error) {
    console.error("Failed to fetch airports:", error);
  } finally {
    if (setLoading) {
      setLoading(false); // Call setLoading only if it's provided
    }
  }
};
