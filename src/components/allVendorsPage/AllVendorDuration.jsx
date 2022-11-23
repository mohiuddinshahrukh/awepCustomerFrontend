import { Select } from "@mantine/core";
import React from "react";
const allDurations = [
  { label: "all", value: "all" },
  {
    value: "perHour",
    label: "Per Hour",
  },
  {
    value: "perEvent",
    label: "Per Event",
  },
];
const AllVendorDuration = () => {
  return (
    <Select
      label="Duration Filter"
      defaultValue={"all"}
      data={allDurations}
      placeholder="Duration Filter"
    />
  );
};

export default AllVendorDuration;
