import { Carousel } from "@mantine/carousel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FeaturedMenus from "./FeaturedMenus";
import FeaturedMenusCard from "./FeaturedMenusCard";

const FeaturedMenusCarousel = ({ landingPageMenus }) => {
  let carouselSlides = !landingPageMenus
    ? [...Array(5).keys()]?.map((key) => (
        <Carousel.Slide key={key}>{/* <CardSkeleton />*/}</Carousel.Slide>
      ))
    : landingPageMenus?.map((menu, index) => {
        return (
          <Carousel.Slide key={index}>
            <FeaturedMenusCard menu={menu} />
          </Carousel.Slide>
        );
      });
  return (
    <Carousel
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

export default FeaturedMenusCarousel;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Carousel } from "@mantine/carousel";
// import FeaturedVenuesCard from "./FeaturedVenuesCard";
// import FiveCardsSkeleton from "../skeletons/SixCardsSkeleton";
// import CardSkeleton from "../skeletons/CardSkeleton";
