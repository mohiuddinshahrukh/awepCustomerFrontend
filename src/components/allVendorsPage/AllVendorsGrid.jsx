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
import {
  IconLayoutCards,
  IconLayoutGrid,
  IconSearch,
  IconX,
} from "@tabler/icons";
import React, { useState } from "react";
import AllVendorsVendorCard from "./AllVendorsVendorCard";
import AllVendorsVendorList from "./AllVendorsVendorList";

const AllVendorsGrid = ({
  allVendors,
  search,
  setSearch,
  vendorSort,
  setVendorSort,
  time,
  date,
}) => {
  const matches1026 = useMediaQuery("(max-width:1026px)");
  const [viewStyle, setViewStyle] = useState("card");
  return (
    <Paper>
      <Group position="apart" mb={"md"}>
        <Text weight={500} size={"lg"}>
          {allVendors?.length === 1
            ? allVendors?.length.toLocaleString() + " Result"
            : allVendors?.length + " Results"}
        </Text>

        <Group noWrap>
          {!matches1026 && (
            <>
              <TextInput
                icon={<IconSearch size={22} />}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                rightSection={
                  search !== "" && (
                    <IconX
                      style={{ cursor: "pointer" }}
                      size={22}
                      onClick={() => {
                        setSearch("");
                      }}
                    />
                  )
                }
              />
              {/* <Select
                defaultValue={vendorSort}
                onChange={setVendorSort}
                data={[
                  { value: "mostRelevant", label: "Most Relevant" },
                  { value: "views", label: "View Count" },
                  { value: "mostBooked", label: "Most Booked" },
                  { value: "recentlyAdded", label: "Recently Added" },
                ]}
              /> */}
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
        <AllVendorsVendorCard allVendors={allVendors} date={date} time={time} />
      ) : (
        <AllVendorsVendorList allVendors={allVendors} />
      )}
    </Paper>
  );
};

export default AllVendorsGrid;
