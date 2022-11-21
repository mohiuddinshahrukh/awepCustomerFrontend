import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificSubVenueDetails from "./SpecificSubVenueDetails";
const CarouselForModalOfSubVenues = ({ subVenuesArray }) => {
  let subVenuesArray2 = subVenuesArray ? subVenuesArray : [{}];
  const slides = subVenuesArray2.map((subVenue, index) => (
    <Carousel.Slide key={index}>
      <SpecificSubVenueDetails subVenue={subVenue} />
    </Carousel.Slide>
  ));
  return (
    <Carousel
      withIndicators
      // height={800}
      slideSize="100%"
      slideGap={2}
      breakpoints={[
        { maxWidth: "md", slideSize: "100%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
      //   loop
      align="start"
    >
      {slides}
    </Carousel>
  );
};

export default CarouselForModalOfSubVenues;
