import {
  Box,
  Center,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Text,
} from "@mantine/core";
import { IconLayoutCards, IconLayoutGrid } from "@tabler/icons";
import React, { useState } from "react";
import AllVenuesVenueCard from "./AllVenuesVenueCard";
import AllVenuesVenueList from "./AllVenuesVenueList";

const AllVenuesGrid = ({ allVenues }) => {
  const [venueSort, setVenueSort] = useState("mostRelevant");
  const [viewStyle, setViewStyle] = useState("card");
  console.log("Venue Sort Value", venueSort);
  return (
    <Paper>
      <Group position="apart" mb={"md"}>
        <Text weight={500}>
          {allVenues.length > 1
            ? allVenues.length.toLocaleString() + " Results"
            : allVenues.length + "Result"}
        </Text>

        <Group>
          <Select
            defaultValue={venueSort}
            onChange={setVenueSort}
            data={[
              { value: "mostRelevant", label: "Most Relevant" },
              { value: "views", label: "View Count" },
              { value: "mostBooked", label: "Most Booked" },
              { value: "recentlyAdded", label: "Recently Added" },
            ]}
          />
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
