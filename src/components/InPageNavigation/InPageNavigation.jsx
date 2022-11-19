import { createStyles, Group, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles(() => ({
  text: {
    // color: "#775A97",
    cursor: "pointer",
    ":hover": {
      color: "#775A97",
    },
  },
}));

const InPageNavigation = () => {
  const { classes } = useStyles();

  return (
    <Group spacing="xl" pt="xl">
      <Text className={classes.text}>About</Text>
      <Text className={classes.text}>Services</Text>
      <Text className={classes.text}>Sub Venues</Text>
      <Text className={classes.text}>Menus</Text>
      <Text className={classes.text}>Themes</Text>
      <Text className={classes.text}>Reviews</Text>
    </Group>
  );
};

export default InPageNavigation;
