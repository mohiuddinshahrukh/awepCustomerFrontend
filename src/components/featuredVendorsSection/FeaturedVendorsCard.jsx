import { Button, Card, Group, Image, Paper, Text } from "@mantine/core";
import {
  IconBuildingStore,
  IconCash,
  IconClock,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link, useParams } from "react-router-dom";

const FeaturedVendorsCard = ({ vendor, date, time }) => {
  const params = useParams();

  let paramDate = params.date;
  let paramsTime = params.time;
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
        date === null && time === ""
          ? `/specificVendor/${vendor._id}`
          : date === null && time !== ""
          ? `/specificVendor/${vendor._id}/time/${time}`
          : date !== null && time === ""
          ? `/specificVendor/${vendor._id}/date/${date}`
          : date !== null && time !== ""
          ? `/specificVendor/${vendor._id}/${date}/${time}`
          : `/specificVendor/${vendor._id}`
      }
      style={{ width: "302px" }}
    >
      <Card.Section style={{ height: "201px", position: "relative" }}>
        <Image
          height={"201px"}
          width={"100%"}
          fit={"cover"}
          src={vendor?.coverImage}
        />
        <div style={{ position: "absolute", bottom: 0, right: 0, margin: 8 }}>
          <Button
            component={Link}
            to={
              date && time
                ? `/vendorBooking/date/${date}/time/${time}/${vendor._id}`
                : date && !time
                ? `/vendorBooking/date/${date}/${vendor._id}`
                : time && !date
                ? `/vendorBooking/time/${time}/${vendor._id}`
                : `/vendorBooking/${vendor._id}`
            }
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
            {vendor?.vendorBusinessTitle}
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
                {vendor?.rating.toFixed(1)}
              </Text>
              <Text color={"dimmed"} size={"sm"}>
                ({vendor?.ratingCount})
              </Text>
            </Group>
            <Text lineClamp={1}>{vendor?.city}</Text>
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
