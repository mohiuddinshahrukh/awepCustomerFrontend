import { Select } from "@mantine/core";
import React from "react";
const allRating = [
  { label: "all", value: "all" },
  {
    value: "1star",
    label: "1 Star",
  },
  {
    value: "2star",
    label: "2 Star",
  },
  {
    value: "3star",
    label: "3 Star",
  },
  {
    value: "4star",
    label: "4 Star",
  },
  {
    value: "5star",
    label: "5 Star",
  },
];
const AllVendorRatingFilter = () => {
  return (
    <Select
      label="Rating Filter"
      defaultValue={"all"}
      placeholder="Rating Filter"
      data={allRating}
    />

    // defaultValue={["react"]}
  );
};

export default AllVendorRatingFilter;
