import { Anchor, Button, Container, Divider, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVendorsCarousel from "./FeaturedVendorsCarousel";

const FeaturedVendorsSection = ({ landingPageVendors }) => {
  return (
    <Container size={"xl"} my="xl">
      <Divider my="lg" />
      <Group position="apart">
        <Anchor
          component={Link}
          to="/allVendors"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Top Rated Vendors
        </Anchor>
      </Group>

      <FeaturedVendorsCarousel landingPageVendors={landingPageVendors} />

      <Group position="right">
        <Button
          component={Link}
          to="/allVendors"
          variant="outline"
          rightIcon={<IconArrowRight />}
          className="buttonOutline"
        >
          All Vendors
        </Button>
      </Group>
    </Container>
  );
};

export default FeaturedVendorsSection;
