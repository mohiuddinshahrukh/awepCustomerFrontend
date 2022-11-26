import { ActionIcon, Badge, Group, Modal, Table } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconEye } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";
import BookingViewAllBookings from "../bookings/BookingViewAllBookings";

const VenuePayments = ({ venueBookings }) => {
  console.log("VENUE BOOKINGS: ", venueBookings);
  let navigate = useNavigate();
  const matches500 = useMediaQuery("(min-width: 500px)");

  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);

  console.log("venueBookings", venueBookings);
  const rows = venueBookings?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row.venueName}</td>
      <td>{row.subVenueName}</td>
      <td>{row.paymentMethod}</td>
      <td align="right">{row?.paymentAmount?.toLocaleString()}</td>
      <td>
        {row.createdAt?.split("T")[0] +
          " " +
          row.createdAt?.split("T")[1]?.split(".")[0]}
      </td>
      <td align="center">
        <Group spacing={0} noWrap align={"center"} position="center">
          <ActionIcon
            onClick={() => {
              console.log("Clicked on view button");
              setSingleInvoice(row?.subVenueBookingObject);
              setViewBookingModal(true);
            }}
          >
            <IconEye />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const headerData = [
    "ID",
    "Venue Name",
    "Sub Venue Name",
    "Method",
    "Amount",
    "Event Date & Time",
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
    <div style={{ position: "relative" }}>
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
      <Table striped withBorder withColumnBorders>
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default VenuePayments;
