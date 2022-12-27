import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Menu,
  Modal,
  Paper,
  Table,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandStripe,
  IconEdit,
  IconEye,
  IconMessage,
  IconUserExclamation,
} from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewAllVendorPaymentReceipts from "./ViewAllVendorPaymentReceipts";
import moment from "moment";
import StripePromise from "./stripe/StripePromise";
import { showNotification } from "@mantine/notifications";
import LoaderAWEP from "../../../LoaderAWEP/LoaderAWEP";

const CustomerVendorBookings = () => {
  let navigate = useNavigate();
  const matches500 = useMediaQuery("(min-width: 500px)");
  const [visible, setVisible] = useState(true);
  const [singleInvoice, setSingleInvoice] = useState([]);
  const [viewBookingModal, setViewBookingModal] = useState(false);
  const [viewPaymentModal, setViewPaymentModal] = useState(false);
  const [amountPayable, setAmountPayable] = useState({});
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [paidSuccessfully, setPaidSuccessfully] = useState(false);
  const [vendorBookings, setVendorBookings] = useState([]);
  const fetchAllVendors = async () => {
    try {
      const apiResponse = await axios({
        method: "get",
        url: "https://a-wep.herokuapp.com/customer/getVendorPackageBookings",
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
        apiResponse.data.data.map((Booking) => {
          if (Booking.bookingStatus === "IN PROGRESS") {
            const daysTillBookings = moment(Booking.bookingDate)
              .diff(Date.now(), "days")
              .toString();
            if (daysTillBookings < 0) {
              Booking.BOOKING_STATUS = "PAST";
              Booking.BOOKING_STATUS_COLOR = "red";
            } else if (daysTillBookings > 7) {
              Booking.BOOKING_STATUS = "PENDING";
              Booking.BOOKING_STATUS_COLOR = "orange";
            } else if (daysTillBookings > 1) {
              Booking.BOOKING_STATUS = "UPCOMING";
              Booking.BOOKING_STATUS_COLOR = "yellow";
            } else {
              Booking.BOOKING_STATUS = "IN PROGRESS";
              Booking.BOOKING_STATUS_COLOR = "blue";
            }
          }
        });
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
  console.log("vendorBookings", vendorBookings);
  useEffect(() => {
    fetchAllVendors().then(setVendorBookings);
  }, [refresh]);
  const updateStatus = async (id, name) => {
    console.log("updating status", id, name);
    setVisible(true);
    const body = {
      bookingStatus: name,
    };
    console.log(body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };
    let url = `https://a-wep.herokuapp.com/customer/cancelVendorPackageBooking/${id}`;

    try {
      const response = await axios({
        method: "patch",
        url: url,
        data: body,
        headers: headers,
      });
      console.log(response.data);

      if (response.data.status === "error") {
        console.log("error", response.data.error);
        showNotification({
          title: `${response.data.error}`,
          color: "red",

          message: `${response.data.message}`,
        });
        setVisible(false);
      } else {
        showNotification({
          title: `SUCCESS`,
          color: "green",

          message: `BOOKING STATUS CHANGED TO ${
            name === "CANCELLED"
              ? "CANCELLED"
              : name === "IN PROGRESS"
              ? "IN PROGRESS"
              : name === "COMPLETED"
              ? "COMPLETED"
              : null
          }! `,
        });
        console.log("navigating");
        setVisible(false);
        setRefresh(true);
        // navigate("/users");
        console.log("navigated");
      }
    } catch (err) {
      setVisible(false);

      console.log(err);
    }
  };

  const makeCompletePayment = async () => {
    console.log("$AMOUNT PAYABLE", amountPayable);
    console.log("$AMOUNT PAYABLE ID", amountPayable._id);
    console.log("$AMOUNT PAYABLE AMOUNT", amountPayable.price.remainingAmount);

    try {
      const apiResponse = await axios({
        url: "https://a-wep.herokuapp.com/customer/payRemainderVendorBooking",
        method: "post",
        data: {
          paymentMethod: "Stripe",
          vendorPackageBookingId: amountPayable._id,
          paymentAmount: amountPayable.price.remainingAmount,
        },
        headers: {
          token: localStorage.getItem("customerToken"),
        },
      });
      console.log("API RESPONSE: ", apiResponse.data);

      if (apiResponse.data.status === "success") {
        console.log("Successfully fetched all venues:", apiResponse.data.data);
        setViewPaymentModal(false);
        setRefresh(!refresh);
        setPaidSuccessfully(false);
        setVisible(false);
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
  useEffect(() => {
    if (paidSuccessfully) {
      console.log("DO THE AXIOS CALL HERE MY FRIEND");
      makeCompletePayment();
    }
  }, [paidSuccessfully]);
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
        {row.bookingStatus === "IN PROGRESS" ? (
          <Menu
            // trigger="hover"
            align="center"
            offset={8}
            width="target"
            transition="rotate-right"
            transitionDuration={150}
          >
            <Menu.Target width="target">
              <Button
                size="xs"
                uppercase
                compact
                fullWidth
                color={row.BOOKING_STATUS_COLOR}
              >
                {row.BOOKING_STATUS}
                {/* <IconChevronDown size={14} /> */}
              </Button>
            </Menu.Target>
            {!(row.BOOKING_STATUS === "PAST") && (
              <Menu.Dropdown p={0}>
                {!(row.BOOKING_STATUS === "IN PROGRESS") && (
                  <Menu.Item p={0}>
                    <Button
                      color="red"
                      size="xs"
                      uppercase
                      compact
                      fullWidth
                      m={0}
                      p={0}
                      onClick={() => updateStatus(row._id, "CANCELLED")}
                    >
                      CANCEL
                    </Button>
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            )}
          </Menu>
        ) : row.bookingStatus === "CANCELLED" ? (
          <Menu
            sx={{
              cursor: "default",
            }}
            align="center"
            offset={2}
            width="target"
          >
            <Menu.Target width="target">
              <Button size="xs" compact uppercase fullWidth color="red">
                CANCELLED
              </Button>
            </Menu.Target>
          </Menu>
        ) : (
          row.bookingStatus === "COMPLETED" && (
            <Menu
              align="center"
              width="target"
              sx={{
                cursor: "default",
              }}
            >
              <Menu.Target width="target">
                <Button size="xs" compact uppercase fullWidth color="green">
                  COMPLETED
                </Button>
              </Menu.Target>
            </Menu>
          )
        )}
      </td>
      <td align="center">
        <Badge
          color={
            row.paymentStatus === "ADVANCE PAID" &&
            row.price.remainingAmount > 0
              ? "yellow"
              : "green"
          }
        >
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
          {row.bookingStatus === "COMPLETED" ? (
            <ActionIcon
              onClick={() => {
                console.log("Clicked on edit button");
                navigate(`/addReview/${"vendor"}/${row._id}`);
              }}
            >
              <IconMessage />
            </ActionIcon>
          ) : (
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
          )}
          <ActionIcon
            disabled={
              row.bookingStatus === "CANCELLED"
                ? true
                : row?.paymentStatus === "ADVANCE PAID" &&
                  row?.price?.remainingAmount > 0
                ? false
                : true
            }
            color={
              row.bookingStatus === "CANCELLED"
                ? "red"
                : row?.paymentStatus === "ADVANCE PAID" &&
                  row?.price?.remainingAmount > 0
                ? "yellow"
                : "green"
            }
            onClick={() => {
              if (
                row.paymentStatus === "ADVANCE PAID" &&
                row.price.remainingAmount > 0 &&
                row.bookingStatus !== "CANCELLED"
              ) {
                console.log("LAUNCHING PAYMENT");
                setViewPaymentModal(true);
                setAmountPayable(row);
              } else {
                console.log("Amount Has been paid");
              }
            }}
          >
            <IconBrandStripe />
          </ActionIcon>
          <ActionIcon
            disabled={row.bookingStatus !== "COMPLETED"}
            onClick={() => {
              navigate(`/addComplaint/${"vendor"}/${row._id}`);
            }}
            color={row.bookingStatus === "COMPLETED" ? "red" : "green"}
          >
            <IconUserExclamation />
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
        return (
          <th key={index}>
            <span className="fgColor">{header}</span>
          </th>
        );
      })}
    </tr>
  );
  return (
    <Paper style={{ width: "100%", position: "relative" }}>
      <LoaderAWEP visible={visible} />

      <Modal
        title={<Title order={2}>Complete Payment</Title>}
        size={"lg"}
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
          amountPayable={amountPayable?.price?.remainingAmount}
        />
      </Modal>
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
    </Paper>
  );
};

export default CustomerVendorBookings;
