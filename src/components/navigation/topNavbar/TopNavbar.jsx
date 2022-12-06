import {
  Anchor,
  Button,
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
import { socket as Socket } from "../../Socket/Socket";
import TopNavbarUserProfileDrawer from "./TopNavbarUserProfileDrawer";
import drawerBg from "../../../assets/Drawer/drawerBg.jpg";
import { IconLayoutGrid, IconLogout, IconSettings } from "@tabler/icons";

const TopNavbar = ({ signedIn, setSignedIn }) => {
  const [drawerState, setDrawerState] = useState(false);
  const theme = useMantineTheme();
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const [count, setCount] = useState(0);
  const [allNotifications, setAllNotificaitons] = useState([]);
  const [refreshNotifications, setRefreshNotifications] = useState(false);
  useEffect(() => {
    console.count("@USE EFFECT TRIGGERED");
    const socket = Socket.socket;
    const error = socket.on("error", (data) => {
      console.log("ERROR", data);
    });
    console.log("SOCKET ERROR:", error);

    socket.on("newConnection", (data) => {
      console.log("@NC", data);
      console.log("Just notifications", data?.Notificaitons);
      setAllNotificaitons(data?.Notifications);
      //

      let unreadCount = 0;
      console.log("receiveNotification1");
      if (data.userId === JSON.parse(localStorage.getItem("customerData")).id) {
        let newNotifications = data.Notifications.filter((e, index) => {
          if (!e.read && e.userId.toString() === data.userId.toString()) {
            console.log("count 0:::", e, index);
            unreadCount++;
          }
          return e.userId.toString() === data.userId.toString();
        });
        setAllNotificaitons(data?.Notifications);
        setCount(unreadCount);

        console.log("COUNt1", unreadCount);
        console.log("receiveNotification1", newNotifications);
      }

      //
    });
    socket.on("receiveNotifications", (data) => {
      let unreadCount = 0;
      console.log("receiveNotification1");
      if (data.userId === JSON.parse(localStorage.getItem("customerData")).id) {
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
  }, [refreshNotifications, allNotifications, signedIn]);
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
          styles={{
            header: { position: "absolute", zIndex: 2, right: 5, top: 5 },
            closeButton: {
              borderRadius: "50%",
              backgroundColor: "#e60084",
              color: "white",
              ":hover": {
                backgroundColor: "#c1006d",
              },
            },
          }}
          opened={drawerState}
          onClose={() => {
            setDrawerState(false);
          }}
        >
          {localStorage.getItem("customerToken") ? (
            <div
              style={{
                position: "relative",
                height: "150px",
              }}
            >
              <Image src={drawerBg} height="150px" />
              <TopNavbarUserProfileDrawer setDrawerState={setDrawerState} />
            </div>
          ) : (
            <Anchor
              mt={"xl"}
              component={Link}
              to={"/"}
              onClick={() => {
                setDrawerState(false);
              }}
            >
              <Image mt={"xl"} height={"70px"} fit={"contain"} src={logo} />
            </Anchor>
          )}
          {[].map((buttonData, index) => {
            return (
              <Button
                className="button"
                leftIcon={buttonData.icon}
                mb={"sm"}
                component={Link}
                to={buttonData.path}
                onClick={() => {
                  setDrawerState(false);
                }}
                uppercase
                fullWidth
                key={index}
              >
                {buttonData.title}
              </Button>
            );
          })}

          <TopNavbarDrawer
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            setDrawerState={setDrawerState}
            linksData={[
              {
                title: "Dashboard",
                path: "/dashboard",
                icon: <IconLayoutGrid />,
              },
              {
                title: "Home",
                path: "/",
              },
              {
                title: "Venues",
                path: "/allVenues",
              },
              { title: "Vendors", path: "/allVendors" },
              { title: "Card Editor", path: "/cardEditor" },
              { title: "Contact Us", path: "/contactUs" },
              { title: "About Us", path: "/aboutUs" },
              {
                title: "Settings",
                path: "/dashboard/profile",
                icon: <IconSettings />,
              },
              { title: "Signout", path: "/dashboard", icon: <IconLogout /> },
            ]}
          />
          {!localStorage.getItem("customerToken") && (
            <Group position="center">
              <TopNavbarButtons
                buttonsData={[
                  { title: "Sign In", path: "/signIn", variant: "filled" },
                  { title: "Sign Up", path: "/signUp", variant: "outline" },
                ]}
              />
            </Group>
          )}
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
              <Image height={75} src={logo} />
            </Anchor>
          )}
          <Group>
            <TopNavbarThemeToggle />
            {matches1200 && localStorage.getItem("customerToken") ? (
              <Group spacing={"lg"}>
                <NotificaitonsTab
                  signedIn={signedIn}
                  unreadCount={count}
                  allNotifications={allNotifications}
                  refreshNotifications={refreshNotifications}
                  setRefreshNotifications={setRefreshNotifications}
                />
                <TopNavbarUserProfileIcon
                  signedIn={signedIn}
                  setSignedIn={setSignedIn}
                />
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
