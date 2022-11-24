import { Carousel } from "@mantine/carousel";
import { SimpleGrid, Text } from "@mantine/core";
import React from "react";
import SpecificThemeForBooking from "./SpecificThemeForBooking";

const ThemesOfSpecificVenueForBooking = ({
  themes,
  setIdOfSelectedTheme,
  idOfSelectedTheme,
  setSelectedTheme,
  selectedTheme,
}) => {
  const themesArray = themes ? themes : [{}];

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
        {themesArray?.map((theme, index) => (
          // <div key={index}>
          <SpecificThemeForBooking
            key={index}
            theme={theme}
            setIdOfSelectedTheme={setIdOfSelectedTheme}
            idOfSelectedTheme={idOfSelectedTheme}
            setSelectedTheme={setSelectedTheme}
            selectedTheme={selectedTheme}
          />
          // </div>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ThemesOfSpecificVenueForBooking;
