import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import CustomerTestimonialsCard from "./CustomerTestimonialsCard";
const CustomerTestimonialsCarousel = ({ landingPageTestimonials }) => {
  const carouselSlides = landingPageTestimonials?.map((testimonial, index) => {
    return (
      <Carousel.Slide key={index}>
        <CustomerTestimonialsCard testimonial={testimonial} />
      </Carousel.Slide>
    );
  });
  return (
    <Carousel
      draggable={false}
      styles={{ viewport: { padding: "20px 5px" } }}
      slideSize={"25% "}
      align={"start"}
      slidesToScroll={"auto"}
      withControls={false}
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%" },
        { maxWidth: "sm", slideSize: "75%" },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default CustomerTestimonialsCarousel;
