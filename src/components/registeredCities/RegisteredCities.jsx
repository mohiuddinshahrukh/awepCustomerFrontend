import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import RegisteredCitiesCarousel from "./RegisteredCitiesCarousel";

const RegisteredCities = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          weight={500}
          component={Link}
          to="/allVendors"
          variant="text"
          size={"1.5rem"}
        >
          Our Cities
        </Anchor>
        <Button
          className="buttonOutline"
          component={Link}
          to="/allVendors"
          variant="outline"
          rightIcon={<IconArrowRight />}
        >
          View All Cities
        </Button>
      </Group>

      <RegisteredCitiesCarousel />
    </Container>
  );
};

export default RegisteredCities;
