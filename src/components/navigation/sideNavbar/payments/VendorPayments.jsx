import { ActionIcon, Badge, Group, Modal, Table } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconEye } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";
import BookingViewAllBookings from "../bookings/BookingViewAllBookings";
import ViewAllVendorPaymentReceipts from "../bookings/ViewAllVendorPaymentReceipts";
const VendorPayments = ({}) => {
  const [vendorBookings, setVendorBookings] = useState([]);
  console.log("VENUE Payments: ", vendorBookings);
  // <CustomeLoadingOverlay visible={visible} />
  // FETCH ALL VENUES
  useEffect(() => {
    fetchAllVenuePayments().then(setVendorBookings);
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
          "@Successfully fetched all venue payemnts:",
          apiResponse.data.data
        );
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
  console.log("VENUE BOOKINGS: ", vendorBookings);
  let navigate = useNavigate();
  const matches500 = useMediaQuery("(min-width: 500px)");

  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);

  console.log("@VENDOR PAYMENTS", vendorBookings);
  const rows = vendorBookings?.vendorPayments?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row?.vendorPackageBookingObject?.vendorBusinessTitle}</td>
      <td>{row?.vendorPackageId?.vendorPackageTitle}</td>
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
              setSingleInvoice(row?.vendorPackageBookingObject);
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
    "Vendor Business",
    "Vendor Package",
    "Method",
    "Amount",
    "Lodging date",
    "Action",
  ];
  const headers = (
    <tr>
      {headerData?.map((header, index) => {
        return (
          <th key={index}>
            <span className="fgColor">{header}</span>
          </th>
        );
      })}
    </tr>
  );
  return (
    <div style={{ width: "100%" }}>
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
        <thead className="bgColor">{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default VendorPayments;
