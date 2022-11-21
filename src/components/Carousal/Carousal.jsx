import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import React from "react";

const Carousal = ({ images }) => {
  let venueImages = images ? images : ["", ""];
  return (
    <Carousel
      styles={{
        viewport: {
          borderRadius: "10px",
        },
      }}
      withIndicators
      height="501px"
      slideSize="80%"
      slideGap={2}
      breakpoints={[
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 1 },
      ]}
      loop
      align="start"
    >
      {venueImages.map((image, index) => (
        <Carousel.Slide key={index}>
          <Image
            height="500px"
            width={index == venueImages.length - 1 ? "120%" : "100%"}
            src={image}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default Carousal;
