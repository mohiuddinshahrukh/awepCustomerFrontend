import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Card,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconBuildingStore, IconCash, IconStar } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVendorsCard from "../featuredVendorsSection/FeaturedVendorsCard";
import AllVendorsVendorImagesCarousel from "./AllVendorsVendorImagesCarousel";

const AllVendorsVendorCard = ({ allVendors }) => {
  const vendors = allVendors.map((vendor, index) => {
    return <FeaturedVendorsCard key={index} vendor={vendor} />;
  });
  return (
    <SimpleGrid
      cols={3}
      breakpoints={[
        { maxWidth: "xs", cols: 1 },
        { maxWidth: "sm", cols: 2 },
        { maxWidth: "md", cols: 2 },
        { maxWidth: "lg", cols: 3 },
        { maxWidth: "xl", cols: 3 },
      ]}
    >
      {vendors}{" "}
    </SimpleGrid>
  );
};

export default AllVendorsVendorCard;
