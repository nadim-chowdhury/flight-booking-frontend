"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import { CREATE_PAYMENT_INTENT, SAVE_PAYMENT } from "../graphql/mutation";

export default function CheckoutForm({ bookingId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [savePayment] = useMutation(SAVE_PAYMENT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data } = await createPaymentIntent({ variables: { bookingId } });
      const clientSecret = data.createPaymentIntent.clientSecret;

      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        setError(`Payment failed: ${paymentResult.error.message}`);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        await savePayment({
          variables: {
            bookingId,
            paymentIntentId: paymentResult.paymentIntent.id,
          },
        });
        alert("Payment successful!");
      }
    } catch (error) {
      setError(`Payment failed: ${error.message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}
