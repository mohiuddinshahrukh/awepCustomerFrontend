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
      // draggable={false}
      styles={{
        viewport: { padding: "20px 5px" },
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
      slideSize={"25% "}
      align={"start"}
      slidesToScroll={1}
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%", slideGap: 10 },
        { maxWidth: "lg", slideSize: "33.33333333%", slideGap: 10 },
        { maxWidth: "xl", slideSize: "25%", slideGap: 10 },
        { maxWidth: "sm", slideSize: "75%", slideGap: 10 },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default CustomerTestimonialsCarousel;
