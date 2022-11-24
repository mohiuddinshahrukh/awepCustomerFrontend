import { Anchor, Container, Drawer, Group, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TopNavbarButtons from "./TopNavbarButtons";
import TopNavbarDrawer from "./TopNavbarDrawer";
import TopNavbarHamburger from "./TopNavbarHamburger";
import TopNavbarLinks from "./TopNavbarLinks";
import TopNavbarThemeToggle from "./TopNavbarThemeToggle";
import TopNavbarUserProfileIcon from "./TopNavbarUserProfileIcon";

const TopNavbar = () => {
  let currentLocation = useLocation();
  const [drawerState, setDrawerState] = useState(false);
  const matches1027 = useMediaQuery("(min-width: 1027px)");
  return (
    <Paper
      p={0}
      m={0}
      style={{
        borderBottom: "1px solid #eaeaea",
        // position: "sticky",
        // top: 0,
        // zIndex: 2,
        // width: "100%",
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
              { title: "Contact Us", path: "#" },
              { title: "About Us", path: "#" },
            ]}
          />
        </Drawer>
        <Group position="apart">
          {matches1027 ? (
            <Anchor
              style={{
                borderBottom:
                  currentLocation.pathname === "/" ? "2.5px solid red" : "none",
              }}
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
                { title: "Venues", path: "/allVenues" },
                { title: "Vendors", path: "/allVendors" },
                { title: "Card Editor", path: "/cardEditor" },
                { title: "Contact Us", path: "#" },
                { title: "About Us", path: "#" },
              ]}
            />
          ) : (
            <Anchor
              style={{
                borderBottom:
                  currentLocation.pathname === "/" ? "2.5px solid red" : "none",
              }}
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
            {matches1027 ? (
              <TopNavbarButtons
                buttonsData={[
                  { title: "Sign In", path: "/signIn", variant: "filled" },
                  { title: "Sign Up", path: "/signUp", variant: "outline" },
                ]}
              />
            ) : (
              <TopNavbarUserProfileIcon />
            )}
          </Group>
        </Group>
      </Container>
    </Paper>
  );
};

export default TopNavbar;
