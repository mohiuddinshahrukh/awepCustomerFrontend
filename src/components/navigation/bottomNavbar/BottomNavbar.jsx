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
import { useMediaQuery } from "@mantine/hooks";
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
import BottomNavbarHeadOffice from "./BottomNavbarHeadOffice";
import BottomNavbarLinks from "./BottomNavbarLinks";

const BottomNavbar = () => {
  const matches = useMediaQuery("(max-width: 600px)");
  const theme = useMantineTheme();
  return (
    <Paper
      style={{
        height: "fitContent",
        backgroundColor: theme.colorScheme === "light" ? "#EFEFEF" : null,
      }}
    >
      <Container size={"xl"} py={"xl"}>
        <Group align={"flex-start"} position={"apart"} noWrap>
          {!matches ? (
            <Group>
              <BottomNavbarLinks
                footerLinks={[
                  {
                    title: "Navigation",
                    links: [
                      { title: "Venues", path: "/allVenues" },
                      { title: "Vendors", path: "/allVendors" },
                      { title: "Card", path: "/cardEditor" },
                    ],
                  },
                ]}
              />
              <BottomNavbarLinks
                footerLinks={[
                  {
                    title: "Links",
                    links: [
                      { title: "Contact", path: "/contactUs" },
                      { title: "About", path: "/aboutUs" },
                      { title: "Feedback", path: "/addreview/admin" },
                    ],
                  },
                ]}
              />
            </Group>
          ) : (
            <BottomNavbarLinks
              footerLinks={[
                {
                  title: "Navigation",
                  links: [
                    { title: "Venues", path: "/allVenues" },
                    { title: "Vendors", path: "/allVendors" },
                    { title: "Card", path: "/cardEditor" },
                    { title: "Contact", path: "/contactUs" },
                    { title: "About", path: "/aboutUs" },
                    { title: "Feedback", path: "/addreview/admin" },
                  ],
                },
              ]}
            />
          )}

          {/*<BottomNavbarDownloadApp />*/}

          <BottomNavbarHeadOffice
            data={{
              title: "Head Office",
              address: "1234, 56th Street, New York, NY 10001",
              phone: "+1 234 567 890",
              email: "mohiuddinShahrukh@gmail.com",
            }}
          />
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
        </Group>
        <Divider mt={"xl"} />
        <Group position="apart" mt={"xl"} align="center">
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
