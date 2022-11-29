import { ActionIcon, Badge, Group, Modal, Table } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconBrandStripe, IconEdit, IconEye, IconMessage } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomeLoadingOverlay from "../../../customLoadingOverlay/CustomeLoadingOverlay";
import BookingViewAllBookings from "./BookingViewAllBookings";
import moment from "moment";
import StripePromise from "./stripe/StripePromise";

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
const CustomerVenueBookings = () => {
  let navigate = useNavigate();
  const matches500 = useMediaQuery("(min-width: 500px)");
  const [visible, setVisible] = useState(true);
  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);
  const [viewPaymentModal, setViewPaymentModal] = useState(false);
  const [amountPayable, setAmountPayable] = useState(0);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [paidSuccessfully, setPaidSuccessfully] = useState(false);
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
            onClick={() => {
              console.log("Clicked on view button");
              setSingleInvoice(row);
              setViewBookingModal(true);
            }}
          >
            <IconEye />
          </ActionIcon>
          {row.bookingStatus === "COMPLETED" ? (
            <ActionIcon
              onClick={() => {
                console.log("Clicked on edit button");
                navigate(`/addReview/${row._id}`);
              }}
            >
              <IconMessage />
            </ActionIcon>
          ) : (
            <ActionIcon
              onClick={() => {
                console.log("Clicked on edit button");
                navigate(
                  `/updateVenueBooking/${row.eventType}/${row.bookingDate}/${row.bookingTime}/${row.numberOfGuests}/${row.venueId._id}/${row.subVenueId._id}/${row._id}`
                );
              }}
            >
              <IconEdit />
            </ActionIcon>
          )}

          <ActionIcon
            onClick={() => {
              console.log("LAUNCHING PAYMENT");
              setViewPaymentModal(true);
              setAmountPayable(row.price.remainingAmount);
            }}
          >
            <IconBrandStripe />
          </ActionIcon>
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
    <div style={{ position: "relative" }}>
      <Modal
        size={matches500 ? "calc(100vw-30vw)" : "sm"}
        radius="sm"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={viewPaymentModal}
        onClose={() => setViewPaymentModal(false)}
      >
        <StripePromise
          paidSuccessfully={paidSuccessfully}
          setPaidSuccessfully={setPaidSuccessfully}
          setConfirmBooking={setConfirmBooking}
          amountPayable={amountPayable}
          // start={start}
          // amountPayable={
          //   (hallCharges +
          //     selectedVenueServiceObject
          //       ?.map(
          //         (service) =>
          //           service.servicePrice *
          //           (service.duration === "Per Event" ? 1 : 3)
          //       )
          //       .reduce((a, b) => a + b, 0) +
          //     (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests -
          //     (hallCharges +
          //       selectedVenueServiceObject
          //         ?.map(
          //           (service) =>
          //             service.servicePrice *
          //             (service.duration === "Per Event" ? 1 : 3)
          //         )
          //         .reduce((a, b) => a + b, 0) +
          //       (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
          //       0.25 +
          //     (hallCharges +
          //       selectedVenueServiceObject
          //         ?.map(
          //           (service) =>
          //             service.servicePrice *
          //             (service.duration === "Per Event" ? 1 : 3)
          //         )
          //         .reduce((a, b) => a + b, 0) +
          //       (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
          //       0.17) *
          //   0.25
          // }
        />
      </Modal>
      <CustomeLoadingOverlay visible={visible} />
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

export default CustomerVenueBookings;
