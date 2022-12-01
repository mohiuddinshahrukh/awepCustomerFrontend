import { Accordion, Checkbox, RangeSlider } from "@mantine/core";
import React, { useState } from "react";

const AdvanceFilterVenueCapacity = ({ venueCapacity, setVenueCapacity }) => {
  return (
    // <Accordion chevronPosition="left">
    //   <Accordion.Item value="venueCapcity">
    //     <Accordion.Control>Number of Guests</Accordion.Control>
    //     <Accordion.Panel>
    <Checkbox.Group
      value={venueCapacity}
      onChange={setVenueCapacity}
      className="checkbox"
      defaultValue={[]}
      orientation="vertical"
      label="Number of Guests"
      spacing={0}
    >
      <Checkbox value="100" label="0 - 100" />
      <Checkbox value="300" label="101 - 300" />
      <Checkbox value="600" label="301 - 600" />
      <Checkbox value="1000" label="600 - 1000" />
      <Checkbox value="1500" label="1001 - 1500" />
      <Checkbox value="1501" label="1500+" />
    </Checkbox.Group>
    //     </Accordion.Panel>
    //   </Accordion.Item>
    // </Accordion>
  );
};

export default AdvanceFilterVenueCapacity;
