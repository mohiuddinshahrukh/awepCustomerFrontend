import { Accordion, Checkbox } from "@mantine/core";
import React from "react";

const allCities = [
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
const AllVendorCities = () => {
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
    <Accordion defaultValue="vendorCities">
      <Accordion.Item value={"vendorCities"}>
        <Accordion.Control>{"Vendor Cities"}</Accordion.Control>
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

export default AllVendorCities;
