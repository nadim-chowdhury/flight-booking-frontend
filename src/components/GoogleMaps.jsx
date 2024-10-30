import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function GoogleMaps() {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={10}
      />
    </LoadScript>
  );
}
