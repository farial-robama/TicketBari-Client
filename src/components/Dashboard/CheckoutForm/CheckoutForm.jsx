import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ booking, clientSecret, setShowPayment, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    setIsProcessing(true);
    setCardError("");

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
          },
        }
      );

      if (error) {
        console.error("Payment error", error);
        setCardError(error.message);
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          bookingId: booking._id,
          transactionId: paymentIntent.id,
          amount: booking.totalPrice,
          ticketTitle: booking.ticketTitle,
        };

        await axiosSecure.post("/payments", paymentData);
        toast.success("Payment successful!");
        setShowPayment(false);
        refetch();
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("Payment failed. Please try again.");
      setCardError("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-4 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 transition">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                  fontFamily: "system-ui, -apple-system, sans-serif",
                },
                invalid: { color: "#9e2146", iconColor: "#9e2146" },
              },
            }}
            onChange={handleCardChange}
          ></CardElement>
        </div>
        {cardError && <p className="text-red-600 text-sm mt-2">{cardError}</p>}
      </div>
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg hover:from-green-700 hover:to-green-800 transition duration-200 font-bold text-lg shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:opacity-60 transform hover:-translate-y-0.5"
      >
        {isProcessing ? (
          <span>
            <svg></svg>
            Processing...
          </span>
        ) : (
          `Pay $${booking.totalPrice}`
        )}
      </button>
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p>Test Card Details:</p>
        <div>
          <p>
            Card: <span className="font-semibold">4242 4242 4242 4242</span>
          </p>
          <p>Expiry: Any future date (e.g., 12/34)</p>
          <p>CVC: Any 3 digits (e.g., 123)</p>
          <p>ZIP: Any 5 digits (e.g., 12345)</p>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
