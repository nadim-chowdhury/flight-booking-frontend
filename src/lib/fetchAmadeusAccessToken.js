export const fetchAmadeusAccessToken = async () => {
  try {
    const res = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_AMADEUS_CLIENT_SECRET,
        }),
      }
    );
    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to fetch Amadeus access token:", error);
  }
};
