// IMPORTS
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinktree,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
} from "@tabler/icons";
import React from "react";

// import MapComponentView from "../mapGoogle/MapComponentView";
// import ViewReviewCard from "./ViewReviewCard";

const ViewVenueModal = ({ viewModal, venueData, setViewModal, subVenues }) => {
  return (
    <Modal
      styles={{
        close: {
          color: "black",
          backgroundColor: "#EAEAEA",
          borderRadius: "50%",
          "&:hover": {
            transition: "50ms",
            color: "white",
            backgroundColor: "red",
          },
        },
      }}
      opened={viewModal}
      onClose={() => setViewModal(!viewModal)}
      size="60%"
      radius="md"
      title={<Title>Venue Details</Title>}
      centered
    >
      <Paper
        p="xl"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Card shadow="sm" p="lg" radius="md">
          <Card.Section>
            <Carousel
              withIndicators
              height={300}
              slideSize="50%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={3}
              breakpoints={[
                { maxWidth: "md", slideSize: "50%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
              ]}
            >
              {venueData?.images?.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image src={image} height={280} alt="Venue Image" />
                </Carousel.Slide>
              ))}
              {venueData?.videos?.map((video, index) => (
                <Carousel.Slide key={index}>
                  <video src={video} height={280} controls />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card.Section>
          <Grid>
            <Grid.Col lg={12}>
              <Group position="apart">
                <Title order={2} weight={500}>
                  {venueData?.venueName}
                </Title>
              </Group>

              {venueData?.venueOwnerId ? (
                <Text size="lg">
                  <b>Venue Owner:</b> {venueData?.venueOwnerId?.name}
                </Text>
              ) : (
                <Text size="lg">
                  <b>Venue Owner Was Deleted</b>
                </Text>
              )}
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col>
              <Text size="lg">
                <b>Address:</b> {venueData?.venueAddress},{" "}
                {venueData?.venueCity}
              </Text>
            </Grid.Col>
            {/*<Grid.Col>
              <MapComponentView
                pinLocation={venueData?.pinLocation}
                pinGeoLocation={venueData?.venueAddress}
              />
            </Grid.Col>*/}

            <Grid.Col md={12} lg={12}>
              <Text size="lg">{venueData?.venueDescription}</Text>
            </Grid.Col>
            <Grid.Col md={12} lg={6}>
              <Text size="lg">
                <b>Capacity:</b> {venueData?.venueCapacity}
              </Text>
            </Grid.Col>

            <Grid.Col md={12} lg={6}>
              <Text size="lg">
                <IconPhone size={18} /> <b>Primary Contact:</b>{" "}
                {venueData?.venuePhone}
              </Text>

              <Text size="lg">
                <IconMail size={18} />
                <b> Primary Email:</b>{" "}
                <a href={"mailto:" + venueData?.venueEmail} target="_blank">
                  {venueData?.venueEmail}
                </a>
              </Text>
              <Text size="lg">
                <IconMail size={18} /> <b> Feedback Email:</b>{" "}
                <a href={"mailto:" + venueData?.feedbackEmail} target="_blank">
                  {venueData?.feedbackEmail}
                </a>
              </Text>
              <Text size="lg">
                <IconMail size={18} />
                <b> Complaint Email:</b>{" "}
                <a href={"mailto:" + venueData?.complaintEmail} target="_blank">
                  {venueData?.complaintEmail}
                </a>
              </Text>
              <Text size="lg">
                <IconBrandWhatsapp size={18} />
                <b> WhatsApp:</b> {venueData?.venueWhatsapp}
              </Text>
              {venueData?.facebookHandle?.length !== 0 ? (
                <Text size="lg">
                  <IconBrandFacebook size={18} />
                  <b> Facebook:</b>{" "}
                  <a href={venueData?.facebookHandle} target="_blank">
                    {venueData?.facebookHandle}
                  </a>
                </Text>
              ) : null}
              {venueData?.instagramHandle?.length !== 0 ? (
                <Text size="lg">
                  <IconBrandInstagram size={18} />
                  <b> Instagram:</b>
                  <a href={venueData?.instagramHandle} target="_blank">
                    {venueData?.instagramHandle}
                  </a>
                </Text>
              ) : null}
              {venueData?.websiteHandle?.length !== 0 ? (
                <Text size="lg">
                  <IconBrandLinktree size={18} /> <b>Website:</b>{" "}
                  <a href={venueData?.websiteHandle} target="_blank">
                    {venueData?.websiteHandle}
                  </a>
                </Text>
              ) : null}
            </Grid.Col>
            <Divider />
            {/*<Grid.Col>
              <ViewReviewCard
                venueServices={venueData?.providedVenueServices}
                venueID={venueData?._id}
                subVenues={subVenues}
              />
            </Grid.Col>*/}
          </Grid>
          {/* <Grid justify="center">
      <Grid.Col>
        <Button
          size="md"
          // fullWidth
          variant="filled"
          color="dark"
          type="submit"
          // disabled={disabled}
          // loading={loading}
          rightIcon={<X />}
          // onClick={registerVenue}
        >
          Close
        </Button>
      </Grid.Col>
    </Grid> */}
        </Card>
      </Paper>
    </Modal>
  );
};

export default ViewVenueModal;
