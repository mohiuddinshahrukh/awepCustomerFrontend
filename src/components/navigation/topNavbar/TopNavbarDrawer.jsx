import {
  Accordion,
  Anchor,
  Button,
  List,
  Paper,
  ScrollArea,
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
      <Button
        variant={link?.variant ? link.variant : "filled"}
        styles={{
          inner: {
            justifyContent: "flex-start",
          },
        }}
        leftIcon={link.icon}
        hidden={
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Dashboard") ||
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Settings") ||
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Signout") ||
          (!localStorage.getItem("customerToken") &&
            link.title.toString() === "Feedbacks")
            ? true
            : false
        }
        mb={"xl"}
        key={index}
        fullWidth
        className={
          link.variant !== "outline" ? "bgColor hover" : "border fgColorF"
        }
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
        <Text align="left">
          {" "}
          {localStorage.getItem("customerToken")
            ? index + 1 + " - " + link.title
            : index + " - " + link.title}
        </Text>
      </Button>
    );
  });
  return <ScrollArea p={"lg"}>{accordion}</ScrollArea>;
};

export default TopNavbarDrawer;
