import { Anchor, Avatar, Box, Button, Group, Image, Text } from "@mantine/core";
import React from "react";
import awepLogo from "../../../assets/awepLogo/logo.svg";
import appleAppStoreButton from "../../../assets/awepLogo/downloadAppleApp.png";
import appleAppGoogleButton from "../../../assets/awepLogo/downloadGoogleApp.png";
import logo from "../../../assets/awepLogo/3a.png";
import { Link } from "react-router-dom";
const BottomNavbarDownloadApp = () => {
  return (
    <Box>
      <Text weight={500} size="lg">
        Get App
      </Text>
      <Group mt={"md"}>
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
