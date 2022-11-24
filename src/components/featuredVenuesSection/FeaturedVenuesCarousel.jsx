import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import FeaturedVenuesCard from "./FeaturedVenuesCard";
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
    return () => {};
  }, []);

  const carouselSlides = landingPageVenues?.map((venue, index) => {
    return (
      <Carousel.Slide key={index}>
        <FeaturedVenuesCard venue={venue} />
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      styles={{ viewport: { padding: "20px 5px" } }}
      slideSize={"25% "}
      slideGap={"md"}
      align={"start"}
      slidesToScroll={"auto"}
      withControls={false}
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%" },
        { maxWidth: "sm", slideSize: "50%" },
        { maxWidth: "xs", slideSize: "100%" },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default FeaturedVenuesCarousel;
