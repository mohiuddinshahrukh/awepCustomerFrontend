import React, { useState } from "react";
import {
  Anchor,
  Container,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
// import axios from "axios";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CustomButton from "../CustomButton/CustomButton";
import RatingStars from "../RatingStars/RatingStars";
import Carousal from "../Carousal/Carousal";
import InPageNavigation from "../InPageNavigation/InPageNavigation";
import AboutVenue from "../AboutVenue/AboutVenue";
import VenueServices from "../VenueServices/VenueServices";
import CarouselOfSubVenues from "../SubVenuesOfSpecifcVenue/CarouselOfSubVenues";
import ModalOfSubVenues from "../SubVenuesOfSpecifcVenue/ModalOfSubVenues";
import MenusOfSpecificVenue from "../MenusOfSpecifcVenue/MenusOfSpecificVenue";
import CarouselOfThemes from "../ThemesOfSpecificVenue/CarouselOfThemes";
import ReviewsOfSpecificVenue from "../ReviewsOfSpecificVenue/ReviewsOfSpecificVenue";
// import MapComponentView from "../MapComponent/MapComponentView";

const SpecificVenueDetails = () => {
  // const [refresh, setRefresh] = useState(true);
  // const [venueDetails, setVenueDetails] = useState();
  const [open, setOpen] = useState(false);
  // let venueId = "";
  // const url =
  //   "https://a-wep.herokuapp.com/customer/getSpecificVenueDetails" + venueId;
  // useEffect(() => {
  //   if (refresh) {
  //     // setVisible(true);
  //     axios.get(url).then((res) => {
  //       console.log(res.data);
  //       if (res.data.status === "success") {
  //         console.log("Retrieved Data Is", res.data.data);
  //         setVenueDetails(res.data.data);

  //         setRefresh(false);
  //       } else {
  //         console.log("Errored Data Is", res.data);
  //         setRefresh(false);
  //       }
  //     });
  //   }
  // }, [refresh]);

  return (
    <Container size="xl">
      <BreadCrumbs />
      <Title pt="md" order={3}>
        Venue Name
      </Title>
      <Group
        pt="sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text color="dimmed">Islamabad, Pakistan</Text>
        <Anchor href="" color="dark" underline>
          View Map
        </Anchor>
        <Anchor href="" color="dark" underline>
          Phone Number
        </Anchor>
        <Anchor href="" color="dark" underline>
          Visit Website
        </Anchor>
      </Group>
      <Group
        spacing="md"
        pt="sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CustomButton title="Book Now" />
        <RatingStars rating={4} />
        <Text color="dimmed" underline>
          33 Reviews
        </Text>
        <Text>
          Menus From <b>Rs. 1600</b>
        </Text>
        <Text>
          Guests <b>250 to 600</b>
        </Text>
      </Group>
      <Grid pt="md">
        <Grid.Col lg={9}>
          <Carousal />
          <InPageNavigation />
          <Divider mt="xl" />
          <AboutVenue />
          <VenueServices />
          <Divider mt="xl" />
          <CarouselOfSubVenues setOpen={setOpen} />
          <ModalOfSubVenues setOpen={setOpen} open={open} />
          <MenusOfSpecificVenue />
          <CarouselOfThemes />
          <ReviewsOfSpecificVenue rating={5} />
          {/* <MapComponentView
            pinLocation={{ lat: 33.6844, lng: 73.0479 }}
            pinGeoLocation={"null"}
          /> */}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SpecificVenueDetails;
