"use client";

import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "@/graphql/query";

export default function Reviews({ flightId }) {
  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { flightId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Reviews</h2>
      {data.reviews.length > 0 ? (
        data.reviews.map((review) => (
          <div key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <p>User: {review.user.username}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
