import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import "./StripePayment.css";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LZZvfE15s0GgNMhr1G5APbmPXyGbm10KdljXh7FWBA9QvUtisLvRVN6SAswoq2M1D6v5f0hTi484tqZDs50P8Rq00pU0tq3QQ"
);

const StripePromise = ({
  amountPayable,
  setPaidSuccessfully,
  paidSuccessfully,
  onClickBack,
  setConfirmBooking,
  start,
}) => {
  console.log("INSIDE STRIPE_PROMISE");

  const [clientSecret, setClientSecret] = useState("");

  const stripeCallBackend = async () => {
    // Create PaymentIntent as soon as the page loads
    let data = await axios.post(
      "https://a-wep.herokuapp.com/payment/create-payment-intent",
      { items: amountPayable }
    );
    console.log("Data gotten: ", data);
    console.log(data.data.clientSecret);
    setClientSecret(data.data.clientSecret);
  };
  useEffect(() => {
    stripeCallBackend();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            paidSuccessfully={paidSuccessfully}
            setPaidSuccessfully={setPaidSuccessfully}
            amountPayable={amountPayable}
            onClickBack={onClickBack}
            setConfirmBooking={setConfirmBooking}
            start={start}
          />
        </Elements>
      )}
    </div>
  );
};
export default StripePromise;
