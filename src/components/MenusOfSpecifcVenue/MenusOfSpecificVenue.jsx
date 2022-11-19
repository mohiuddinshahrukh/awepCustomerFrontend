import React from "react";
import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import SpecificMenu from "./SpecificMenu";

const MenusOfSpecificVenue = () => {
  return (
    <div>
      <Text weight="bold" py="md" size="lg">
        Menus
      </Text>
      <Carousel
        withIndicators
        // height={800}
        slideSize="33.33%"
        slideGap={5}
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "50%", slideGap: 0 },
          { maxWidth: "xs", slideSize: "100%", slideGap: 0 },
        ]}
        loop
        align="start"
      >
        <Carousel.Slide>
          <SpecificMenu />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificMenu />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificMenu />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificMenu />
        </Carousel.Slide>
        <Carousel.Slide>
          <SpecificMenu />
        </Carousel.Slide>

        {/* ...other slides */}
      </Carousel>
    </div>
  );
};

export default MenusOfSpecificVenue;
