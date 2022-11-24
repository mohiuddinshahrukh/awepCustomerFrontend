import { createStyles, Group, Paper, Tabs, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles(() => ({
  text: {
    // color: "#775A97",
    cursor: "pointer",
    ":hover": {
      color: "#775A97",
    },
  },
  stickySThings: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 0,
    zIndex: 1,
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
    <Paper className={classes.stickySThings}>
      <Group spacing="xl" py="xl">
        {/* <Text
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
    </Text> 
        <Text
          className={classes.text}
          onClick={() => scrollRef6.scrollIntoView()}
        >
          Reviews
        </Text>
        <Text
          className={classes.text}
          onClick={() => scrollRef.scrollIntoView()}
        >
          Map
        </Text>{" "}
        */}
      </Group>
    </Paper>
  );
};

export default InPageNavigation;
