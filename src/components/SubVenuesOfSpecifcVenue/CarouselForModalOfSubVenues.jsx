import { Carousel } from "@mantine/carousel";
import { Grid, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import React, { Children, useRef } from "react";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import SpecificSubVenueDetails from "./SpecificSubVenueDetails";
const CarouselForModalOfSubVenues = ({
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  date,
  setDate,
  time,
  setTime,
  guests,
  setGuests,
  subVenuesArray,
  setSubVenueDetails,
  venueId,
}) => {
  const [subVenueData, setSubVenueData] = React.useState({});
  const [index, setIndex] = React.useState(0);
  // const ref = useRef();
  console.log("INDEX", index);
  let subVenuesArray2 = subVenuesArray ? subVenuesArray : [{}];
  const slides = subVenuesArray2.map((subVenue, index) => (
    <Carousel.Slide
      key={index}
      onChange={(event) => {
        console.log("CAROUSEL", event);
      }}
    >
      <SpecificSubVenueDetails subVenue={subVenue} />
    </Carousel.Slide>
  ));
  return (
    <Grid>
      <Grid.Col lg={9} pl="xl">
        <Carousel
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
        </Carousel>
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
          subVenue={subVenuesArray2[index]}
          venueId={venueId}
        />
      </Grid.Col>
    </Grid>
  );
};

export default CarouselForModalOfSubVenues;
