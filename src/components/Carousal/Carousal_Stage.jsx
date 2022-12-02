import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";
import { Pannellum } from "pannellum-react";
import React from "react";
import Stage3DView from "../Stage3DView/stage3DView";

const Carousal_Stage = ({ stages }) => {
  let venueStages = stages;
  console.log("TU KHER BIYON stage", stages);
  return (
    <Carousel
      styles={{
        viewport: {
          borderRadius: "10px",
        },
      }}
      // withIndicators
      height="501px"
      slideSize="100%"
      slideGap={2}
      draggable={false}
      // loop
      align="start"
      control
    >
      {venueStages !== "A" ? (
        <Carousel.Slide>
          <Stage3DView />
        </Carousel.Slide>
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Carousel>
  );
};

export default Carousal_Stage;
