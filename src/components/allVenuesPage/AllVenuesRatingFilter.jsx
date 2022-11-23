import { Accordion, Checkbox } from "@mantine/core";
import React from "react";
const allRating = [
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
  const services = allRating?.map((city, index) => {
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
    <Accordion defaultValue="venueRating">
      <Accordion.Item value={"venueRating"}>
        <Accordion.Control>{"Venue Rating"}</Accordion.Control>
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

export default AllVenuesRatingFilter;
