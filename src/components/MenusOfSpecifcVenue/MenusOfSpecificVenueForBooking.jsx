import React from "react";
import { Carousel } from "@mantine/carousel";
import { SimpleGrid, Text } from "@mantine/core";
import SpecificMenu from "./SpecificMenu";

const MenusOfSpecificVenueForBooking = ({ menus }) => {
  let venueMenu = menus ? menus : [{}];

  return (
    <div>
      <Text weight="bold" py="md" size="lg">
        Menus
      </Text>
      <SimpleGrid cols={3}>
        {venueMenu?.map((menu, index) => (
          <SpecificMenu menu={menu} />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MenusOfSpecificVenueForBooking;
