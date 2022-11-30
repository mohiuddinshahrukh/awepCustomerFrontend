import { Card, Image } from "@mantine/core";
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
      }}
    >
      <Image height={"206px"} src={weddingCard.img} />
    </Card>
  );
};

export default WeddingCardsCard;
