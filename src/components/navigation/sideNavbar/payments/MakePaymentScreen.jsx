import { ActionIcon, Badge, Group, Select, Table } from "@mantine/core";
import { IconEdit, IconEye, IconMessage } from "@tabler/icons";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
const fetchAllVenueBookings = async () => {
  try {
    const apiResponse = await axios({
      method: "get",
      url: "https://a-wep.herokuapp.com/customer/getSubVenueBookings",
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log("API RESPONSE: ", apiResponse.data);

    if (apiResponse.data.status === "success") {
      console.log("Successfully fetched all venues:", apiResponse.data.data);
      return apiResponse.data.data;
    } else if (apiResponse.data.status === "error") {
      console.log("Error while fetching all venues");
    } else {
      console.log("Failed to fetch all venues, dont know this error");
    }
  } catch (e) {
    console.log("ERROR in fetching all venues:", e);
  }
};

const fetchAllVendorBookings = async () => {
  try {
    const apiResponse = await axios({
      method: "get",
      url: "https://a-wep.herokuapp.com/customer/getVendorPackageBookings",
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log("API RESPONSE: ", apiResponse.data);

    if (apiResponse.data.status === "success") {
      console.log(
        "Successfully fetched all vendor bookings:",
        apiResponse.data.data
      );
      return apiResponse.data.data;
    } else if (apiResponse.data.status === "error") {
      console.log("Error while fetching all vendor bookings");
    } else {
      console.log("Failed to fetch all vendor bookings, dont know this error");
    }
  } catch (e) {
    console.log("ERROR in fetching all venues:", e);
  }
};
const MakePaymentScreen = () => {
  const [allVenueBookings, setAllVenueBookings] = useState([]);
  const [allVendorBookings, setAllVendorBookings] = useState([]);
  const [allVendorBookingsWithPaymentDue, setAllVendorBookingsWithPaymentDue] =
    useState([]);
  const [allVenuesBookingsWithPaymentDue, setAllVenuesBookingsWithPaymentDue] =
    useState([]);
  const [paymentFor, setPaymentFor] = useState("venue");
  useEffect(() => {
    fetchAllVenueBookings().then((data) => {});
    fetchAllVendorBookings().then(setAllVendorBookings);
  }, []);
  const venueRows = allVenueBookings?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row.subVenueName}</td>
      <td>{row.eventType}</td>
      <td>
        {row.createdAt.split("T")[0] +
          " " +
          row.createdAt.split("T")[1].split(".")[0]}
      </td>

      <td>
        {moment(row?.bookingDate).format().split("T")[0] +
          " " +
          row.bookingTime}
      </td>
      <td align="center">
        <Badge color={row.bookingStatus === "IN PROGRESS" ? "blue" : "red"}>
          {row.bookingStatus}
        </Badge>
      </td>
      <td align="center">
        <Badge color={row.paymentStatus === "ADVANCE PAID" ? "yellow" : "blue"}>
          {row.paymentStatus}
        </Badge>
      </td>
      <td align="right">{row.numberOfGuests}</td>
      <td align="center">
        <Group spacing={0} noWrap align={"center"} position="center">
          <ActionIcon
            onClick={() => {
              console.log("Clicked on view button");
              //   setSingleInvoice(row);
              //   setViewBookingModal(true);
            }}
          >
            <IconEye />
          </ActionIcon>
          {row.bookingStatus === "COMPLETED" ? (
            <ActionIcon
              onClick={() => {
                console.log("Clicked on edit button");
                // navigate(`/addReview/${row._id}`);
              }}
            >
              <IconMessage />
            </ActionIcon>
          ) : (
            <ActionIcon
              onClick={() => {
                console.log("Clicked on edit button");
                // navigate(
                //   `/updateVenueBooking/${row.eventType}/${row.bookingDate}/${row.bookingTime}/${row.numberOfGuests}/${row.venueId._id}/${row.subVenueId._id}/${row._id}`
                // );
              }}
            >
              <IconEdit />
            </ActionIcon>
          )}
        </Group>
      </td>
    </tr>
  ));

  const venueHeaderData = [
    "ID",
    "Sub Venue Name",
    "Event Type",
    "Booking Lodged At",
    "Event Date & Time",
    "Booking Status",
    "Payment Status",
    "Guests",
    "Action",
  ];
  const venueheaders = (
    <tr>
      {venueHeaderData?.map((header, index) => {
        return <th key={index}> {header}</th>;
      })}
    </tr>
  );
  const vendorRows = allVendorBookings?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row.vendorBusinessTitle}</td>
      <td>{row.vendorPackageTitle}</td>
      <td>{row.eventType}</td>
      <td>
        {row.createdAt.split("T")[0] +
          " " +
          row.createdAt.split("T")[1].split(".")[0]}
      </td>
      <td>{moment(row?.bookingDate).format().split("T")[0]}</td>
      <td>{row.eventDuration}</td>
      <td align="center">
        <Badge
          color={
            row.bookingStatus === "IN PROGRESS"
              ? "blue"
              : row.bookingStatus === "COMPLETED"
              ? "green"
              : "red"
          }
        >
          {row.bookingStatus}
        </Badge>
      </td>
      <td align="center">
        <Badge color={row.paymentStatus === "ADVANCE PAID" ? "yellow" : "blue"}>
          {row.paymentStatus}
        </Badge>
      </td>

      <td align="center">
        <Group spacing={0} noWrap align={"center"} position="center">
          <ActionIcon
            onClick={() => {
              console.log("Clicked on view button");
              //   setSingleInvoice(row);
              //   setViewBookingModal(true);
            }}
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log("Clicked on edit button");
              //   navigate(
              //     `/updateVendorBooking/${row.eventType}/${row.bookingDate}/${row.eventDuration}/${row.vendorBusinessId._id}/${row.vendorPackageId._id}/${row._id}`
              //   );
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const vendorHeaderData = [
    "ID",
    "Vendor Service",
    "Vendor Package",
    "Event Type",
    "Booking Lodged At",
    "Event Date",
    "Event Duration",
    "Booking Status",
    "Payment Status",
    "Actions",
  ];
  const vendorHeaders = (
    <tr>
      {vendorHeaderData?.map((header, index) => {
        return <th key={index}>{header}</th>;
      })}
    </tr>
  );

  const allVenuesWithPayments = allVenueBookings?.filter((booking) => {
    return booking.paymentStatus === "ADVANCE PAID";
  });

  const allVendorsWithPayments = allVendorBookings?.filter((booking) => {
    return booking.paymentStatus === "ADVANCE PAID";
  });

  console.log("All venues With ", allVenuesWithPayments);
  console.log("All venues With ", allVendorsWithPayments);
  return (
    <div>
      <Select
        label="Payment for"
        value={paymentFor}
        data={[
          { value: "venue", label: "Venue Booking" },
          { value: "vendor", label: "Vendor Booking" },
        ]}
        onChange={setPaymentFor}
      />

      {paymentFor === "venue" ? (
        <Table striped withBorder withColumnBorders>
          <thead>{venueheaders}</thead>
          <tbody>{venueRows}</tbody>
        </Table>
      ) : (
        <Table striped withBorder withColumnBorders>
          <thead>{vendorHeaders}</thead>
          <tbody>{vendorRows}</tbody>
        </Table>
      )}
    </div>
  );
};

export default MakePaymentScreen;
