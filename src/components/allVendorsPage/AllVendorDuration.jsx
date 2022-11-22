import { Accordion, Checkbox } from "@mantine/core";
import React from "react";
const allCities = [
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
    <Accordion defaultValue="vendorDuration">
      <Accordion.Item value={"vendorDuration"}>
        <Accordion.Control>{"Vendor Duration"}</Accordion.Control>
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

export default AllVendorDuration;
