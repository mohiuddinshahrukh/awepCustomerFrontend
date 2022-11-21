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

const InPageNavigation = ({
  scrollRef,
  scrollRef1,
  scrollRef2,
  scrollRef3,
  scrollRef4,
  scrollRef5,
  scrollRef6,
}) => {
  const { classes } = useStyles();

  return (
    <Group spacing="xl" pt="xl">
      <Text
        className={classes.text}
        onClick={() => scrollRef1.scrollIntoView()}
      >
        About
      </Text>
      <Text
        className={classes.text}
        onClick={() => scrollRef2.scrollIntoView()}
      >
        Services
      </Text>
      <Text
        className={classes.text}
        onClick={() => scrollRef3.scrollIntoView()}
      >
        Sub Venues
      </Text>
      <Text
        className={classes.text}
        onClick={() => scrollRef4.scrollIntoView()}
      >
        Menus
      </Text>
      {/* <Text
        className={classes.text}
        onClick={() => scrollRef5.scrollIntoView()}
      >
        Themes
      </Text> */}
      <Text
        className={classes.text}
        onClick={() => scrollRef6.scrollIntoView()}
      >
        Reviews
      </Text>
      <Text className={classes.text} onClick={() => scrollRef.scrollIntoView()}>
        Map
      </Text>
    </Group>
  );
};

export default InPageNavigation;
