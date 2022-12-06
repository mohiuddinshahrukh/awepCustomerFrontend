import React, { useEffect, useState } from "react";
import {
  Anchor,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import axios from "axios";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import CustomButton from "../CustomButton/CustomButton";
import RatingStars from "../RatingStars/RatingStars";
import Carousal from "../Carousal/Carousal";
import AboutVenue from "../AboutVenue/AboutVenue";
import ReviewsOfSpecificVenue from "../ReviewsOfSpecificVenue/ReviewsOfSpecificVenue";
import MapComponentView from "../MapViewComponent/MapComponentView";
import CarouselOfPackages from "../SpecificVendorPackages/CarouselOfPackages";
import ModalOfPackages from "../SpecificVendorPackages/ModalOfPackages";
import { useParams } from "react-router-dom";
import { IconMessageCircle, IconSettings } from "@tabler/icons";
import BookVenueSideColumnsForVendor from "../BookVenueSideColums/BookVenueSideColumnsForVendor";
import SignIn from "../userProfiling/SignIn";
import SignUp from "../userProfiling/SignUp";
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

  const [refresh, setRefresh] = useState(true);
  const [vendorDetails, setVendorDetails] = useState({});
  const [vendorFeedbacks, setVendorFeedbacks] = useState([]);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState(params.date ? new Date(params.date) : null);
  const [time, setTime] = useState(params.time ? params.time : "");
  const [guests, setGuests] = useState();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [idOfSpecificVendorPackage, setIdOfSpecificVendorPackage] =
    useState("");
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

  const url1 = `https://a-wep.herokuapp.com/customer/getVendorFeedbacks/${params.id}`;

  useEffect(() => {
    if (refresh) {
      // setVisible(true);
      axios.get(url1).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("Retrieved Reviews are", res.data.data);
          setVendorFeedbacks(res.data.data);

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
      {/*<BreadCrumbs />*/}
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
        <Modal opened={isSignIn} onClose={() => setIsSignIn(false)} fullScreen>
          <SignIn
            closeModal={true}
            setIsSignIn={setIsSignIn}
            setIsSignUp={setIsSignUp}
          />
        </Modal>
        <Modal opened={isSignUp} onClose={() => setIsSignUp(false)} fullScreen>
          <SignUp
            closeModal={true}
            setIsSignUp={setIsSignUp}
            setIsSignIn={setIsSignIn}
          />
        </Modal>
        <Text color="dimmed">{vendorDetails?.city}, Pakistan</Text>
        <Text underline>View Map</Text>
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
        <Group spacing={0}>
          <RatingStars
            rating={vendorDetails?.rating ? vendorDetails?.rating : 5}
            ratingCount={
              vendorDetails?.ratingCount ? vendorDetails?.ratingCount : 0
            }
          />
        </Group>
        <Text color="dimmed" underline>
          {vendorDetails?.ratingCount ? vendorDetails?.ratingCount : 0}{" "}
          {vendorDetails?.ratingCount === 1 ? "Review" : "Reviews"}
        </Text>
      </Group>
      <Grid pt="md">
        <Grid.Col lg={9}>
          <Carousal
            images={vendorDetails?.images ? vendorDetails?.images : ["", ""]}
          />
          <Tabs defaultValue="About" py="xl" color="grape" keepMounted={false}>
            <Paper className={classes.stickySThings}>
              <Tabs.List py="md">
                <Tabs.Tab icon={<IconMessageCircle size={14} />} value="About">
                  About
                </Tabs.Tab>
                <Tabs.Tab icon={<IconSettings size={14} />} value="Packages">
                  Services
                </Tabs.Tab>

                <Tabs.Tab icon={<IconSettings size={14} />} value="Reviews">
                  Reviews
                </Tabs.Tab>
                <Tabs.Tab icon={<IconSettings size={14} />} value="Map">
                  Map
                </Tabs.Tab>
              </Tabs.List>
            </Paper>

            <Tabs.Panel value="About">
              <Grid py="xl">
                <Grid.Col lg={8}>
                  <AboutVenue
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
                      {vendorDetails?.providedServices?.map(
                        (service, index) => (
                          <Text key={index}>
                            {vendorDetails?.providedServices.length !==
                            index + 1
                              ? service?.serviceTitle + ","
                              : service?.serviceTitle + ""}
                          </Text>
                        )
                      )}
                    </Group>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
            <Tabs.Panel value="Packages">
              <CarouselOfPackages
                setOpen={setOpen}
                packages={
                  vendorDetails?.vendorServicePackages
                    ? vendorDetails?.vendorServicePackages
                    : [{}]
                }
                idOfSpecificVendorPackage={idOfSpecificVendorPackage}
                setIdOfSpecificVendorPackage={setIdOfSpecificVendorPackage}
              />
            </Tabs.Panel>

            <Tabs.Panel value="Reviews">
              <ReviewsOfSpecificVenue
                flexibility={
                  vendorDetails?.flexibility ? vendorDetails?.flexibility : 5
                }
                responseTime={
                  vendorDetails?.responseTime ? vendorDetails?.responseTime : 5
                }
                valueForMoney={
                  vendorDetails?.valueForMoney
                    ? vendorDetails?.valueForMoney
                    : 5
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
            </Tabs.Panel>
            <Tabs.Panel value="Map">
              <MapComponentView
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
            </Tabs.Panel>
          </Tabs>

          <Divider mt="xl" />

          <ModalOfPackages
            open={open}
            setOpen={setOpen}
            vendorBusinessPackages={
              vendorDetails?.vendorServicePackages
                ? vendorDetails?.vendorServicePackages
                : [{}]
            }
            contactPhone={contactPhone}
            setContactPhone={setContactPhone}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            eventType={eventType}
            setEventType={setEventType}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            setIsSignIn={setIsSignIn}
            setIsSignUp={setIsSignUp}
            vendorId={params.id}
            idOfSpecificVendorPackage={idOfSpecificVendorPackage}
          />
        </Grid.Col>
        <Grid.Col lg={3} pl="xl">
          <BookVenueSideColumnsForVendor
            onClickFunction={() => {
              console.log("onClickFunction111");
              setOpen(true);
            }}
            contactPhone={contactPhone}
            setContactPhone={setContactPhone}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            eventType={eventType}
            setEventType={setEventType}
            date={date}
            setDate={setDate}
            time={time}
            setTime={setTime}
            vendorId={params.id}
            isSignIn={isSignIn}
            setIsSignIn={setIsSignIn}
          />
        </Grid.Col>
      </Grid>{" "}
    </Container>
  );
};

export default SpecificVendorBusinessDetails;
