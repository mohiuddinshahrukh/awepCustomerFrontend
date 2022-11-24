import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import React, { useRef } from "react";
import carouselImage1 from "./CoupleOne.svg";
import carouselImage2 from "./CoupleTwo.svg";
import carouselImage3 from "./CoupleThree.svg";
const SignUpSignInCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Carousel
      loop
      draggable={false}
      withControls={false}
      withIndicators
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.play}
    >
      <Carousel.Slide>
        <Image src={carouselImage1} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image src={carouselImage2} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image src={carouselImage3} />
      </Carousel.Slide>
    </Carousel>
  );
};

export default SignUpSignInCarousel;
