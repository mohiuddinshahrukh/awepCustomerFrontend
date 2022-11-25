import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import {
  Button,
  Container,
  Group,
  Image,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useRef, useState } from "react";
import SearchBackgroundOpacityDiv from "./SearchBackgroundOpacityDiv";
import SearchAndFilter from "./SearchAndFilter";
import { Link } from "react-router-dom";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";

const SearchBackground = ({ carouselImages }) => {
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const [searchSupplier, setSearchSupplier] = useState("venue");
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  console.log(date, "haha");

  const searchBackgroundCarousel = (
    <Carousel
      loop
      align="start"
      height={"75vh"}
      orientation="vertical"
      withIndicators
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
      <div
        style={{ position: "absolute", zIndex: 10, width: "100%", top: "25%" }}
      >
        <Text
          size={"4.5vw"}
          weight="bold"
          align="center"
          color="white"
          style={{ fontVariant: "small-caps" }}
        >
          Making Your Event A Memorable One
        </Text>
      </div>
      <SearchBackgroundOpacityDiv />

      <Group
        noWrap
        position="center"
        align={"flex-end"}
        style={{
          width: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          // border: "1px solid red",
          position: "absolute",
          bottom: "20%",
          zIndex: 10,
        }}
      >
        <Select
          size={"lg"}
          styles={{ label: { color: "white" } }}
          label="Supplier"
          placeholder="Select A Supplier"
          onChange={setSearchSupplier}
          data={[
            { value: "venue", label: "Venue" },
            { value: "vendor", label: "Vendor" },
          ]}
        />
        <Select
          size={"lg"}
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
        <DatePicker
          size={"lg"}
          styles={{ label: { color: "white" } }}
          placeholder="Pick date"
          label="Event date"
          value={date}
          onChange={setDate}
          minDate={dayjs(new Date()).startOf("month").add(5, "days").toDate()}
          maxDate={dayjs(new Date())
            .endOf("month")
            .subtract(5, "days")
            .toDate()}
        />
        {searchSupplier === "venue" ? (
          <Select
            size={"lg"}
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
            size={"lg"}
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

        <Button
          size={"lg"}
          component={Link}
          to={searchSupplier === "venue" ? `/allVenues` : `/allVendors`}
          style={{ backgroundColor: "#775A97" }}
        >
          Search
        </Button>
      </Group>
      {/*<Container><SearchAndFilter /></Container>*/}
      {searchBackgroundCarousel}
    </Paper>
  );
};

export default SearchBackground;
