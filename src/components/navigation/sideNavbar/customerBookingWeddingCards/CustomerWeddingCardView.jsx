// IMPORTS
import React, { useEffect, useRef, useState } from "react";
import { Anchor, Button, Container, Group, Title } from "@mantine/core";
// import img1 from "./imgs/1.jpg";
// import img2 from "./imgs/2.jpg";
// import img3 from "./imgs/3.jpg";
// import img4 from "./imgs/4.jpg";
// import img5 from "./imgs/5.jpg";
// import slider from "./slider";
// import "./Card.css";
// import { RangeSlider } from "@mantine/core";
import { Grid } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons";
// import { AlignCenter, AlignLeft, AlignRight } from "tabler-icons-react";
import QRCode from "react-qr-code";
import moment from "moment";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
let url = "";
// PICTURE BACKGROUNDS
const pictureBackground = [
  new URL("./imgs/1.jpg", import.meta.url),
  new URL("./imgs/2.jpg", import.meta.url),
  new URL("./imgs/3.jpg", import.meta.url),
  new URL("./imgs/4.jpg", import.meta.url),
  new URL("./imgs/5.jpg", import.meta.url),
  // new URL("./imgs/6.jpeg", import.meta.url),
  // new URL("./imgs/7.jpeg", import.meta.url),
  new URL("./imgs/8.jpg", import.meta.url),
  new URL("./imgs/9.jpg", import.meta.url),
];
// COMPONENT

const CustomerWeddingCardView = ({ selectedCard }) => {
  console.log("SELECTED CARD: ", selectedCard);
  const canvas = useRef(null);
  // const [rsvpName, setRsvpName] = useState("Enter RSVP Name");
  const [downloadLink, setDownload] = useState("");
  CanvasRenderingContext2D.prototype.wrapText = function (
    text,
    x,
    y,
    maxWidth,
    lineHeight
  ) {
    var lines = text.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var words = lines[i].split(" ");
      var line = "";
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = this.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          this.fillText(line, x, y);
          line = words[n] + " ";
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      this.fillText(line, x, y);
      y += lineHeight;
    }
  };
  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    let img = new Image();
    img.src = selectedCard.image;
    img.onload = function () {
      ctx.textAlign = `${selectedCard.canvasAllTextAlign}`;
      ctx.drawImage(img, 0, 0, selectedCard.getWidth, selectedCard.getHeight);
      ctx.font = `${selectedCard.getFontSize}px Poppins`;
      ctx.fillStyle = selectedCard.color;
      ctx.wrapText(
        `${
          selectedCard.eventType !== "OTHER"
            ? selectedCard.eventType
            : selectedCard.eventTypeOther
        }`,
        selectedCard.eventTypeX,
        selectedCard.eventTypeY,
        500,
        40
      );
      ctx.wrapText(
        `${selectedCard.invitationName}`,
        selectedCard.invitationFromX,
        selectedCard.invitationFromY,
        500,
        40
      );
      ctx.wrapText(
        `${
          selectedCard.eventTimeDuration === "LUNCH"
            ? selectedCard.eventTimeDuration + " (3pm - 5pm)"
            : selectedCard.eventTimeDuration + " (7pm - 10pm)"
        }`,
        selectedCard.eventTimeDurationX,
        selectedCard.eventTimeDurationY,
        500,
        40
      );
      ctx.wrapText(
        `${selectedCard.groomName}`,
        selectedCard.groomNameX,
        selectedCard.groomNameY,
        500,
        40
      );
      ctx.wrapText(
        `${selectedCard.brideName}`,
        selectedCard.brideNameX,
        selectedCard.brideNameY,
        500,
        40
      );
      ctx.wrapText(
        `${selectedCard.eventTime}`,
        selectedCard.eventTimeX,
        selectedCard.eventTimeY,
        500,
        40
      );
      ctx.wrapText(
        `${moment(new Date(selectedCard.eventDate)).format("DD-MMMM-YYYY")}`,
        selectedCard.eventDateX,
        selectedCard.eventDateY,
        500,
        40
      );
      ctx.wrapText(
        `${selectedCard.venueName}`,
        selectedCard.venueNameX,
        selectedCard.venueNameY,
        500,
        40
      );
      ctx.wrapText(
        `${selectedCard.eventRsvpName}`,
        selectedCard.eventRsvpNameX,
        selectedCard.eventRsvpNameY,
        500,
        40
      );

      url = "";
      url += canvas?.current?.toDataURL();
      setDownload(canvas?.current?.toDataURL());
    };
  });

  return (
    <Container size={"xl"} style={{ position: "relative" }} mb="xl">
      <Grid align={"center"}>
        <Grid.Col lg={12}>
          <Group align={"center"} position="center" mt={"lg"}>
            <div style={{ position: "relative" }}>
              <canvas ref={canvas} width={selectedCard.getWidth} height={670} />
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 20,
                  height: "auto",
                  maxWidth: 75,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={selectedCard.qrCode}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </Group>
          <Group position="center">
            <Anchor variant="text" href={downloadLink} download>
              <Button uppercase rightIcon={<IconArrowDown />}>
                Download Card
              </Button>
            </Anchor>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CustomerWeddingCardView;
