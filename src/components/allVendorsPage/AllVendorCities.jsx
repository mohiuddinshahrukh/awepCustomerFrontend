import { Select } from "@mantine/core";
import React from "react";

const allCities = [
  { label: "all", value: "all" },
  {
    value: "islamabad",
    label: "Islamabad",
  },
  {
    value: "rawalpindi",
    label: "Rawalpindi",
  },
  {
    value: "lahore",
    label: "Lahore",
  },
  {
    value: "karachi",
    label: "Karachi",
  },
  {
    value: "multan",
    label: "Multan",
  },
];
const AllVendorCities = () => {
  return (
    <Select
      data={allCities}
      placeholder="Cities Filter"
      label="Cities Filter"
      defaultValue={"all"}
    />
    // defaultValue={["react"]}
  );
};

export default AllVendorCities;
