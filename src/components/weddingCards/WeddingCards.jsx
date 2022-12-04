import { Anchor, Button, Container, Divider, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import WeddingCardsCarousel from "./WeddingCardsCarousel";

const WeddingCards = () => {
  return (
    <Container size={"xl"} my="xl">
      <Divider my="lg" />
      <Group position="apart">
        <Anchor
          weight={500}
          component={Link}
          to="cardEditor"
          variant="text"
          size={"1.5rem"}
        >
          Wedding Cards
        </Anchor>
      </Group>
      <WeddingCardsCarousel />

      <Group position="right">
        <Button
          className="buttonOutline"
          component={Link}
          to="cardEditor"
          variant="outline"
          rightIcon={<IconArrowRight />}
        >
          All Wedding Cards
        </Button>
      </Group>
    </Container>
  );
};

export default WeddingCards;
