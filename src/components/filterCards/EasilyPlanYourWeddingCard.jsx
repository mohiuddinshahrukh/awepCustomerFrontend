import { Container, Group, Paper, Text } from "@mantine/core";

import React from "react";
import { Link } from "react-router-dom";

const EasilyPlanYourWeddingCard = ({ cardData }) => {
  const card = cardData?.map((card, index) => {
    return (
      <Paper
        className="border"
        sx={{
          borderRadius: "0.5rem",
          ":hover": {
            boxShadow: "0 5px 12px #0003",

            // transform: "scale(1.005)",
          },
          boxShadow: "0 2px 8px #00000026",

          transition: "box-shadow .2s",
          transitionDuration: "0.2s",
          transitionTimingFunction: "ease",
          transitionDelay: "0s",
          transitionProperty: "box-shadow",
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
          <Text weight={475} size={"lg"}>
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
