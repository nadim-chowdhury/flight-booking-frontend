"use client";

// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useRouter } from "next/navigation";
// import CheckoutForm from "../../components/CheckoutForm";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );

export default function Payment() {
  // const router = useRouter();
  // const { bookingId } = router.query;

  return (
    <div>
      <h1>Complete Your Payment</h1>
      {/* <Elements stripe={stripePromise}> */}
      {/* <CheckoutForm bookingId={bookingId} /> */}
      {/* </Elements> */}
    </div>
  );
}
