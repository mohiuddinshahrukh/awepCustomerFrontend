import { Center, Container, Grid, Paper, Text } from "@mantine/core";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import BookingCalendar from "./Calendar";
import FinanceStats from "./FinanceStats";
import RecentBookings from "./RecentBookings";
import UpcomingBookings from "./UpcomingBookings";

const logicForSortingBookingsAccordingToLunchOrDinner = (bookings) => {
  let sortedBookings = [];
  let lunchBookings = [];
  let dinnerBookings = [];
  bookings.forEach((booking) => {
    if (booking.bookingTime === "LUNCH") {
      lunchBookings.push(booking);
    } else {
      dinnerBookings.push(booking);
    }
  });
  let i = 0;
  let j = 0;
  while (i < lunchBookings.length && j < dinnerBookings.length) {
    if (
      moment(lunchBookings[i].bookingDate).format("YYYY-MM-DD") ===
      moment(dinnerBookings[j].bookingDate).format("YYYY-MM-DD")
    ) {
      sortedBookings.push(lunchBookings[i]);
      sortedBookings.push(dinnerBookings[j]);
      i++;
      j++;
    } else if (
      moment(lunchBookings[i].bookingDate).format("YYYY-MM-DD") <
      moment(dinnerBookings[j].bookingDate).format("YYYY-MM-DD")
    ) {
      sortedBookings.push(lunchBookings[i]);
      i++;
    } else {
      sortedBookings.push(dinnerBookings[j]);
      j++;
    }
  }
  while (i < lunchBookings.length) {
    sortedBookings.push(lunchBookings[i]);
    i++;
  }
  while (j < dinnerBookings.length) {
    sortedBookings.push(dinnerBookings[j]);
    j++;
  }
  return sortedBookings;
};

const DashboardStats = () => {
  const [dashboardStats, setDashboardStats] = useState({});
  const [processedBookings, setProcessedBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  console.log("dashboardStats", dashboardStats);
  const fetchAllvenueFeedbacks = async () => {
    try {
      const apiResponse = await axios({
        method: "get",
        url: https://a-wep-production.herokuapp.com/customer/dashboard",
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
  const [bookingDatesObject, setBookingDatesObject] = useState({});
  useEffect(() => {
    console.count();
    fetchAllvenueFeedbacks().then((result) => {
      setDashboardStats(result);
      let bookingData = {};
      let bookings = result.subVenueBookings;
      bookings.map(
        (booking) =>
          (bookingData[
            moment(booking.bookingDate).add(1, "days").format("YYYY-MM-DD")
          ] = moment(booking.bookingDate).add(1, "days").format("YYYY-MM-DD"))
      );
      console.log("result", bookingData);
      setBookingDatesObject(bookingData);
      const processedBookings = bookings.map((booking) => {
        return {
          date: booking.bookingDate,
          time: booking.bookingTime ? booking.bookingTime : "N/A",
          customer: booking.customerName ? booking.customerName : "N/A",
          eventType: booking.eventType ? booking.eventType : "N/A",
          guests: booking.numberOfGuests ? booking.numberOfGuests : "N/A",
          menu: booking?.selectedMenu?.menu?.menuTitle
            ? booking?.selectedMenu?.menu?.menuTitle
            : "No Menu Selected",
          venue: booking.venueName ? booking.venueName : "N/A",
          subVenue: booking.subVenueName ? booking.subVenueName : "N/A",
        };
      });
      let upcomingBookings = bookings.map((booking) => {
        return {
          date: booking.bookingDate,
          time: booking.bookingTime ? booking.bookingTime : "N/A",
          customer: booking.customerName ? booking.customerName : "N/A",
          eventType: booking.eventType ? booking.eventType : "N/A",
          guests: booking.numberOfGuests ? booking.numberOfGuests : "N/A",
          menu: booking?.selectedMenu?.menu?.menuTitle
            ? booking?.selectedMenu?.menu?.menuTitle
            : "No Menu Selected",
          venue: booking.venueName ? booking.venueName : "N/A",
          subVenue: booking.subVenueName ? booking.subVenueName : "N/A",
        };
      });
      upcomingBookings = upcomingBookings.reverse();
      upcomingBookings =
        logicForSortingBookingsAccordingToLunchOrDinner(upcomingBookings);

      setProcessedBookings(processedBookings);
      setUpcomingBookings(upcomingBookings);
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
        <RecentBookings processedBookings={processedBookings} />
      </Grid.Col>
      <Grid.Col md={4}>
        <UpcomingBookings processedUpcomingBookings={upcomingBookings} />
      </Grid.Col>
      <Grid.Col md={4}>
        <Center mb="md">
          <BookingCalendar
            size={"md"}
            initialMonth={new Date()}
            bookingData={bookingDatesObject}
          />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default DashboardStats;
