import { Avatar, Box, Button, Group, Image, Text } from "@mantine/core";
import React from "react";
import awepLogo from "../../../assets/awepLogo/logo.svg";
import appleAppStoreButton from "../../../assets/awepLogo/downloadAppleApp.png";
import appleAppGoogleButton from "../../../assets/awepLogo/downloadGoogleApp.png";
const BottomNavbarDownloadApp = () => {
  return (
    <Box>
      <Text weight={500} size="lg">
        Download the AWEP App
      </Text>

      <Group mt={"md"}>
        <Avatar size={"lg"} src={awepLogo}></Avatar>
        <Text size={"md"} color={"dimmed"}>
          Get the AWEP App. Dream it. Plan it. <br /> Book it. Wherever you are.
        </Text>
      </Group>
      <Group mt={"md"}>
        {" "}
        <Image
          height={"40px"}
          width={"140px"}
          fit={"contain"}
          src={appleAppStoreButton}
        />
        <Image
          height={"40px"}
          width={"140px"}
          fit={"contain"}
          src={appleAppGoogleButton}
        />
      </Group>
    </Box>
  );
};

export default BottomNavbarDownloadApp;
