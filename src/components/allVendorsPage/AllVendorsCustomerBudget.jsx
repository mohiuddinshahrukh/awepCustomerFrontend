import { Accordion, Checkbox } from "@mantine/core";
import React from "react";
const allCities = [
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
  const services = allCities?.map((city, index) => {
    return (
      <Checkbox
        key={index}
        // onChange={(event) =>
        //   setVenueType(event.currentTarget.checked)
        // }
        value={city.value}
        label={city.label}
      />
    );
  });
  return (
    <Accordion defaultValue="customerBudget">
      <Accordion.Item value={"customerBudget"}>
        <Accordion.Control>{"Customer Budget"}</Accordion.Control>
        <Accordion.Panel>
          <Checkbox.Group

          // defaultValue={["react"]}
          >
            {services}
          </Checkbox.Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AllVendorsCustomerBudget;
