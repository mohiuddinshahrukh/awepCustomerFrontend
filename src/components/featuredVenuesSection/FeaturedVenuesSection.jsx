import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVenuesCarousel from "./FeaturedVenuesCarousel";

const FeaturedVenuesSection = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          component={Link}
          to="/allVenues"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Wedding Venues
        </Anchor>
        <Button
          component={Link}
          to="/allVenues"
          variant="outline"
          rightIcon={<IconArrowRight />}
        >
          View All Venues
        </Button>
      </Group>
      <FeaturedVenuesCarousel />
    </Container>
  );
};

export default FeaturedVenuesSection;
