import { ActionIcon, Badge, Group, Modal, Table, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";

const fetchAllVendorComplaints = async () => {
  try {
    const apiResponse = await axios({
      method: "get",
      url: "https://a-wep.herokuapp.com/customer/getMyVendorPackageBookingComplaints",
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

const VendorComplaints = () => {
  const matches500 = useMediaQuery("(min-width: 500px)");
  const [visible, setVisible] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);
  const [vendorBookings, setVendorBookings] = useState([]);
  const deleteVendorComplaint = async (id) => {
    try {
      const apiResponse = await axios({
        method: "delete",
        url: `https://a-wep.herokuapp.com/customer/deleteVendorPackageBookingComplaint/${id}`,
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
        showNotification({
          title: "Complian Deleted",
          message: "Complaint deleted successfully",
          color: "green",
        });

        setRefresh(!refresh);
        return apiResponse.data.status;
      } else if (apiResponse.data.status === "error") {
        console.log("Error while fetching all vendor bookings");
      } else {
        console.log(
          "Failed to fetch all vendor bookings, dont know this error"
        );
      }
    } catch (e) {
      console.log("ERROR in fetching all venues:", e);
    }
  };
  useEffect(() => {
    fetchAllVendorComplaints().then(setVendorBookings).then(setVisible(false));
  }, [refresh]);
  const rows = vendorBookings?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row?.vendorPackageId?.vendorPackageTitle}</td>
      <td>{row?.vendorBusinessId?.vendorBusinessTitle}</td>
      <td>{row?.complaintType}</td>
      <td>{row?.complaintTitle}</td>
      <td>{row?.createdAt?.split("T")[0]}</td>
      <td>{row?.vendorPackageBookingId?.bookingDate?.split("T")[0]}</td>
      <td align="center">
        <Badge
          color={
            row?.status === "IN PROGRESS"
              ? "blue"
              : row?.status === "COMPLETED"
              ? "green"
              : "red"
          }
        >
          {row?.status}
        </Badge>
      </td>
      <td align="center">
        <Text lineClamp={1}>{row?.complaintDescription}</Text>
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
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log("Clicked on Delete button");
              setVisible(true);
              deleteVendorComplaint(row?._id);
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const headerData = [
    "ID",
    "Vendor Package",
    "Vendor Service",
    "Complaint Type",
    "Complaint Title",
    "Complaint Date",
    "Booking Date",
    "Complaint Status",
    "Complaint Details",
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
    <div>
      <Modal
        size={matches500 ? "calc(100vw-30vw)" : "sm"}
        radius="sm"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={viewBookingModal}
        onClose={() => setViewBookingModal(!viewBookingModal)}
      ></Modal>
      <Table
        style={{ position: "relative" }}
        striped
        withBorder
        withColumnBorders
      >
        <CustomeLoadingOverlay visible={visible} />
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default VendorComplaints;
