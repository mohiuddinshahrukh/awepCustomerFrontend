import { Accordion, RangeSlider } from "@mantine/core";
import React from "react";

const AdvanceFilterVenuePrice = () => {
  return (
    <Accordion>
      <Accordion.Item value="customerBudget">
        <Accordion.Control>Customer Budget</Accordion.Control>
        <Accordion.Panel>
          <RangeSlider thumbSize={14} defaultValue={[20, 80]} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvanceFilterVenuePrice;
