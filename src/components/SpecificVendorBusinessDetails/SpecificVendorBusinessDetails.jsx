import React, { useEffect, useState } from "react";
import {
  Anchor,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Paper,
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
import CarouselOfPackages from "../SpecificVendorPackages/CarouselOfPackages";
import ModalOfPackages from "../SpecificVendorPackages/ModalOfPackages";
import { useParams } from "react-router-dom";
const useStyles = createStyles(() => ({
  stickySThings: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
  },
}));
const SpecificVendorBusinessDetails = () => {
  const params = useParams();
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
  const [vendorDetails, setVendorDetails] = useState({});
  console.log("vendorDetails are", vendorDetails);
  const [open, setOpen] = useState(false);

  const url = `https://a-wep.herokuapp.com/customer/getSpecificVendorBusinessDetails/${params.id}`;
  useEffect(() => {
    if (refresh) {
      // setVisible(true);
      axios.get(url).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("Retrieved Data Is", res.data.data);
          setVendorDetails(res.data.data);

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
        {vendorDetails?.vendorBusinessTitle}
      </Title>
      <Group
        pt="sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Text color="dimmed">{vendorDetails?.city}, Pakistan</Text>
        <Text onClick={() => scrollRef.scrollIntoView()} underline>
          View Map
        </Text>
        <Text underline>Phone Number</Text>
        <Anchor
          // component={Link}

          href="https://www.google.com/"
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
            rating={vendorDetails?.rating ? vendorDetails?.rating : 5}
            ratingCount={
              vendorDetails?.ratingCount ? vendorDetails?.ratingCount : 0
            }
          />
        </Group>
        <Text
          color="dimmed"
          underline
          onClick={() => scrollRef6.scrollIntoView()}
        >
          {vendorDetails?.ratingCount ? vendorDetails?.ratingCount : 0}{" "}
          {vendorDetails?.ratingCount === 1 ? "Review" : "Reviews"}
        </Text>
      </Group>
      <Grid pt="md">
        <Grid.Col lg={9}>
          <Carousal
            images={vendorDetails?.images ? vendorDetails?.images : ["", ""]}
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
          <Grid py="xl">
            <Grid.Col lg={8}>
              <AboutVenue
                targetRef={scrollRef1.targetRef}
                details={
                  vendorDetails?.vendorBusinessDescription
                    ? vendorDetails?.vendorBusinessDescription
                    : ""
                }
                facebook={
                  vendorDetails?.facebookHandle
                    ? vendorDetails?.facebookHandle
                    : ""
                }
                instagram={
                  vendorDetails?.instagramHandle
                    ? vendorDetails?.instagramHandle
                    : ""
                }
              />
            </Grid.Col>
            <Grid.Col lg={4}>
              <Paper
                mt="md"
                withBorder
                style={{
                  width: "100%",
                  height: "100%",
                }}
                p="md"
                radius="md"
              >
                <Text>Highlight</Text>
                <Text py="md" weight="bold">
                  Services
                </Text>
                <Group spacing={3}>
                  {vendorDetails?.providedServices?.map((service, index) => (
                    <Text key={index}>
                      {vendorDetails?.providedServices.length !== index + 1
                        ? service?.serviceTitle + ","
                        : service?.serviceTitle + ""}
                    </Text>
                  ))}
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>

          <Divider />
          <CarouselOfPackages
            targetRef={scrollRef3.targetRef}
            setOpen={setOpen}
            packages={
              vendorDetails?.vendorServicePackages
                ? vendorDetails?.vendorServicePackages
                : [{}]
            }
          />
          <ModalOfPackages
            open={open}
            setOpen={setOpen}
            vendorBusinessPackages={
              vendorDetails?.vendorServicePackages
                ? vendorDetails?.vendorServicePackages
                : [{}]
            }
          />

          <ReviewsOfSpecificVenue
            targetRef={scrollRef6.targetRef}
            flexibility={
              vendorDetails?.flexibility ? vendorDetails?.flexibility : 5
            }
            responseTime={
              vendorDetails?.responseTime ? vendorDetails?.responseTime : 5
            }
            valueForMoney={
              vendorDetails?.valueForMoney ? vendorDetails?.valueForMoney : 5
            }
            qualityOfService={
              vendorDetails?.qualityOfService
                ? vendorDetails?.qualityOfService
                : 5
            }
            professionalism={
              vendorDetails?.professionalism
                ? vendorDetails?.professionalism
                : 5
            }
            rating={vendorDetails?.rating ? vendorDetails?.rating : 5}
            ratingCount={
              vendorDetails?.ratingCount ? vendorDetails?.ratingCount : 0
            }
          />

          <MapComponentView
            targetRef={scrollRef.targetRef}
            pinLocation={
              vendorDetails?.pinLocation
                ? vendorDetails?.pinLocation
                : {
                    lat: 30,
                    lng: 70,
                  }
            }
            address={vendorDetails?.address ? vendorDetails?.address : ""}
            pinGeoLocation={"null"}
          />
        </Grid.Col>
        <Grid.Col lg={3} pl="xl">
          <BookVenueSideColums />
        </Grid.Col>
      </Grid>
      {/* <Text ref={scrollRef.targetRef}>asdsadsa</Text> */}
    </Container>
  );
};

export default SpecificVendorBusinessDetails;
