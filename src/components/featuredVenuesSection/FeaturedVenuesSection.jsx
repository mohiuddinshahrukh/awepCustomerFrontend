import { Anchor, Button, Container, Divider, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVenuesCarousel from "./FeaturedVenuesCarousel";

const FeaturedVenuesSection = ({ landingPageVenues, date, time }) => {
  console.log("$LandingPageVenues: ", landingPageVenues);
  return (
    <Container size={"xl"} my="xl">
      <Divider my="lg" />
      <Group position="apart">
        <Anchor
          component={Link}
          to="/allVenues"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Top Rated Venues
        </Anchor>
      </Group>
      <FeaturedVenuesCarousel
        landingPageVenues={landingPageVenues}
        date={null}
        time={""}
      />
      <Group position="right">
        <Button
          component={Link}
          to="/allVenues"
          variant="outline"
          rightIcon={<IconArrowRight />}
          className="buttonOutline"
        >
          All Venues
        </Button>
      </Group>
    </Container>
  );
};

export default FeaturedVenuesSection;
