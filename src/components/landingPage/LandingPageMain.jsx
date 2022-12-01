import { Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
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
import img12 from "../../assets/searchBackgroundCarouselImages/11.jpg";
import img13 from "../../assets/searchBackgroundCarouselImages/11.jpg";
import img14 from "../../assets/searchBackgroundCarouselImages/11.jpg";
import img15 from "../../assets/searchBackgroundCarouselImages/11.jpg";

import FilterCards from "../filterCards/FilterCards";
import FeaturedVenuesSection from "../featuredVenuesSection/FeaturedVenuesSection";
import FeaturedVendorsSection from "../featuredVendorsSection/FeaturedVendorsSection";
import RealWeddingsSection from "../realWeddingsSection/RealWeddingsSection";
import CustomerTestimonials from "../customerTestimonials/CustomerTestimonials";
import WeddingCards from "../weddingCards/WeddingCards";
import RegisteredCities from "../registeredCities/RegisteredCities";
import axios from "axios";

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

const LandingPageMain = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    fetchVenuesMethod().then(setAllData);
  }, []);

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
          { src: img12 },
          { src: img13 },
          { src: img14 },
          { src: img15 },
        ]}
      />

      <FilterCards />
      <FeaturedVenuesSection />
      <FeaturedVendorsSection />
      {/* <RealWeddingsSection />*/}
      <WeddingCards />
      <CustomerTestimonials />
      <RegisteredCities />
    </Paper>
  );
};

export default LandingPageMain;
