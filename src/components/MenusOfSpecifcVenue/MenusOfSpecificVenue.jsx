import React from "react";
import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import SpecificMenu from "./SpecificMenu";

const MenusOfSpecificVenue = ({ menus }) => {
  let venueMenu = menus ? menus : [{}];
  const slides = venueMenu.map((menu, index) => (
    <Carousel.Slide key={index}>
      <SpecificMenu menu={menu} />
    </Carousel.Slide>
  ));

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
        {slides}
      </Carousel>
    </div>
  );
};

export default MenusOfSpecificVenue;
