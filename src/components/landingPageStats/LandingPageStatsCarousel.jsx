import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";

import FiveCardsSkeleton from "../skeletons/SixCardsSkeleton";
import CardSkeleton from "../skeletons/CardSkeleton";
import { IconArrowRight, IconArrowRightBar } from "@tabler/icons";
import LandingPageStatsCards from "./LandingPageStatsCards";

const LandingPageStatsCarousel = ({ landingPageStats, entry, ref }) => {
  console.log("LandingPageVenues: ", landingPageStats);
  let carouselSlides = !landingPageStats
    ? [...Array(5).keys()]?.map((key) => (
        <Carousel.Slide key={key}>
          <CardSkeleton />
        </Carousel.Slide>
      ))
    : landingPageStats?.map((stat, index) => {
        return (
          <Carousel.Slide key={index}>
            <LandingPageStatsCards stat={stat} entry={entry} ref={ref} />
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

export default LandingPageStatsCarousel;
