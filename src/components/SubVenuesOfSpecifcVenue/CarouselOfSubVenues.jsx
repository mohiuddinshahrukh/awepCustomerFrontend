import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificSubVenue from "./SpecificSubVenue";

const CarouselOfSubVenues = ({ open, setOpen }) => {
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
        <Carousel.Slide>
          <SpecificSubVenue open={open} setOpen={setOpen} />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificSubVenue open={open} setOpen={setOpen} />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificSubVenue open={open} setOpen={setOpen} />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificSubVenue open={open} setOpen={setOpen} />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificSubVenue open={open} setOpen={setOpen} />
        </Carousel.Slide>

        {/* ...other slides */}
      </Carousel>
    </div>
  );
};

export default CarouselOfSubVenues;
