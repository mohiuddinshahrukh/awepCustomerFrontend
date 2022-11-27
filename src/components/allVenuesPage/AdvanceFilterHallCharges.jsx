import { Accordion, RangeSlider } from "@mantine/core";
import React from "react";

const AdvanceFilterHallCharges = () => {
  return (
    <Accordion chevronPosition="left">
      <Accordion.Item value="venueCharges">
        <Accordion.Control>Hall Charges</Accordion.Control>
        <Accordion.Panel>
          <RangeSlider thumbSize={14} defaultValue={[20, 80]} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvanceFilterHallCharges;
