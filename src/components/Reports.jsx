"use client";

import { useQuery } from "@apollo/client";
import { GET_REPORTS } from "@/graphql/query";
import { mocksAdminReportsData } from "@/utils/demoData";

export default function Reports() {
  const { data, loading, error } = useQuery(GET_REPORTS);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const { bookingsCount, revenue, userActivity } =
    mocksAdminReportsData.reports;

  return (
    <div>
      <h2>Reports and Analytics</h2>
      <div>
        <p>Bookings Count: {bookingsCount}</p>
        <p>Revenue: ${revenue}</p>
        <p>User Activity: {userActivity}</p>
      </div>
    </div>
  );
}
