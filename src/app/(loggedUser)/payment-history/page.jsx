"use client";

// import { useQuery } from "@apollo/client";
// import { useRouter } from "next/navigation";
// import { GET_PAYMENT_HISTORY } from "../../graphql/query";

export default function PaymentHistory({ userId }) {
  // const { data, loading, error } = useQuery(GET_PAYMENT_HISTORY, {
  //   variables: { userId },
  // });

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Payment History</h2>
      {/* {data.paymentHistory.map((payment) => (
        <div key={payment.id}>
          <p>
            Amount: {payment.amount} {payment.currency}
          </p>
          <p>Status: {payment.status}</p>
          <p>Date: {new Date(payment.createdAt).toLocaleString()}</p>
        </div>
      ))} */}
    </div>
  );
}
