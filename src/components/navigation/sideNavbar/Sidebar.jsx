import { Anchor, Box, Group, Paper, Text } from "@mantine/core";
import {
  IconBook,
  IconMessagePlus,
  IconMessages,
  IconNotebook,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Bookings",
    path: "bookings",
    icon: <IconNotebook />,
  },
  {
    title: "Chat",
    path: "#",
    icon: <IconMessages />,
  },
];

const sidebar = data?.map((option, index) => {
  return (
    <Anchor component={Link} to={option.path} key={index} variant="text">
      <Box
        sx={(theme) => ({
          ":hover": { backgroundColor: theme.colors.gray[0] },
        })}
        p={"md"}
        style={{ border: "1px solid #eaeaea" }}
      >
        <Group noWrap style={{ flexShrink: 0 }}>
          {option.icon}
          <Text>{option.title}</Text>
        </Group>
      </Box>
    </Anchor>
  );
});
const Sidebar = () => {
  return (
    <div style={{ height: "100%", width: "300px", flexShrink: 0 }}>
      {sidebar}
    </div>
  );
};

export default Sidebar;
