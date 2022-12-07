import { Carousel } from "@mantine/carousel";
import React from "react";
import CardSkeleton from "../skeletons/CardSkeleton";
import FeaturedVendorServicesCard from "./FeaturedVendorServicesCard";

const FeaturedVendorServicesCarousel = ({ vendorServices }) => {
  let carouselSlides = !vendorServices
    ? [...Array(5).keys()]?.map((key) => (
        <Carousel.Slide key={key}>
          <CardSkeleton />
        </Carousel.Slide>
      ))
    : vendorServices?.map((service, index) => {
        return (
          <Carousel.Slide key={index}>
            <FeaturedVendorServicesCard service={service} />
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
      align={"start"}
      slidesToScroll={1}
      slideSize={"25% "}
      breakpoints={[{ maxWidth: "md", slideSize: "33.33333333%", slideGap: 10 },
        { maxWidth: "lg", slideSize: "33.33333333%", slideGap: 10 },
        { maxWidth: "xl", slideSize: "25%", slideGap: 10 },
        { maxWidth: "sm", slideSize: "75%", slideGap: 10 },      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default FeaturedVendorServicesCarousel;
