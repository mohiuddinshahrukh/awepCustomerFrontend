import { Anchor, Box, Group, Text } from "@mantine/core";
import { IconMessages, IconNotebook, IconSettings } from "@tabler/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const data = [
  {
    title: "Bookings",
    path: "bookings",
    icon: <IconNotebook />,
  },
  {
    title: "Chats",
    path: "chats",
    icon: <IconMessages />,
  },
  {
    title: "Wedding Cards",
    path: "weddingCards",
    icon: <IconMessages />,
  },
  {
    title: "Complaints & Feedback",
    path: "complaintsAndFeedback",
    icon: <IconMessages />,
  },
  {
    title: "Payments",
    path: "payments",
    icon: <IconMessages />,
  },
  {
    title: "FAQ & Help",
    path: "FAQsAndHelp",
    icon: <IconMessages />,
  },
  {
    title: "Invite",
    path: "invite",
    icon: <IconMessages />,
  },
  {
    title: "Profile",
    path: "profile",
    icon: <IconSettings />,
  },
];

const Sidebar = () => {
  const location = useLocation();
  const sidebar = data?.map((option, index) => {
    if (location.pathname === "/shahrukhTest/" + option.path) {
      return (
        <Anchor component={Link} to={option.path} key={index} variant="text">
          <Box
            sx={(theme) => ({
              ":hover": { backgroundColor: theme.colors.blue[6] },
              backgroundColor: theme.colors.blue[5],
              color: theme.white,
              borderRadius: theme.radius.sm,
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
    } else {
      return (
        <Anchor component={Link} to={option.path} key={index} variant="text">
          <Box
            sx={(theme) => ({
              ":hover": {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[1],
              },
              borderRadius: theme.radius.sm,
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
    }
  });
  console.log("location", location);
  return (
    <div style={{ height: "100%", width: "300px", flexShrink: 0 }}>
      {sidebar}
    </div>
  );
};

export default Sidebar;
