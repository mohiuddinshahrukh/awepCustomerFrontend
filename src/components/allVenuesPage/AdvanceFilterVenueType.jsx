import { Select } from "@mantine/core";
import React from "react";

const venueTypes = [
  {
    value: "all",
    label: "all",
  },
  { value: "halls", label: "Halls" },
  { value: "marquees", label: "Marquees" },
  { value: "outdoors", label: "Outdoors" },
];
const AdvanceFilterVenueType = ({ accordionsData, setVenueType }) => {
  console.log("ACCORDION DATA: ", accordionsData);
  return (
    <Select
      label="Venue Types Filter"
      defaultValue={"all"}
      data={venueTypes}
      placeholder="Venue Types Filter"
    />
  );
};

export default AdvanceFilterVenueType;
