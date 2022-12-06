import {
  Accordion,
  Anchor,
  Box,
  Button,
  List,
  Paper,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconLink } from "@tabler/icons";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TopNavbarDrawer = ({
  linksData,
  setDrawerState,
  setSignedIn,
  signedIn,
}) => {
  const navigate = useNavigate();
  const currentTheme = useMantineTheme();
  const currentLocation = useLocation();
  const accordion = linksData?.map((link, index) => {
    return (
      <Box
        styles={{
          width: "100%",
        }}
        hidden={
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Dashboard") ||
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Settings") ||
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Signout")
            ? true
            : false
        }
        my={"xl"}
        key={index}
        className="button"
        component={Link}
        to={link.path}
        onClick={() => {
          setDrawerState(false);
          if (link.title.toString() === "Signout") {
            localStorage.removeItem("customerData");
            localStorage.removeItem("customerToken");
            // setLoggedInUserData({});
            console.log("CURRENT LOCAITON 123", currentLocation);
            if (
              [
                "/dashboard",
                "/dashboard/bookings",
                "/dashboard/chats",
                "/dashboard/weddingCards",
                "/dashboard/complaintsAndFeedback",
                "/dashboard/payments",
                "/dashboard/complaints",
                // "/dashboard/FAQsAndHelp",
                // "/dashboard/invite",
                "/dashboard/profile",
              ].includes(currentLocation.pathname.toString())
            ) {
              console.log("CURRENT LOCATION AND PATH MATCHED");
              navigate({ pathname: "/" });
              setSignedIn(!signedIn);
            } else {
              setSignedIn(!signedIn);
            }
          }
        }}
      >
        {index + 1 + " " + link.title}
      </Box>
    );
  });
  return <Paper p={"lg"}>{accordion}</Paper>;
};

export default TopNavbarDrawer;
