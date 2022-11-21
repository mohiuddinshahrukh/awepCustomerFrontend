import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificSubVenue from "./SpecificSubVenue";

const CarouselOfSubVenues = ({ open, setOpen, subVenues }) => {
  let subVenuesArray = subVenues ? subVenues : [{}];
  const slides = subVenuesArray.map((subVenue, index) => (
    <Carousel.Slide key={index}>
      <SpecificSubVenue open={open} setOpen={setOpen} subVenue={subVenue} />
    </Carousel.Slide>
  ));
  return (
    <div>
      <Text weight="bold" py="md" size="lg">
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
