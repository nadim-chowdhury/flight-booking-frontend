"use client";

import { useQuery } from "@apollo/client";
import { GET_DASHBOARD_OVERVIEW } from "../graphql/query";
import { mocksAdminDashboardData } from "../utils/demoData";

export default function Dashboard() {
  const { data, loading, error } = useQuery(GET_DASHBOARD_OVERVIEW);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const { bookingsCount, usersCount, flightsCount, revenue } =
    mocksAdminDashboardData.dashboardOverview;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h3>Overview</h3>
        <p>Bookings: {bookingsCount}</p>
        <p>Users: {usersCount}</p>
        <p>Flights: {flightsCount}</p>
        <p>Revenue: ${revenue}</p>
      </div>
    </div>
  );
}
