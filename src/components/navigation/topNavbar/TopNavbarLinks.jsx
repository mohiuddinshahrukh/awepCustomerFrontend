import { Anchor, Group, useMantineTheme } from "@mantine/core";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const TopNavbarLinks = ({ linksData }) => {
  let currentTheme = useMantineTheme();
  let currentLocation = useLocation();
  const links = linksData?.map((link, index) => {
    return (
      <Anchor
        hidden={
          !localStorage.getItem("customerToken") &&
          link.title.toString() === "Feedbacks"
            ? true
            : false
        }
        className="border"
        style={{
          borderRadius: "3px",
          padding: "5px 15px",
          backgroundColor:
            currentLocation.pathname === link.path
              ? "#e60084"
              : currentTheme.colorScheme === "light"
              ? "white"
              : currentTheme.colors.dark[7],
          color:
            currentLocation.pathname === link.path
              ? currentTheme.white
              : currentTheme.colorScheme === "light"
              ? currentTheme.black
              : currentTheme.white,
        }}
        key={index}
        size="1.25rem"
        variant="text"
        component={Link}
        to={link.path}
      >
        {link.title}
      </Anchor>
    );
  });

  return <Group>{links}</Group>;
};

export default TopNavbarLinks;
