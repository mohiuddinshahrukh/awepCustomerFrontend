import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificStage from "./SpecificStage";

const CarouselOfStages = ({ stages }) => {
  const stagesArray = stages ? stages : [{}];
  const slides = stagesArray.map((stage, index) => (
    <Carousel.Slide key={index}>
      <SpecificStage stage={stage} />
    </Carousel.Slide>
  ));
  return (
    <div>
      <Text weight="bold" py="md" size="lg">
        Stages
      </Text>
      <Carousel
        withIndicators
        // height={800}
        slideSize="33.33%"
        slideGap={5}
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "50%", slideGap: 0 },
          { maxWidth: "xs", slideSize: "100%", slideGap: 0 },
        ]}
        align="start"
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default CarouselOfStages;
