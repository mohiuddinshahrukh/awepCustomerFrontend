import {
  Button,
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
        height: "20vh",
        width: "40%",
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
        style={{ position: "absolute", top: -20, left: 10 }}
        data={[
          { label: "Venues", value: "venues" },
          { label: "Vendors", value: "vendors" },
        ]}
      />
      <div style={{ display: "flex", marginTop: "5%", alignItems: "flex-end" }}>
        <Select
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
          styles={{ label: { color: "white" } }}
          label="Time"
          placeholder="Select A Time"
          data={[
            { value: "LUNCH", label: "Lunch" },
            { value: "DINNER", label: "Dinner" },
          ]}
        />
        <Button component={Link} to="#" style={{ backgroundColor: "#775A97" }}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
