import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Alert,
  Button,
  Image,
  Modal,
  Paper,
  Skeleton,
  Text,
} from "@mantine/core";
import { IconScreenShare } from "@tabler/icons";
import { Pannellum } from "pannellum-react";
import React, { useState } from "react";
import Stage3DView from "../Stage3DView/stage3DView";

const Carousal_Stage = ({ stages }) => {
  const [stageModal, setStageModal] = useState(false);
  let venueStages = stages;
  console.log("TU KHER BIYON stage", stages);
  return (
    <Paper
      style={{
        position: "relative",
      }}
    >
      <Modal
        opened={stageModal}
        onClose={() => setStageModal(false)}
        fullScreen
        styles={{
          body: { height: "90%", width: "100%" },
          close: {
            borderRadius: "50%",
            backgroundColor: "#e60084",
            color: "white",
            ":hover": {
              backgroundColor: "#c1006d",
            },
          },
        }}
      >
        <model-viewer
          id="mv-demo"
          shadow-intensity="20"
          src="https://cors-anywhere.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/awep-92675.appspot.com/o/3D-Models%2Fretro_style_stage.glb?alt=media&token=76314b97-2727-4594-8533-9a75c2b223ad"
          alt="A 3D model of an astronaut"
          auto-rotate
          camera-controls
          // poster="https://cdn.pixabay.com/photo/2018/12/02/10/58/hall-3851014_960_720.jpg"
        ></model-viewer>
      </Modal>
      <Button
        style={{
          position: "absolute",
          zIndex: 10,
          bottom: 20,
          right: 20,
        }}
        className="button"
        onClick={() => {
          let link =
            "https://firebasestorage.googleapis.com/v0/b/awep-92675.appspot.com/o/3D-Models%2Fretro_style_stage.glb?alt=media&token=76314b97-2727-4594-8533-9a75c2b223ad";
          try {
            window.ReactNativeWebView.postMessage(`3DModel::::::::${link}`);
          } catch (e) {
            alert("AR Only Works on Mobile");
          }
        }}
      >
        View in AR
      </Button>
      <ActionIcon
        variant="filled"
        // color="black"
        className="fgColor"
        style={{
          position: "absolute",
          zIndex: 10,
          top: 20,
          right: 20,
        }}
        onClick={() => {
          setStageModal(true);
        }}
      >
        <IconScreenShare />
      </ActionIcon>
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
