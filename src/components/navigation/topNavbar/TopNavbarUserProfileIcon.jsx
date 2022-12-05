import { ActionIcon, Anchor, Avatar, Group, Menu, Text } from "@mantine/core";
import {
  IconLogout,
  IconPhoneCheck,
  IconPhoneX,
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
    <Menu withArrow width={350} position="bottom" transition="pop">
      <Menu.Target>
        <ActionIcon>
          <Avatar size={43} src={loggedInUserData.profileImage} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {[
          { title: "Dashboard", path: "dashboard" },
          { title: "Profile", path: "dashboard/profile" },
        ].map((menuOption, index) => {
          return (
            <Anchor
              key={index}
              component={Link}
              variant={"text"}
              to={menuOption.path}
            >
              <Menu.Item key={index}>{menuOption.title}</Menu.Item>
            </Anchor>
          );
        })}
        <Menu.Item
          onClick={() => {
            localStorage.removeItem("customerData");
            localStorage.removeItem("userToken");
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
//

// <Menu withArrow width={350} position="bottom" transition="pop">
// <Menu.Target>
//   <ActionIcon>
//     <Avatar radius="xl" src={loggedInUserData.profileImage} />
//   </ActionIcon>
// </Menu.Target>
// <Menu.Dropdown>
//   <Menu.Item onClick={() => navigate("/")}>
//     <Group>
//       <div>
//         <Text weight={500}>{loggedInUserData.name}</Text>
//         <Text size="xs" color="dimmed">
//           {loggedInUserData.email}
//         </Text>
//         <Text size="xs" color="dimmed">
//           {loggedInUserData.userType}
//         </Text>
//       </div>
//     </Group>
//   </Menu.Item>
//   <Menu.Divider />
//   <Menu.Label>Verification Status</Menu.Label>
//   <Menu.Item closeMenuOnClick={false}>
//     {loggedInUserData.isEmailVerified === true ? (
//       <Group>
//         <IconUserCheck color="green" />
//         <Text>Email is verified</Text>
//       </Group>
//     ) : (
//       <Group>
//         <IconUserX color="red" />
//         <Text>Email is unverified</Text>
//       </Group>
//     )}
//   </Menu.Item>
//   <Menu.Item closeMenuOnClick={false}>
//     {loggedInUserData.isPhoneVerified === true ? (
//       <Group>
//         <IconPhoneCheck color="green" />
//         <Text>Phone is verified</Text>
//       </Group>
//     ) : (
//       <Group>
//         <IconPhoneX color="red" />
//         <Text>Phone is unverified</Text>
//       </Group>
//     )}
//   </Menu.Item>
//   <Menu.Divider />
//   <Menu.Label>Settings</Menu.Label>
//   <Menu.Item
//   // icon={<Edit color="green" />}
//   // onClick={() => {
//   //   navigate("/editProfile", {
//   //     state: {
//   //       ID: loggedInUserData.id,
//   //       NAME: loggedInUserData.name,
//   //       EMAIL: loggedInUserData.email,
//   //       USERTYPE: loggedInUserData.userType,
//   //       PROFILEIMAGE: loggedInUserData.profileImage,
//   //       ISEMAILVERIFIED: loggedInUserData.isEmailVerified,
//   //       ISPHONEVERIFIED: loggedInUserData.isPhoneVerified,
//   //       CNIC: loggedInUserData.CNIC,
//   //       PHONE: loggedInUserData.phone,
//   //       TOKEN: loggedInUserData.token,
//   //     },
//   //   });
//   // }}
//   >
//     Edit Profile
//   </Menu.Item>
//   {/* As No More Settings, it has been commented. */}
//   {/*
// <Menu.Item
// icon={<IconSettings />}
// onClick={() => navigate("/settings")}
// >
// Account settings
// </Menu.Item>
// <Menu.Divider /> */}
//   <Menu.Label>Danger zone</Menu.Label>
//   <Menu.Item
//     icon={<IconLogout />}
//     onClick={() => {
//       // dispatch(logout());
//       // dispatch(forgetToken());
//       localStorage.setItem("userToken", "");
//       localStorage.setItem("customerData", "");
//       localStorage.clear();
//       navigate("/signin");
//     }}
//   >
//     Logout
//   </Menu.Item>
// </Menu.Dropdown>
// </Menu>

//
