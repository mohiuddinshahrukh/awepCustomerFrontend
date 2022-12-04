import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedMenusCarousel from "./FeaturedMenusCarousel";

const FeaturedMenus = ({ landingPageMenus }) => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          component={Link}
          to="/"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Top Booked Venue Menus
        </Anchor>
        <Button
          component={Link}
          to="/"
          variant="outline"
          rightIcon={<IconArrowRight />}
          className="buttonOutline"
        >
          View All Menus
        </Button>
      </Group>
      <FeaturedMenusCarousel landingPageMenus={landingPageMenus} />
    </Container>
  );
};

export default FeaturedMenus;
