import { ActionIcon, Anchor, Avatar, Group, Menu, Text } from "@mantine/core";
import {
  IconDashboard,
  IconEdit,
  IconLayout,
  IconLayoutGrid,
  IconLogout,
  IconPhoneCheck,
  IconPhoneX,
  IconSettings,
  IconUserCheck,
  IconUserX,
} from "@tabler/icons";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TopNavbarUserProfileIcon = ({ setSignedIn }) => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  // console.log("currentLocation", currentLocation);
  const [loggedInUserData, setLoggedInUserData] = useState(
    localStorage.getItem("customerData")
      ? JSON.parse(localStorage.getItem("customerData"))
      : {}
  );

  return (
    <Menu withArrow width={275} position="bottom" transition="pop">
      <Menu.Target>
        <ActionIcon>
          <Avatar size={43} src={loggedInUserData.profileImage} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <Group position="center">
            <Avatar
              size={"lg"}
              radius="xl"
              src={loggedInUserData.profileImage}
            />
            <div style={{ textAlign: "center" }}>
              <Text weight={500}>{loggedInUserData.name}</Text>
              <Text size="xs" color="dimmed">
                {loggedInUserData.email}
              </Text>
              <Text size="xs" color="dimmed">
                {loggedInUserData.userType}
              </Text>
            </div>
          </Group>
        </Menu.Item>
        <Menu.Divider style={{}} />
        <Menu.Item
          onClick={() => {
            navigate("/dashboard");
          }}
          icon={<IconLayoutGrid color="#e60084" />}
        >
          Dashboard
        </Menu.Item>
        {/*<Menu.Divider />
        <Menu.Label>Verification Status</Menu.Label>
        <Menu.Item closeMenuOnClick={false}>
          {loggedInUserData.isEmailVerified === true ? (
            <Group>
              <IconUserCheck color="green" />
              <Text>Email is verified</Text>
            </Group>
          ) : (
            <Group>
              <IconUserX color="red" />
              <Text>Email is unverified</Text>
            </Group>
          )}
        </Menu.Item>
        <Menu.Item closeMenuOnClick={false}>
          {loggedInUserData.isPhoneVerified === true ? (
            <Group>
              <IconPhoneCheck color="green" />
              <Text>Phone is verified</Text>
            </Group>
          ) : (
            <Group>
              <IconPhoneX color="red" />
              <Text>Phone is unverified</Text>
            </Group>
          )}
        </Menu.Item>*/}

        <Menu.Item
          icon={<IconSettings color="orange" />}
          onClick={() => {
            navigate("/dashboard/profile");
          }}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout color="red" />}
          onClick={() => {
            localStorage.removeItem("customerData");
            localStorage.removeItem("customerToken");
            setLoggedInUserData({});
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
              setSignedIn(false);
            } else {
              setSignedIn(false);
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

// {[
//   { title: "Dashboard", path: "dashboard" },
//   { title: "Profile", path: "dashboard/profile" },
// ].map((menuOption, index) => {
//   return (
//     <Anchor
//       key={index}
//       component={Link}
//       variant={"text"}
//       to={menuOption.path}
//     >
//       <Menu.Item key={index}>{menuOption.title}</Menu.Item>
//     </Anchor>
//   );
// })}
