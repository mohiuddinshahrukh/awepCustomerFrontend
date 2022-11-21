import { Group, Image, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconBuildingFortress,
  IconCash,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import AllVenuesVenueListCarousel from "./AllVenuesVenueListCarousel";

const AllVenuesVenueList = ({ allVenues }) => {
  const list = allVenues.map((venue, index) => {
    return (
      <Paper
        component={Link}
        to={"#"}
        key={index}
        withBorder
        sx={{
          borderRadius: "0.5rem",
          ":hover": {
            boxShadow: "0 5px 12px #0003",

            // transform: "scale(1.005)",
          },
          boxShadow: "0 2px 8px #00000026",

          transition: "box-shadow .2s",
          transitionDuration: "0.2s",
          transitionTimingFunction: "ease",
          transitionDelay: "0s",
          transitionProperty: "box-shadow",
        }}
      >
        <Group
          noWrap
          style={{ overflowWrap: "break-word" }}
          align={"flex-start"}
        >
          <AllVenuesVenueListCarousel venueImages={venue.images} />
          <Paper py={"md"}>
            <Text weight={500} size={"lg"}>
              {venue.venueName}
            </Text>
            <Text lineClamp={1} color="dimmed" size={"md"}>
              {venue.venueAddress}
            </Text>

            <Group spacing={"md"} noWrap>
              <Group spacing={3} noWrap>
                <IconStar
                  size={20}
                  style={{ flexShrink: 0 }}
                  stroke={0}
                  fill={"#EDB100"}
                />
                <Text weight={500} size={"sm"}>
                  {venue?.rating.toFixed(1)}
                </Text>
                <Text color={"dimmed"} size={"sm"}>
                  ({venue?.ratingCount})
                </Text>
              </Group>
              <Group noWrap spacing={3} align={"center"}>
                {" "}
                <IconUsers size={18} stroke={1.5} />
                <Text>
                  {Math.min
                    .apply(
                      Math,
                      venue?.subVenues.map((subvenue) => {
                        return subvenue?.subVenueMinCapacity;
                      })
                    )
                    .toLocaleString()}
                </Text>
                to
                <Text>
                  {Math.max
                    .apply(
                      Math,
                      venue?.subVenues.map((subvenue) => {
                        return subvenue?.subVenueCapacity;
                      })
                    )
                    .toLocaleString()}
                </Text>
              </Group>
            </Group>

            <Group noWrap spacing={"lg"} align={"center"}>
              <Group spacing={3} noWrap align={"center"}>
                <IconBuildingFortress size={20} stroke={1.5} />
                <Text>
                  {venue?.subVenues.length === 1
                    ? venue?.subVenues.length + " Subvenue"
                    : venue?.subVenues.length + " Subvenues"}
                </Text>
              </Group>
              <Group noWrap align={"center"} spacing={3}>
                <IconCash stroke={1.5} size={20} />
                <Text>
                  from Rs.{" "}
                  {venue?.menus.length !== 0
                    ? Math.max
                        .apply(
                          Math,
                          venue?.menus.map((menu) => {
                            return menu.price;
                          })
                        )
                        .toLocaleString() + " (Per Head)"
                    : Math.max
                        .apply(
                          Math,
                          venue?.subVenues.map((subvenue) => {
                            return subvenue?.subVenueBookingCharges;
                          })
                        )
                        .toLocaleString() + " (Per Event)"}
                </Text>
              </Group>
            </Group>
            <Text lineClamp={2}>{venue.venueDescription}</Text>
          </Paper>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid>{list}</SimpleGrid>;
};

export default AllVenuesVenueList;
