import { Anchor, Container, Drawer, Group, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavbarButtons from "./TopNavbarButtons";
import TopNavbarDrawer from "./TopNavbarDrawer";
import TopNavbarHamburger from "./TopNavbarHamburger";
import TopNavbarLinks from "./TopNavbarLinks";
import TopNavbarThemeToggle from "./TopNavbarThemeToggle";
import TopNavbarUserProfileIcon from "./TopNavbarUserProfileIcon";

const TopNavbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const matches1027 = useMediaQuery("(min-width: 1027px)");
  return (
    <Paper
      p={0}
      m={0}
      style={{
        borderBottom: "1px solid #eaeaea",
      }}
    >
      {" "}
      <Container py={"2rem"} size={"xl"}>
        <Drawer
          title={"AWEP MENU"}
          opened={drawerState}
          closeOnClickOutside={false}
          onClose={() => {
            setDrawerState(false);
          }}
        >
          <TopNavbarDrawer
            linksData={[
              {
                title: "Venues",
                path: "/allVenues",
                list: [
                  { listItem: "Featured Venues", listItemPath: "#" },
                  { listItem: "Top Viewed Venues", listItemPath: "#" },
                ],
              },
              { title: "Vendors", path: "/allVendors" },
              { title: "Card Editor", path: "/cardEditor" },
              { title: "Contact Us", path: "/contactUs" },
              { title: "About Us", path: "/aboutUs" },
            ]}
          />
        </Drawer>
        <Group position="apart">
          {matches1027 ? (
            <Anchor
              size={"2rem"}
              weight={"bold"}
              variant="text"
              component={Link}
              to="/"
            >
              AWEP
            </Anchor>
          ) : (
            <TopNavbarHamburger setDrawerState={setDrawerState} />
          )}

          {matches1027 ? (
            <TopNavbarLinks
              linksData={[
                { title: "Home", path: "/" },
                { title: "Venues", path: "/allVenues" },
                { title: "Vendors", path: "/allVendors" },
                { title: "Card Editor", path: "/cardEditor" },
                { title: "Contact Us", path: "/contactUs" },
                { title: "About Us", path: "/aboutUs" },
                {
                  title: "Feedbacks",
                  path: `/addreview/${"admin"}`,
                },
              ]}
            />
          ) : (
            <Anchor
              size={"2rem"}
              weight={"bold"}
              variant="text"
              component={Link}
              to="/"
            >
              AWEP
            </Anchor>
          )}
          <Group>
            <TopNavbarThemeToggle />
            {localStorage.getItem("userToken") ? (
              <TopNavbarUserProfileIcon />
            ) : (
              <TopNavbarButtons
                buttonsData={[
                  { title: "Sign In", path: "/signIn", variant: "filled" },
                  { title: "Sign Up", path: "/signUp", variant: "outline" },
                ]}
              />
            )}
          </Group>
        </Group>
      </Container>
    </Paper>
  );
};
export default TopNavbar;
