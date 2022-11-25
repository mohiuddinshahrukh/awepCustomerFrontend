import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  Paper,
  Select,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import BottomNavbarDownloadApp from "./BottomNavbarDownloadApp";
import BottomNavbarFollowUsOn from "./BottomNavbarFollowUsOn";
import BottomNavbarLinks from "./BottomNavbarLinks";
import BottomNavbarSelectCity from "./BottomNavbarSelectCity";

const BottomNavbar = () => {
  const theme = useMantineTheme();
  return (
    <Paper
      style={{
        height: "fitContent",
        backgroundColor: theme.colorScheme === "light" ? "#EFEFEF" : null,
      }}
    >
      <Container size={"xl"} py={"xl"}>
        <Group align={"flex-start"} position={"apart"}>
          <BottomNavbarLinks
            footerLinks={[
              {
                title: "Information",
                links: [
                  { title: "Our Cities", path: "#" },
                  { title: "Contact Us", path: "#" },
                  { title: "About AWEP", path: "#" },
                  { title: "Terms of Use", path: "#" },
                  { title: "Prvacy Policy", path: "#" },
                  { title: "Wedding Cards", path: "#" },
                ],
              },
            ]}
          />
          <BottomNavbarLinks
            footerLinks={[
              {
                title: "More Information",
                links: [
                  { title: "Cookies Policy", path: "#" },
                  { title: "Featured Venues", path: "#" },
                  { title: "Featured Vendors", path: "#" },
                  { title: "Are You a Venue?", path: "#" },
                  { title: "Are You a Vendor?", path: "#" },
                  { title: "Customer Testimonials", path: "#" },
                ],
              },
            ]}
          />

          <BottomNavbarDownloadApp />

          <BottomNavbarFollowUsOn
            followUsOnLinks={[
              {
                path: "#",
                icon: <IconBrandFacebook fill="#6C6C6C" stroke={0} />,
              },
              {
                path: "#",
                icon: <IconBrandTwitter fill="#6C6C6C" stroke={0} />,
              },
              {
                path: "#",
                icon: <IconBrandInstagram />,
              },
              {
                path: "#",
                icon: <IconBrandPinterest />,
              },
            ]}
          />

          <BottomNavbarSelectCity />
        </Group>

        <Divider mt={"xl"} />
        <Group mt={"xl"} align="center">
          <Anchor
            weight={500}
            size={"xl"}
            component={Link}
            to="/"
            variant="text"
          >
            AWEP
          </Anchor>
          <Text color={"dimmed"}> &copy;{new Date().getFullYear()} AWEP</Text>
        </Group>
      </Container>
    </Paper>
  );
};

export default BottomNavbar;
