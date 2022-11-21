import { Card, Group, Image, Paper, Text } from "@mantine/core";
import {
  IconBuildingStore,
  IconCash,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const FeaturedVendorsCard = ({ vendor }) => {
  const card = (
    <Card
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
      to={"#"}
      style={{ width: "302px" }}
    >
      <Card.Section style={{ height: "201px" }}>
        <Image
          height={"201px"}
          width={"100%"}
          fit={"cover"}
          src={vendor?.coverImage}
        />
      </Card.Section>
      <Card.Section>
        <Paper p={"lg"}>
          <Text lineClamp={1} weight={500} size={"lg"}>
            {vendor?.vendorBusinessTitle}
          </Text>

          <Group spacing={3} noWrap>
            <IconStar
              size={20}
              style={{ flexShrink: 0 }}
              stroke={0}
              fill={"#EDB100"}
            />
            <Text weight={500} size={"sm"}>
              {vendor?.rating.toFixed(1)}
            </Text>
            <Text color={"dimmed"} size={"sm"}>
              ({vendor?.ratingCount})
            </Text>
            <Text lineClamp={1}>{vendor?.address}</Text>
          </Group>

          <Group noWrap spacing={"lg"} align={"center"}>
            <Group spacing={3} noWrap align={"center"}>
              <IconBuildingStore size={20} stroke={1.5} />
              <Text>
                {vendor?.vendorServicePackages?.length === 1
                  ? vendor?.vendorServicePackages?.length + " Package"
                  : vendor?.vendorServicePackages?.length + " Packages"}
              </Text>
            </Group>
            <Group noWrap spacing={3} align={"center"}>
              {" "}
              <IconUsers size={18} stroke={1.5} />
              <Text>
                {Math.min
                  .apply(
                    Math,
                    vendor?.subVenues?.map((subvenue) => {
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
                    vendor?.subVenues?.map((subvenue) => {
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
              {vendor?.menus?.length !== 0
                ? Math.max
                    .apply(
                      Math,
                      vendor?.menus?.map((menu) => {
                        return menu.price;
                      })
                    )
                    .toLocaleString() + " (Per Head)"
                : Math.max
                    .apply(
                      Math,
                      vendor?.subVenues?.map((subvenue) => {
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

export default FeaturedVendorsCard;
