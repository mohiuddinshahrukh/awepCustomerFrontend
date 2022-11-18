import { Anchor, Container, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import TopNavbarButtons from "./TopNavbarButtons";
import TopNavbarLinks from "./TopNavbarLinks";
import TopNavbarThemeToggle from "./TopNavbarThemeToggle";
import TopNavbarUserProfileIcon from "./TopNavbarUserProfileIcon";

const TopNavbar = () => {
  return (
    <Container>
      <Group position="apart">
        <Anchor variant="text" component={Link}>
          AWEP
        </Anchor>
        <TopNavbarLinks
          linksData={[
            { title: "Vendors", path: "#" },
            { title: "Venues", path: "#" },
            { title: "Card Editor", path: "#" },
            { title: "Contact Us", path: "#" },
            { title: "About Us", path: "#" },
          ]}
        />
        <Group>
          <TopNavbarThemeToggle />
          {true ? (
            <TopNavbarButtons
              buttonsData={[
                { title: "Sign In", path: "#", variant: "filled" },
                { title: "Sign Up", path: "#", variant: "outline" },
              ]}
            />
          ) : (
            <TopNavbarUserProfileIcon />
          )}
        </Group>
      </Group>
    </Container>
  );
};

export default TopNavbar;
