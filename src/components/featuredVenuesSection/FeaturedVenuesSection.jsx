import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVenuesCarousel from "./FeaturedVenuesCarousel";

const FeaturedVenuesSection = ({ landingPageVenues }) => {
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
          Top Rated Halls
        </Anchor>
        <Button
          component={Link}
          to="/allVenues"
          variant="outline"
          rightIcon={<IconArrowRight />}
          className="buttonOutline"
        >
          View All Venues
        </Button>
      </Group>
      <FeaturedVenuesCarousel landingPageVenues={landingPageVenues} />
    </Container>
  );
};

export default FeaturedVenuesSection;
