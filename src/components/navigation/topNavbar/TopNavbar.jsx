import {
  Anchor,
  Container,
  Drawer,
  Group,
  Image,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopNavbarButtons from "./TopNavbarButtons";
import TopNavbarDrawer from "./TopNavbarDrawer";
import TopNavbarHamburger from "./TopNavbarHamburger";
import TopNavbarLinks from "./TopNavbarLinks";
import TopNavbarThemeToggle from "./TopNavbarThemeToggle";
import TopNavbarUserProfileIcon from "./TopNavbarUserProfileIcon";
import logo from "../../../assets/awepLogo/3a.png";

import NotificaitonsTab from "./NotificationsTab";
import { socket } from "../../Socket/Socket";
const TopNavbar = () => {
  const [drawerState, setDrawerState] = useState(false);
  const theme = useMantineTheme();
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const [count, setCount] = useState(0);
  const [allNotifications, setAllNotificaitons] = useState([]);
  const [refreshNotifications, setRefreshNotifications] = useState(false);
  useEffect(() => {
    console.count("@USE EFFECT TRIGGERED");
    const error = socket.on("error", (data) => {
      console.log("ERROR", data);
    });
    console.log("SOCKET ERROR:", error);

    socket.on("newConnection", (data) => {
      console.log("@NC", data);
      console.log("Just notifications", data?.Notificaiton);
      setAllNotificaitons(data?.Notifications);
    });
    socket.on("receiveNotifications", (data) => {
      let unreadCount = 0;
      console.log("receiveNotification1");
      if (data.userId === JSON.parse(localStorage.getItem("userData")).id) {
        let newNotifications = data.notifications.filter((e, index) => {
          if (!e.read && e.userId.toString() === data.userId.toString()) {
            console.log("count 0:::", e, index);
            unreadCount++;
          }
          return e.userId.toString() === data.userId.toString();
        });
        setAllNotificaitons(newNotifications);
        setCount(unreadCount);

        console.log("COUNt1", unreadCount);

        console.log("receiveNotification1", newNotifications);
      }
    });
  }, [socket, refreshNotifications, allNotifications]);
  return (
    <Paper
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
      p={0}
      m={0}
      withBorder
      style={{
        position: "-webkit-sticky",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      {" "}
      <Container py={"0.5rem"} size={"xl"}>
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
          {matches1200 ? (
            <Anchor
              size={"2rem"}
              weight={"bold"}
              variant="text"
              component={Link}
              to="/"
            >
              <Image height={75} src={logo} />
            </Anchor>
          ) : (
            <TopNavbarHamburger setDrawerState={setDrawerState} />
          )}

          {matches1200 ? (
            <TopNavbarLinks
              linksData={[
                // { title: "Home", path: "/" },
                { title: "Venues", path: "/allVenues" },
                { title: "Vendors", path: "/allVendors" },
                { title: "Cards", path: "/cardEditor" },
                { title: "Contact", path: "/contactUs" },
                { title: "About", path: "/aboutUs" },
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
              <Group spacing={"lg"}>
                <NotificaitonsTab
                  unreadCount={count}
                  allNotifications={allNotifications}
                  refreshNotifications={refreshNotifications}
                  setRefreshNotifications={setRefreshNotifications}
                />
                <TopNavbarUserProfileIcon />
              </Group>
            ) : (
              matches1200 && (
                <TopNavbarButtons
                  buttonsData={[
                    { title: "Sign In", path: "/signIn", variant: "filled" },
                    { title: "Sign Up", path: "/signUp", variant: "outline" },
                  ]}
                />
              )
            )}
          </Group>
        </Group>
      </Container>
    </Paper>
  );
};
export default TopNavbar;
