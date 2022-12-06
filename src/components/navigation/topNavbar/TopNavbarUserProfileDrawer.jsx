import {
  Avatar,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconLayoutGrid, IconLogout, IconSettings } from "@tabler/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopNavbarUserProfileDrawer = ({ setDrawerState }) => {
  const [customerData, setCustomerData] = useState(
    JSON.parse(localStorage.getItem("customerData"))
  );

  console.log("CUSOMTER DATA: 123", customerData);
  return (
    <Paper
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "5%",
      }}
    >
      <Group spacing={3}>
        <Avatar src={customerData?.profileImage} size={"lg"} radius={"xl"} />
        <Stack spacing={0}>
          <Text color={"dark"}>{customerData?.name}</Text>
          <Text size={"sm"} color={"dark"}>
            {customerData?.email}
          </Text>
        </Stack>
      </Group>
    </Paper>
  );
};

export default TopNavbarUserProfileDrawer;
