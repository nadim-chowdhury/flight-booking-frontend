// Utility function to get unique airports by iataCode
export const getUniqueAirports = (airports) => {
  const seen = new Set();
  return airports.filter((airport) => {
    const isDuplicate = seen.has(airport.iataCode);
    seen.add(airport.iataCode);
    return !isDuplicate;
  });
};
