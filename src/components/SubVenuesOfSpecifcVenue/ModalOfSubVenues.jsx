import { Grid, Group, Modal, Text, Title } from "@mantine/core";
import React from "react";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import CarouselForModalOfSubVenues from "./CarouselForModalOfSubVenues";
import SpecificSubVenueDetails from "./SpecificSubVenueDetails";

const ModalOfSubVenues = ({
  open,
  setOpen,
  subVenues,
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  eventType,
  setEventType,
  date,
  setDate,
  time,
  setTime,
  guests,
  setGuests,
  venueId,
}) => {
  const [subVenueDetails, setSubVenueDetails] = React.useState({});

  let subVenuesArray = subVenues ? subVenues : [{}];

  return (
    <>
      <Modal
        padding="2%"
        opened={open}
        onClose={() => setOpen(false)}
        fullScreen
        title={<Title order={2}>{subVenueDetails?.subVenueName}</Title>}
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
      >
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
            Venue Type: <b> {subVenueDetails?.subVenueType}</b>
          </Text>
          <Text>
            Guests{" "}
            <b>
              {" "}
              {subVenueDetails?.subVenueMinCapacity} to{" "}
              {subVenueDetails?.subVenueCapacity}
            </b>
          </Text>
        </Group>
        <CarouselForModalOfSubVenues
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
          guests={guests}
          setGuests={setGuests}
          subVenuesArray={subVenuesArray}
          setSubVenueDetails={setSubVenueDetails}
          subVenueDetails={subVenueDetails}
          venueId={venueId}
        />
        {/* </Grid.Col>
         
        </Grid> */}
      </Modal>
    </>
  );
};

export default ModalOfSubVenues;
