import { ActionIcon, Box, Group, Text } from "@mantine/core";
import React from "react";

const BottomNavbarFollowUsOn = ({ followUsOnLinks }) => {
  const links = followUsOnLinks.map((followLink, index) => {
    return (
      <ActionIcon variant="outline" radius={"lg"} size={"lg"} key={index}>
        {followLink.icon}
      </ActionIcon>
    );
  });
  return (
    <Box>
      <Text weight={500} size={"lg"}>
        Follow us on
      </Text>
      <Group>{links}</Group>
    </Box>
  );
};

export default BottomNavbarFollowUsOn;
