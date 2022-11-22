import { Accordion, RangeSlider } from "@mantine/core";
import React from "react";

const AdvanceFilterVenueCapacity = () => {
  return (
    <Accordion>
      <Accordion.Item value="venueCapcity">
        <Accordion.Control>Venue Capacity</Accordion.Control>
        <Accordion.Panel>
          <RangeSlider thumbSize={14} defaultValue={[20, 80]} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvanceFilterVenueCapacity;
