import { Center, Container, Grid, Paper, Text } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BookingCalendar from "./Calendar";
import FinanceStats from "./FinanceStats";

const DashboardStats = () => {
  const [dashboardStats, setDashboardStats] = useState({});
  console.log("dashboardStats", dashboardStats);
  const fetchAllvenueFeedbacks = async () => {
    try {
      const apiResponse = await axios({
        method: "get",
        url: "https://a-wep.herokuapp.com/customer/dashboard",
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log(
          "Successfully fetched dashboard stats:",
          apiResponse.data.data
        );
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        console.log("Error while fetching dashboard stats");
      } else {
        console.log("Failed to fetch dashboard stats, dont know this error");
      }
    } catch (e) {
      console.log("ERROR in fetching all venues:", e);
    }
  };
  const [bookingData, setBookingData] = useState({});
  useEffect(() => {
    console.count();
    fetchAllvenueFeedbacks().then((result) => {
      setDashboardStats(result);
      let bookingData = {};
      result.subVenueBookings.map(
        (booking) =>
          (bookingData[
            moment(booking.bookingDate).add(1, "days").format("YYYY-MM-DD")
          ] = moment(booking.bookingDate).add(1, "days").format("YYYY-MM-DD"))
      );
      console.log("result", bookingData);
      setBookingData(bookingData);
    });
  }, []);
  return (
    <Grid style={{ width: "100%" }}>
      <Grid.Col md={12}>
        <FinanceStats
          venueBookings={
            dashboardStats?.subVenueBookingsCount
              ? dashboardStats?.subVenueBookingsCount
              : 0
          }
          vendorBookings={
            dashboardStats?.vendorBookingsCount
              ? dashboardStats?.vendorBookingsCount
              : 0
          }
          paidVenueAmount={
            dashboardStats?.venueExpenses
              ? parseInt(dashboardStats?.venueExpenses)
              : 0
          }
          paidVendorAmount={
            dashboardStats?.vendorExpenses
              ? parseInt(dashboardStats?.vendorExpenses)
              : 0
          }
          remainingVenueAmount={
            dashboardStats?.venueRemaining
              ? parseInt(dashboardStats?.venueRemaining)
              : 0
          }
          remainingVendorAmount={
            dashboardStats?.vendorRemaining
              ? parseInt(dashboardStats?.vendorRemaining)
              : 0
          }
        />
      </Grid.Col>
      <Grid.Col md={4}>
        <Center mb="md">
          <BookingCalendar
            size={"md"}
            initialMonth={new Date()}
            bookingData={bookingData}
          />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default DashboardStats;
