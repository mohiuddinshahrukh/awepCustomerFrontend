import { Select } from "@mantine/core";
import React from "react";
const allBudget = [
  { label: "all", value: "all" },
  {
    value: "0to1Lac",
    label: "> 1 Lac",
  },
  {
    value: "1LacTo5Lac",
    label: "1 Lac - 5 Lac",
  },
  {
    value: "5lacto10Lac",
    label: "5 Lac - 10 Lac",
  },
  {
    value: "10Lacto15Lac",
    label: "10 Lac - 15 Lac",
  },
  {
    value: "15Lacto20Lac",
    label: "15 Lac - 20 Lac",
  },
];
const AllVendorsCustomerBudget = () => {
  return (
    <Select
      data={allBudget}
      placeholder="Budget Filter"
      label="Budget Filter"
      defaultValue={"all"}
    />
  );
};

export default AllVendorsCustomerBudget;
