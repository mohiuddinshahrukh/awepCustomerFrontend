import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";
import React from "react";

const Carousal_Images = ({ images }) => {
  let venueImages = images;
  console.log("TU KHER BIYON", images);
  return (
    <Carousel
      styles={{
        viewport: {
          borderRadius: "10px",
        },
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
      withIndicators
      height="501px"
      slideSize="100%"
      slideGap={2}
      // loop
      align="start"
      // control
    >
      {venueImages !== [] && venueImages !== undefined ? (
        venueImages.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image height="500px" width={"100%"} src={image} />
          </Carousel.Slide>
        ))
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Carousel>
  );
};

export default Carousal_Images;
