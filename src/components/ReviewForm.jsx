import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";

export default function ReviewForm({ flightId, onReviewSubmitted }) {
  const { register, handleSubmit } = useForm();
  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW);

  const onSubmit = async (formData) => {
    const { rating, comment } = formData;
    try {
      const response = await createReview({
        variables: { flightId, rating: parseInt(rating), comment },
      });
      onReviewSubmitted(response.data.createReview);
    } catch (error) {
      console.error("Review submission error:", error);
    }
  };

  return (
    <div>
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            {...register("rating")}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label>Comment:</label>
          <textarea {...register("comment")} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}
