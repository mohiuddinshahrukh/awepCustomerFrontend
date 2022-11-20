import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import CustomerTestimonialsCarousel from "./CustomerTestimonialsCarousel";

const CustomerTestimonials = () => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="center">
        <Anchor component={Link} to="#" variant="text" size={"1.5rem"}>
          Customer Testimonials
        </Anchor>
      </Group>
      <Group position="right" mb={"lg"}>
        <Button variant="outline" rightIcon={<IconArrowRight />}>
          View All Testimonials
        </Button>
      </Group>

      <CustomerTestimonialsCarousel />
    </Container>
  );
};

export default CustomerTestimonials;
