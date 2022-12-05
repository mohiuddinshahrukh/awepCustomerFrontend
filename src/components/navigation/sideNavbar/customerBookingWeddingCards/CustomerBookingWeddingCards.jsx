import {
  ActionIcon,
  Badge,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconEdit, IconEye } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";
// import BookingViewAllBookings from "./BookingViewAllBookings";
import moment from "moment";
import CustomerBookingCardEditor from "./CustomerBookingCardEditor";

const fetchAllVenues = async () => {
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

const CustomerBookingWEddingCards = () => {
  let navigate = useNavigate();
  const matches500 = useMediaQuery("(min-width: 500px)");
  const [visible, setVisible] = useState(true);
  const [singleInvoice, setSingleInvoice] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState({});

  const [viewBookingModal, setViewBookingModal] = useState(false);
  const [venueBookings, setVenueBookings] = useState([]);

  useEffect(() => {
    fetchAllVenues().then(setVenueBookings).then(setVisible(false));
  }, []);

  console.log("venueBookings", venueBookings);
  const rows = venueBookings?.map((row, index) => (
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
            variant="filled"
            color={selectedBooking._id === row._id ? "green" : "red"}
            onClick={() => {
              console.log("Clicked on view button");
              setSelectedBooking(row);
              // setSingleInvoice(row);
              //   setViewBookingModal(true);
            }}
          >
            <IconCheck />
          </ActionIcon>
          {/* <ActionIcon
            onClick={() => {
              console.log("Clicked on edit button");
              navigate(
                `/updateVenueBooking/${row.eventType}/${row.bookingDate}/${row.bookingTime}/${row.numberOfGuests}/${row.venueId._id}/${row.subVenueId._id}/${row._id}`
              );
            }}
          >
            <IconEdit />
          </ActionIcon>*/}
        </Group>
      </td>
    </tr>
  ));

  const headerData = [
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
  const headers = (
    <tr>
      {headerData?.map((header, index) => {
        return <th key={index}> {header}</th>;
      })}
    </tr>
  );
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <CustomeLoadingOverlay visible={visible} />
      <Modal
        size={matches500 ? "calc(100vw-30vw)" : "sm"}
        radius="sm"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={viewBookingModal}
        onClose={() => setViewBookingModal(!viewBookingModal)}
      >
        {/*<BookingViewAllBookings singleInvoice={singleInvoice} />*/}
      </Modal>
      <Paper component={ScrollArea} h={"30vh"} withBorder>
        {" "}
        <Table striped withBorder withColumnBorders>
          <thead>{headers}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
      <CustomerBookingCardEditor selectedBooking={selectedBooking} />
    </div>
  );
};

export default CustomerBookingWEddingCards;
