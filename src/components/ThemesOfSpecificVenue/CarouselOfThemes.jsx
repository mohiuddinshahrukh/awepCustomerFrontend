import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificTheme from "./SpecificTheme";

const CarouselOfThemes = ({ themes }) => {
  const themesArray = themes ? themes : [{}];
  const slides = themesArray.map((theme, index) => (
    <Carousel.Slide key={index}>
      <SpecificTheme theme={theme} />
    </Carousel.Slide>
  ));
  return (
    <div>
      <Text weight="bold" py="md" size="lg">
        Themes
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
        align="start"
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default CarouselOfThemes;
