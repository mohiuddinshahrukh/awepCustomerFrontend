import React, { useEffect, useState } from "react";
import {
  Anchor,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";

import axios from "axios";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CustomButton from "../CustomButton/CustomButton";
import RatingStars from "../RatingStars/RatingStars";
import Carousal from "../Carousal/Carousal";
import InPageNavigation from "../InPageNavigation/InPageNavigation";
import AboutVenue from "../AboutVenue/AboutVenue";
import VenueServices from "../VenueServices/VenueServices";
import CarouselOfSubVenues from "../SubVenuesOfSpecifcVenue/CarouselOfSubVenues";
import MenusOfSpecificVenue from "../MenusOfSpecifcVenue/MenusOfSpecificVenue";
import ReviewsOfSpecificVenue from "../ReviewsOfSpecificVenue/ReviewsOfSpecificVenue";
import MapComponentView from "../MapViewComponent/MapComponentView";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import ModalOfSubVenues from "../SubVenuesOfSpecifcVenue/ModalOfSubVenues";
import { useParams } from "react-router-dom";
import CarouselOfThemes from "../ThemesOfSpecificVenue/CarouselOfThemes";
const useStyles = createStyles(() => ({
  stickySThings: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
  },
}));
const SpecificVenueDetails = () => {
  let params = useParams();
  console.log("Route Params: ", params);
  const { classes } = useStyles();

  const scrollRef = useScrollIntoView({});
  const scrollRef1 = useScrollIntoView({});
  const scrollRef2 = useScrollIntoView({});
  const scrollRef3 = useScrollIntoView({});
  const scrollRef4 = useScrollIntoView({});
  const scrollRef5 = useScrollIntoView({});
  const scrollRef6 = useScrollIntoView({});
  console.log("scrollRef", scrollRef);
  const [refresh, setRefresh] = useState(true);
  const [venueDetails, setVenueDetails] = useState({});
  const [venueFeedbacks, setVenueFeedbacks] = useState([]);
  console.log("venueFeedbacks", venueFeedbacks);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState();
  console.log("venueDetails are", venueDetails);
  const [open, setOpen] = useState(false);
  const url = `https://a-wep.herokuapp.com/customer/getSpecificVenueDetails/${params.id}`;
  useEffect(() => {
    if (refresh) {
      // setVisible(true);
      axios.get(url).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("Retrieved Data Is", res.data.data);
          setVenueDetails(res.data.data);

          setRefresh(false);
        } else {
          console.log("Errored Data Is", res.data);
          setRefresh(false);
        }
      });
    }
  }, [refresh]);

  const url1 = `https://a-wep.herokuapp.com/customer/getVenueFeedbacks/63492169c5ba3ae82a864418`;
  useEffect(() => {
    if (refresh) {
      // setVisible(true);
      axios.get(url1).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("Retrieved Reviews are", res.data.data);
          setVenueFeedbacks(res.data.data);

          setRefresh(false);
        } else {
          console.log("Errored Data Is", res.data);
          setRefresh(false);
        }
      });
    }
  }, [refresh]);

  return (
    <Container size="xl">
      <BreadCrumbs />
      <Title pt="md" order={3}>
        {venueDetails?.venueName}
      </Title>
      <Group
        pt="sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text color="dimmed">{venueDetails?.venueCity}, Pakistan</Text>
        <Text onClick={() => scrollRef.scrollIntoView()} underline>
          View Map
        </Text>
        <Text underline>Phone Number</Text>
        <Anchor
          // component={Link}

          href={venueDetails?.websiteHandle}
          color="dark"
          underline
        >
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
        <Group spacing={0}>
          <RatingStars
            rating={venueDetails?.rating ? venueDetails?.rating : 5}
            ratingCount={
              venueDetails?.ratingCount ? venueDetails?.ratingCount : 0
            }
          />
        </Group>
        <Text
          color="dimmed"
          underline
          onClick={() => scrollRef6.scrollIntoView()}
        >
          {venueDetails?.ratingCount ? venueDetails?.ratingCount : 0}{" "}
          {venueDetails?.ratingCount === 1 ? "Review" : "Reviews"}
        </Text>
        <Text>
          Menus From{" "}
          <b>
            Rs.{" "}
            {Math.min.apply(
              Math,
              venueDetails?.menus?.map((e) => e.price)
            )}
          </b>
        </Text>
        <Text>
          Guests {""}
          <b>
            {Math.min.apply(
              Math,
              venueDetails?.subVenues?.map((e) => e.subVenueMinCapacity)
            )}
          </b>{" "}
          to{" "}
          <b>
            {Math.max.apply(
              Math,
              venueDetails?.subVenues?.map((e) => e.subVenueCapacity)
            )}
          </b>
        </Text>
      </Group>
      <Grid pt="md">
        <Grid.Col lg={9}>
          <Carousal
            images={venueDetails?.images ? venueDetails?.images : ["", ""]}
          />
          <InPageNavigation
            scrollRef={scrollRef}
            scrollRef1={scrollRef1}
            scrollRef2={scrollRef2}
            scrollRef3={scrollRef3}
            scrollRef4={scrollRef4}
            scrollRef5={scrollRef5}
            scrollRef6={scrollRef6}
          />
          <Divider mt="xl" />
          <AboutVenue
            targetRef={scrollRef1.targetRef}
            details={
              venueDetails?.venueDescription
                ? venueDetails?.venueDescription
                : ""
            }
            venueName={venueDetails?.venueName ? venueDetails?.venueName : ""}
            facebook={
              venueDetails?.facebookHandle ? venueDetails?.facebookHandle : ""
            }
            instagram={
              venueDetails?.instagramHandle ? venueDetails?.instagramHandle : ""
            }
            website={
              venueDetails?.websiteHandle ? venueDetails?.websiteHandle : ""
            }
          />
          <VenueServices
            targetRef={scrollRef2.targetRef}
            services={
              venueDetails?.providedVenueServices
                ? venueDetails?.providedVenueServices
                : []
            }
          />
          <Divider mt="xl" />
          <CarouselOfSubVenues
            targetRef={scrollRef3.targetRef}
            setOpen={setOpen}
            subVenues={venueDetails?.subVenues ? venueDetails?.subVenues : [{}]}
          />
          <ModalOfSubVenues
            contactPhone={contactPhone}
            setContactPhone={setContactPhone}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            guests={guests}
            setGuests={setGuests}
            open={open}
            setOpen={setOpen}
            subVenues={venueDetails?.subVenues ? venueDetails?.subVenues : [{}]}
          />

          <MenusOfSpecificVenue
            targetRef={scrollRef4.targetRef}
            menus={venueDetails?.menus ? venueDetails?.menus : [{}]}
          />
          <CarouselOfThemes
            themes={venueDetails?.themes ? venueDetails?.themes : [{}]}
          />
          <ReviewsOfSpecificVenue
            targetRef={scrollRef6.targetRef}
            flexibility={
              venueDetails?.flexibility ? venueDetails?.flexibility : 5
            }
            responseTime={
              venueDetails?.responseTime ? venueDetails?.responseTime : 5
            }
            valueForMoney={
              venueDetails?.valueForMoney ? venueDetails?.valueForMoney : 5
            }
            qualityOfService={
              venueDetails?.qualityOfService
                ? venueDetails?.qualityOfService
                : 5
            }
            professionalism={
              venueDetails?.professionalism ? venueDetails?.professionalism : 5
            }
            rating={venueDetails?.rating ? venueDetails?.rating : 5}
            ratingCount={
              venueDetails?.ratingCount ? venueDetails?.ratingCount : 0
            }
            reviews={venueFeedbacks ? venueFeedbacks : [{}]}
          />

          <MapComponentView
            targetRef={scrollRef.targetRef}
            pinLocation={
              venueDetails?.pinLocation
                ? venueDetails?.pinLocation
                : {
                    lat: 30,
                    lng: 70,
                  }
            }
            address={
              venueDetails?.venueAddress ? venueDetails?.venueAddress : ""
            }
            pinGeoLocation={"null"}
          />
        </Grid.Col>
        <Grid.Col lg={3} pl="xl">
          <BookVenueSideColums
            contactPhone={contactPhone}
            setContactPhone={setContactPhone}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            guests={guests}
            setGuests={setGuests}
          />
        </Grid.Col>
      </Grid>
      {/* <Text ref={scrollRef.targetRef}>asdsadsa</Text> */}
    </Container>
  );
};

export default SpecificVenueDetails;
