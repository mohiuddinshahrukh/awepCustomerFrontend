import { Divider, Grid, Group, Paper, Text } from "@mantine/core";
import React, { useEffect } from "react";
import AboutVenue from "../AboutVenue/AboutVenue";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import Carousal from "../Carousal/Carousal";
import InPageNavigation from "../InPageNavigation/InPageNavigation";
import VenueServices from "../VenueServices/VenueServices";
import BookingCharges from "./BookingCharges";

const SpecificSubVenueDetails = ({ subVenue }) => {
  return (
    <Paper px={80}>
      <Carousal images={subVenue?.images} />
    
      <InPageNavigation />
      <Divider mt="xl" />
      <AboutVenue details={subVenue?.subVenueDescription} />
      <VenueServices services={subVenue?.subVenueServices} />
      <Divider mt="xl" />
      <BookingCharges
        charges={subVenue?.subVenueBookingCharges}
        minBooking={subVenue?.subVenueMinCapacity}
      />
    </Paper>
  );
};

export default SpecificSubVenueDetails;
