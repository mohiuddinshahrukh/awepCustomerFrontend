import {
  Accordion,
  Anchor,
  Button,
  List,
  Paper,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconLink } from "@tabler/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const TopNavbarDrawer = ({ linksData, setDrawerState }) => {
  const currentTheme = useMantineTheme();
  const currentLocation = useLocation();
  const accordion = linksData?.map((link, index) => {
    return (
      <Button
        my={"xl"}
        key={index}
        fullWidth
        className="button"
        // style={{
        //   borderRadius: "3px",
        //   backgroundColor:
        //     currentLocation.pathname === link.path
        //       ? "#e60084"
        //       : currentTheme.colorScheme === "light"
        //       ? "white"
        //       : currentTheme.colors.dark[7],
        //   color:
        //     currentLocation.pathname === link.path
        //       ? currentTheme.white
        //       : currentTheme.colorScheme === "light"
        //       ? currentTheme.black
        //       : currentTheme.white,
        // }}
        // size="1.25rem"
        component={Link}
        to={link.path}
        onClick={() => {
          setDrawerState(false);
        }}
      >
        {link.title}
      </Button>
    );
  });
  return <Paper p={"lg"}>{accordion}</Paper>;
};

export default TopNavbarDrawer;
