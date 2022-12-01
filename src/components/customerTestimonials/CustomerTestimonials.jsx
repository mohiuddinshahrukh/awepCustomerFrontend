import { Anchor, Button, Container, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import CustomerTestimonialsCarousel from "./CustomerTestimonialsCarousel";

const CustomerTestimonials = ({ landingPageTestimonials }) => {
  return (
    <Container size={"xl"} my="xl">
      <Group position="apart">
        <Anchor
          weight={500}
          component={Link}
          to="#"
          variant="text"
          size={"1.5rem"}
        >
          Customer Testimonials
        </Anchor>
        <Button
          className="buttonOutline"
          component={Link}
          to="/addreview/admin"
          variant="outline"
          rightIcon={<IconArrowRight />}
        >
          Add Your Testimonial
        </Button>
      </Group>

      <CustomerTestimonialsCarousel
        landingPageTestimonials={landingPageTestimonials}
      />
    </Container>
  );
};

export default CustomerTestimonials;
