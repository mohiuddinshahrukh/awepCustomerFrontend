import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Grid, Group, LoadingOverlay, Paper } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons";

export default function CheckoutForm({
  amountPayable,
  setPaidSuccessfully,
  paidSuccessfully,
  onClickBack,
  // setConfirmBooking,
  start,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [paid, setPaid] = useState(paidSuccessfully);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);

    let response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
      },
      redirect: "if_required",
    });

    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    console.log("API CALL RESPONSE1", response);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (response.error) {
      if (
        response?.error?.type === "card_error" ||
        response?.error?.type === "validation_error"
      ) {
        setMessage(response?.error?.message);
      } else {
        console.log("hhahahahahaha");
        setMessage("An unexpected error occurred.");
      }
    } else {
      showNotification({
        title: "SUCCESS",
        message: `YOUR PAYMENT OF ${response.paymentIntent.amount} has successfully been paid`,
        color: "green",
      });
      setPaidSuccessfully(true);
      setPaid(true);
      // setConfirmBooking(true);
      start();
    }
    setIsLoading(false);
  };

  return (
    <Paper
      shadow="md"
      withBorder
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <form
        style={{
          position: "relative",
          // width: "30vw",
          // minWidth: " 500px",
          alignSelf: "center",
          // boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 4px",
          borderRadius: "7px",
          padding: "20px",
          height: "100%",
        }}
        className="form"
        id="payment-form"
      >
        <LoadingOverlay visible={isLoading} />
        <PaymentElement id="payment-element" />
        {!paid ? (
          <Grid>
            <Grid.Col xs={6}>
              <Button
                leftIcon={<IconArrowLeft />}
                color="red"
                fullWidth
                // m="md"
                style={{
                  marginTop: "10px",
                  // background: "#5469d4",
                  borderRadius: "4px",
                  border: 0,
                  // padding: "12px 16px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  // display: "block",
                  transition: "all 0.2s ease",
                  boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
                  width: "100%",
                }}
                onClick={onClickBack}
              >
                <span id="button-text">BACK</span>
              </Button>
            </Grid.Col>
            <Grid.Col xs={6}>
              <Button
                color="#ffffff"
                fullWidth
                // m="md"
                style={{
                  marginTop: "10px",
                  background: "#5469d4",
                  borderRadius: "4px",
                  border: 0,
                  // padding: "12px 16px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  // display: "block",
                  transition: "all 0.2s ease",
                  boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
                  width: "100%",
                }}
                onClick={handleSubmit}
              >
                <span id="button-text">
                  {isLoading ? (
                    <div className="spinner" id="spinner"></div>
                  ) : (
                    `${amountPayable} PAY NOW`
                  )}
                </span>
              </Button>
            </Grid.Col>
          </Grid>
        ) : (
          <button
            style={{
              marginTop: "10px",
              background: "gray",
              color: "#ffffff",
              borderRadius: "4px",
              border: 0,
              padding: "12px 16px",
              fontSize: "16px",
              fontWeight: 600,
              display: "block",
              transition: "all 0.2s ease",
              boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
              width: "100%",
            }}
            disabled
            onClick={handleSubmit}
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                `${amountPayable} PAID`
              )}
            </span>
          </button>
        )}
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Paper>
  );
}
