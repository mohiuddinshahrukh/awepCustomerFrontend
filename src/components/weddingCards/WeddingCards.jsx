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
          to="#"
          variant="text"
          size={"1.5rem"}
        >
          Wedding Cards
        </Anchor>
        <Button variant="outline" rightIcon={<IconArrowRight />}>
          View All Wedding Cards
        </Button>
      </Group>

      <WeddingCardsCarousel />
    </Container>
  );
};

export default WeddingCards;
