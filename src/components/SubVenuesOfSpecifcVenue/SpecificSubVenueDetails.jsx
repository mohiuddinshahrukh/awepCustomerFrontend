import { Divider, Grid, Group, Paper, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import AboutVenue from "../AboutVenue/AboutVenue";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import Carousal from "../Carousal/Carousal";
import InPageNavigation from "../InPageNavigation/InPageNavigation";
import VenueServices from "../VenueServices/VenueServices";
import BookingCharges from "./BookingCharges";

const SpecificSubVenueDetails = ({ subVenue }) => {
  console.log("SUBVENUE hai ye haha", subVenue);
  return (
    <Paper >
      <Carousal images={subVenue?.images} />
      <Title pt="md" order={2}>
        {subVenue?.subVenueName}
      </Title>

      <Text color="dimmed" pt="md">
        Islamabad, Pakistan
      </Text>

      <Group
        mb="xl"
        spacing="md"
        //   pt="sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text>
          Venue Type: <b> {subVenue?.subVenueType}</b>
        </Text>
        <Text>
          Guests{" "}
          <b>
            {" "}
            {subVenue?.subVenueMinCapacity} to {subVenue?.subVenueCapacity}
          </b>
        </Text>
      </Group>

      {/* <InPageNavigation /> */}
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
