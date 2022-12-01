import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";
import {
  IconBookmark,
  IconBuildingFortress,
  IconHeart,
  IconMap,
  IconShare,
  IconStar,
  IconUser,
} from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));
const FeaturedVendorServicesCard = ({ service }) => {
  const { classes, theme } = useStyles();
  return (
    <Card
      p="lg"
      radius="md"
      className="border"
      sx={{
        borderRadius: "0.5rem",
        ":hover": {
          boxShadow: "0 5px 12px #0003",
        },
        boxShadow: "0 2px 8px #00000026",
        transition: "box-shadow .2s",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease",
        transitionDelay: "0s",
        transitionProperty: "box-shadow",
      }}
    >
      <Card.Section mb="sm">
        <Image
          src={service.coverImage}
          alt={service.vendorPackageTitle}
          height={180}
        />
      </Card.Section>

      {/* <Badge>{category}</Badge>*/}

      <Text weight={500} lineClamp={1} className={classes.title} mt="xs">
        {service.vendorPackageTitle}
      </Text>
      <Text color={"dimmed"} lineClamp={1}>
        {service.vendorBusiness.city}
      </Text>

      <Group mt={"xs"} noWrap>
        <Avatar src={service.vendorBusiness.coverImage} radius="sm" />
        <div>
          <Text weight={500} lineClamp={1}>
            {service.vendorBusiness.vendorBusinessTitle}
          </Text>
          <Text size="xs" color="dimmed">
            Member since{" " + service.createdAt.split("T")[0]}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="sm" color="dimmed">
            Total{" "}
            <span style={{ color: "black" }}>
              <b>{service.vendorPackageBookings}</b>
            </span>{" "}
            Bookings
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconStar size={18} fill="#EDB100" stroke={0} />
            </ActionIcon>
            <Text size={"sm"}> {service.rating.toFixed(1)}</Text>
            <Text color={"dimmed"} size="sm">
              ({service.ratingCount})
            </Text>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default FeaturedVendorServicesCard;

// import {
//   createStyles,
//   Card,
//   Image,
//   ActionIcon,
//   Group,
//   Text,
//   Avatar,
//   Badge,
// } from "@mantine/core";
// import { IconHeart, IconBookmark, IconShare } from "@tabler/icons";
