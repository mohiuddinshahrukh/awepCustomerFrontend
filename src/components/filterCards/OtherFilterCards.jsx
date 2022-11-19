import { Group, Paper, Text } from "@mantine/core";
import React from "react";

const OtherFilterCards = ({ cardsData }) => {
  const cards = cardsData?.map((card, index) => {
    return (
      <Paper
        sx={{
          ":hover": { boxShadow: "1px 1px 3px rgba(0, 0, 0, .25)" },
          transition: "0.3s",
        }}
        shadow={"sm"}
        p={"xl"}
        key={index}
        style={{ height: "136px", width: "151px", boxSizing: "border-box" }}
      >
        <Group position="center">{card.cardLinkIcon}</Group>
        <Text size={"lg"} weight={500} mt={"md"} align="center">
          {card.cardTitle}
        </Text>
      </Paper>
    );
  });
  return <Group>{cards}</Group>;
};

export default OtherFilterCards;
