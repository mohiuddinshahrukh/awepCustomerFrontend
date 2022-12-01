import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVendorServicesCarousel from "./FeaturedVendorServicesCarousel";

const FeaturedVendorServicesSection = ({ vendorServices }) => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          component={Link}
          to="/allVendors"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Vendor Services
        </Anchor>
        <Button
          component={Link}
          to="/allVendors"
          variant="outline"
          rightIcon={<IconArrowRight />}
          className="buttonOutline"
        >
          View All Vendor Services
        </Button>
      </Group>
      <FeaturedVendorServicesCarousel vendorServices={vendorServices} />
    </Container>
  );
};

export default FeaturedVendorServicesSection;
