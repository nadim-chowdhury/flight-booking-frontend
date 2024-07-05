import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Payment() {
  const router = useRouter();
  const { bookingId } = router.query;

  return (
    <div>
      <h1>Complete Your Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm bookingId={bookingId} />
      </Elements>
    </div>
  );
}
