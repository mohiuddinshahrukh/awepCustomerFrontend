import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificSubVenue from "./SpecificSubVenueCard";

const CarouselOfSubVenues = ({
  open,
  setOpen,
  subVenues,
  targetRef,
  setIdOfSpecificSubVenue,
  idOfSpecificSubVenue,
}) => {
  let subVenuesArray = subVenues ? subVenues : [{}];
  const slides = subVenuesArray.map((subVenue, index) => (
    <Carousel.Slide key={index}>
      <SpecificSubVenue
        open={open}
        setOpen={setOpen}
        subVenue={subVenue}
        setIdOfSpecificSubVenue={setIdOfSpecificSubVenue}
        idOfSpecificSubVenue={idOfSpecificSubVenue}
      />
    </Carousel.Slide>
  ));
  return (
    <div>
      <Text weight="bold" py="md" size="lg" ref={targetRef}>
        Sub Venues
      </Text>
      <Carousel
        withIndicators
        // height={800}
        slideSize="50%"
        slideGap={2}
        breakpoints={[
          { maxWidth: "md", slideSize: "80%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        loop
        align="start"
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default CarouselOfSubVenues;
