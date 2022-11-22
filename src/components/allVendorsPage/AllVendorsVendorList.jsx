import { Anchor, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconBuildingFortress,
  IconBuildingStore,
  IconCash,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import AllVendorsVendorListCarousel from "./AllVendorsVendorListCarousel";

const AllVendorsVendorList = ({ allVendors }) => {
  const list = allVendors?.map((vendor, index) => {
    return (
      <Paper
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
        {" "}
        <Group
          noWrap
          style={{ overflowWrap: "break-word" }}
          align={"flex-start"}
        >
          <AllVendorsVendorListCarousel vendorImages={vendor.images} />
          <Anchor
            variant="text"
            component={Link}
            to={`/specificVendor${vendor._id}`}
          >
            <Paper py={"md"}>
              <Text weight={500} size={"lg"}>
                {vendor.vendorBusinessTitle}
              </Text>
              <Text lineClamp={1} color="dimmed" size={"md"}>
                {vendor.address}
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
                    {vendor?.rating.toFixed(1)}
                  </Text>
                  <Text color={"dimmed"} size={"sm"}>
                    ({vendor?.ratingCount})
                  </Text>
                </Group>
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
              </Group>
              <Text lineClamp={2}>{vendor?.vendorBusinessDescription}</Text>
            </Paper>
          </Anchor>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid>{list}</SimpleGrid>;
};

export default AllVendorsVendorList;
