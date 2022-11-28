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
const FiveCardsSkeleton = () => {
  const venues = [...Array(5).keys()]?.map((venue, index) => {
    return <CardSkeleton key={index} />;
  });

  return venues;
};

export default FiveCardsSkeleton;
