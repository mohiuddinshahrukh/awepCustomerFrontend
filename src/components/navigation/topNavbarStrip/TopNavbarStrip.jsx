import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
} from "@tabler/icons";
import React from "react";

const superAdminData = {
  email: "awep@gmail.com",
  mobileNumber: "+923368811125",
};
const TopNavbarStrip = () => {
  const matches904 = useMediaQuery("(min-width: 904px)");
  return (
    <Paper p={"xs"} radius={0} className="bgColor fgColor">
      <Group position={matches904 ? "apart" : "center"}>
        <Group position={matches904 ? "apart" : "center"}>
          <Text>Email: {superAdminData.email}</Text>
          <Group>
            <Text>
              Mobile Number: {superAdminData.mobileNumber} |
              {superAdminData.mobileNumber} | {superAdminData.mobileNumber}
            </Text>
          </Group>
        </Group>
        <Group>
          {[
            { icon: <IconBrandFacebook color="white" />, path: "#" },
            { icon: <IconBrandTwitter />, path: "#" },
            { icon: <IconBrandInstagram />, path: "#" },
            { icon: <IconBrandPinterest />, path: "#" },
          ].map((icon, index) => {
            return (
              <ActionIcon variant="filled" className="button" key={index}>
                {icon.icon}
              </ActionIcon>
            );
          })}
        </Group>
      </Group>
    </Paper>
  );
};

export default TopNavbarStrip;
