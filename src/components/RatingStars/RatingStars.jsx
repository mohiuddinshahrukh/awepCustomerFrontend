import React from "react";
import { IconStar } from "@tabler/icons";
import { Text } from "@mantine/core";

const RatingStars = ({ rating, dontShow }) => {
  const stars = new Array(5).fill(0);

  return (
    <>
      {stars.map((star, index) => (
        <IconStar
          fill={index >= rating ? "#EAEAEA" : "#FFB300"}
          stroke="0"
          key={index}
          size={25}
        />
      ))}
      {!dontShow && <Text weight="bold">{rating ? rating.toFixed(1) : 5}</Text>}
    </>
  );
};

export default RatingStars;
