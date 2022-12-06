import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";
import { Pannellum } from "pannellum-react";
import React from "react";

const Carousal_Panorama = ({ panorama }) => {
  let venuePanorama = panorama;
  console.log("TU KHER BIYON PANO", panorama);
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
      draggable={false}
      slideGap={2}
      // loop
      align="start"
      control
    >
      {venuePanorama !== "" && venuePanorama !== undefined ? (
        <Carousel.Slide>
          <Pannellum
            width="100%"
            height="500px"
            image={venuePanorama}
            
            pitch={10}
            yaw={50}
            hfov={1000}
            autoLoad
            showZoomCtrl={true}
            onLoad={() => {
              console.log("panorama loaded");
            }}
          ></Pannellum>
        </Carousel.Slide>
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Carousel>
  );
};

export default Carousal_Panorama;
