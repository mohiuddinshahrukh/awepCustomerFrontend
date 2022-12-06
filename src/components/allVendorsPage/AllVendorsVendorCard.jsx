import { Carousel } from "@mantine/carousel";
import { Center, SimpleGrid } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVendorsCard from "../featuredVendorsSection/FeaturedVendorsCard";
import AllVendorsVendorImagesCarousel from "./AllVendorsVendorImagesCarousel";

const AllVendorsVendorCard = ({ allVendors, time, date }) => {
  const vendors = allVendors.map((vendor, index) => {
    return (
      <FeaturedVendorsCard
        key={index}
        vendor={vendor}
        date={date}
        time={time}
      />
    );
  });
  return (
    <Center>
      {" "}
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 630, cols: 1 },
          { maxWidth: 1250, cols: 2 },
          // { maxWidth: "xs", cols: 1 },
          // { maxWidth: "sm", cols: 2 },
          // { maxWidth: "md", cols: 3 },
          // { maxWidth: "lg", cols: 3 },
          // { maxWidth: "xl", cols: 3 },
        ]}
      >
        {vendors}
      </SimpleGrid>
    </Center>
  );
};

export default AllVendorsVendorCard;
