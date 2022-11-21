import { Carousel } from "@mantine/carousel";
import RegisteredCitiesCard from "./RegisteredCitiesCard";
const landingPageRegisteredCitiesCards = [
  {
    img: "https://images.unsplash.com/photo-1470756544705-1848092fbe5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1978&q=80",
    city: "Islamabad",
    venues: "10",
    vendors: "20",
  },
  {
    img: "https://images.unsplash.com/photo-1617129926580-44e96bf7d0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    city: "Rawalpindi",
    venues: "5",
    vendors: "15",
  },
  {
    img: "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1221&q=80",
    city: "Lahore",
    venues: "15",
    vendors: "25",
  },

  {
    img: "https://images.unsplash.com/photo-1611068661807-c850d6a24f62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    city: "Karachi",
    venues: "7",
    vendors: "16",
  },
  {
    img: "https://images.unsplash.com/photo-1600434890250-44df6e4c0d05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80",
    city: "Multan",
    venues: "12",
    vendors: "24",
  },
];
const RegisteredCitiesCarousel = () => {
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
      styles={{ viewport: { padding: "20px 5px" } }}
      slideSize={"25% "}
      slideGap={"md"}
      align={"start"}
      slidesToScroll={4}
      withControls={false}
      breakpoints={[
        { maxWidth: "md", slideSize: "33.33333333%" },
        { maxWidth: "sm", slideSize: "50%" },
        { maxWidth: "xs", slideSize: "100%", slidesToScroll: 1 },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default RegisteredCitiesCarousel;
