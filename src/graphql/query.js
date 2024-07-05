import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    userProfile {
      id
      username
      email
    }
  }
`;

export const SEARCH_FLIGHTS = gql`
  query SearchFlights($from: String!, $to: String!, $departureDate: String!) {
    searchFlights(from: $from, to: $to, departureDate: $departureDate) {
      id
      airline
      from
      to
      departureTime
      arrivalTime
      duration
      price
    }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query GetUserBookings($userId: ID!) {
    userBookings(userId: $userId) {
      id
      flight {
        id
        airline
        from
        to
        departureTime
        arrivalTime
        duration
      }
      bookingTime
    }
  }
`;

export const GET_PAYMENT_HISTORY = gql`
  query GetPaymentHistory($userId: ID!) {
    paymentHistory(userId: $userId) {
      id
      amount
      currency
      status
      createdAt
    }
  }
`;

export const SEND_NOTIFICATION = gql`
  mutation SendNotification($type: String!, $to: String!, $message: String!) {
    sendNotification(type: $type, to: $to, message: $message) {
      success
      message
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($flightId: ID!) {
    reviews(flightId: $flightId) {
      id
      rating
      comment
      user {
        id
        username
      }
    }
  }
`;

export const GET_DASHBOARD_OVERVIEW = gql`
  query GetDashboardOverview {
    dashboardOverview {
      bookingsCount
      usersCount
      flightsCount
      revenue
    }
  }
`;

export const GET_FLIGHTS = gql`
  query GetFlights {
    flights {
      id
      airline
      from
      to
      departureTime
      arrivalTime
      availableSeats
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      role
    }
  }
`;

export const GET_BOOKINGS = gql`
  query GetBookings {
    bookings {
      id
      flight {
        id
        airline
        from
        to
      }
      user {
        id
        username
      }
      status
      createdAt
    }
  }
`;

export const GET_REPORTS = gql`
  query GetReports {
    reports {
      bookingsCount
      revenue
      userActivity
    }
  }
`;
