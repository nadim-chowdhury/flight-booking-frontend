export const mocksBookingList = [
  {
    bookings: [
      {
        id: "1",
        flight: {
          airline: "Airline A",
          from: "City A",
          to: "City B",
        },
        user: {
          username: "user1",
        },
        status: "confirmed",
      },
      {
        id: "2",
        flight: {
          airline: "Airline B",
          from: "City C",
          to: "City D",
        },
        user: {
          username: "user2",
        },
        status: "cancelled",
      },
    ],
  },
  {
    request: {
      query: UPDATE_BOOKING_STATUS,
      variables: {
        id: "1",
        status: "cancelled",
      },
    },
    result: {
      data: {
        updateBookingStatus: {
          id: "1",
          status: "cancelled",
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_BOOKING_STATUS,
      variables: {
        id: "2",
        status: "confirmed",
      },
    },
    result: {
      data: {
        updateBookingStatus: {
          id: "2",
          status: "confirmed",
        },
      },
    },
  },
];

export const mocksAdminDashboardData = {
  dashboardOverview: {
    bookingsCount: 150,
    usersCount: 50,
    flightsCount: 20,
    revenue: 10000,
  },
};

export const FlightListDemo = [
  {
    id: "1",
    airline: "Airways A",
    from: "New York",
    to: "London",
    departureTime: "2024-08-01T10:00:00Z",
    arrivalTime: "2024-08-01T20:00:00Z",
    duration: "8h",
    price: 500,
  },
  {
    id: "2",
    airline: "Airways B",
    from: "Los Angeles",
    to: "Tokyo",
    departureTime: "2024-08-02T15:00:00Z",
    arrivalTime: "2024-08-03T05:00:00Z",
    duration: "12h",
    price: 700,
  },
];
