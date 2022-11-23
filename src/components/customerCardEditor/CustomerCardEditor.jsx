// IMPORTS
import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Center,
  Container,
  Group,
  //   Image as mantineImage,
  NumberInput,
  //   Slider,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
// import img1 from "./imgs/1.jpg";
// import img2 from "./imgs/2.jpg";
// import img3 from "./imgs/3.jpg";
// import img4 from "./imgs/4.jpg";
// import img5 from "./imgs/5.jpg";
// import download from "./imgs/download.jpg";
// import slider from "./slider";
// import "./Card.css";
// import { RangeSlider } from "@mantine/core";
import { Grid, Paper } from "@mantine/core";
import SliderComponent from "./SliderComponent";
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from "@tabler/icons";
// import { AlignCenter, AlignLeft, AlignRight } from "tabler-icons-react";
// COMPONENT
const CustomerCardEditor = () => {
  const canvas = useRef(null);
  // HOOKS
  const [image, setImage] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  const [venueName, setVenueName] = useState("");
  const [menuDishes, setMenuDishes] = useState("Happy Wedding");
  const [color, setColor] = useState("#f2ceaf");
  const [downloadLink, setDownload] = useState("");

  // CANVAS FONT
  const [getFontSize, setFontSize] = useState(22);
  // CANVAS HEIGHT & WIDTH
  const [getWidth, setWidth] = useState(450);
  const [getHeight, setHeight] = useState(650);

  // ALIGNMENT FUNTION
  const alignTextHorizontalFunction = (position) => {
    // if (position === "left") {
    //   setVenueX(getWidth - getWidth);
    // } else if (position === "center") {
    //   setVenueX(getWidth / 2);
    // } else {
    //   setVenueX(getWidth);
    // }
  };
  // X AXIS VALUES
  const [venueX, setVenueX] = useState(0);
  const [menuX, setMenuX] = useState(0);
  const [dishesX, setDishesX] = useState(0);
  const [priceX, setPriceX] = useState(0);
  //  Y AXIS VALUES
  const [venueY, setVenueY] = useState(100);
  const [menuY, setMenuY] = useState(200);
  const [dishesY, setDishesY] = useState(300);
  const [priceY, setPriceY] = useState(400);

  // PICTURE BACKGROUNDS
  const pictureBackground = [
    new URL("./imgs/1.jpg", import.meta.url),
    new URL("./imgs/2.jpg", import.meta.url),
    new URL("./imgs/3.jpg", import.meta.url),
    new URL("./imgs/4.jpg", import.meta.url),
    new URL("./imgs/5.jpg", import.meta.url),
  ];
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
    img.src = image;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, getWidth, getHeight);
      ctx.font = `${getFontSize}px Poppins`;
      ctx.fillStyle = color;
      ctx.wrapText(`${venueName}`, venueX, venueY, 500, 40);
      ctx.wrapText(`${menuName}`, menuX, menuY, 500, 40);
      ctx.wrapText(`${menuDishes}`, dishesX, dishesY, 500, 40);
      ctx.wrapText(`${menuPrice}`, priceX, priceY, 500, 40);
      setDownload(canvas.current.toDataURL());
    };
  });
  return (
    <Container size={"xl"}>
      <Title my={"lg"} align="center">
        Wedding Card Editor
      </Title>
      <Grid style={{ border: "1px solid #eaeaea" }}>
        <Grid.Col lg={12} style={{}}>
          <Grid>
            <Grid.Col>
              <a href={downloadLink} download>
                <img src={""} alt="" className="downloadIcon" />
              </a>

              <Title order={4}>Choose Image Or upload</Title>
              <Group position="left">
                {pictureBackground.map((image) => {
                  return (
                    <img
                      height={200}
                      alt=""
                      src={image}
                      onClick={() => setImage(image)}
                    />
                  );
                })}
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col lg={6}>
          <Grid>
            {" "}
            <Grid.Col lg={6}>
              <TextInput
                styles={{ input: { textAlign: "center" } }}
                label="Venue Name"
                value={venueName}
                onChange={(event) => setVenueName(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                styles={{ input: { textAlign: "center" } }}
                label="Bride Name"
                value={menuName}
                onChange={(event) => setMenuName(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                styles={{ input: { textAlign: "center" } }}
                label="Groom Name"
                value={menuName}
                onChange={(event) => setMenuName(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                styles={{ input: { textAlign: "center" } }}
                label="RSVP"
                value={menuDishes}
                onChange={(event) => setMenuDishes(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                styles={{ input: { textAlign: "center" } }}
                label="Event Date & Time"
                value={menuPrice}
                onChange={(event) => setMenuPrice(event.target.value)}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                styles={{ input: { textAlign: "center" } }}
                label="Time"
                value={menuPrice}
                onChange={(event) => setMenuPrice(event.target.value)}
              />
            </Grid.Col>
          </Grid>
          <Group position="center" mt={"lg"}>
            <canvas ref={canvas} width={getWidth} height={670} />
          </Group>
        </Grid.Col>
        <Grid.Col lg={6} style={{ borderLeft: "1px solid #eaeaea" }}>
          <Grid align="flex-end">
            <Grid.Col lg={12}>Alignment Options</Grid.Col>
            <Grid.Col lg={12}>
              <Group>
                <ActionIcon
                  onClick={() => {
                    alignTextHorizontalFunction("left");
                  }}
                >
                  <IconAlignLeft />
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    alignTextHorizontalFunction("center");
                  }}
                >
                  <IconAlignCenter />
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    alignTextHorizontalFunction("right");
                  }}
                >
                  <IconAlignRight />
                </ActionIcon>
              </Group>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Text>X AXIS SETTINGS</Text>

              <SliderComponent
                text="Adjust your venue name X Axis"
                color="grape"
                label="Set Venue Name X Axis"
                value={venueX}
                max={getWidth}
                setX={setVenueX}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your Menu Name X Axis"
                color="grape"
                label="Set Venue Name X Axis"
                value={menuX}
                max={getWidth}
                setX={setMenuX}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your Menu Name X Axis"
                color="grape"
                label="Set Venue Name X Axis"
                value={dishesX}
                max={getWidth}
                setX={setDishesX}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your Menu Name X Axis"
                color="grape"
                label="Set Venue Name X Axis"
                value={priceX}
                max={getWidth}
                setX={setPriceX}
                min={getFontSize}
              />
            </Grid.Col>

            <Grid.Col lg={6}>
              <Text>Y AXIS SETTINGS</Text>
              <SliderComponent
                text="Adjust your venue name Y Axis"
                color="grape"
                label="Set Venue Name Y Axis"
                value={venueY}
                max={getHeight}
                setX={setVenueY}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your Menu Name Y Axis"
                color="grape"
                label="Set Venue Name Y Axis"
                value={menuY}
                max={getHeight}
                setX={setMenuY}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your Menu Name Y Axis"
                color="grape"
                label="Set Venue Name Y Axis"
                value={dishesY}
                max={getHeight}
                setX={setDishesY}
                min={getFontSize}
              />

              <SliderComponent
                text="Adjust your Menu Name Y Axis"
                color="grape"
                label="Set Venue Name Y Axis"
                value={priceY}
                max={getHeight}
                setX={setPriceY}
                min={getFontSize}
              />
            </Grid.Col>

            <Grid.Col>
              <NumberInput
                label="Enter Font size"
                min={12}
                value={getFontSize}
                max={50}
                onChange={setFontSize}
              />
            </Grid.Col>
            <Grid.Col className="colorPicker">
              <label>Change font color: </label>
              <input
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CustomerCardEditor;
