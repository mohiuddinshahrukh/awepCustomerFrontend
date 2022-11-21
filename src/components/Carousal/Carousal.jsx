import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import React from "react";

const Carousal = ({ images }) => {
  let venueImages = images ? images : ["", ""];
  return (
    <Carousel
      withIndicators
      // height={800}
      slideSize="80%"
      slideGap={2}
      breakpoints={[
        { maxWidth: "md", slideSize: "50%" },
        { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
      ]}
      loop
      align="start"
    >
      {venueImages.map((image, index) => (
        <Carousel.Slide key={index}>
          <Image height="100%" width="100%" src={image} />
        </Carousel.Slide>
      ))}
      {/* <Carousel.Slide>
        <Image
          height="100%"
          width="100%"
          src="https://cdn0.hitched.co.uk/vendor/5553/original/960/jpg/farnham-cast-20170607052509930.webp"
        />
      </Carousel.Slide> */}
      {/* <Carousel.Slide>
        <Image
          height="100%"
          width="100%"
          src="https://cdn0.hitched.co.uk/vendor/5553/original/960/jpg/farnham-cast-20200529092040519.webp"
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          height="100%"
          width="100%"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTmYPvgisuCMqQYS23f8wTZjq112qFLvODVSlpph9H8Q&s"
        />
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          height="100%"
          width="100%"
          src="https://cdn0.hitched.co.uk/vendor/5553/original/960/jpg/farnham-cast-20200529092040519.webp"
        />
      </Carousel.Slide> */}

      {/* ...other slides */}
    </Carousel>
  );
};

export default Carousal;
