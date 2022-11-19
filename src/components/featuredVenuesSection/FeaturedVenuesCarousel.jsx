import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import { Card, Group, Image, Paper, Text } from "@mantine/core";
import { IconStar } from "@tabler/icons";
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
            <Card shadow={"sm"} style={{ width: "302px" }} withBorder>
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

                  <Group spacing={3}>
                    <IconStar size={20} stroke={0} fill={"#EDB100"} />
                    <Text weight={500} size={"sm"}>
                      {venue.rating.toFixed(1)}
                    </Text>
                    <Text color={"dimmed"} size={"sm"}>
                      ({venue.ratingCount})
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
