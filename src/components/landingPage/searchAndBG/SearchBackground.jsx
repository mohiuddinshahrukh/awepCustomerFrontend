import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Image, Paper, Text } from "@mantine/core";
import React, { useRef } from "react";
import SearchBackgroundOpacityDiv from "./SearchBackgroundOpacityDiv";
import SearchAndFilter from "./SearchAndFilter";

const SearchBackground = ({ carouselImages }) => {
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const searchBackgroundCarousel = (
    <Carousel
      loop
      align="start"
      height={"75vh"}
      orientation="vertical"
      withIndicators
      draggable={false}
      withControls={false}
      plugins={[autoplay.current]}
      //   onMouseEnter={autoplay.current.stop}
      //   onMouseLeave={autoplay.current.play}

      //   slideGap="md"
    >
      {carouselImages?.map((image, index) => {
        return (
          <Carousel.Slide key={index}>
            <Image height={"75vh"} src={image.src} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
  return (
    <Paper withBorder style={{ backgroundColor: "#000", position: "relative" }}>
      <div
        style={{ position: "absolute", zIndex: 10, width: "100%", top: "25%" }}
      >
        <Text
          size={"2.5rem"}
          weight="bold"
          align="center"
          color="white"
          style={{ fontVariant: "small-caps" }}
        >
          Making Your Event A Memorable One
        </Text>
      </div>
      <SearchBackgroundOpacityDiv />
      <SearchAndFilter />
      {searchBackgroundCarousel}
    </Paper>
  );
};

export default SearchBackground;
