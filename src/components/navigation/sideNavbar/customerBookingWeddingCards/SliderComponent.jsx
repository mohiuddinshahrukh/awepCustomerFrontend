import { Slider, Text } from "@mantine/core";
import React from "react";

const SliderComponent = ({
  text,
  color,
  label,
  value,
  max,
  setX,
  getFontSize,
}) => {
  return (
    <>
      <Text>{text}</Text>
      <Slider
        color={color}
        label={label}
        value={value}
        max={max}
        onChange={setX}
        min={getFontSize}
      />
    </>
  );
};

export default SliderComponent;
