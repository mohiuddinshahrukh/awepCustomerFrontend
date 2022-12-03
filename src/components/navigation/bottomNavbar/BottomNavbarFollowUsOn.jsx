import { ActionIcon, Anchor, Box, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { Link } from "react-router-dom";

const BottomNavbarFollowUsOn = ({ followUsOnLinks, alignment }) => {
  const matches = useMediaQuery("(max-width: 900px)");
  const links = followUsOnLinks.map((followLink, index) => {
    return (
      <ActionIcon
        variant="outline"
        radius={"lg"}
        size={"lg"}
        key={index}
        component={Anchor}
        href={followLink.path}
        target="_blank"
      >
        {followLink.icon}
      </ActionIcon>
    );
  });
  return (
    <Stack align={"center"}>
      {alignment === "row" && (
        <Text weight={500} size={"lg"}>
          Follow us
        </Text>
      )}
      {!matches || alignment === "column" ? (
        <Group>{links}</Group>
      ) : (
        <Stack>{links}</Stack>
      )}
    </Stack>
  );
};

export default BottomNavbarFollowUsOn;
