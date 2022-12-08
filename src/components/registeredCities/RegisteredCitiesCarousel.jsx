import { Carousel } from "@mantine/carousel";
import axios from "axios";
import { useEffect, useState } from "react";
import RegisteredCitiesCard from "./RegisteredCitiesCard";

const fetchVenueCount = async () => {
  try {
    const apiResponse = await axios.get(
      https://a-wep-production.herokuapp.com/customer/getVenues"
    );
    if (apiResponse.data.status === "success") {
      console.log("@@#@@ API RESPONSE SUCCESS: ", apiResponse);
      return apiResponse.data;
    } else if (apiResponse.data.status === "error") {
      console.log("API RESPONSE SUCCESS: ", apiResponse);
    } else {
      console.log("DONT KNOW THE ERROR, THIS SHOULDNT PRINT!");
    }
  } catch (error) {
    console.log("fetchVenuesMethod API CALLING ERROR:", error);
  }
};
const fetchVendorCount = async () => {
  try {
    const apiResponse = await axios.get(
      https://a-wep-production.herokuapp.com/customer/getVendorBusinesses"
    );
    if (apiResponse.data.status === "success") {
      console.log("@@#@@ API RESPONSE SUCCESS: ", apiResponse);
      return apiResponse.data;
    } else if (apiResponse.data.status === "error") {
      console.log("API RESPONSE SUCCESS: ", apiResponse);
    } else {
      console.log("DONT KNOW THE ERROR, THIS SHOULDNT PRINT!");
    }
  } catch (error) {
    console.log("fetchVenuesMethod API CALLING ERROR:", error);
  }
};

const RegisteredCitiesCarousel = () => {
  const [allVenuesCount, setAllVenuesCount] = useState([]);
  const [allVendorsCount, setAllVendorsCount] = useState([]);
  useEffect(() => {
    fetchVenueCount().then(setAllVenuesCount);
    fetchVendorCount().then(setAllVendorsCount);
  }, []);
  const landingPageRegisteredCitiesCards = [
    {
      img: "https://images.unsplash.com/photo-1470756544705-1848092fbe5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1978&q=80",
      city: "Islamabad",
      venues: allVenuesCount?.data?.filter((venue) => {
        return venue?.venueCity?.toString() === "islamabad";
      })?.length,
      vendors: allVendorsCount?.data?.filter((vendor) => {
        return vendor?.city?.toString() === "islamabad";
      })?.length,
    },
    {
      img: "https://images.unsplash.com/photo-1617129926580-44e96bf7d0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      city: "Rawalpindi",
      venues: allVenuesCount?.data?.filter((venue) => {
        return venue?.venueCity?.toString() === "rawalpindi";
      })?.length,
      vendors: allVendorsCount?.data?.filter((vendor) => {
        return vendor?.city?.toString() === "rawalpindi";
      })?.length,
    },
    {
      img: "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1221&q=80",
      city: "Lahore",
      venues: allVenuesCount?.data?.filter((venue) => {
        return venue?.venueCity?.toString() === "lahore";
      })?.length,
      vendors: allVendorsCount?.data?.filter((vendor) => {
        return vendor?.city?.toString() === "lahore";
      })?.length,
    },
    {
      img: "https://images.unsplash.com/photo-1470756544705-1848092fbe5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1978&q=80",
      city: "Islamabad",
      venues: allVenuesCount?.data?.filter((venue) => {
        return venue?.venueCity?.toString() === "islamabad";
      })?.length,
      vendors: allVendorsCount?.data?.filter((vendor) => {
        return vendor?.city?.toString() === "islamabad";
      })?.length,
    },
    {
      img: "https://images.unsplash.com/photo-1617129926580-44e96bf7d0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      city: "Rawalpindi",
      venues: allVenuesCount?.data?.filter((venue) => {
        return venue?.venueCity?.toString() === "rawalpindi";
      })?.length,
      vendors: allVendorsCount?.data?.filter((vendor) => {
        return vendor?.city?.toString() === "rawalpindi";
      })?.length,
    },
    {
      img: "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1221&q=80",
      city: "Lahore",
      venues: allVenuesCount?.data?.filter((venue) => {
        return venue?.venueCity?.toString() === "lahore";
      })?.length,
      vendors: allVendorsCount?.data?.filter((vendor) => {
        return vendor?.city?.toString() === "lahore";
      })?.length,
    },

    // {
    //   img: "https://images.unsplash.com/photo-1611068661807-c850d6a24f62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    //   city: "Karachi",
    //   venues: allVenuesCount?.data?.filter((venue) => {
    //     return venue?.venueCity?.toString() === "karachi";
    //   })?.length,
    //   vendors: allVendorsCount?.data?.filter((vendor) => {
    //     return vendor?.city?.toString() === "karachi";
    //   })?.length,
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1600434890250-44df6e4c0d05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
    //   city: "Multan",
    //   venues: allVenuesCount?.data?.filter((venue) => {
    //     return venue?.venueCity?.toString() === "multan";
    //   })?.length,
    //   vendors: allVendorsCount?.data?.filter((vendor) => {
    //     return vendor?.city?.toString() === "multan";
    //   })?.length,
    // },
  ];
  const carouselSlides = landingPageRegisteredCitiesCards.map(
    (citiesCard, index) => {
      return (
        <Carousel.Slide key={index}>
          <RegisteredCitiesCard citiesCard={citiesCard} />
        </Carousel.Slide>
      );
    }
  );
  return (
    <Carousel
      styles={{
        viewport: { padding: "20px 5px" },
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
      slideSize={"25% "}
      loop
      align={"start"}
      slidesToScroll={1}
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%", slideGap: 10 },
        { maxWidth: "lg", slideSize: "33.33333333%", slideGap: 10 },
        { maxWidth: "xl", slideSize: "25%", slideGap: 10 },
        { maxWidth: "sm", slideSize: "75%", slideGap: 10 },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default RegisteredCitiesCarousel;
