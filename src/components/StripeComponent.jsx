import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function StripeComponent({ setStripeToken }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Step 1: Collect payment method using Stripe
    if (!stripe || !elements) {
      setError("Stripe has not been properly initialized.");
      setLoading(false);
      return;
    }

    // Create a payment method using the CardElement
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
      return;
    } else if (paymentMethod.id) {
      setMessage(
        `Payment Successfull id is: ${paymentMethod.id} Now you can confirm your payment.`
      );
    }

    // Set the Stripe token using the parent component's method
    setStripeToken(paymentMethod.id);

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Input Section */}
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <CardElement
          className="p-2"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 rounded-lg transition duration-200 text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-sky-600 hover:bg-sky-700"
        }`}
      >
        {loading ? "Processing..." : "Submit Payment"}
      </button>

      {message && (
        <p className="font-medium text-sm text-green-600">{message}</p>
      )}
    </form>
  );
}
