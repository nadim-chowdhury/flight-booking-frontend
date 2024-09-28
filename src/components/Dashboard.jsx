"use client";

import { useQuery } from "@apollo/client";
// import { GET_DASHBOARD_OVERVIEW } from "../graphql/query";
import { mocksAdminDashboardData } from "../utils/demoData";

export default function Dashboard() {
  // const { data, loading, error } = useQuery(GET_DASHBOARD_OVERVIEW);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const { bookingsCount, usersCount, flightsCount, revenue } =
    mocksAdminDashboardData.dashboardOverview;

  return (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-sky-50 border rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-700">Bookings</h3>
          <p className="text-4xl font-bold text-blue-600">{bookingsCount}</p>
        </div>

        <div className="bg-sky-50 border rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-700">Users</h3>
          <p className="text-4xl font-bold text-blue-600">{usersCount}</p>
        </div>

        <div className="bg-sky-50 border rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-700">Flights</h3>
          <p className="text-4xl font-bold text-blue-600">{flightsCount}</p>
        </div>

        <div className="bg-sky-50 border rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-700">Revenue</h3>
          <p className="text-4xl font-bold text-blue-600">${revenue}</p>
        </div>
      </div>
    </div>
  );
}
