import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import FeaturedVenuesCard from "./FeaturedVenuesCard";
import FiveCardsSkeleton from "../skeletons/SixCardsSkeleton";
import CardSkeleton from "../skeletons/CardSkeleton";
import { IconArrowRight, IconArrowRightBar } from "@tabler/icons";

const FeaturedVenuesCarousel = ({ landingPageVenues, date, time }) => {
  console.log("LandingPageVenues: ", landingPageVenues);
  let carouselSlides = !landingPageVenues
    ? [...Array(5).keys()]?.map((key) => (
        <Carousel.Slide key={key}>
          <CardSkeleton />
        </Carousel.Slide>
      ))
    : landingPageVenues?.map((venue, index) => {
        return (
          <Carousel.Slide key={index}>
            <FeaturedVenuesCard venue={venue} date={null} time={null} />
          </Carousel.Slide>
        );
      });

  return (
    <Carousel
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
        viewport: { padding: "20px 5px" },
      }}
      slideSize={"25%"}
      slideGap={0}
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

export default FeaturedVenuesCarousel;
