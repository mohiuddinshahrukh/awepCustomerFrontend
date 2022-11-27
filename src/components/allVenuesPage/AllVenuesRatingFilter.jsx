import { Select } from "@mantine/core";
import React from "react";
const allRating = [
  {
    value: null,
    label: "All",
  },
  {
    value: 1,
    label: "1 Star",
  },
  {
    value: 2,
    label: "2 Star",
  },
  {
    value: 3,
    label: "3 Star",
  },
  {
    value: 4,
    label: "4 Star",
  },
  {
    value: 5,
    label: "5 Star",
  },
];
const AllVenuesRatingFilter = ({ rating, setRating }) => {
  return (
    <Select
      label="Rating Filter"
      defaultValue={"all"}
      value={rating}
      onChange={setRating}
      data={allRating}
      placeholder="Rating Filter"
    />
  );
};

export default AllVenuesRatingFilter;
