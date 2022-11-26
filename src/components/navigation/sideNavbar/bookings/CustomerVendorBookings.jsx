import { ActionIcon, Badge, Group, Modal, Table } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconEye } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";
import ViewAllVendorPaymentReceipts from "./ViewAllVendorPaymentReceipts";
import moment from "moment";

const fetchAllVendors = async () => {
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
const CustomerVendorBookings = () => {
  let navigate = useNavigate();
  const matches500 = useMediaQuery("(min-width: 500px)");
  const [visible, setVisible] = useState(true);
  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);
  const [vendorBookings, setVendorBookings] = useState([]);
  console.log("vendorBookings", vendorBookings);
  useEffect(() => {
    fetchAllVendors().then(setVendorBookings).then(setVisible(false));
  }, []);
  const rows = vendorBookings?.map((row, index) => (
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
              setSingleInvoice(row);
              setViewBookingModal(true);
            }}
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log("Clicked on edit button");
              navigate(
                `/updateVendorBooking/${row.eventType}/${row.bookingDate}/${row.eventDuration}/${row.vendorBusinessId._id}/${row.vendorPackageId._id}/${row._id}`
              );
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const headerData = [
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
  const headers = (
    <tr>
      {headerData?.map((header, index) => {
        return <th key={index}>{header}</th>;
      })}
    </tr>
  );
  return (
    <div style={{ position: "relative" }}>
      <CustomeLoadingOverlay visible={visible} />
      <Modal
        size={matches500 ? "calc(100vw-30vw)" : "sm"}
        radius="sm"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={viewBookingModal}
        onClose={() => setViewBookingModal(!viewBookingModal)}
      >
        <ViewAllVendorPaymentReceipts singleInvoice={singleInvoice} />
      </Modal>
      <Table striped withBorder withColumnBorders>
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default CustomerVendorBookings;
