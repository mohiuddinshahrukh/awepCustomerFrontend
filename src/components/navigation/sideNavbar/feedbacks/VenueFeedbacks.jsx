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
import VenueFeedbackModal from "./VenueFeedbackModal";

const VenueFeedbacks = () => {
  const navigate = useNavigate();
  const [viewVenueReviewModal, setViewVenueReviewModal] = useState(false);
  const matches800 = useMediaQuery("(min-width: 800px)");
  const [visible, setVisible] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [viewFeedbackData, setViewFeedbackData] = useState({});
  const [venueBookings, setVenueBookings] = useState([]);
  const fetchAllVenueFeedbacks = async () => {
    try {
      const apiResponse = await axios({
        method: "get",
        url: "https://a-wep.herokuapp.com/customer/getMyVenueFeedbacks",
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log(
          "Successfully fetched all venue bookings:",
          apiResponse.data.data
        );
        setVisible(false);
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        setVisible(false);
        console.log("Error while fetching all venue bookings");
      } else {
        setVisible(false);
        console.log("Failed to fetch all venue bookings, don't know this error");
      }
    } catch (e) {
      setVisible(false);
      console.log("ERROR in fetching all venues:", e);
    }
  };
  const deleteVenueComplaint = async (id) => {
    try {
      const apiResponse = await axios({
        method: "delete",
        url: `https://a-wep.herokuapp.com/customer/deleteVenueFeedback/${id}`,
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log(
          "Successfully fetched all venue bookings:",
          apiResponse.data.data
        );
        showNotification({
          title: "Compliant Deleted",
          message: "Complaint deleted successfully",
          color: "green",
        });

        setRefresh(false);
        return apiResponse.data.status;
      } else if (apiResponse.data.status === "error") {
        setRefresh(false);
        console.log("Error while fetching all venue bookings");
      } else {
        setRefresh(false);

        console.log("Failed to fetch all venue bookings, don't know this error");
      }
    } catch (e) {
      setRefresh(false);
      console.log("ERROR in fetching all venues:", e);
    }
  };
  useEffect(() => {
    fetchAllVenueFeedbacks().then(setVenueBookings);
  }, [refresh]);
  const rows = venueBookings?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row?.venueId?.venueName}</td>
      <td>{row?.subVenueId?.subVenueName}</td>
      <td>
        {" "}
        <Rating value={row?.rating} readOnly />
      </td>
      <td>
        <Text style={{ wordBreak: "break-all" }} lineClamp={1}>
          {row?.customerReview}
        </Text>
      </td>

      <td>
        {row?.subVenueBookingId?.bookingDate?.split("T")[0] +
          " " +
          row?.subVenueBookingId?.bookingTime}
      </td>
      <td>{row?.createdAt?.split("T")[0]}</td>

      <td align="center">
        <Group spacing={0} noWrap align={"center"} position="center">
          <ActionIcon
            onClick={() => {
              console.log("Clicked on view button");
              setViewFeedbackData(row);
              setViewVenueReviewModal(true);
            }}
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log("Clicked on edit button");
              navigate(`/updateReview/${"venue"}/${row._id}`);
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log("Clicked on Delete button");
              setVisible(true);
              deleteVenueComplaint(row?._id);
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
    "Venue",
    "Sub Venue",
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
        title={<Title>Venue Complaint</Title>}
        opened={viewVenueReviewModal}
        onClose={() => {
          setViewVenueReviewModal(!viewVenueReviewModal);
        }}
      >
        <VenueFeedbackModal viewFeedbackData={viewFeedbackData} />
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

export default VenueFeedbacks;
