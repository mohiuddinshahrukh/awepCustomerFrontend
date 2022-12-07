import React, { useEffect, useState } from "react";
import {
  Anchor,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  Modal,
  Button,
  Paper,
  Tabs,
  Text,
  Skeleton,
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
import {
  IconMap2,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconVideo,
} from "@tabler/icons";
import BookVenueSideColumnsForVendor from "../BookVenueSideColums/BookVenueSideColumnsForVendor";
import SignIn from "../userProfiling/SignIn";
import SignUp from "../userProfiling/SignUp";
import Carousal_Images from "../Carousal/Carousal";
import Carousal_Videos from "../Carousal/Carousal_videos";
import { useMediaQuery } from "@mantine/hooks";
const useStyles = createStyles(() => ({
  stickySThings: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
  },
}));
const SpecificVendorBusinessDetails = () => {
  const matches = useMediaQuery("(min-width: 1200px)");
  const params = useParams();
  const { classes } = useStyles();

  const [refresh, setRefresh] = useState(true);
  const [vendorDetails, setVendorDetails] = useState({});
  const [vendorFeedbacks, setVendorFeedbacks] = useState([]);
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [eventType, setEventType] = useState("");
  const [ date, setDate] = useState(params.date ? new Date(params.date) : null);
  const [time, setTime] = useState(params.time ? params.time : "");
  const [guests, setGuests] = useState();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [idOfSpecificVendorPackage, setIdOfSpecificVendorPackage] =
    useState("");
  const [openBookNow, setOpenBookNow] = useState(false);
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
        <Modal opened={openBookNow} onClose={() => setOpenBookNow(false)}>
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
        </Modal>

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
      </Group>
      <Group
        pt="sm"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Anchor
          href={`https://maps.google.com/?q=${vendorDetails?.pinLocation?.lat},${vendorDetails?.pinLocation?.lng}`}
          target="_blank"
          color="dimmed"
        >
          <Group>
            <IconMap2 />
            {vendorDetails ? (
              <Text color="dimmed">
                {`${vendorDetails?.address?.concat(":") || ""} ${
                  vendorDetails?.city?.toUpperCase()
                    ? vendorDetails?.city?.toUpperCase()?.concat(", Pakistan")
                    : ""
                }`}
              </Text>
            ) : (
              <Skeleton height={8} mt={6} radius="xl" />
            )}
          </Group>
        </Anchor>
      </Group>
      <Grid pt="md">
        <Grid.Col lg={9}>
          <Grid.Col
            m={0}
            p={0}
            style={{
              position: "relative",
            }}
          >
            {!matches && (
              <Button
                className="button"
                onClick={() => setOpenBookNow(true)}
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  zIndex: 10,
                }}
              >
                Book Now
              </Button>
            )}
            <Tabs
              color={"pink"}
              defaultValue={"photos"}
              keepMounted={false}
              variant="pills"
              // styles={{}}
              // classNames={{
              //   tabsList: {},
              // }}
            >
              <Tabs.List>
                <Tabs.Tab value="photos" icon={<IconPhoto size={14} />}>
                  Photos
                </Tabs.Tab>

                <Tabs.Tab
                  value="videos"
                  icon={<IconVideo size={14} />}
                  hidden={
                    vendorDetails?.videos?.length === 0 ||
                    vendorDetails?.videos == undefined
                  }
                >
                  Videos
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel
                value="videos"
                pt="xs"
                hidden={
                  vendorDetails?.videos?.length === 0 ||
                  vendorDetails?.videos === undefined
                }
              >
                <Carousal_Videos videos={vendorDetails?.videos} />
              </Tabs.Panel>

              <Tabs.Panel value="photos" pt="xs">
                <Carousal_Images images={vendorDetails?.images} />
              </Tabs.Panel>
              {console.log("char images", vendorDetails)}
            </Tabs>
          </Grid.Col>
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
          <Tabs defaultValue="About" py="xl" color="pink" keepMounted={false}>
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
