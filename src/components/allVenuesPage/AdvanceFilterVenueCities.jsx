import { Accordion, Checkbox, Select } from "@mantine/core";
import React from "react";

const allCities = [
  {
    value: "all",
    label: "all",
  },
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

const AdvanceFilterVenueCities = () => {
  return (
    <Select
      label="Cities Filter"
      defaultValue={"all"}
      data={allCities}
      placeholder="Cities Filter"
    />
  );
};

export default AdvanceFilterVenueCities;
