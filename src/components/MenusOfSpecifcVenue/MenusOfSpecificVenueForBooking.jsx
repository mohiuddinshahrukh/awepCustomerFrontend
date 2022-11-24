import React from "react";
import { Carousel } from "@mantine/carousel";
import { SimpleGrid, Text } from "@mantine/core";
import SpecificMenuForBooking from "./SpecificMenuForBooking";

const MenusOfSpecificVenueForBooking = ({
  menus,
  setIdOfSelectedMenu,
  idOfSelectedMenu,
  setMenuPrice,
  setSelectedMenu,
  noOfGuests,
}) => {
  let venueMenu = menus ? menus : [{}];

  return (
    <div>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "xl", cols: 4, spacing: "sm" },
          { maxWidth: "lg", cols: 3, spacing: "sm" },
          { maxWidth: "md", cols: 2, spacing: "sm" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
      >
        {venueMenu?.map((menu, index) => (
          <SpecificMenuForBooking
            menu={menu}
            setIdOfSelectedMenu={setIdOfSelectedMenu}
            idOfSelectedMenu={idOfSelectedMenu}
            setMenuPrice={setMenuPrice}
            setSelectedMenu={setSelectedMenu}
            noOfGuests={noOfGuests}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default MenusOfSpecificVenueForBooking;
