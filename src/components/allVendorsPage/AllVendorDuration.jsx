import { Select } from "@mantine/core";
import React from "react";
const allDurations = [
  { value: "1 Day", label: "1 Day" },
  { value: "2 Days", label: "2 Days" },
  { value: "3 Days", label: "3 Days" },
  { value: "5 Days", label: "5 Days" },
];
const AllVendorDuration = ({ time, setTime }) => {
  return (
    <Select
      label="Duration Filter"
      defaultValue={"all"}
      value={time}
      onChange={setTime}
      data={allDurations}
      placeholder="Duration Filter"
    />
  );
};

export default AllVendorDuration;
