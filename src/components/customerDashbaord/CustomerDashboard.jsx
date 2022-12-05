import { Container, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCurrentLocation } from "@tabler/icons";
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
      localStorage.getItem("userToken")
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
  return (
    // <Container size={"xl"}>
    <>
      {allowView && (
        <Group align={"flex-start"} noWrap style={{ flexShrink: 0 }}>
          <Sidebar />
          <Outlet />
        </Group>
      )}
    </>
    // </Container>
  );
};

export default CustomerDashboard;
