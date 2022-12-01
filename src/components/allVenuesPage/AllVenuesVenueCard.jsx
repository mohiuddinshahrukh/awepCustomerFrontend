import {
  Anchor,
  Button,
  Card,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import {
  IconBuildingFortress,
  IconCash,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import FeaturedVenuesCard from "../featuredVenuesSection/FeaturedVenuesCard";
import AllVenuesVenueCardCarousel from "./AllVenuesVenueCardCarousel";

const AllVenuesVenueCard = ({ allVenues }) => {
  const venues = allVenues?.map((venue, index) => {
    return <FeaturedVenuesCard key={index} venue={venue} />;
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
      {venues}{" "}
    </SimpleGrid>
  );
};

export default AllVenuesVenueCard;
