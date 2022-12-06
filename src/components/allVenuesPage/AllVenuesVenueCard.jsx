import {
  Anchor,
  Button,
  Card,
  Center,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";

import React from "react";
import { Link } from "react-router-dom";
import FeaturedVenuesCard from "../featuredVenuesSection/FeaturedVenuesCard";

const AllVenuesVenueCard = ({ allVenues, time, date }) => {
  const venues = allVenues?.map((venue, index) => {
    return (
      <FeaturedVenuesCard key={index} venue={venue} date={date} time={time} />
    );
  });

  return (
    <Center>
      <SimpleGrid
        // spacing={2}
        cols={3}
        breakpoints={[
          { maxWidth: 630, cols: 1 },
          { maxWidth: 1250, cols: 2 },
          // { minWidth: 1250, cols: 3 },
          // { minWidth: "lg", cols: 2 },
          // { minWidth: "xl", cols: 3 },
        ]}
      >
        {venues}
      </SimpleGrid>
    </Center>
  );
};

export default AllVenuesVenueCard;
