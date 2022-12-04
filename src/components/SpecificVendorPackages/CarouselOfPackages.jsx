import { Carousel } from "@mantine/carousel";
import { Text } from "@mantine/core";
import React from "react";
import SpecificVendorPackageCard from "./SpecificVendorPackagesCard";

const CarouselOfPackages = ({
  open,
  setOpen,
  packages,
  targetRef,
  idOfSpecificVendorPackage,
  setIdOfSpecificVendorPackage,
}) => {
  let packagesArray = packages ? packages : [{}];
  const slides = packagesArray.map((vendorPackage, index) => (
    <Carousel.Slide key={index}>
      <SpecificVendorPackageCard
        open={open}
        setOpen={setOpen}
        vendorPackage={vendorPackage}
        setIdOfSpecificVendorPackage={setIdOfSpecificVendorPackage}
      />
    </Carousel.Slide>
  ));
  return (
    <div>
      <Text weight="bold" py="md" size="lg" ref={targetRef}>
        Vendor Packages
      </Text>
      <Carousel
        mb="md"
        slideSize="50%"
        slideGap={2}
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        loop
        align="start"
      >
        {slides}
      </Carousel>
    </div>
  );
};

export default CarouselOfPackages;
