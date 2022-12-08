import axios from "axios";
import "./styling.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTimeout } from "@mantine/hooks";

import {
  Grid,
  Paper,
  Text,
  Title,
  Button,
  TextInput,
  LoadingOverlay,
  Stepper,
  Checkbox,
  Avatar,
  Group,
  Select,
  SimpleGrid,
  Image,
  Center,
  Textarea,
  Divider,
  createStyles,
  RingProgress,
  useMantineTheme,
  Stack,
  Badge,
  Container,
} from "@mantine/core";
import { Modal } from "@mantine/core";
import moment from "moment";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useMediaQuery } from "@mantine/hooks";
import Congrats from "./Congrats.png";
import { useScrollIntoView } from "@mantine/hooks";
import { socket } from "../Socket/Socket";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconChevronDown,
  IconDownload,
  IconEdit,
  IconTrash,
  IconTrashOff,
  IconX,
} from "@tabler/icons";
import SubVenuesForBooking from "./SubVenuesForBooking";
import MenusOfSpecificVenueForBooking from "../MenusOfSpecifcVenue/MenusOfSpecificVenueForBooking";
import ThemesOfSpecificVenueForBooking from "../ThemesOfSpecificVenue/ThemesOfSpecificVenueForBooking";
import BookingReviewInvoice from "../InvoiceGenerator/BookingReviewInvoice";
import StripePromise from "../paymentGateways/StripePromise";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 80,
    paddingBottom: 50,
  },

  item: {
    display: "flex",
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
      .color,
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: "inline-block",
    color: theme.colorScheme === "dark" ? theme.white : "inherit",
  },
}));

