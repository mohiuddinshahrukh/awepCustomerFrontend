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

const SpecificVendorPackageCard = ({
  open,
  setOpen,
  vendorPackage,
  setIdOfSpecificVendorPackage,
}) => {
  let vendorPackageData = vendorPackage ? vendorPackage : {};
  const { classes } = useStyles();

  return (
    <Card radius="md" withBorder p="xl">
      <Card.Section>
        <Image src={vendorPackageData?.coverImage} height={220} />
      </Card.Section>
      <div
        onClick={() => {
          setIdOfSpecificVendorPackage(vendorPackageData?._id);
          setOpen(true);
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Group position="apart" mt="lg">
          <Text weight={500} size="lg">
            {vendorPackageData?.vendorPackageTitle}
          </Text>

          <Group spacing={5}>
            <IconStar size={16} fill={"#FFB300"} stroke="0" />
            <Text size="xs" weight={500}>
              {vendorPackageData?.rating
                ? vendorPackageData.rating.toFixed(1)
                : "5.0"}
            </Text>
          </Group>
        </Group>

        <Text size="sm" color="dimmed" mt="sm">
          {vendorPackageData?.packageDescription
            ? vendorPackageData?.packageDescription.length > 100
              ? vendorPackageData?.packageDescription.substring(0, 100) + "..."
              : vendorPackageData?.packageDescription
            : "No description"}
        </Text>
      </div>

      <Group position="apart" mt="md">
        <div>
          <Text size="xl" span weight={500} className={classes.price}>
            Rs. {vendorPackageData?.price}
          </Text>
          <Text span size="sm" color="dimmed">
            {" "}
            /package
          </Text>
        </div>

        <CustomButton title="Book Now" />
      </Group>
    </Card>
  );
};

export default SpecificVendorPackageCard;
