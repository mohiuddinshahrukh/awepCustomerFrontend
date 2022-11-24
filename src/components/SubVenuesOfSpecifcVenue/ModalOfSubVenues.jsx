import { Carousel } from "@mantine/carousel";
import { Container, Grid, Group, Modal, Text, Title } from "@mantine/core";
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
  setIsSignIn,
  idOfSpecificSubVenue,
}) => {
  const [subVenueDetails, setSubVenueDetails] = React.useState({});

  // let subVenuesArray = subVenues ? subVenues : [{}];
  let subVenue = subVenues.filter((e) => e._id === idOfSpecificSubVenue)[0];
  console.log("SUBVENUE hai ye", subVenue);

  return (
    <Modal
      padding="2%"
      opened={open}
      onClose={() => setOpen(false)}
      fullScreen
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
      <Container size="xl">
        <Grid>
          <Grid.Col lg={9} pl="xl">
            {/* <Carousel
              withIndicators
              // height={800}
              slideSize="100%"
              nextControlIcon={<IconArrowRight size={25} />}
              previousControlIcon={<IconArrowLeft size={25} />}
              onSlideChange={(event) => {
                console.log("CAROUSEL", setIndex(event));
                setSubVenueDetails(subVenuesArray2[event]);
              }}
              slideGap={2}
              controlSize={50}
              breakpoints={[
                { maxWidth: "md", slideSize: "100%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
              ]}
              //   loop
              align="start"
            >
              {slides}
            </Carousel> */}
            <SpecificSubVenueDetails subVenue={subVenue} />
          </Grid.Col>
          <Grid.Col lg={3} pl="xl">
            <BookVenueSideColums
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
              subVenue={subVenue}
              venueId={venueId}
              setIsSignIn={setIsSignIn}
            />
          </Grid.Col>
        </Grid>
        {/* <CarouselForModalOfSubVenues
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
          setIsSignIn={setIsSignIn}
        /> */}
        {/* </Grid.Col>
         
        </Grid> */}
      </Container>
    </Modal>
  );
};

export default ModalOfSubVenues;
