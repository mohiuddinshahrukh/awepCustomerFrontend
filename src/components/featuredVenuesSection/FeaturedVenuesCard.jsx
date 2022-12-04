import { Button, Card, Group, Image, Paper, Text } from "@mantine/core";
import {
  IconBuildingFortress,
  IconCash,
  IconStar,
  IconUsers,
  IconVideo,
} from "@tabler/icons";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const FeaturedVenuesCard = ({ venue, date, time }) => {
  const currentLocation = useLocation();
  const card = (
    <Card
      className="border"
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
      component={Link}
      to={
        date === null && time === null
          ? `/specificVenue/${venue._id}`
          : date === null && time !== null
          ? `/specificVenue/${venue._id}/${time}`
          : date !== null && time === null
          ? `/specificVenue/${venue._id}/${date}`
          : `/specificVenue/${venue._id}/${date}/${time}`
      }
      style={{ width: "302px" }}
    >
      <Card.Section style={{ height: "201px", position: "relative" }}>
        {currentLocation.pathname !== "/" && venue?.videos?.length > 0 ? (
          <video
            poster={venue?.coverImage}
            onMouseLeave={(e) => {
              e.target.pause();
            }}
            onMouseEnter={(e) => {
              e.target.play();
            }}
            style={{
              objectFit: "cover",
            }}
            height={"201px"}
            width={"100%"}
            muted="muted"
            src={venue?.videos[0]}
          />
        ) : (
          <Image
            height={"201px"}
            width={"100%"}
            fit={"cover"}
            src={venue?.coverImage}
          />
        )}
        {currentLocation.pathname !== "/" && venue?.videos?.length > 0 ? (
          <Group
            px={4}
            align={"center"}
            style={{
              backgroundColor: "rgba(230,0,132,0.75)",
              position: "absolute",
              top: 0,
              left: 0,
              margin: 8,
              borderRadius: "5px",
            }}
          >
            <IconVideo color="white" />
          </Group>
        ) : null}

        <div style={{ position: "absolute", bottom: 0, right: 0, margin: 8 }}>
          <Button
            component={Link}
            to={`/venueBooking/${venue._id}`}
            className="button"
            uppercase
          >
            Book Now
          </Button>
        </div>
      </Card.Section>
      <Card.Section>
        <Paper p={"md"}>
          <Text lineClamp={1} weight={500} size={"lg"}>
            {venue?.venueName}
          </Text>

          <Group noWrap>
            <Group spacing={3}>
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
            <Text lineClamp={1}>{venue?.venueCity}</Text>
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
      </Card.Section>
    </Card>
  );

  return <div>{card}</div>;
};

export default FeaturedVenuesCard;
