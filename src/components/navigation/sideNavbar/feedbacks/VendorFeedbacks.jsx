import {
  ActionIcon,
  Badge,
  Group,
  Modal,
  Rating,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";
import VendorFeedbackModal from "./VendorFeedbackModal";
// import ViewVendorComplaintModal from "./ViewVendorComplaintModal";

const fetchAllVendorComplaints = async () => {
  try {
    const apiResponse = await axios({
      method: "get",
      url: "https://a-wep.herokuapp.com/customer/getMyVendorServiceFeedbacks",
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

const VendorFeedbacks = () => {
  const [viewVendorReviewModal, setViewVendorReviewModal] = useState(false);
  const matches500 = useMediaQuery("(min-width: 500px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const [visible, setVisible] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [viewReviewData, setViewReviewData] = useState({});
  const [vendorBookings, setVendorBookings] = useState([]);
  const deleteVendorComplaint = async (id) => {
    console.log("ID: ", id);
    try {
      const apiResponse = await axios({
        method: "delete",
        url: `https://a-wep.herokuapp.com/customer/deleteVendorServiceFeedback/${id}`,
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
      <td>
        <Rating value={row?.rating} readOnly />
      </td>
      <td>
        <Text lineClamp={1}>{row?.customerReview}</Text>
      </td>
      <td>{row?.vendorPackageBookingId?.bookingDate?.split("T")[0]}</td>
      <td>{row?.createdAt?.split("T")[0]}</td>

      <td align="center">
        <Group spacing={0} noWrap align={"center"} position="center">
          <ActionIcon
            onClick={() => {
              console.log("Clicked on view button");
              setViewReviewData(row);
              setViewVendorReviewModal(true);
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
    "Rating",
    "Review",
    "Booking Date",
    "Feedback Date",
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
        styles={{
          close: {
            color: "black",
            backgroundColor: "#EAEAEA",
            borderRadius: "50%",
            "&:hover": {
              transition: "50ms",
              color: "white",
              backgroundColor: "red",
            },
          },
        }}
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        size={matches800 ? "60%" : "lg"}
        title={<Title>Vendor Complaint</Title>}
        opened={viewVendorReviewModal}
        onClose={() => {
          setViewVendorReviewModal(!viewVendorReviewModal);
        }}
      >
        {/* <ViewVendorComplaintModal complaintView={viewComplaintData} />*/}
        <VendorFeedbackModal review={viewReviewData} />
      </Modal>

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

export default VendorFeedbacks;
