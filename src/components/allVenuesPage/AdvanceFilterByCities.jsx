import { Accordion, Checkbox, Select } from "@mantine/core";
import React from "react";

const allCities = [
  {
    value: "all",
    label: "All",
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

const AdvanceFilterByCities = ({ city, setCity }) => {
  return (
    <Select
      label="City"
      defaultValue={"all"}
      value={city}
      onChange={setCity}
      data={allCities}
      placeholder="Cities Filter"
    />
  );
};

export default AdvanceFilterByCities;
