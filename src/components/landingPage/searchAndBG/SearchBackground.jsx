import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import {
  Button,
  Grid,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import SearchBackgroundOpacityDiv from "./SearchBackgroundOpacityDiv";
import { Link } from "react-router-dom";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useMediaQuery } from "@mantine/hooks";

const SearchBackground = ({ carouselImages }) => {
  const matches600 = useMediaQuery("(min-width: 600px)");

  // const [size, setSize] = useState("");
  // const matches600 = useMediaQuery("(min-width: 600px)");
  // const matches600 = useMediaQuery("(min-width: 600px)");
  // const matches600 = useMediaQuery("(min-width: 600px)");

  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const [searchSupplier, setSearchSupplier] = useState("venue");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");

  const searchBackgroundCarousel = (
    <Carousel
      styles={{ indicators: { zIndex: 10 } }}
      withIndicators
      loop
      align="start"
      height={"75vh"}
      orientation="vertical"
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
      <Stack
        style={{ position: "absolute", height: "100%", width: "100%" }}
        align="center"
        justify={"center"}
      >
        {" "}
        <div
          style={{
            // position: "absolute",
            zIndex: 10,
            width: "100%",
          }}
        >
          <Text
            size={matches600 ? "5vw" : "10vw"}
            weight="bold"
            align="center"
            color="white"
            style={{ fontVariant: "small-caps" }}
          >
            <b className="fgColorF">Making</b> Your Event{" "}
            {!matches600 ? <br></br> : null}A Memorable{" "}
            <b className="fgColorF">One</b>
          </Text>
        </div>
        <Group
          position="center"
          style={{
            zIndex: 20,
          }}
        >
          {" "}
          <Grid
            px={"5rem"}
            columns={50}
            align={"flex-end"}
            style={{
              // boxsizing: "border-box",
              width: "100%",
              // left: "50%",
              // transform: "translateX(-50%)",
              // border: "1px solid red",
              // position: "absolute",

              zIndex: 8,
            }}
          >
            <Grid.Col sm={25} md={25} lg={10}>
              {" "}
              <Select
                size={matches600 ? "lg" : "md"}
                styles={{
                  label: { color: "white" },
                }}
                label="Supplier"
                value={searchSupplier}
                placeholder="Select A Supplier"
                onChange={setSearchSupplier}
                data={[
                  { value: "venue", label: "Venue" },
                  { value: "vendor", label: "Vendor" },
                ]}
              />
            </Grid.Col>
            <Grid.Col sm={25} md={25} lg={10}>
              {" "}
              <Select
                size={matches600 ? "lg" : "md"}
                styles={{ label: { color: "white" } }}
                label="City"
                onChange={setCity}
                placeholder="Select A City"
                data={[
                  { value: "islamabad", label: "Islamabad" },
                  { value: "rawalpindi", label: "Rawalpindi" },
                  { value: "lahore", label: "Lahore" },
                  { value: "karachi", label: "Karachi" },
                ]}
              />
            </Grid.Col>
            <Grid.Col sm={25} md={25} lg={10}>
              {" "}
              <DatePicker
                size={matches600 ? "lg" : "md"}
                styles={{ label: { color: "white" } }}
                placeholder="Pick date"
                label="Event date"
                value={date}
                onChange={setDate}
                minDate={dayjs(new Date())
                  .startOf("month")
                  .add(new Date().getDate(), "days")
                  .toDate()}
                maxDate={dayjs(new Date()).add(365, "days").toDate()}
              />
            </Grid.Col>
            <Grid.Col sm={25} md={25} lg={10}>
              {" "}
              {searchSupplier === "venue" ? (
                <Select
                  size={matches600 ? "lg" : "md"}
                  styles={{ label: { color: "white" } }}
                  label="Time"
                  onChange={setTime}
                  placeholder="Select A Time"
                  data={[
                    { value: "LUNCH", label: "Lunch" },
                    { value: "DINNER", label: "Dinner" },
                  ]}
                />
              ) : (
                <Select
                  size={matches600 ? "lg" : "md"}
                  styles={{ label: { color: "white" } }}
                  label="Duration"
                  onChange={setTime}
                  placeholder="Select Duration"
                  data={[
                    { value: "1 Day", label: "1 Day" },
                    { value: "2 Days", label: "2 Days" },
                    { value: "3 Days", label: "3 Days" },
                    { value: "4 Days", label: "4 Days" },
                  ]}
                />
              )}
            </Grid.Col>
            <Grid.Col sm={50} md={50} lg={10}>
              {" "}
              <Button
                size={matches600 ? "lg" : "md"}
                component={Link}
                to={
                  searchSupplier === "venue"
                    ? `/allVenues${date ? "/date/" + date : ""}${
                        time ? "/time/" + time : ""
                      }${city ? "/city/" + city : ""}`
                    : `/allVendors${date ? "/date/" + date : ""}${
                        time ? "/time/" + time : ""
                      }${city ? "/city/" + city : ""}`
                }
                className="button"
                fullWidth
                uppercase
              >
                Search
              </Button>
            </Grid.Col>
          </Grid>
        </Group>
      </Stack>
      <SearchBackgroundOpacityDiv />
      {/*<Container><SearchAndFilter /></Container>*/}
      {searchBackgroundCarousel}
    </Paper>
  );
};

export default SearchBackground;
