import { Text } from "@mantine/core";
import React from "react";

const BookingCharges = ({ charges, minBooking }) => {
  return (
    <div>
      <Text weight="bold" size="lg" py="lg">
        Booking Charges
      </Text>
      <Text>
        <b>Rs. {charges}</b> Will Be Charges additional if Number of Guests are
        Less Than <b>{minBooking}</b>
      </Text>
    </div>
  );
};

export default BookingCharges;
