import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import FeaturedVendorsCard from "./FeaturedVendorsCard";
import CardSkeleton from "../skeletons/CardSkeleton";
const fetchVendorsMethod = async () => {
  try {
    const apiResponse = await axios.get(
      "https://a-wep.herokuapp.com/auth/user/getHomeScreenData"
    );
    if (apiResponse.data.status === "success") {
      console.log("API RESPONSE SUCCESS: ", apiResponse);
      return apiResponse.data.data.topRatedVendors;
    } else if (apiResponse.data.status === "error") {
      console.log("API RESPONSE SUCCESS: ", apiResponse);
    } else {
      console.log("DONT KNOW THE ERROR, THIS SHOULDNT PRINT!");
    }
  } catch (error) {
    console.log("fetchVendorsMethod API CALLING ERROR:", error);
  }
};

const FeaturedVendorsCarousel = () => {
  const [landingPageVendors, setLandingPageVendors] = useState([]);
  useEffect(() => {
    fetchVendorsMethod().then(setLandingPageVendors);
    return () => {};
  }, []);

  let carouselSlides =
    landingPageVendors?.length === 0
      ? [...Array(5).keys()]?.map((key) => (
          <Carousel.Slide key={key}>
            <CardSkeleton />
          </Carousel.Slide>
        ))
      : landingPageVendors?.map((vendor, index) => {
          return (
            <Carousel.Slide key={index}>
              <FeaturedVendorsCard vendor={vendor} />
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

export default FeaturedVendorsCarousel;
