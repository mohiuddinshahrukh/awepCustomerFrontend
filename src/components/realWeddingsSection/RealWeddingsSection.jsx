import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

import RealWeddingsCarousel from "./RealWeddingCarousel";

const RealWeddingsSection = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          component={Link}
          weight={500}
          to="#"
          variant="text"
          size={"1.5rem"}
        >
          Real Weddings
        </Anchor>
        <Button variant="outline" rightIcon={<IconArrowRight />}>
          View More Real Weddings
        </Button>
      </Group>
      <RealWeddingsCarousel />
    </Container>
  );
};

export default RealWeddingsSection;
