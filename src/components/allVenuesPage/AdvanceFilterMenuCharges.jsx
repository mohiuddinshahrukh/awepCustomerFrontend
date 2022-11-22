import { Accordion, RangeSlider } from "@mantine/core";
import React from "react";

const AdvanceFilterMenuCharges = () => {
  return (
    <Accordion>
      <Accordion.Item value="menuPrice">
        <Accordion.Control>Menu Budget</Accordion.Control>
        <Accordion.Panel>
          <RangeSlider thumbSize={14} defaultValue={[20, 80]} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvanceFilterMenuCharges;
