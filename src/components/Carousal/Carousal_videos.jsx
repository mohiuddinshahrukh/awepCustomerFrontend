import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";
import React from "react";

const Carousal_Videos = ({ videos }) => {
  let venueVideos = videos || [];
  console.log("TU KHER BIYON", videos);
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
      // withIndicators

      height="501px"
      slideSize="100%"
      slideGap={2}
      // loop
      align="start"
      control
    >
      {console.log("venueVideos", venueVideos)}
      {venueVideos !== [] ? (
        venueVideos.map((v, index) => (
          <Carousel.Slide key={index}>
            <video
              style={{ objectFit: "cover" }}
              height="500px"
              width={"100%"}
              src={v}
              controls
            ></video>
          </Carousel.Slide>
        ))
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Carousel>
  );
};

export default Carousal_Videos;
