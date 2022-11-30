import { Paper } from "@mantine/core";
import React from "react";
import SearchBackground from "./searchAndBG/SearchBackground";
import img1 from "../../assets/searchBackgroundCarouselImages/1.jpg";
import img2 from "../../assets/searchBackgroundCarouselImages/2.jpg";
import img3 from "../../assets/searchBackgroundCarouselImages/3.jpg";
import img4 from "../../assets/searchBackgroundCarouselImages/4.jpg";
import img5 from "../../assets/searchBackgroundCarouselImages/5.jpg";
import img6 from "../../assets/searchBackgroundCarouselImages/6.jpg";
import img7 from "../../assets/searchBackgroundCarouselImages/7.jpg";
import img8 from "../../assets/searchBackgroundCarouselImages/8.jpg";
import img9 from "../../assets/searchBackgroundCarouselImages/9.jpg";
import img10 from "../../assets/searchBackgroundCarouselImages/10.jpg";
import img11 from "../../assets/searchBackgroundCarouselImages/11.jpg";

import FilterCards from "../filterCards/FilterCards";
import FeaturedVenuesSection from "../featuredVenuesSection/FeaturedVenuesSection";
import FeaturedVendorsSection from "../featuredVendorsSection/FeaturedVendorsSection";
import RealWeddingsSection from "../realWeddingsSection/RealWeddingsSection";
import CustomerTestimonials from "../customerTestimonials/CustomerTestimonials";
import WeddingCards from "../weddingCards/WeddingCards";
import RegisteredCities from "../registeredCities/RegisteredCities";
const LandingPageMain = () => {
  return (
    <Paper>
      <SearchBackground
        carouselImages={[
          { src: img1 },
          { src: img2 },
          { src: img3 },
          { src: img4 },
          { src: img5 },
          { src: img6 },
          { src: img7 },
          { src: img8 },
          { src: img9 },
          { src: img10 },
          { src: img11 },
        ]}
      />

      <FilterCards />
      <FeaturedVenuesSection />
      <FeaturedVendorsSection />
      <RealWeddingsSection />
      <CustomerTestimonials />
      <WeddingCards />
      <RegisteredCities />
    </Paper>
  );
};

export default LandingPageMain;
