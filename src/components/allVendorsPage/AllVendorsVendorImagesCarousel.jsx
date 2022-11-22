import { Carousel } from "@mantine/carousel";
import { createStyles, Image } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: "flex",
    justifyContent: "center",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));
const AllVendorsVendorImagesCarousel = ({ vendorImages }) => {
  const { classes } = useStyles();
  const slides = vendorImages.map((image, index) => {
    return (
      <Carousel.Slide key={index}>
        <Image height={"201px"} width={"100%"} fit={"cover"} src={image} />
      </Carousel.Slide>
    );
  });
  return (
    <Carousel
      // withIndicators
      controlsOffset={0}
      speed={10}
      nextControlIcon={<IconChevronRight size={52} stroke={1.5} />}
      previousControlIcon={<IconChevronLeft size={52} stroke={1.5} />}
      classNames={{
        root: classes.carousel,
        controls: classes.carouselControls,
        indicator: classes.carouselIndicator,
      }}
      styles={{
        container: {},

        indicator: {
          width: 12,
          height: 4,
          transition: "width 250ms ease",

          "&[data-active]": {
            width: 40,
          },
        },
        control: {
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          ":hover": {
            transform: "scale(1.15)",
            transition: "0.3s",
          },
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
    >
      {slides}
    </Carousel>
  );
};

export default AllVendorsVendorImagesCarousel;
