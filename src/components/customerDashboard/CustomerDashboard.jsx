import { ActionIcon, Divider, Drawer, Group, Paper, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconMenu2 } from "@tabler/icons";

import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../navigation/sideNavbar/bookings/Sidebar";

const CustomerDashboard = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [allowView, setAllowView] = useState(false);
  useEffect(() => {
    if (
      [
        "/dashboard",
        "/dashboard/venueBookings",
        "/dashboard/vendorBookings",
        "/dashboard/chats",
        "/dashboard/weddingCards",
        "/dashboard/venueComplaints",
        "/dashboard/vendorComplaints",
        "/dashboard/vendorPayments",
        "/dashboard/venuePayments",
        "/dashboard/venueFeedbacks",
        "/dashboard/vendorFeedbacks",
        "/dashboard/FAQsAndHelp",
        "/dashboard/invite",
        "/dashboard/profile",
      ].includes(currentLocation.pathname.toString()) &&
      localStorage.getItem("customerToken")
    ) {
      // console.log("ALLOW USER ACCESS");
      setAllowView(true);
    } else {
      showNotification({
        title: "Please login to access this page",
        message: "You will be redirected to the signin page",
        color: "red",
      });
      navigate({ pathname: "/signin" });
    }
  });

  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const [opened, setOpened] = useState(false);
  return (
    // <Container size={"xl"}>
    <Paper p={"md"} style={{ height: "100%" }}>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Dashboard Options"
        padding="xl"
        size="lg"
        position="left"
      >
        <Sidebar setOpened={setOpened} />
      </Drawer>

      {!matches1200 && (
        <Group position="apart" align={"center"}>
          <Text size={"xl"} weight={500}>
            Customer Dashboard
          </Text>
          <ActionIcon
            variant="outline"
            size={43}
            className="border fgColorF"
            onClick={() => {
              setOpened(true);
            }}
          >
            <IconMenu2 />
          </ActionIcon>
        </Group>
      )}
      {!matches1200 && <Divider my="lg" />}
      {allowView && (
        <Group
          align={"flex-start"}
          noWrap
          style={{ flexShrink: 0, height: "100%" }}
        >
          {matches1200 ? <Sidebar setOpened={setOpened} /> : null}
          <Outlet />
        </Group>
      )}
    </Paper>
    // </Container>
  );
};

export default CustomerDashboard;
