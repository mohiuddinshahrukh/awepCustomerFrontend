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
import React, { useEffect, useState } from "react";
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
  const matches650 = useMediaQuery("(min-width: 650px)");
  const [viewStyle, setViewStyle] = useState("card");

  console.log("Venue Sort Value", venueSort);

  // useEffect(() => {
  //   if (!matches650 && viewStyle === "list") {
  //     setViewStyle("card");
  //     // setDisabled(true);
  //   } else {
  //     // setDisabled(false);
  //   }
  // }, [viewStyle, matches650]);
  return (
    <Paper>
      <Group position="apart" mb={"md"} align="center" noWrap>
        <Group noWrap spacing={0}>
          <Text weight={500} size={"lg"}>
            {allVenues?.length === 1
              ? allVenues?.length.toLocaleString() + " Result"
              : allVenues?.length + " Results"}
          </Text>
        </Group>

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
                defaultValue={venueSort}
                onChange={setVenueSort}
                data={[
                  { value: "mostRelevant", label: "Most Relevant" },
                  { value: "views", label: "View Count" },
                  { value: "mostBooked", label: "Most Booked" },
                  { value: "recentlyAdded", label: "Recently Added" },
                ]}
              /> */}
            </>
          )}
          <Group>
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
