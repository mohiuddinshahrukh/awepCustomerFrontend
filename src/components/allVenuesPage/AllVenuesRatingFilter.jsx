import { Select } from "@mantine/core";
import React from "react";
const allRating = [
  {
    value: "all",
    label: "all",
  },
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
const AllVenuesRatingFilter = () => {
  return (
    <Select
      label="Venue Ratings Filter"
      defaultValue={"all"}
      data={allRating}
      placeholder="Venue Ratings Filter"
    />
  );
};

export default AllVenuesRatingFilter;
