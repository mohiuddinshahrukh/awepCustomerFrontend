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
  IconBrandYoutube,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";
import BottomNavbarDownloadApp from "./BottomNavbarDownloadApp";
import BottomNavbarFollowUsOn from "./BottomNavbarFollowUsOn";
import BottomNavbarHeadOffice from "./BottomNavbarHeadOffice";
import BottomNavbarLinks from "./BottomNavbarLinks";

const BottomNavbar = () => {
  const matches = useMediaQuery("(max-width: 600px)");
  const matches700 = useMediaQuery("(max-width: 700px)");
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
          {/* {!matches ? ( */}
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

          {/*<BottomNavbarDownloadApp />*/}

          <BottomNavbarHeadOffice
            data={{
              title: "Head Office",
              address:
                "Zaki Centre, Office #17, 2nd Floor, I-8 Markaz Islamabad, 46000",
              phone: "+923455893337",
              email: "automatedweddingeventplanner@gmail.com",
            }}
          />
          {!matches700 && (
            <BottomNavbarFollowUsOn
              alignment={matches ? "column" : "row"}
              followUsOnLinks={[
                {
                  path: "https://www.facebook.com/people/Automated-Wedding-Event-Planner-AWEP/100088104714206/",
                  icon: <IconBrandFacebook fill="#6C6C6C" stroke={0} />,
                },
                {
                  path: "https://www.instagram.com/awep.pk/",
                  icon: <IconBrandInstagram />,
                },
                {
                  path: "https://www.youtube.com/@teamawepsat",
                  icon: <IconBrandYoutube />,
                },
              ]}
            />
          )}
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
          {matches700 && (
            <BottomNavbarFollowUsOn
              alignment={matches700 ? "column" : "row"}
              followUsOnLinks={[
                {
                  path: "https://www.facebook.com/people/Automated-Wedding-Event-Planner-AWEP/100088104714206/",
                  icon: <IconBrandFacebook fill="#6C6C6C" stroke={0} />,
                },
                {
                  path: "https://www.instagram.com/awep.pk/",
                  icon: <IconBrandInstagram />,
                },
                {
                  path: "https://www.youtube.com/@teamawepsat",
                  icon: <IconBrandYoutube />,
                },
              ]}
            />
          )}
          <Text color={"dimmed"}> &copy;{new Date().getFullYear()} AWEP</Text>
        </Group>
      </Container>
    </Paper>
  );
};

export default BottomNavbar;
