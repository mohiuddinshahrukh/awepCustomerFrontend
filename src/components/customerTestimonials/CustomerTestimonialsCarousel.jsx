import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@mantine/carousel";
import CustomerTestimonialsCard from "./CustomerTestimonialsCard";

const fetchTestimonialsMehtod = async () => {
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
const CustomerTestimonialsCarousel = () => {
  const [landingPageTestimonials, setLandingPageTestimonials] = useState([]);
  useEffect(() => {
    fetchTestimonialsMehtod().then(setLandingPageTestimonials);
    return () => {};
  }, []);
  const carouselSlides = landingPageTestimonials.map((testimonial, index) => {
    return (
      <Carousel.Slide key={index}>
        <CustomerTestimonialsCard testimonial={testimonial} />
      </Carousel.Slide>
    );
  });
  return (
    <Carousel
      styles={{ viewport: { padding: "20px 5px" } }}
      slideSize={"25% "}
      slideGap={"md"}
      align={"start"}
      slidesToScroll={4}
      withControls={false}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default CustomerTestimonialsCarousel;
