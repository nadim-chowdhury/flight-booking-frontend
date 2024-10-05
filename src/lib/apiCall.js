"use client";

export const apiCall = async (
  url,
  method = "GET",
  body = null,
  token = null, // Optional token for authorization
  customHeaders = {} // Any additional headers passed
) => {
  try {
    // Setup default headers
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    // If token is provided, add it to the Authorization header
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Setup options for the fetch call
    const options = {
      method,
      headers,
    };

    // If there's a body (for POST, PUT, PATCH requests), add it to the options
    if (body) {
      options.body = JSON.stringify(body);
    }

    // Make the API request
    const response = await fetch(url, options);

    // Check if the response status is OK (200-299 range)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }

    // Return the response JSON data (if it exists)
    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};
