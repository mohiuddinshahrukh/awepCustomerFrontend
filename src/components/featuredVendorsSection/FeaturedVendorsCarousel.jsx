import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import FeaturedVendorsCard from "./FeaturedVendorsCard";
import CardSkeleton from "../skeletons/CardSkeleton";
const FeaturedVendorsCarousel = ({ landingPageVendors }) => {
  let carouselSlides = !landingPageVendors
    ? [...Array(5).keys()]?.map((key) => (
        <Carousel.Slide key={key}>
          <CardSkeleton />
        </Carousel.Slide>
      ))
    : landingPageVendors?.map((vendor, index) => {
        return (
          <Carousel.Slide key={index}>
            <FeaturedVendorsCard vendor={vendor} />
          </Carousel.Slide>
        );
      });

  return (
    <Carousel
      styles={{ viewport: { padding: "20px 5px" } }}
      slideSize={"25% "}
      align={"start"}
      slidesToScroll={"auto"}
      withControls={false}
      loop
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%" },
        { maxWidth: "sm", slideSize: "75%" },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default FeaturedVendorsCarousel;
