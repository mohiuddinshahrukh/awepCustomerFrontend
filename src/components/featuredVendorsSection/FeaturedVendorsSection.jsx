import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVendorsCarousel from "./FeaturedVendorsCarousel";

const FeaturedVendorsSection = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="center">
        <Anchor component={Link} to="#" variant="text" size={"1.5rem"}>
          Wedding Vendors
        </Anchor>
      </Group>
      <Group position="right" mb={"lg"}>
        <Button variant="outline" rightIcon={<IconArrowRight />}>
          View All Vendors
        </Button>
      </Group>

      <FeaturedVendorsCarousel />
    </Container>
  );
};

export default FeaturedVendorsSection;
