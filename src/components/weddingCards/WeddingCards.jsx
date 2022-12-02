import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import WeddingCardsCarousel from "./WeddingCardsCarousel";

const WeddingCards = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          weight={500}
          component={Link}
          to="cardEditor"
          variant="text"
          size={"1.5rem"}
        >
          Cards
        </Anchor>
        <Button
          className="buttonOutline"
          component={Link}
          to="cardEditor"
          variant="outline"
          rightIcon={<IconArrowRight />}
        >
          View All Wedding Cards
        </Button>
      </Group>

      <WeddingCardsCarousel />
    </Container>
  );
};

export default WeddingCards;
