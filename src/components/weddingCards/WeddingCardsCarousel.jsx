import { Carousel } from "@mantine/carousel";
import React from "react";
import WeddingCardsCard from "./WeddingCardsCard";
const landingPageWeddingCards = [
  {
    img: "https://images.unsplash.com/photo-1634055980590-1a44e5a8b3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1592347093417-0e95eb5851aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1612619732485-1ae018b63c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    img: "https://images.unsplash.com/photo-1612619733133-c53eacf97763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1980&q=80",
  },
];
const WeddingCardsCarousel = () => {
  const carouselSlides = landingPageWeddingCards.map((weddingCard, index) => {
    return (
      <Carousel.Slide key={index}>
        <WeddingCardsCard weddingCard={weddingCard} />
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
        { maxWidth: "xs", slideSize: "50%" },
      ]}
    >
      {carouselSlides}
    </Carousel>
  );
};

export default WeddingCardsCarousel;
