import { Card, Group, Image, Paper, Text } from "@mantine/core";
import {
  IconBuildingStore,
  IconCash,
  IconClock,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const FeaturedVendorsCard = ({ vendor }) => {
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
      to={`/specificVendor${vendor._id}`}
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
        <Paper p={"md"}>
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
            {/*            <Group noWrap spacing={3} align={"center"}>
              {" "}
              <IconClock size={18} stroke={1.5} />
              <Text>{vendor?.vendorServicePackages.packageDuration}</Text>
            </Group>*/}
          </Group>

          <Group noWrap align={"center"} spacing={3}>
            <IconCash stroke={1.5} size={20} />
            from Rs.{" "}
            {vendor?.vendorServicePackages?.length > 1 ? (
              <>
                {" "}
                <Text>
                  {Math.min
                    .apply(
                      Math,
                      vendor?.vendorServicePackages?.map((service) => {
                        return service?.price;
                      })
                    )
                    .toLocaleString()}
                </Text>
                to
                <Text>
                  {Math.max
                    .apply(
                      Math,
                      vendor?.vendorServicePackages?.map((service) => {
                        return service?.price;
                      })
                    )
                    .toLocaleString()}
                </Text>
              </>
            ) : (
              <Text>
                {Math.max
                  .apply(
                    Math,
                    vendor?.vendorServicePackages?.map((service) => {
                      return service?.price;
                    })
                  )
                  .toLocaleString()}
              </Text>
            )}
          </Group>
        </Paper>
      </Card.Section>
    </Card>
  );

  return <div>{card}</div>;
};

export default FeaturedVendorsCard;
