import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVenuesCarousel from "./FeaturedVenuesCarousel";

const FeaturedVenuesSection = () => {
  return (
    <Container size={"xl"} mt="xl">
      <Group position="center">
        <Anchor component={Link} to="#" variant="text" size={"1.5rem"}>
          Wedding Venues
        </Anchor>
      </Group>
      <Group position="right">
        <Button color={"dark"} variant="outline" rightIcon={<IconArrowRight />}>
          View All Venues
        </Button>
      </Group>

      <FeaturedVenuesCarousel />
    </Container>
  );
};

export default FeaturedVenuesSection;
