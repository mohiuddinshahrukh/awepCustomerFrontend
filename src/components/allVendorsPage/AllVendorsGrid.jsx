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
import AllVendorsVendorCard from "./AllVendorsVendorCard";
import AllVendorsVendorList from "./AllVendorsVendorList";

const AllVendorsGrid = ({ allVendors }) => {
  const [vendorSort, setVendorSort] = useState("mostRelevant");
  const [viewStyle, setViewStyle] = useState("card");
  return (
    <Paper>
      <Group position="apart" mb={"md"} align="flex-end">
        <Text weight={500} size={"lg"}>
          {allVendors?.length > 1
            ? allVendors?.length.toLocaleString() + " Results"
            : allVendors?.length + "Result"}
        </Text>

        <Group>
          <Select
            defaultValue={vendorSort}
            onChange={setVendorSort}
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
        <AllVendorsVendorCard allVendors={allVendors} />
      ) : (
        <AllVendorsVendorList allVendors={allVendors} />
      )}
    </Paper>
  );
};

export default AllVendorsGrid;
