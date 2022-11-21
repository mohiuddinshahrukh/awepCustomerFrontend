import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import RegisteredCitiesCarousel from "./RegisteredCitiesCarousel";

const RegisteredCities = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="center">
        <Anchor component={Link} to="#" variant="text" size={"1.5rem"}>
          Our Cities
        </Anchor>
      </Group>
      <Group position="right" mb={"lg"}>
        <Button variant="outline" rightIcon={<IconArrowRight />}>
          View All Cities
        </Button>
      </Group>

      <RegisteredCitiesCarousel />
    </Container>
  );
};

export default RegisteredCities;
