import { Carousel } from "@mantine/carousel";
import React from "react";
import CardSkeleton from "../skeletons/CardSkeleton";
import FeaturedVendorServicesCard from "./FeaturedVendorServicesCard";

const FeaturedVendorServicesCarousel = ({ vendorServices }) => {
  console.log("$VENDOR SERVICES", vendorServices);
  let carouselSlides =
    vendorServices?.length === 0
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
      styles={{ viewport: { padding: "20px 5px" } }}
      slideSize={"25% "}
      slideGap={"md"}
      align={"start"}
      slidesToScroll={"auto"}
      withControls={false}
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%" },
        { maxWidth: "sm", slideSize: "50%" },
        { maxWidth: "xs", slideSize: "100%" },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default FeaturedVendorServicesCarousel;
