import { Card, Image, Text } from "@mantine/core";
import React from "react";

const WeddingCardsCard = ({ weddingCard }) => {
  return (
    <Card
      p={0}
      className="border"
      sx={{
        boxSizing: "border-box",
        ":hover": {
          boxShadow: "0 5px 12px #0003",
          cursor: "pointer",
          transform: "translateY(-8px)",
        },
        transition: "transform .35s",
        boxShadow: "0 2px 8px #00000026",
        borderRadius: "0.5rem",
        position: "relative",
      }}
    >
      <Card.Section
        px="md"
        className="bgColor"
        style={{
          borderBottomRightRadius: "0.5rem",
          borderBottomLeftRadius: "0.5rem",
          position: "absolute",
          top: 0,
          zIndex: 2,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Text weight={500} size="lg" align="center" color={"white"}>
          {weddingCard.title}
        </Text>
      </Card.Section>
      <Card.Section>
        <Image height={"206px"} src={weddingCard.img} />
      </Card.Section>
    </Card>
  );
};

export default WeddingCardsCard;
