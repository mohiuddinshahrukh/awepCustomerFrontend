import {
  Accordion,
  Group,
  NumberInput,
  RangeSlider,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

const AdvanceFilterMenuCharges = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  setMinPriceFilter,
  setMaxPriceFilter,
}) => {
  const [rangeValue, setRangeValue] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setRangeValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  return (
    <Accordion chevronPosition="left" defaultValue="menuPrice">
      <Accordion.Item value="menuPrice">
        <Accordion.Control>Menu Budget</Accordion.Control>
        <Accordion.Panel>
          <RangeSlider
            thumbSize={14}
            max={maxPrice}
            min={minPrice}
            // defaultValue={[20, 80]}
            value={rangeValue}
            onChange={(value) => {
              setRangeValue(value);
              setMinPriceFilter(value[0]);
              setMaxPriceFilter(value[1]);
            }}
          />
        </Accordion.Panel>
        <Accordion.Panel>
          <Group position="apart" noWrap>
            <NumberInput
              icon={<Text>Rs.</Text>}
              label="From"
              min={minPrice}
              max={maxPrice}
              hideControls
              value={rangeValue[0]}
              onChange={(e) => {
                setMinPriceFilter(e);
                setRangeValue([e, rangeValue[1]]);
              }}
            />
            <NumberInput
              hideControls
              icon={<Text>Rs.</Text>}
              label="To"
              min={minPrice}
              max={maxPrice}
              value={rangeValue[1]}
              onChange={(e) => {
                setMaxPriceFilter(e);
                setRangeValue([rangeValue[0], e]);
              }}
            />
          </Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvanceFilterMenuCharges;
