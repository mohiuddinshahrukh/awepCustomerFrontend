import { Paper } from "@mantine/core";
import React from "react";
import SearchBackground from "./searchAndBG/SearchBackground";
import img1 from "../../assets/searchBackgroundCarouselImages/1.jpg";
import img2 from "../../assets/searchBackgroundCarouselImages/2.jpg";
import img3 from "../../assets/searchBackgroundCarouselImages/3.jpg";
import img4 from "../../assets/searchBackgroundCarouselImages/4.jpg";

import FilterCards from "../filterCards/FilterCards";
import FeaturedVenuesSection from "../featuredVenuesSection/FeaturedVenuesSection";
const LandingPageMain = () => {
  return (
    <Paper>
      <SearchBackground
        carouselImages={[
          { src: img1 },
          { src: img2 },
          { src: img3 },
          { src: img4 },
        ]}
      />

      <FilterCards />
      <FeaturedVenuesSection />
    </Paper>
  );
};

export default LandingPageMain;
