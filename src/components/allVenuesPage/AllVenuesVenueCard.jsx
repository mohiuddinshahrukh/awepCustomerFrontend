import {
  Anchor,
  Card,
  Group,
  Image,
  Paper,
  SimpleGrid,
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
import AllVenuesVenueCardCarousel from "./AllVenuesVenueCardCarousel";

const AllVenuesVenueCard = ({ allVenues }) => {
  const venues = allVenues?.map((venue, index) => {
    return (
      <Card
        key={index}
        radius={"md"}
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
        style={{ width: "302px" }}
      >
        <Card.Section style={{ height: "201px" }}>
          <AllVenuesVenueCardCarousel venueImages={venue.images} />
        </Card.Section>
        <Card.Section style={{ height: "154px" }}>
          <Anchor
            variant="text"
            component={Link}
            to={`/specificVenue${venue._id}`}
          >
            {" "}
            <Paper p={"lg"}>
              <Text lineClamp={1} weight={500} size={"lg"}>
                {venue?.venueName}
              </Text>

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
                <Text lineClamp={1}>{venue?.venueAddress}</Text>
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
                <Group noWrap spacing={3} align={"center"}>
                  {" "}
                  <IconUsers size={18} stroke={1.5} />
                  <Text>
                    {Math.min
                      .apply(
                        Math,
                        venue?.subVenues?.map((subvenue) => {
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
                        venue?.subVenues?.map((subvenue) => {
                          return subvenue?.subVenueCapacity;
                        })
                      )
                      .toLocaleString()}
                  </Text>
                </Group>
              </Group>

              <Group noWrap align={"center"} spacing={3}>
                <IconCash stroke={1.5} size={20} />
                <Text>
                  from Rs.{" "}
                  {venue?.menus.length !== 0
                    ? Math.max
                        .apply(
                          Math,
                          venue?.menus?.map((menu) => {
                            return menu.price;
                          })
                        )
                        .toLocaleString() + " (Per Head)"
                    : Math.max
                        .apply(
                          Math,
                          venue?.subVenues?.map((subvenue) => {
                            return subvenue?.subVenueBookingCharges;
                          })
                        )
                        .toLocaleString() + " (Per Event)"}
                </Text>
              </Group>
            </Paper>
          </Anchor>
        </Card.Section>
      </Card>
    );
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
      {venues}{" "}
    </SimpleGrid>
  );
};

export default AllVenuesVenueCard;