const NewBookingFile = () => {
  const params = useParams();
  console.log("MY PARAMS: ", params);
  const theme = useMantineTheme();

  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 });
  const { classes } = useStyles();
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  // paymentSuccesful
  const [paidSuccessfully, setPaidSuccessfully] = useState(false);
  //CODE FOR PRINTING
  const [printingTriggered, setPrintingTriggered] = useState(false);
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("old boring text");
  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);
  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);
  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");
    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;
      resolve();
    });
  }, [setLoading, setText]);
  //
  const [errorMessages, setErrorMessages] = useState({});
  const [error, setError] = useState("");
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [refresh, setRefresh] = useState(true);
  const [visible, setVisible] = useState(true);
  const [opened, setOpened] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [stepperDisabled, setStepperDisabled] = useState(false);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const [venueDetails, setVenueDetails] = useState({});
  console.log("VENUE DETAILS: ", venueDetails);
  const [customer, setCustomer] = useState("");
  const [venue, setVenue] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [value2, setValue2] = useState("");
  const [value1, onChange] = useState(new Date());
  const [time, setTime] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [filterSubVenues, setFilterSubVenues] = useState([]);
  const [idOfSelectedSubVenue, setIdOfSelectedSubVenue] = useState("");
  const [chargesError, setChargesError] = useState("");
  const [eventType, setEventType] = useState("");
  console.log("event type is", eventType);
  const [selectedVenueServices, setSelectedVenueServices] = useState([]);
  const [alterPrice, setAlterPrice] = useState(false);
  const [serviceTitle, setServiceTitle] = useState("");
  const [oldServicePrice, setOldServicePrice] = useState();
  const [freeService, setFreeService] = useState(false);

  console.log("oldServicePrice", oldServicePrice);
  console.log("selected service to be edited is", serviceTitle);
  console.log("selected venue services", selectedVenueServices);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedVenueServiceObject, setSelectedVenueServiceObject] = useState(
    []
  );
  const [checked, setChecked] = useState(false);
  const [hallCharges, setHallCharges] = useState(0);
  console.log("hall charges are", hallCharges);
  const [idOfSelectedMenu, setIdOfSelectedMenu] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  console.log("Totalprice", totalPrice);
  console.log("menuPrice", menuPrice);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [hidden, setHidden] = useState(true);
  const [hideSelectButton, setHideSelectButton] = useState(false);
  // const { start, clear } = useTimeout(() => setConfirmBooking(false), 10000);

  const [idOfSelectedTheme, setIdOfSelectedTheme] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  console.log("selected theme", selectedTheme);

  const data = [
    {
      percent: 25,
      Amount: (
        (hallCharges +
          selectedVenueServiceObject
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests -
          (hallCharges +
            selectedVenueServiceObject
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
            0.25 +
          (hallCharges +
            selectedVenueServiceObject
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
            0.17) *
        0.25
      ).toLocaleString(),
      color: "red",
      title: "25% Advance Payment",
      description:
        "To Book A Date 20% Advance Payment is Required Which is Non Refundable",
    },
    {
      percent: 100,
      Amount: (
        hallCharges +
        selectedVenueServiceObject
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests -
        (hallCharges +
          selectedVenueServiceObject
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
          0.25 +
        (hallCharges +
          selectedVenueServiceObject
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
          0.17 -
        (hallCharges +
          selectedVenueServiceObject
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests -
          (hallCharges +
            selectedVenueServiceObject
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
            0.25 +
          (hallCharges +
            selectedVenueServiceObject
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            (selectedMenu?.price ? selectedMenu.price : 0) * noOfGuests) *
            0.17) *
          0.25
      )?.toLocaleString(),
      color: "green",
      title: "75% Remaining Payment",
      description:
        "Remaining 75% Payment is Required 7 Days Before The Event Date",
    },
  ];
  const items = data?.map((item, index) => (
    <div className={classes.item} key={index}>
      <Group position="center">
        <RingProgress
          size={100}
          thickness={10}
          label={
            <Text
              size="md"
              align="center"
              px="xs"
              sx={{ pointerEvents: "none" }}
            >
              {item.percent}%
            </Text>
          }
          sections={[
            {
              value: item.percent,
              color: item.color,
            },
          ]}
        />
      </Group>

      <div>
        <Text weight={700} size="lg" className={classes.itemTitle}>
          {item.title}{" "}
          <b
            style={{
              color: "red",
            }}
          >
            Rs. {item.Amount}
          </b>
        </Text>
        <Text color="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  console.log("selected venue is ", venue);
  //   function setIdOfSelectedSubVenue(id) {
  //     alert(id);
  //   }
  console.log("_id of subvenue from table", idOfSelectedSubVenue);

  console.log("no of noOfGuests", noOfGuests);

  const refreshStates = () => {
    setTotalPrice(0);
    setSelectedVenueServices([]);
    setSelectedVenueServiceObject([]);
  };

  let navigate = useNavigate();
  const renderErrorMessage = (name) => {
    if (errorMessages[name]) {
      return errorMessages[name];
    }
  };

  const form1 = useForm({
    // validateInputOnChange: true,
    initialValues: {
      // venue: "",
      date: new Date(params.date),
      noOfGuests: params.guests,
      eventType: params.eventType,
      time: params.time,
    },

    validate: {
      noOfGuests: (value) =>
        value > 49 ? null : "No of guests Must be At Least 50",
      date: (value) => (value === null ? "Please Select a Date" : null),
      time: (value) => (value === "" ? "Please Select a Time" : null),
      eventType: (value) =>
        value === "" ? "Please Select an Event Type" : null,
    },
  });
  let customerData = JSON.parse(localStorage.getItem("customerData"));
  let customerEmail = customerData?.email;
  let customerPhone = customerData?.phone;
  const form = useForm({
    validateInputOnChange: ["phone", "email"],
    initialValues: {
      phone: customerPhone,
      email: customerEmail,
      description: "",
    },

    validate: {
      phone: (value) =>
        /^(03)(\d{9})$/.test(value)
          ? null
          : "11 digits Phone Number must start with 03",
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
          ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
            null
          : "Invalid Email",
      description: (value) =>
        value.trim().length > 20
          ? // && /^[a-zA-Z0-9\s]*$/.test(value.trim())
            null
          : "Describe in At least 20 Characters",
    },
  });
  const bookedDateAndTime =
    new moment(form1.values.date).format().split("T")[0] + form1.values.time;
  console.log("testing date and time", bookedDateAndTime);

  const handleSubmit = async (event) => {
    var { noOfGuests, eventType, time, date } = event;
    setNoOfGuests(noOfGuests);
    setEventType(eventType);
    setTime(time);
    onChange(date);

    if (idOfSelectedSubVenue === "") {
      setError("Please Select A Venue To Proceed");
      setDisabled(true);
      return;
    } else {
      onChange(new moment(form1.values.date).format().split("T")[0]);
      nextStep();
    }
  };
  const handleSubmit1 = async (event) => {
    var { phone, email, description } = event;
    console.log("phone", phone);
    console.log("email", email);
    console.log("description", description);
    console.log("customer is isiisisi", description);
    console.log(event);

    setPhone(phone);
    setEmail(email);
    setDescription(description);

    nextStep();
    // makeVenueBooking();
  };

  useEffect(() => {
    const url2 = `https://a-wep.herokuapp.com/customer/getSpecificVenueDetails/${params.venueId}`;
    if (refresh) {
      axios.get(url2).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("we are here in api call");
          setVenueDetails(res.data.data);
          setRefresh(false);
          setVisible(false);
        } else {
          // alert("Error");
        }
      });
    }
  }, [refresh]);

  useEffect(() => {
    if (paidSuccessfully) {
      console.log("DO THE AXIOS CALL");
      makeVenueBooking();
      setStepperDisabled(true);
    }
  }, [paidSuccessfully]);

  // PRINTING USE EFFECT
  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  // const reactToPrintContent = useCallback(() => {
  //   return componentRef.current;
  // }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good

    return (
      <Button
        size="md"
        fullWidth
        variant="filled"
        color="dark"
        type="submit"
        // disabled={disabled}
        // loading={loading}
        rightIcon={<IconDownload />}
        onClick={() => {
          console.log("Print");
          setPrintingTriggered(true);
        }}
        uppercase
      >
        print invoice
      </Button>
    );
  }, []);
  //

  useEffect(() => {
    if (
      form1.values.eventType === "" ||
      form1.values.time === "" ||
      form1.values.date === "" ||
      form1.values.noOfGuests < 50
    ) {
      console.log("@TEST in if", form1.values);
      setHideSelectButton(true);
      return;
    } else {
      console.log("we are here in use effect of if");
      setHideSelectButton(false);
      return;
    }
  }, [
    form1.values.eventType,
    form1.values.date,
    form1.values.time,
    form1.values.noOfGuests,
  ]);
  useEffect(() => {
    if (
      venueDetails?.subVenues?.filter((e) => e._id === idOfSelectedSubVenue)[0]
        ?.subVenueServices?.length > 0
    ) {
      if (
        selectedVenueServices?.length ===
        venueDetails?.subVenues?.filter(
          (e) => e._id === idOfSelectedSubVenue
        )[0]?.subVenueServices?.length
      ) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } else {
      setChecked(false);
    }
  }, [selectedVenueServices]);
  const makeVenueBooking = async () => {
    // setComponent("3");
    // setLoading(true);
    setVisible(true);

    console.log("MAKING THE BOOKING");
    const body = {
      subVenueBookingCharges: hallCharges,
      subVenueId: idOfSelectedSubVenue,
      bookingDate: moment(value1).format(),
      bookingTime: time,
      selectedVenueTheme: {
        theme: selectedTheme,
      },
      selectedMenu: {
        menu: idOfSelectedMenu,
        price: menuPrice,
        modifiedMenu: selectedMenu,
      },

      pointOfContact: {
        email: email,
        phone: phone,
      },
      price: {
        totalPrice: totalPrice + menuPrice * noOfGuests + hallCharges,
        paidAmount: 0.2 * (totalPrice + menuPrice * noOfGuests + hallCharges),
        remainingAmount:
          0.8 * (totalPrice + menuPrice * noOfGuests + hallCharges),
      },
      //   selectedSubVenueServices: selectedFilteredSubVenueServices,
      selectedVenueServices: selectedVenueServiceObject,
      bookingDescription: description,
      numberOfGuests: noOfGuests,
      eventType: eventType,
    };

    console.log("@@@body", body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };
    try {
      const response = await axios({
        method: "post",
        url: "https://a-wep-production.herokuapp.com/customer/bookSubVenue",
        data: body,
        headers: headers,
      });

      console.log("THIS IS THE RESPONSE OBJECT:   ", response);

      if (response.data.status === "error") {
        showNotification({
          title: `ERROR`,
          color: "red",
          message: `${response.data.error?.message || response.data.error}`,
        });
        console.log("error", response.data.error.message);
        console.log("error", response.data.error);
        setVisible(false);
        setLoading(false);
      } else {
        socket.emit("generateNotification", {
          userId: JSON.parse(localStorage.getItem("customerData")).id,
          title: "Subvenue Booking Successful",
          message: `Customer For Booking: ${email}`,
          link: "https://awep-superadmin-team-awep.vercel.app/viewbookings",
        });
        setBookingId(response.data?.data?.trackingId);
        showNotification({
          color: "green",
          title: `Successfully`,
          message: `SUB VENUE BOOKED SUCCESSFULLY!!`,
        });
        setConfirmBooking(true);

        nextStep();
        setVisible(false);
        // navigate(-1);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
    setVisible(false);
    setLoading(false);
  };

  const handleMenuSelect = () => {
    if (idOfSelectedMenu === "") {
      showNotification({
        color: "red",
        title: `Oops!`,

        message: `PLEASE SELECT A MENU TO PROCEED!!`,
      });
      return;
    } else {
      nextStep();
    }
  };

  return (
    <Container size="xl">
      <Paper
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
        // p={0}
      >
        <LoadingOverlay
          visible={visible}
          loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
          overlayOpacity={0.5}
          overlayColor="#c5c5c5"
          zIndex={1}
        />

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
          title={
            <Title align="center" order={3}>
              Booking Logged Successfully!!
            </Title>
          }
          closeOnClickOutside={false}
          opened={confirmBooking}
          transition="rotate-left"
          transitionDuration={600}
          centered
          size={600}
          transitionTimingFunction="ease"
          onClose={() => {
            setConfirmBooking(false);
            navigate("/viewbookings");
          }}
        >
          <Stack>
            <Group position="apart">
              <Group position="left">
                <Text weight={900}>Booking ID: {bookingId}</Text>
              </Group>
              <Badge size="lg">New Booking</Badge>
            </Group>
            <Paper
              withBorder
              p="xl"
              shadow="md"
              sx={{
                ":hover": {
                  transform: `scale(1.05)`,
                  transition: "0.3s",
                },
              }}
            >
              <Grid>
                <Grid.Col span={6}>
                  <Text>
                    {venueDetails?.subVenues
                      ?.filter((e) => e._id === idOfSelectedSubVenue)
                      .map((e) => e.subVenueName)}
                  </Text>

                  <Group position="left">
                    <Text>
                      {moment(value1).format().split("T")[0]} / {time}
                    </Text>
                  </Group>

                  <Group position="left">
                    <Text>{eventType}</Text>
                  </Group>
                  <Group position="left">
                    <Text>
                      {noOfGuests} <b>Persons</b>
                    </Text>
                  </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Image height={125} src={Congrats} />
                </Grid.Col>
              </Grid>
            </Paper>
            <Paper
              withBorder
              p="xl"
              shadow="md"
              sx={{
                ":hover": {
                  transform: `scale(1.05)`,
                  transition: "0.3s",
                },
              }}
            >
              <Group position="apart">
                <Text>Subtotal</Text>
                <Text>
                  {" "}
                  <b>
                    {(
                      hallCharges +
                      selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (selectedMenu?.price ? selectedMenu.price : 0) *
                        noOfGuests
                    )?.toLocaleString()}
                  </b>
                </Text>
              </Group>
              <Group position="apart">
                <Text>Discount</Text>
                <Text>
                  -{" "}
                  <b>
                    {(
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests) *
                      0.25
                    )?.toLocaleString()}
                  </b>
                </Text>
              </Group>
              <Group position="apart">
                <Text>Tax</Text>
                <Text>
                  {" "}
                  +
                  <b>
                    {(
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests) *
                      0.17
                    )?.toLocaleString()}
                  </b>
                </Text>
              </Group>
              <Group position="apart">
                <Text>Total</Text>
                <Text>
                  <b>
                    {(
                      hallCharges +
                      selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (selectedMenu?.price ? selectedMenu.price : 0) *
                        noOfGuests -
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests) *
                        0.25 +
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests) *
                        0.17
                    )?.toLocaleString()}
                  </b>
                </Text>
              </Group>
              <Divider />
              <Group position="apart">
                <Text>Amount Paid</Text>
                <Text>
                  <b>
                    {(
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests -
                        (hallCharges +
                          selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (selectedMenu?.price ? selectedMenu.price : 0) *
                            noOfGuests) *
                          0.25 +
                        (hallCharges +
                          selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (selectedMenu?.price ? selectedMenu.price : 0) *
                            noOfGuests) *
                          0.17) *
                      0.25
                    )?.toLocaleString()}
                  </b>
                </Text>
              </Group>
              <Divider />
              <Group position="apart">
                <Text>Amount Remaining: </Text>
                <Text>
                  {" "}
                  {(
                    hallCharges +
                    selectedVenueServiceObject
                      ?.map(
                        (service) =>
                          service.servicePrice *
                          (service.duration === "Per Event" ? 1 : 3)
                      )
                      .reduce((a, b) => a + b, 0) +
                    (selectedMenu?.price ? selectedMenu.price : 0) *
                      noOfGuests -
                    (hallCharges +
                      selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (selectedMenu?.price ? selectedMenu.price : 0) *
                        noOfGuests) *
                      0.25 +
                    (hallCharges +
                      selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (selectedMenu?.price ? selectedMenu.price : 0) *
                        noOfGuests) *
                      0.17 -
                    (hallCharges +
                      selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (selectedMenu?.price ? selectedMenu.price : 0) *
                        noOfGuests -
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests) *
                        0.25 +
                      (hallCharges +
                        selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (selectedMenu?.price ? selectedMenu.price : 0) *
                          noOfGuests) *
                        0.17) *
                      0.25
                  )?.toLocaleString()}
                </Text>
              </Group>
              <Divider />
            </Paper>
          </Stack>

          <Group position="center">
            <Button
              component={Link}
              to="/viewbookings"
              mt="md"
              leftIcon={<IconX />}
              color="green"
              // fullWidth
              onClick={() => setConfirmBooking(false)}
              uppercase
            >
              Close
            </Button>
          </Group>
        </Modal>

        <Paper
          py="xl"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Title order={2} align="center" py="xl">
            Sub Venue Booking
          </Title>
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
            opened={opened}
            transition="rotate-left"
            transitionDuration={600}
            size={600}
            transitionTimingFunction="ease"
            onClose={() => setOpened(false)}
          >
            <Title align="center" order={3}>
              Are You Sure You Want To Cancel?
            </Title>
            <Grid align="center" justify="space-around" p="md">
              <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
                <Button
                  align="center"
                  color="light"
                  leftIcon={<IconTrashOff size={14} />}
                  onClick={() => setOpened(false)}
                >
                  No, Don't Cancel
                </Button>
              </Grid.Col>
              <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
                <Button
                  align="center"
                  color="red"
                  leftIcon={<IconTrash size={14} />}
                  onClick={() => navigate("/viewbookings")}
                >
                  Yes, Cancel
                </Button>
              </Grid.Col>
            </Grid>
          </Modal>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="lg"
            pt="xl"
          >
            <Stepper.Step
              color={!stepperDisabled ? "grape" : "gray"}
              label="Booking Details"
              description="General Booking Details"
              allowStepSelect={active > 0}
              disabled={stepperDisabled}
            >
              <Paper
                // p="xl"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Group position="apart">
                  <Text weight="bold" size="xl" py="md">
                    General Booking Details
                  </Text>
                  <Button
                    size="md"
                    // disabled={eventType === ""}
                    variant="filled"
                    color="red"
                    // disabled={loading}
                    // leftIcon={<X />}
                    onClick={() => {
                      setEventType("");
                      form1.setFieldValue("eventType", "");
                      form1.setFieldValue("date", null);
                      form1.setFieldValue("time", "");
                      form1.setFieldValue("noOfGuests", "");

                      setTime("");
                      setNoOfGuests("");

                      setIdOfSelectedSubVenue("");
                      setSelectedVenueServices([]);
                      setSelectedVenueServiceObject([]);
                      setIdOfSelectedMenu("");
                      setIdOfSelectedTheme("");
                      setTotalPrice(0);
                      setMenuPrice(0);
                      setChargesError("");
                      setHallCharges(0);
                      setHidden(true);
                      setChecked(false);
                      onChange("");
                      setError("");
                      setDisabled(false);

                      // form1.reset();
                    }}
                  >
                    RESET
                  </Button>
                </Group>

                <form
                  onSubmit={form1.onSubmit((values) => handleSubmit(values))}
                >
                  <Grid justify="space-around" py="md">
                    <Grid.Col lg={6}>
                      <Select
                        size="md"
                        disabled={idOfSelectedSubVenue !== ""}
                        label="Event Type"
                        placeholder="Event Type"
                        value={eventType}
                        // onChange={(e) => {
                        //   console.log("event is ", e);
                        //   setEventType(e.target.value);
                        //   //   setValue2([]);
                        // }}
                        data={[
                          {
                            value: "MEHNDI",
                            label: "MEHNDI",
                          },
                          {
                            value: "BARAT",
                            label: "BARAT",
                          },
                          {
                            value: "WALIMA",
                            label: "WALIMA",
                          },
                          {
                            value: "SEMINAR",
                            label: "SEMINAR",
                          },
                          {
                            value: "OTHER",
                            label: "OTHER",
                          },
                        ]}
                        rightSection={<IconChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form1.getInputProps("eventType")}
                      />
                    </Grid.Col>

                    <Grid.Col lg={6}>
                      <DatePicker
                        inputFormat="YYYY-MM-DD"
                        size="md"
                        disabled={idOfSelectedSubVenue !== ""}
                        minDate={dayjs(new Date())
                          .startOf("month")
                          .add(new Date().getDate(), "days")
                          .toDate()}
                        maxDate={dayjs(new Date()).add(365, "days").toDate()}
                        placeholder="Pick date"
                        label="Event Date"
                        icon={<IconCalendar size={16} />}
                        value={value1}
                        // onChange={onChange}
                        onInput={(e) => {
                          onChange(e);
                          setIdOfSelectedSubVenue("");
                          setIdOfSelectedMenu("");
                          setTotalPrice(0);
                          setHidden(true);
                          setMenuPrice(0);
                          setValue2([]);
                        }}
                        {...form1.getInputProps("date")}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <Select
                        size="md"
                        label="Event Time"
                        disabled={idOfSelectedSubVenue !== ""}
                        placeholder="Time"
                        value={time}
                        // onChange={(e) => {
                        //   setTime(e.target.value);
                        //   setIdOfSelectedSubVenue("");
                        //   setIdOfSelectedMenu("");
                        //   setMenuPrice(0);
                        //   setChargesError("");
                        //   setHidden(true);

                        //   setTotalPrice(0);
                        // }}
                        data={[
                          {
                            value: "LUNCH",
                            label: "Lunch",
                          },
                          {
                            value: "DINNER",
                            label: "Dinner",
                          },
                        ]}
                        rightSection={<IconChevronDown size={14} />}
                        rightSectionWidth={40}
                        {...form1.getInputProps("time")}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <TextInput
                        type="number"
                        size="md"
                        min={49}
                        // disabled={idOfSelectedSubVenue !== ""}
                        value={noOfGuests}
                        label="Number of Guests"
                        placeholder="Enter Number of Guests"
                        onInput={(e) => {
                          setNoOfGuests(e.currentTarget.value);
                          setIdOfSelectedSubVenue("");
                          setMenuPrice(0);
                          setChargesError("");
                          setHallCharges(0);

                          setIdOfSelectedMenu("");
                          setTotalPrice(0);
                        }}
                        onChange={(e) => {
                          setNoOfGuests(e.currentTarget.value);
                        }}
                        {...form1.getInputProps("noOfGuests")}
                      />
                    </Grid.Col>
                  </Grid>

                  {venueDetails?.subVenues && (
                    <SubVenuesForBooking
                      subvenueDetails={
                        venueDetails?.subVenues ? venueDetails?.subVenues : []
                      }
                      setIdOfSelectedSubVenue={setIdOfSelectedSubVenue}
                      idOfSelectedSubVenue={idOfSelectedSubVenue}
                      refreshStates={refreshStates}
                      bookedDateAndTime={bookedDateAndTime}
                      noOfGuests={form1.values.noOfGuests}
                      setHidden={setHidden}
                      error={error}
                      setError={setError}
                      setDisabled={setDisabled}
                      setChargesError={setChargesError}
                      hallCharges={hallCharges}
                      setHallCharges={setHallCharges}
                      setNoOfGuests={setNoOfGuests}
                      hideSelectButton={hideSelectButton}
                      time={time}
                      form1={form1}
                    />
                  )}

                  <Text align="center" color="red">
                    {chargesError}
                  </Text>
                  <Grid justify="flex-end" py="md">
                    <Grid.Col xs={6} sm={3} md={3} lg={3}>
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="red"
                        leftIcon={<IconX />}
                        onClick={() => setOpened(true)}
                      >
                        CANCEL
                      </Button>
                    </Grid.Col>
                    <Grid.Col xs={6} sm={3} md={3} lg={3}>
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="dark"
                        type="submit"
                        disabled={disabled}
                        // loading={loading}
                        rightIcon={<IconArrowRight />}
                        // onClick={nextStep}
                      >
                        NEXT
                      </Button>
                    </Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              color={!stepperDisabled ? "grape" : "gray"}
              label="Select Services"
              description="Select Venue Services"
              allowStepSelect={active > 1}
              disabled={stepperDisabled}
            >
              <Group position="apart">
                <Text weight="bold" size="xl" py="md">
                  What Services Do You Want To Avail?
                </Text>
                <Text weight="bold" size="xl" py="md" color="red">
                  Total{" "}
                  <b>Rs. {hallCharges + totalPrice + menuPrice * noOfGuests}</b>
                </Text>
              </Group>
              <Paper pb="xl">
                <Grid>
                  <Grid.Col lg={hidden ? 12 : 6}>
                    <Checkbox
                      size="md"
                      label="Select All"
                      checked={checked}
                      onChange={(event) =>
                        setChecked(event.currentTarget.checked)
                      }
                      onClick={() => {
                        const SelectedVenueServiceObjects =
                          venueDetails?.subVenues?.filter(
                            (f) => f._id === idOfSelectedSubVenue
                          )[0]?.subVenueServices;
                        if (!checked) {
                          setSelectedVenueServices(
                            venueDetails?.subVenues
                              ?.filter((f) => f._id === idOfSelectedSubVenue)[0]
                              ?.subVenueServices.map((m) => m.serviceTitle)
                          );

                          console.log("555555", SelectedVenueServiceObjects);
                          setSelectedVenueServiceObject(
                            SelectedVenueServiceObjects
                          );

                          setTotalPrice(
                            SelectedVenueServiceObjects.reduce((acc, curr) => {
                              const price =
                                curr.duration === "Per Hour"
                                  ? acc + curr.servicePrice * 3
                                  : acc + curr.servicePrice;
                              return price;
                            }, 0)
                          );
                        } else {
                          setSelectedVenueServices([]);
                          setSelectedVenueServiceObject([]);
                          setTotalPrice(
                            totalPrice -
                              SelectedVenueServiceObjects.reduce(
                                (acc, curr) => {
                                  const price =
                                    curr.duration === "Per Hour"
                                      ? acc + curr.servicePrice * 3
                                      : acc + curr.servicePrice;
                                  return price;
                                },
                                0
                              )
                          );
                        }
                      }}
                    />
                    <Checkbox.Group
                      value={selectedVenueServices}
                      onChange={(e) => {
                        if (e.length > 0) {
                          setHidden(false);
                        } else {
                          setHidden(true);
                        }
                        setSelectedVenueServices(e);
                        const SelectedVenueServiceObjects =
                          venueDetails?.subVenues
                            ?.filter((f) => f._id === idOfSelectedSubVenue)[0]
                            ?.subVenueServices.filter((g) =>
                              e.includes(g.serviceTitle)
                            );
                        console.log("555555", SelectedVenueServiceObjects);
                        setSelectedVenueServiceObject(
                          SelectedVenueServiceObjects
                        );

                        setTotalPrice(
                          SelectedVenueServiceObjects.reduce((acc, curr) => {
                            const price =
                              curr.duration === "Per Hour"
                                ? acc + curr.servicePrice * 3
                                : acc + curr.servicePrice;
                            return price;
                          }, 0)
                        );
                      }}
                      size="md"
                      pb="xl"
                    >
                      <Grid>
                        {venueDetails?.subVenues
                          ?.filter((e) => e._id === idOfSelectedSubVenue)[0]
                          ?.subVenueServices.map((row, index) => {
                            return (
                              <Grid.Col lg={12} key={index}>
                                <Group>
                                  <Checkbox
                                    key={row.serviceTitle}
                                    value={row.serviceTitle}
                                    label={
                                      <Paper
                                        style={{
                                          display: "flex",

                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          src={row.coverImage}
                                          alt="it's me"
                                        />
                                        <div
                                          style={{
                                            paddingLeft: "1rem",
                                          }}
                                        >
                                          <Text align="justify">
                                            {row.serviceTitle}{" "}
                                            <b>
                                              (Rs.{" "}
                                              {row.servicePrice === 0
                                                ? "Complimentary"
                                                : row.servicePrice}
                                              )
                                            </b>
                                          </Text>

                                          <Text
                                            align="justify"
                                            size="xs"
                                            color="dimmed"
                                          >
                                            {row.serviceDescription}
                                          </Text>
                                        </div>
                                      </Paper>
                                    }
                                    pr="md"
                                  />
                                </Group>
                              </Grid.Col>
                            );
                          })}
                      </Grid>
                    </Checkbox.Group>
                  </Grid.Col>
                  {!hidden && matches1200 && (
                    <Grid.Col lg={6}>
                      <Paper withBorder radius="xl" p="xl">
                        <Grid justify="flex-end">
                          <Grid.Col lg={5}>
                            <Text weight="bold">Service Name</Text>
                          </Grid.Col>
                          <Grid.Col lg={2}>
                            <Text weight="bold"> Cost</Text>
                          </Grid.Col>
                          <Grid.Col lg={2}>
                            <Text weight="bold">Multiple</Text>
                          </Grid.Col>
                          <Grid.Col lg={3}>
                            <Text weight="bold">Total Cost</Text>
                          </Grid.Col>
                        </Grid>
                        <Divider p="sm" />

                        <Grid>
                          {selectedVenueServiceObject?.map((service, index) => (
                            <>
                              <Grid.Col lg={5} key={index}>
                                <Text weight="bold">
                                  <Text>{service.serviceTitle}</Text>
                                </Text>
                              </Grid.Col>

                              <Grid.Col lg={2}>
                                <Text>Rs. {service.servicePrice}</Text>
                              </Grid.Col>
                              <Grid.Col lg={2}>
                                {service.duration === "Per Hour" ? (
                                  <Text>3 Hours</Text>
                                ) : (
                                  <Text>1 Event</Text>
                                )}
                              </Grid.Col>
                              <Grid.Col lg={3}>
                                {service.duration === "Per Hour" ? (
                                  <Text>Rs. {service.servicePrice * 3}</Text>
                                ) : (
                                  <Text>Rs. {service.servicePrice}</Text>
                                )}
                              </Grid.Col>
                            </>
                          ))}
                        </Grid>
                        <Divider p="sm" />

                        <Grid>
                          <Grid.Col lg={9}>
                            <Text weight="bold">Total Price Of Services</Text>
                          </Grid.Col>
                          <Grid.Col lg={3}>
                            <Text weight="bold">Rs. {totalPrice}</Text>
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    </Grid.Col>
                  )}
                </Grid>
                <Grid justify="flex-end" py="md">
                  <Grid.Col xs={6} sm={3} md={3} lg={3}>
                    <Button
                      size="md"
                      fullWidth
                      variant="filled"
                      color="red"
                      // disabled={loading}
                      leftIcon={<IconArrowLeft />}
                      onClick={prevStep}
                    >
                      BACK
                    </Button>
                  </Grid.Col>
                  <Grid.Col xs={6} sm={3} md={3} lg={3}>
                    <Button
                      size="md"
                      fullWidth
                      variant="filled"
                      color="dark"
                      rightIcon={<IconArrowRight />}
                      onClick={nextStep}
                    >
                      NEXT
                    </Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Stepper.Step>
            {venueDetails?.menus?.length !== 0 && (
              <Stepper.Step
                color={!stepperDisabled ? "grape" : "gray"}
                label="Menu Selection"
                description="Select A Menu"
                allowStepSelect={active > 2}
                disabled={stepperDisabled}
              >
                <Paper pb="xl">
                  <Group position="apart">
                    <Text weight="bold" size="xl" py="md">
                      Menu Selection
                    </Text>
                    <Text weight="bold" size="xl" py="md" color="red">
                      Total{" "}
                      <b>
                        Rs. {hallCharges + totalPrice + menuPrice * noOfGuests}
                      </b>
                    </Text>
                  </Group>
                  {idOfSelectedMenu === "" && (
                    <Text size="xl" color="red" weight="bold">
                      Please Select A Menu{" "}
                    </Text>
                  )}
                </Paper>

                <MenusOfSpecificVenueForBooking
                  menus={venueDetails?.menus}
                  setIdOfSelectedMenu={setIdOfSelectedMenu}
                  idOfSelectedMenu={idOfSelectedMenu}
                  setMenuPrice={setMenuPrice}
                  setSelectedMenu={setSelectedMenu}
                  noOfGuests={noOfGuests}
                />
                <Grid justify="flex-end" py="md">
                  <Grid.Col xs={6} sm={3} md={3} lg={3}>
                    <Button
                      size="md"
                      fullWidth
                      variant="filled"
                      color="red"
                      // disabled={loading}
                      leftIcon={<IconArrowLeft />}
                      onClick={prevStep}
                    >
                      BACK
                    </Button>
                  </Grid.Col>

                  {idOfSelectedMenu === "" ? (
                    <Grid.Col xs={6} sm={3} md={3} lg={3}>
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="dark"
                        rightIcon={<IconArrowRight />}
                        onClick={() => {
                          setMenuPrice(0);
                          setIdOfSelectedMenu("");
                          setSelectedMenu("");
                          nextStep();
                        }}
                      >
                        Skip
                      </Button>
                    </Grid.Col>
                  ) : (
                    <Grid.Col xs={6} sm={3} md={3} lg={3}>
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="dark"
                        rightIcon={<IconArrowRight />}
                        onClick={handleMenuSelect}
                      >
                        NEXT
                      </Button>
                    </Grid.Col>
                  )}
                </Grid>
              </Stepper.Step>
            )}
            {venueDetails?.themes?.length !== 0 && (
              <Stepper.Step
                color={!stepperDisabled ? "grape" : "gray"}
                label="Theme Selection"
                description="Select A Theme"
                allowStepSelect={active > 2}
                disabled={stepperDisabled}
              >
                <Paper pb="xl">
                  <Group position="apart">
                    <Text weight="bold" size="xl" py="md">
                      Theme Selection
                    </Text>
                    <Text weight="bold" size="xl" py="md" color="red">
                      Total{" "}
                      <b>
                        Rs. {hallCharges + totalPrice + menuPrice * noOfGuests}
                      </b>
                    </Text>
                  </Group>
                  {idOfSelectedTheme === "" && (
                    <Text size="xl" color="red" weight="bold">
                      Please Select A Theme{" "}
                    </Text>
                  )}
                </Paper>

                <ThemesOfSpecificVenueForBooking
                  themes={venueDetails?.themes}
                  setIdOfSelectedTheme={setIdOfSelectedTheme}
                  idOfSelectedTheme={idOfSelectedTheme}
                  setSelectedTheme={setSelectedTheme}
                  selectedTheme={selectedTheme}
                />

                <Grid justify="flex-end" py="md">
                  <Grid.Col xs={6} sm={3} md={3} lg={3}>
                    <Button
                      size="md"
                      fullWidth
                      variant="filled"
                      color="red"
                      // disabled={loading}
                      leftIcon={<IconArrowLeft />}
                      onClick={prevStep}
                    >
                      BACK
                    </Button>
                  </Grid.Col>

                  <Grid.Col xs={6} sm={3} md={3} lg={3}>
                    <Button
                      size="md"
                      fullWidth
                      variant="filled"
                      color="dark"
                      rightIcon={<IconArrowRight />}
                      onClick={nextStep}
                    >
                      NEXT
                    </Button>
                  </Grid.Col>
                </Grid>
              </Stepper.Step>
            )}

            <Stepper.Step
              color={!stepperDisabled ? "grape" : "gray"}
              label="Contact Information"
              description="Contact Information"
              allowStepSelect={active > 3}
              disabled={stepperDisabled}
            >
              <Group position="apart">
                <Text weight="bold" size="xl" py="md">
                  Contact Details and Booking Description
                </Text>
                <Text weight="bold" size="xl" py="md" color="red">
                  Total{" "}
                  <b>Rs. {hallCharges + totalPrice + menuPrice * noOfGuests}</b>
                </Text>
              </Group>
              <Paper py="xl">
                <form
                  onSubmit={form.onSubmit((values) => handleSubmit1(values))}
                >
                  <Grid>
                    <Grid.Col md={12} lg={6}>
                      <TextInput
                        error={renderErrorMessage("phone")}
                        size="md"
                        required
                        type="number"
                        label="Contact Number"
                        placeholder="03XXXXXXXX"
                        // disabled={disabled}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        {...form.getInputProps("phone")}
                      />
                    </Grid.Col>
                    <Grid.Col md={12} lg={6}>
                      <TextInput
                        error={renderErrorMessage("email")}
                        size="md"
                        placeholder="abc@gmail.com"
                        value={email}
                        required
                        // disabled={disabled}
                        label="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        {...form.getInputProps("email")}
                      />
                    </Grid.Col>
                    <Grid.Col md={12} lg={12}>
                      <Textarea
                        error={renderErrorMessage("description")}
                        size="md"
                        placeholder="Describe Your Event"
                        value={description}
                        required
                        minRows={3}
                        maxRows={10}
                        maxLength={1000}
                        autosize
                        // disabled={disabled}
                        label="Booking Description"
                        onChange={(e) => setDescription(e.target.value)}
                        {...form.getInputProps("description")}
                      />
                    </Grid.Col>
                  </Grid>
                  <Grid justify="flex-end" py="md">
                    <Grid.Col xs={6} sm={3} md={3} lg={3}>
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="red"
                        // disabled={loading}
                        leftIcon={<IconArrowLeft />}
                        onClick={prevStep}
                      >
                        BACK
                      </Button>
                    </Grid.Col>
                    <Grid.Col xs={6} sm={3} md={3} lg={3}>
                      <Button
                        size="md"
                        fullWidth
                        variant="filled"
                        color="dark"
                        type="submit"
                        rightIcon={<IconArrowRight />}
                      >
                        NEXT
                      </Button>
                    </Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Stepper.Step>

            <Stepper.Step
              color={!stepperDisabled ? "grape" : "gray"}
              label="Payment Details"
              description="Please proceed with the minimum"
              allowStepSelect={active > 4}
              disabled={stepperDisabled}
            >
              <Paper py="xl">
                <form
                  onSubmit={form.onSubmit((values) => handleSubmit1(values))}
                >
                  <Group position="apart">
                    <Group>
                      <Text weight="bold" size="xl" py="md">
                        Review And
                      </Text>

                      <Button
                        rightIcon={
                          <div className="xyz">
                            <IconArrowDown />
                          </div>
                        }
                        onClick={() => scrollIntoView({ alignment: "center" })}
                        style={{
                          backgroundImage:
                            "url(https://media.istockphoto.com/photos/violet-color-velvet-texture-background-picture-id587219358?k=20&m=587219358&s=612x612&w=0&h=PtwQq0Cx7AllJLpAqQkO315w8NxwwAJIrquHjaTym3Y=)",
                        }}
                      >
                        Pay
                      </Button>
                    </Group>

                    <Text weight="bold" color="red" size="xl" py="md">
                      Total Cost Rs. {totalPrice + hallCharges}
                    </Text>
                  </Group>
                  <BookingReviewInvoice
                    // allVenues={allVenues}
                    // allSubVenues={allSubVenues}
                    // allCustomers={allCustomers}
                    selectedVenueServiceObject={selectedVenueServiceObject}
                    venue={venue}
                    idOfSelectedSubVenue={idOfSelectedSubVenue}
                    value1={value1}
                    time={time}
                    eventType={eventType}
                    noOfGuests={noOfGuests}
                    hallCharges={hallCharges}
                    selectedMenu={selectedMenu}
                    menuPrice={menuPrice}
                    totalPrice={totalPrice}
                    customer={customer}
                    phone={phone}
                    email={email}
                    description={description}
                    step={6}
                  />
                  <Text weight="bold" size="xl" py="lg">
                    Pay With Stripe
                  </Text>
                  <Grid>
                    <Grid.Col md={12} lg={6}>
                      <Paper
                        p="sm"
                        withBorder
                        shadow="md"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Title className={classes.title} order={2} pt="sm">
                          Payment Breakdown
                        </Title>

                        <SimpleGrid
                          cols={1}
                          spacing={20}
                          breakpoints={[
                            { maxWidth: 550, cols: 1, spacing: 40 },
                          ]}
                          style={{ marginTop: 30 }}
                        >
                          {items}
                        </SimpleGrid>
                      </Paper>
                    </Grid.Col>
                    <Grid.Col md={12} lg={6} ref={targetRef}>
                      <StripePromise
                        paidSuccessfully={paidSuccessfully}
                        setPaidSuccessfully={setPaidSuccessfully}
                        onClickBack={prevStep}
                        // setConfirmBooking={setConfirmBooking}
                        // start={start}
                        amountPayable={
                          (hallCharges +
                            selectedVenueServiceObject
                              ?.map(
                                (service) =>
                                  service.servicePrice *
                                  (service.duration === "Per Event" ? 1 : 3)
                              )
                              .reduce((a, b) => a + b, 0) +
                            (selectedMenu?.price ? selectedMenu.price : 0) *
                              noOfGuests -
                            (hallCharges +
                              selectedVenueServiceObject
                                ?.map(
                                  (service) =>
                                    service.servicePrice *
                                    (service.duration === "Per Event" ? 1 : 3)
                                )
                                .reduce((a, b) => a + b, 0) +
                              (selectedMenu?.price ? selectedMenu.price : 0) *
                                noOfGuests) *
                              0.25 +
                            (hallCharges +
                              selectedVenueServiceObject
                                ?.map(
                                  (service) =>
                                    service.servicePrice *
                                    (service.duration === "Per Event" ? 1 : 3)
                                )
                                .reduce((a, b) => a + b, 0) +
                              (selectedMenu?.price ? selectedMenu.price : 0) *
                                noOfGuests) *
                              0.17) *
                          0.25
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Stepper.Step>
          </Stepper>
        </Paper>
      </Paper>
    </Container>
  );
};

export default NewBookingFile;
