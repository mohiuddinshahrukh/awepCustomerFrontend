import { Group, Paper, ScrollArea, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const OtherFilterCards = ({ cardsData }) => {
  const cards = cardsData?.map((card, index) => {
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
        key={index}
        style={{ height: "165px", width: "195px", boxSizing: "border-box" }}
        component={Link}
        to={card.cardLinkPath}
      >
        <Group position="center">{card.cardLinkIcon}</Group>
        <Text size={"xl"} weight={500} align="center">
          {card.cardTitle}
        </Text>
      </Paper>
    );
  });
  return (
    <Group p={0} m={0} noWrap position="apart">
      {cards}
    </Group>
  );
};

export default OtherFilterCards;
