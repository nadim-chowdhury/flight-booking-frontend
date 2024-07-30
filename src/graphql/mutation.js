import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($username: String!, $email: String!) {
    updateUserProfile(username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

export const UPLOAD_PROFILE_PICTURE = gql`
  mutation UploadProfilePicture($file: Upload!) {
    uploadProfilePicture(file: $file) {
      url
    }
  }
`;

export const BOOK_FLIGHT = gql`
  mutation BookFlight($flightId: ID!, $userId: ID!) {
    bookFlight(flightId: $flightId, userId: $userId) {
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
      user {
        id
        username
      }
      bookingTime
    }
  }
`;

export const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($bookingId: ID!) {
    createPaymentIntent(bookingId: $bookingId) {
      clientSecret
    }
  }
`;

export const SAVE_PAYMENT = gql`
  mutation SavePayment($bookingId: ID!, $paymentIntentId: String!) {
    savePayment(bookingId: $bookingId, paymentIntentId: $paymentIntentId) {
      id
      booking {
        id
        flight {
          airline
          from
          to
        }
      }
      amount
      currency
      status
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($flightId: ID!, $rating: Int!, $comment: String!) {
    createReview(flightId: $flightId, rating: $rating, comment: $comment) {
      id
      flightId
      rating
      comment
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_FLIGHT = gql`
  mutation CreateFlight($input: FlightInput!) {
    createFlight(input: $input) {
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

export const UPDATE_FLIGHT = gql`
  mutation UpdateFlight($id: ID!, $input: FlightInput!) {
    updateFlight(id: $id, input: $input) {
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

export const DELETE_FLIGHT = gql`
  mutation DeleteFlight($id: ID!) {
    deleteFlight(id: $id) {
      success
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($id: ID!, $role: String!) {
    updateUserRole(id: $id, role: $role) {
      id
      username
      email
      role
    }
  }
`;

export const UPDATE_BOOKING_STATUS = gql`
  mutation UpdateBookingStatus($id: ID!, $status: String!) {
    updateBookingStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;