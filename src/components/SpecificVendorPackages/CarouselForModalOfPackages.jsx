import { Carousel } from "@mantine/carousel";
import { Grid, Text } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import React, { Children, useRef } from "react";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import SpecificPackageDetails from "./SpecificPackageDetails";
const CarouselForModalOfPackages = ({ vendorPackages }) => {
  let vendorPackages2 = vendorPackages ? vendorPackages : [{}];
  const slides = vendorPackages2.map((vendorPackage, index) => (
    <Carousel.Slide key={index}>
      <SpecificPackageDetails vendorPackage={vendorPackage} />
    </Carousel.Slide>
  ));
  return (
    <Grid>
      <Grid.Col lg={9} pl="xl">
        <Carousel
          withIndicators
          // height={800}
          slideSize="100%"
          nextControlIcon={<IconArrowRight size={25} />}
          previousControlIcon={<IconArrowLeft size={25} />}
          slideGap={2}
          controlSize={50}
          breakpoints={[
            { maxWidth: "md", slideSize: "100%" },
            { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
          ]}
          //   loop
          align="start"
        >
          {slides}
        </Carousel>
      </Grid.Col>
      <Grid.Col lg={3} pl="xl">
        <BookVenueSideColums />
      </Grid.Col>
    </Grid>
  );
};

export default CarouselForModalOfPackages;
