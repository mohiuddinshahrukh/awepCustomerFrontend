import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import { Card, Group, Image, Paper, Text } from "@mantine/core";
import {
  IconBuildingArch,
  IconBuildingFortress,
  IconCash,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import { Link } from "react-router-dom";
const fetchVenuesMethod = async () => {
  try {
    const apiResponse = await axios.get(
      "https://a-wep.herokuapp.com/auth/user/getHomeScreenData"
    );
    if (apiResponse.data.status === "success") {
      console.log("API RESPONSE SUCCESS: ", apiResponse);
      return apiResponse.data.venueData;
    } else if (apiResponse.data.status === "error") {
      console.log("API RESPONSE SUCCESS: ", apiResponse);
    } else {
      console.log("DONT KNOW THE ERROR, THIS SHOULDNT PRINT!");
    }
  } catch (error) {
    console.log("fetchVenuesMethod API CALLING ERROR:", error);
  }
};

const FeaturedVenuesCarousel = () => {
  const [landingPageVenues, setLandingPageVenues] = useState([]);
  useEffect(() => {
    fetchVenuesMethod().then(setLandingPageVenues);

    console.count("USE EFFECT: ");

    return () => {
      console.count("CLEAN UP: ");
    };
  }, []);

  return (
    <Carousel
      slideSize={"25% "}
      slideGap={"md"}
      align={"start"}
      slidesToScroll={4}
      withControls={false}
      withIndicators
    >
      {landingPageVenues.map((venue, index) => {
        return (
          <Carousel.Slide key={index}>
            <Card
              sx={{
                ":hover": { boxShadow: "1px 1px 3px rgba(0, 0, 0, .25)" },
                transition: "0.3s",
              }}
              shadow={"sm"}
              component={Link}
              to={"#"}
              style={{ width: "302px" }}
              withBorder
            >
              <Card.Section style={{ height: "201px" }}>
                <Image
                  height={"201px"}
                  width={"100%"}
                  fit={"cover"}
                  src={venue.coverImage}
                />
              </Card.Section>
              <Card.Section>
                <Paper p={"lg"}>
                  <Text lineClamp={1} weight={500} size={"lg"}>
                    {venue.venueName}
                  </Text>

                  <Group spacing={3} noWrap>
                    <IconStar
                      size={20}
                      style={{ flexShrink: 0 }}
                      stroke={0}
                      fill={"#EDB100"}
                    />
                    <Text weight={500} size={"sm"}>
                      {venue.rating.toFixed(1)}
                    </Text>
                    <Text color={"dimmed"} size={"sm"}>
                      ({venue.ratingCount})
                    </Text>
                    <Text lineClamp={1}>{venue.venueAddress}</Text>
                  </Group>

                  <Group noWrap spacing={"lg"} align={"center"}>
                    <Group spacing={3} noWrap align={"center"}>
                      <IconBuildingFortress size={20} stroke={1.5} />
                      <Text>
                        {venue.subVenues.length === 1
                          ? venue.subVenues.length + " Subvenue"
                          : venue.subVenues.length + " Subvenues"}
                      </Text>
                    </Group>
                    <Group noWrap spacing={3} align={"center"}>
                      {" "}
                      <IconUsers size={18} stroke={1.5} />
                      <Text>
                        {Math.min
                          .apply(
                            Math,
                            venue.subVenues.map((subvenue) => {
                              return subvenue.subVenueMinCapacity;
                            })
                          )
                          .toLocaleString()}
                      </Text>
                      to
                      <Text>
                        {Math.max
                          .apply(
                            Math,
                            venue.subVenues.map((subvenue) => {
                              return subvenue.subVenueCapacity;
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
                      {venue.menus.length !== 0
                        ? Math.max
                            .apply(
                              Math,
                              venue.menus.map((menu) => {
                                return menu.price;
                              })
                            )
                            .toLocaleString() + " (Per Head)"
                        : Math.max
                            .apply(
                              Math,
                              venue.subVenues.map((subvenue) => {
                                return subvenue.subVenueBookingCharges;
                              })
                            )
                            .toLocaleString() + " (Per Event)"}
                    </Text>
                  </Group>
                </Paper>
              </Card.Section>
            </Card>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default FeaturedVenuesCarousel;
