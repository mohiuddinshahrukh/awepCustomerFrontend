import { Anchor, Button, Container, Divider, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import LandingPageStatsCarousel from "./LandingPageStatsCarousel";

const LandingPageStats = ({ landingPageStats, entry, ref }) => {
  console.log("$LandingPageVenues: ", landingPageStats);
  return (
    <Container size={"xl"} my="xl">
      <Divider my="lg" />
      <Group position="apart">
        <Anchor
          component={Link}
          to="#"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Our Statistics
        </Anchor>
      </Group>
      <LandingPageStatsCarousel
        landingPageStats={landingPageStats}
        entry={entry}
        ref={ref}
      />
    </Container>
  );
};

export default LandingPageStats;

// <Group position="right">
// <Button
//   component={Link}
//   to="/allVenues"
//   variant="outline"
//   rightIcon={<IconArrowRight />}
//   className="buttonOutline"
// >
//   All Venues
// </Button>
// </Group>
