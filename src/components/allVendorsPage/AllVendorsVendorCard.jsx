import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Card,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconBuildingStore, IconCash, IconStar } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import AllVendorsVendorImagesCarousel from "./AllVendorsVendorImagesCarousel";

const AllVendorsVendorCard = ({ allVendors }) => {
  const vendors = allVendors.map((vendor, index) => {
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
          <AllVendorsVendorImagesCarousel vendorImages={vendor.images} />
        </Card.Section>
        <Card.Section>
          <Anchor
            variant="text"
            component={Link}
            to={`/specificVendor${vendor._id}`}
          >
            {" "}
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
      {vendors}{" "}
    </SimpleGrid>
  );
};

export default AllVendorsVendorCard;
