import { Container, Group, Paper, Text } from "@mantine/core";

import React from "react";
import { Link } from "react-router-dom";

const EasilyPlanYourWeddingCard = ({ cardData }) => {
  const card = cardData?.map((card, index) => {
    return (
      <Paper
        sx={{
          ":hover": { boxShadow: "1px 1px 3px rgba(0, 0, 0, .25)" },
          transition: "0.3s",
        }}
        shadow={"sm"}
        p={"xl"}
        component={Link}
        to={card.cardLinkPath}
        key={index}
        style={{ width: "288px", height: "136px", boxSizing: "border-box" }}
      >
        <Text weight={500} mt={"md"} size={"lg"}>
          {card.cardTitle}
        </Text>
        <Group mt={"md"}>
          <Text weight={475} style={{ color: "#775A97" }} size={"lg"}>
            {card.cardLinkTitle}
          </Text>
          {card.cardLinkIcon}
        </Group>
      </Paper>
    );
  });
  return <div>{card}</div>;
};

export default EasilyPlanYourWeddingCard;
