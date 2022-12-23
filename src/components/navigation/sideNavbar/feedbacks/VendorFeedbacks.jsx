import {
  ActionIcon,
  Group,
  Modal,
  Paper,
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
import { useNavigate } from "react-router-dom";
import LoaderAWEP from "../../../LoaderAWEP/LoaderAWEP";
import VendorFeedbackModal from "./VendorFeedbackModal";
// import ViewVendorComplaintModal from "./ViewVendorComplaintModal";

const VendorFeedbacks = () => {
  const navigate = useNavigate();

  const [viewVendorReviewModal, setViewVendorReviewModal] = useState(false);
  const matches500 = useMediaQuery("(min-width: 500px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const [visible, setVisible] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [viewReviewData, setViewReviewData] = useState({});
  const [vendorBookings, setVendorBookings] = useState([]);
  const fetchAllVendorComplaints = async () => {
    try {
      const apiResponse = await axios({
        method: "get",
        url: "https://a-wep.herokuapp.com/customer/getMyVendorServiceFeedbacks",
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log(
          "Successfully fetched all vendor bookings:",
          apiResponse.data.data
        );
        setVisible(false);
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        setVisible(false);

        console.log("Error while fetching all vendor bookings");
      } else {
        setVisible(false);

        console.log(
          "Failed to fetch all vendor bookings, don't know this error"
        );
      }
    } catch (e) {
      setVisible(false);

      console.log("ERROR in fetching all venues:", e);
    }
  };
  const deleteVendorComplaint = async (id) => {
    console.log("ID: ", id);
    try {
      const apiResponse = await axios({
        method: "delete",
        url: `https://a-wep.herokuapp.com/customer/deleteVendorServiceFeedback/${id}`,
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log(
          "Successfully fetched all vendor bookings:",
          apiResponse.data.data
        );
        showNotification({
          title: "Compliant Deleted",
          message: "Complaint deleted successfully",
          color: "green",
        });

        setRefresh(!refresh);
        setVisible(false);
        return apiResponse.data.status;
      } else if (apiResponse.data.status === "error") {
        setVisible(false);

        console.log("Error while fetching all vendor bookings");
      } else {
        setVisible(false);

        console.log(
          "Failed to fetch all vendor bookings, don't know this error"
        );
      }
    } catch (e) {
      setVisible(false);

      console.log("ERROR in fetching all venues:", e);
    }
  };
  useEffect(() => {
    fetchAllVendorComplaints().then(setVendorBookings);
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
        <Text style={{ wordBreak: "break-all" }} lineClamp={1}>
          {row?.customerReview}
        </Text>
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
              navigate(`/updateReview/${"vendor"}/${row._id}`);
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
        return (
          <th key={index}>
            <span className="fgColor">{header}</span>
          </th>
        );
      })}
    </tr>
  );
  return (
    <Paper style={{ width: "100%" }}>
      <LoaderAWEP visible={visible} />
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
        <thead className="bgColor">{headers}</thead>
        <tbody>{rows}</tbody>
      </Table>
    </Paper>
  );
};

export default VendorFeedbacks;
