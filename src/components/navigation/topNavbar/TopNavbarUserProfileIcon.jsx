import { ActionIcon, Anchor, Avatar, Menu } from "@mantine/core";
import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const TopNavbarUserProfileIcon = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  console.log("currentLocation", currentLocation);
  const [loggedInUserData, setLoggedInUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : {}
  );

  return (
    <Menu>
      <Menu.Target>
        <ActionIcon>
          <Avatar radius={"xl"} src={loggedInUserData.profileImage} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {[
          { title: "Dashboard", path: "dashboard" },
          { title: "Profile", path: "dashboard/profile" },
        ].map((menuOption, index) => {
          return (
            <Anchor component={Link} variant={"text"} to={menuOption.path}>
              <Menu.Item key={index}>{menuOption.title}</Menu.Item>
            </Anchor>
          );
        })}
        <Menu.Item
          onClick={() => {
            localStorage.removeItem("userData");
            localStorage.removeItem("userToken");
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
            } else {
              window.location.reload();
            }
          }}
        >
          Sign out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TopNavbarUserProfileIcon;
