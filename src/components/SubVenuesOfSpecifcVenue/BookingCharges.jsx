import { Text } from "@mantine/core";
import React from "react";

const BookingCharges = () => {
  return (
    <div>
      <Text weight="bold" size="lg" py="lg">
        Booking Charges
      </Text>
      <Text>
        <b>Rs. 2500</b> Will Be Charges additional if Number of Guests are Less
        Than <b>200</b>
      </Text>
    </div>
  );
};

export default BookingCharges;
