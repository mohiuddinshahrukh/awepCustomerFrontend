import {
  Anchor,
  Card,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Skeleton,
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
import AllVenuesVenueCardCarousel from "../allVenuesPage/AllVenuesVenueCardCarousel";
import CardSkeleton from "./CardSkeleton";
// [...Array(10).keys()];
const SixCardsSkeleton = () => {
  const venues = [...Array(6).keys()]?.map((venue, index) => {
    return <CardSkeleton key={index} />;
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
      {venues}
    </SimpleGrid>
  );
};

export default SixCardsSkeleton;
