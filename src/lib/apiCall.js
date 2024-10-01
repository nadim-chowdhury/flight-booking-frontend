// Utility for making API requests
export const apiCall = async (
  url,
  method = "GET",
  body = null,
  headers = {}
) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Example usage:
// apiCall('/api/airlines', 'GET')
// apiCall('/api/bookings', 'POST', { flightId: 1 })
