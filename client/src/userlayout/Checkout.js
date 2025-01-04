import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const { mode } = useSelector((state) => state.auth);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const stripePromise = loadStripe('pk_test_51MtGm0GaYMqjC0SJRu8BneBx94emS6cVIWsLFwE7cww3AsWNSsNRmBfmqDdrKhJRdeacx0ubuvJGnenmFyzv7jXA005Dgaht4u');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setMessage("Stripe is not properly loaded.");
      setLoading(false);
      return;
    }

    const { data } = await axios.post("http://localhost:5000/create-payment-intent", {
      amount: 4000, // Amount in cents ($40)
    });

    const clientSecret = data.clientSecret;

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Payment Successful!");
    }

    setLoading(false);
  };

  return (
    <Elements stripe={stripePromise}>
    <div className={`min-h-screen pt-20 ${mode === "dark" ? 'bg-darkfg' : 'bg-lightbg'} flex justify-center items-center`}>
      <div className={`max-w-6xl w-full ${mode === "dark" ? 'bg-darkbg text-lightgray' : 'bg-lightfg text-darkufg'} shadow-lg rounded-lg p-6`}>
        <h2 className="text-xl font-semibold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            className={`p-3 border rounded-md ${mode === "dark" ? 'bg-darkfg text-lightfg' : 'bg-lightbg text-darkfg'}`}
            options={{
              style: {
                base: {
                  color: mode === "dark" ? "#fff" : "#000",
                  fontSize: "16px",
                  "::placeholder": { color: mode === "dark" ? "#aaa" : "#555" },
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-emerald-500 text-white py-2 rounded-md"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
    </Elements>
  );
};

export default Checkout;
