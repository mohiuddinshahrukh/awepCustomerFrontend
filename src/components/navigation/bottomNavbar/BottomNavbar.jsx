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
                  { title: "Our Cities", path: "/allVenues" },
                  { title: "Contact Us", path: "/contactUs" },
                  { title: "About AWEP", path: "/aboutUs" },
                  { title: "Terms of Use", path: "/aboutUs" },
                  { title: "Prvacy Policy", path: "/aboutUs" },
                  { title: "Wedding Cards", path: "/cardEditor" },
                ],
              },
            ]}
          />
          <BottomNavbarLinks
            footerLinks={[
              {
                title: "More Information",
                links: [
                  { title: "Cookies Policy", path: "/contactUs" },
                  { title: "Featured Venues", path: "/allVenues" },
                  { title: "Featured Vendors", path: "/allVendors" },
                  { title: "Are You a Venue?", path: "/signUp" },
                  { title: "Are You a Vendor?", path: "/signUp" },
                  { title: "Customer Testimonials", path: "/allVendors" },
                ],
              },
            ]}
          />

          <BottomNavbarDownloadApp />

          <BottomNavbarFollowUsOn
            followUsOnLinks={[
              {
                path: "https://www.facebook.com/awep.pk/",
                icon: <IconBrandFacebook fill="#6C6C6C" stroke={0} />,
              },
              {
                path: "https://twitter.com/awep_pk",
                icon: <IconBrandTwitter fill="#6C6C6C" stroke={0} />,
              },
              {
                path: "https://www.instagram.com/awep.pk/",
                icon: <IconBrandInstagram />,
              },
              {
                path: "https://www.pinterest.com/awep.pk/",
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
