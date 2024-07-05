import { useRouter } from "next/router";
import { useState } from "react";
import ReviewForm from "../../components/ReviewForm";
import Reviews from "../../components/Reviews";

export default function FlightDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmitted = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <div>
      <h1>Flight Details</h1>
      <p>Flight ID: {id}</p>
      {/* Render flight details here */}
      <ReviewForm flightId={id} onReviewSubmitted={handleReviewSubmitted} />
      <Reviews flightId={id} reviews={reviews} />
    </div>
  );
}
