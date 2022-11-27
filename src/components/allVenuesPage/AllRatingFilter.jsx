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
    label: "2 Stars",
  },
  {
    value: 3,
    label: "3 Stars",
  },
  {
    value: 4,
    label: "4 Stars",
  },
  {
    value: 5,
    label: "5 Stars",
  },
];
const AllRatingFilter = ({ rating, setRating }) => {
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

export default AllRatingFilter;
