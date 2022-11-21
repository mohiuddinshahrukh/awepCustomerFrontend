import {
  Box,
  Center,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconLayoutCards, IconLayoutGrid } from "@tabler/icons";
import React, { useState } from "react";
import AllVenuesVenueCard from "./AllVenuesVenueCard";
import AllVenuesVenueList from "./AllVenuesVenueList";

const AllVenuesGrid = ({ allVenues }) => {
  const [viewStyle, setViewStyle] = useState("card");
  return (
    <Paper>
      <Group position="apart">
        <Text weight={500}>
          {allVenues.length > 1
            ? allVenues.length.toLocaleString() + " Results"
            : allVenues.length + "Result"}
        </Text>

        <SegmentedControl
          data={[
            {
              value: "card",
              label: (
                <Center>
                  <IconLayoutGrid size={16} />
                  <Box ml={10}>Card</Box>
                </Center>
              ),
            },
            {
              value: "list",
              label: (
                <Center>
                  <IconLayoutCards size={16} />
                  <Box ml={10}>List</Box>
                </Center>
              ),
            },
          ]}
          onChange={(value) => {
            console.log(value);
            setViewStyle(value);
          }}
        />
      </Group>

      {viewStyle === "card" ? (
        <AllVenuesVenueCard allVenues={allVenues} />
      ) : (
        <AllVenuesVenueList allVenues={allVenues} />
      )}
    </Paper>
  );
};

export default AllVenuesGrid;
