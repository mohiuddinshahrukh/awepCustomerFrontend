import {
  Box,
  Center,
  Group,
  Paper,
  SegmentedControl,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconLayoutCards, IconLayoutGrid, IconSearch } from "@tabler/icons";
import React, { useState } from "react";
import AllVenuesVenueCard from "./AllVenuesVenueCard";
import AllVenuesVenueList from "./AllVenuesVenueList";

const AllVenuesGrid = ({
  allVenues,
  search,
  setSearch,
  venueSort,
  setVenueSort,
}) => {
  const matches1026 = useMediaQuery("(max-width: 1026px)");
  const [viewStyle, setViewStyle] = useState("card");
  console.log("Venue Sort Value", venueSort);
  return (
    <Paper>
      <Group position="apart" mb={"md"} align="flex-end">
        <Text weight={500} size={"lg"}>
          {allVenues?.length > 1
            ? allVenues?.length.toLocaleString() + " Results"
            : allVenues?.length + "Result"}
        </Text>

        <Group noWrap>
          {!matches1026 && (
            <>
              <TextInput
                icon={<IconSearch size={22} />}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
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
            </>
          )}
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
