import React from "react";
import { createStyles, Image, Card, Text, Group, Button } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { IconStar } from "@tabler/icons";
import CustomButton from "../CustomButton/CustomButton";

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

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

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}));

const SpecificSubVenue = ({
  open,
  setOpen,
  subVenue,
  setIdOfSpecificSubVenue,
}) => {
  let subVenueData = subVenue ? subVenue : {};
  const images = subVenueData?.images ? subVenueData?.images : [""];
  const { classes } = useStyles();

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));

  return (
    <Card radius="md" withBorder p="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>
      <div
        onClick={() => {
          setIdOfSpecificSubVenue(subVenueData?._id);
          setOpen(true);
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Group position="apart" mt="lg">
          <Text weight={500} size="lg">
            {subVenueData?.subVenueName}
          </Text>

          <Group spacing={5}>
            <IconStar size={16} fill={"#FFB300"} stroke="0" />
            <Text size="xs" weight={500}>
              {subVenueData?.rating ? subVenueData.rating.toFixed(1) : "5.0"}
            </Text>
          </Group>
        </Group>
        <Text span size="sm" color="dimmed">
          {subVenueData?.subVenueType}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {subVenueData?.subVenueDescription
            ? subVenueData?.subVenueDescription.length > 100
              ? subVenueData?.subVenueDescription.substring(0, 100) + "..."
              : subVenueData?.subVenueDescription
            : "No description"}
        </Text>
      </div>

      <Group position="apart" mt="md">
        <div>
          <Text size="xl" span weight={500} className={classes.price}>
            {subVenueData?.subVenueMinCapacity
              ? subVenueData?.subVenueMinCapacity
              : "0"}{" "}
            to{" "}
            {subVenueData?.subVenueCapacity
              ? subVenueData?.subVenueCapacity
              : "0"}
          </Text>
          <Text span size="sm" color="dimmed">
            {" "}
            Guests
          </Text>
        </div>

        <Button className="button" size="md" radius="md">
          Book Now
        </Button>
      </Group>
    </Card>
  );
};

export default SpecificSubVenue;
