import { ActionIcon, Modal, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEye } from "@tabler/icons";

import axios from "axios";
import React, { useEffect, useState } from "react";

import LoaderAWEP from "../../../LoaderAWEP/LoaderAWEP";
import TableComponent from "../../../tableComponenet/TableComponent";
import BookingViewAllBookings from "../bookings/BookingViewAllBookings";

let headCells = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "venueName",
    numeric: false,
    disablePadding: true,
    label: "Venue Name",
  },
  {
    id: "subVenueName",
    numeric: false,
    disablePadding: true,
    label: "Sub Venue Name",
  },
  {
    id: "paymentMethod",
    numeric: false,
    disablePadding: true,
    label: "Method",
  },
  {
    id: "paymentAmount",
    numeric: true,
    disablePadding: true,
    label: "Amount",
  },
  {
    id: "createdAt",
    date: true,
    numeric: false,
    disablePadding: true,
    label: "Lodging date",
  },
  {
    id: "actions",
    view: <IconEye />,
    numeric: false,
    label: "Actions",
  },
  // { id: "action", numeric: false, disablePadding: true, label: "Action" },
];
const VenuePayments = () => {
  const [venueBookings, setVenueBookings] = useState([]);
  const [visible, setVisible] = useState(true);

  console.log("VENUE Payments: ", venueBookings);
  // FETCH ALL VENUES
  useEffect(() => {
    fetchAllVenuePayments().then(setVenueBookings);
  }, []);
  const fetchAllVenuePayments = async () => {
    console.log("Fetching all venues");
    try {
      console.log("Fetching all venues try");
      const apiResponse = await axios({
        method: "get",
        url: "https://a-wep.herokuapp.com/customer/getMyPayments",
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log(
          "@Successfully fetched all venue payments:",
          apiResponse.data.data
        );

        apiResponse.data.data.subVenueBookingPayments.map((item, index) => {
          item.id = index + 1;
        });

        setVisible(false);
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        setVisible(false);

        console.log("Error while fetching all venues");
      } else {
        setVisible(false);

        console.log("Failed to fetch all venues, don't know this error");
      }
    } catch (e) {
      setVisible(false);

      console.log("ERROR in fetching all venues:", e);
    }
  };

  const matches500 = useMediaQuery("(min-width: 500px)");

  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);

  return (
    <Paper style={{ width: "100%" }}>
      <LoaderAWEP visible={visible} />
      <Modal
        size={matches500 ? "calc(100vw-30vw)" : "sm"}
        radius="sm"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={viewBookingModal}
        onClose={() => setViewBookingModal(!viewBookingModal)}
      >
        <BookingViewAllBookings singleInvoice={singleInvoice} />
      </Modal>
      {venueBookings?.subVenueBookingPayments && (
        <TableComponent
          headCells={headCells}
          rowData={venueBookings?.subVenueBookingPayments}
          setViewBookingModal={setViewBookingModal}
          setSingleInvoice={setSingleInvoice}
        />
      )}
    </Paper>
  );
};

export default VenuePayments;
