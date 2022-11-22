import {
  Button,
  Group,
  SegmentedControl,
  Select,
  useMantineTheme,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const SearchAndFilter = () => {
  let currentTheme = useMantineTheme();
  return (
    <div
      style={{
        padding: "10px",
        borderRadius: "5px",
        height: "fitContent",
        width: "fitContent",
        border:
          currentTheme.colorScheme === "light"
            ? "2px solid white "
            : "2px solid #775A97 ",
        zIndex: 10,
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <SegmentedControl
        styles={{}}
        size={"lg"}
        style={{ position: "absolute", top: "-15%", left: 10 }}
        data={[
          { label: "Venues", value: "venues" },
          { label: "Vendors", value: "vendors" },
        ]}
      />
      <Group
        noWrap
        style={{
          flexShrink: 0,
          marginTop: "5%",
          alignItems: "flex-end",
        }}
      >
        <Select
          size={"lg"}
          style={{ minWidth: "25%" }}
          styles={{ label: { color: "white" } }}
          label="City"
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
          style={{ minWidth: "25%" }}
          styles={{ label: { color: "white" } }}
          placeholder="Pick date"
          label="Event date"
          minDate={dayjs(new Date()).startOf("month").add(5, "days").toDate()}
          maxDate={dayjs(new Date())
            .endOf("month")
            .subtract(5, "days")
            .toDate()}
        />
        <Select
          style={{ minWidth: "25%" }}
          size={"lg"}
          styles={{ label: { color: "white" } }}
          label="Time"
          placeholder="Select A Time"
          data={[
            { value: "LUNCH", label: "Lunch" },
            { value: "DINNER", label: "Dinner" },
          ]}
        />
        <Button
          size={"lg"}
          component={Link}
          to="#"
          style={{ backgroundColor: "#775A97" }}
        >
          Search
        </Button>
      </Group>
    </div>
  );
};

export default SearchAndFilter;
