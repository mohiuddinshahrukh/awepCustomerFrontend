import { Carousel } from "@mantine/carousel";
import { Alert, Button, Image, Paper, Skeleton } from "@mantine/core";
import { Pannellum } from "pannellum-react";
import React from "react";
import Stage3DView from "../Stage3DView/stage3DView";

const Carousal_Stage = ({ stages }) => {
  let venueStages = stages;
  console.log("TU KHER BIYON stage", stages);
  return (
    <Paper
      style={{
        position: "relative",
      }}
    >
      <Button
        style={{
          position: "absolute",
          zIndex: 10,
          bottom: "10px",
          right: "10px",
        }}
        onClick={() => {
          let link =
            "https://firebasestorage.googleapis.com/v0/b/awep-92675.appspot.com/o/3D-Models%2Fretro_style_stage.glb?alt=media&token=76314b97-2727-4594-8533-9a75c2b223ad";
          try {
            window.ReactNativeWebView.postMessage(`3DModel::::::::${link}}`);
          } catch (e) {
            alert("AR Only Works on Mobile");
          }
        }}
      >
        View in Ar
      </Button>
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
        <Carousel.Slide>
          <Stage3DView />
        </Carousel.Slide>
      </Carousel>
    </Paper>
  );
};

export default Carousal_Stage;
