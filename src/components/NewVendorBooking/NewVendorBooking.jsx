import axios from "axios";
import "./styling.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Text,
  Title,
  Button,
  TextInput,
  LoadingOverlay,
  Stepper,
  Group,
  Select,
  SimpleGrid,
  Image,
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
  IconTrash,
  IconTrashOff,
  IconX,
} from "@tabler/icons";
import StripePromise from "../paymentGateways/StripePromise";
import VendorPackagesForBooking from "./VenorPackagesForBooking";
import ViewAllVendorPaymentTableReceipts from "./ViewAllVendorPaymentTableReceipts";
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

const NewVendorBookingFile = () => {
  const currentLocation = useLocation();
  const checkLogin = () => {
    console.log("CHECKING ROUTES");
    console.log("currentLocation", currentLocation);

    if (localStorage.getItem("customerToken") === null || undefined || "") {
      showNotification({
        title: "Please Sign In First",
        message: "You need to Sign In First",
        color: "red",
      });
      navigate("/signin");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
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

  const [vendorDetails, setVendorDetails] = useState({});
  console.log("VENDOR DETAILS: ", vendorDetails);
  const [value1, onChange] = useState(new Date());
  const [time, setTime] = useState("");
  const [idOfSelectedPackage, setIdOfSelectedPackage] = useState("");
  const [eventType, setEventType] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  console.log("BOOKING DETAILS: ", bookingDetails);
  const [price, setPrice] = useState({});
  const [bookingPercentage, setBookingPercentage] = useState(0.2);
  const [taxPercentage, setTaxPercentage] = useState(0.17);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const [vendorCategory, setVendorCategory] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedVendorPackage, setSelectedVendorPackage] = useState({});
  console.log("Totalprice", totalPrice);
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [hidden, setHidden] = useState(true);
  const [hideSelectButton, setHideSelectButton] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState("");
  console.log("selected theme", selectedTheme);

  const data = [
    {
      percent: bookingPercentage * 100,
      Amount: (
        (totalPrice +
          totalPrice * taxPercentage -
          totalPrice * discountPercentage) *
        bookingPercentage
      ).toLocaleString(),
      color: "red",
      title: `${bookingPercentage * 100} % Advance Payment`,
      description: `To Book A Date ${
        bookingPercentage * 100
      } % Advance Payment is Required `,
    },
    {
      percent: (1 - bookingPercentage) * 100,
      Amount: (
        totalPrice -
        totalPrice * discountPercentage +
        totalPrice * taxPercentage -
        (totalPrice -
          totalPrice * discountPercentage +
          totalPrice * taxPercentage) *
          bookingPercentage
      ).toLocaleString(),
      color: "green",
      title: `${(1 - bookingPercentage) * 100} % Remaining Payment`,
      description: `Remaining ${
        (1 - bookingPercentage) * 100
      } % Payment is Required 7 Days Before The Event Date`,
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

  console.log("_id of subvenue from table", idOfSelectedPackage);

  let navigate = useNavigate();

  const form1 = useForm({
    // validateInputOnChange: true,
    initialValues: {
      // venue: "",
      date: params.date ? new Date(params.date) : null,
      // vendorCategory: "",
      eventType: params.eventType ? params.eventType : "",
      time: params.time ? params.time : "",
    },

    validate: {
      // vendorCategory: (value) =>
      //   value === "" ? "Please Select a Vendor Category" : null,
      date: (value) => (value === null ? "Please Select a Date" : null),
      time: (value) => (value === "" ? "Please Select a Time" : null),
      eventType: (value) =>
        value === "" ? "Please Select an Event Type" : null,
    },
  });
  let customerData = JSON.parse(localStorage.getItem("customerData"));
  let customerName = customerData?.name;
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
  const bookedDateAndTime = new moment(form1.values.date)
    .format()
    .split("T")[0];
  console.log("testing date and time", bookedDateAndTime);
  const bookingDateAndTime = bookingDetails?.bookingDate
    ? new moment(bookingDetails?.bookingDate).format().split("T")[0]
    : null;
  console.log("testing date and time bookingDateAndTime", bookingDateAndTime);

  const handleSubmit = async (event) => {
    var { eventType, time, date } = event;
    // setVendorCategory(vendorCategory);
    setEventType(eventType);
    setTime(time);
    onChange(date);

    if (idOfSelectedPackage === "") {
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
    console.log(event);

    setPhone(phone);
    setEmail(email);
    setDescription(description);

    nextStep();
    // makeVendorBooking();
  };

  useEffect(() => {
    const url2 = `https://a-wep.herokuapp.com/customer/getSpecificVendorBusinessDetails/${params.vendorId}`;
    if (refresh) {
      if (params.bookingId) {
        const headers = {
          "Content-Type": "application/json",
          token: localStorage.getItem("customerToken"),
        };
        axios({
          method: "get",
          // url: `https://a-wep.herokuapp.com/customer/getSubVenueBooking/${params.bookingId}`,
          url: `https://a-wep.herokuapp.com/customer/getVendorPackageBookings`,
          headers: headers,
        }).then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            const response = res.data.data.filter((item) => {
              return item._id === params.bookingId;
            })[0];
            console.log("THIS IS THE RESPONSE OBJECT:   ", response);
            setBookingDetails(response);
            setIdOfSelectedPackage(response?.vendorPackageId?._id);
            setTotalPrice(response?.vendorPackageId?.price);
            setSelectedVendorPackage(response?.vendorPackageId);

            setEventType(response?.eventType);
            setTime(response?.eventDuration);
            onChange(response?.bookingDate);
            setPhone(response?.pointOfContact?.phone);
            setEmail(response?.pointOfContact?.email);
            setDescription(response?.bookingDescription);
            form.setFieldValue("phone", response?.pointOfContact?.phone);
            form.setFieldValue("email", response?.pointOfContact?.email);
            form.setFieldValue("description", response?.bookingDescription);

            setPrice(response?.price);

            setRefresh(false);
            setVisible(false);
          } else {
            // alert("Error");
          }
        });
      }

      axios.get(url2).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("we are here in api call");
          setVendorDetails(res.data.data);
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
      makeVendorBooking();
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
      form1.values.date === null
    ) {
      console.log("@TEST in if", form1.values);
      setHideSelectButton(true);
      return;
    } else {
      console.log("we are here in use effect of if");
      setHideSelectButton(false);
      return;
    }
  }, [form1.values.eventType, form1.values.date, form1.values.time]);

  const makeVendorBooking = async () => {
    setVisible(true);
    console.log("MAKING THE BOOKING");
    const body = {
      vendorPackageId: idOfSelectedPackage,
      bookingDate: moment(value1).format(),
      bookingTime: time,
      eventType: eventType,
      eventDuration: time,
      pointOfContact: {
        email: email,
        phone: phone,
      },
      price: {
        totalPrice: totalPrice,
        paidAmount:
          (totalPrice +
            totalPrice * taxPercentage -
            totalPrice * discountPercentage) *
          bookingPercentage,
        remainingAmount:
          totalPrice -
          totalPrice * discountPercentage +
          totalPrice * taxPercentage -
          (totalPrice -
            totalPrice * discountPercentage +
            totalPrice * taxPercentage) *
            bookingPercentage,
        discountPercentage: discountPercentage,
        taxPercentage: taxPercentage,
        totalPriceAfterTaxAndDiscount:
          totalPrice +
          totalPrice * taxPercentage -
          totalPrice * discountPercentage,
      },

      bookingDescription: description,
    };

    console.log("@@@body", body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };
    try {
      const response = await axios({
        method: "post",
        url: "https://a-wep.herokuapp.com/customer/bookVendorPackage",
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
        console.log("success response", response.data.data);
        socket.socket.emit("generateNotification", {
          userId: JSON.parse(localStorage.getItem("customerData")).id,
          title: "Subvenue Booking Successful",
          message: `Customer For Booking: ${email}`,
          link: "https://awep-superadmin-team-awep.vercel.app/viewbookings",
        });
        socket.socket.emit("generateNotification", {
          userId: vendorDetails.vendorId,
          title: "Subvenue Booking Successful",
          message: `Customer For Booking: ${email}`,
          link: "https://awep-frontend-vendor-01-sept-22.vercel.app/vendorBookings",
        });

        socket.socket.emit("viewAllChatsOnStartConversation", {
          participant: {
            _id: vendorDetails.vendorBusinessId,
            type: "vendorBusiness",
          },
        });
        setBookingId(response.data?.data?.trackingId);
        showNotification({
          color: "green",
          title: `Successfully`,
          message: `SUB VENUE BOOKED SUCCESSFULLY!!`,
        });
        setConfirmBooking(true);

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

  const updateVendorPackageBooking = async () => {
    setVisible(true);
    const body = {
      bookingDate: moment(value1).format(),
      eventType: eventType,
      eventDuration: time,
      pointOfContact: {
        email: email,
        phone: phone,
      },
      price: {
        totalPrice: totalPrice,
        paidAmount: price.paidAmount,
        remainingAmount:
          totalPrice -
          totalPrice * discountPercentage +
          totalPrice * taxPercentage -
          price.paidAmount,
        discountPercentage: discountPercentage,
        taxPercentage: taxPercentage,
        totalPriceAfterTaxAndDiscount:
          totalPrice +
          totalPrice * taxPercentage -
          totalPrice * discountPercentage,
        paymentHistory: price.paymentHistory,
      },
      bookingDescription: description,
    };
    console.log("body");
    console.log("bosyyyy in vendor Booking", body);

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };
    try {
      const response = await axios({
        method: "patch",
        url: `https://a-wep.herokuapp.com/customer/updateVendorPackageBooking/${params.bookingId}`,
        data: body,
        headers: headers,
      });
      // setLoading(false);
      console.log(response.data);

      if (response.data.status === "error") {
        // setErrorMessages(response.data.error);
        // setLoading(false);
        console.log(response.data.error);
        setVisible(false);
        showNotification({
          color: "red",
          title: `ERROR`,

          message: `${response.data.error?.message || response.data.error}`,
        });
      } else {
        showNotification({
          color: "green",
          title: `SUCCESS`,

          message: `PACKAGE UPDATED SUCCESSFULLY!!`,
        });
        console.log("navigating");
        // setOpened(true);
        console.log("navigated");
        navigate("/dashboard/vendorBookings");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container size="xl">
      {localStorage.getItem("customerToken") ? (
        <Paper
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <LoadingOverlay
            visible={visible}
            loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
            overlayOpacity={0.5}
            overlayColor="#c5c5c5"
            zIndex={1}
          />

          <Modal
            zIndex={1000}
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
            opened={confirmBooking}
            transition="rotate-left"
            transitionDuration={600}
            centered
            size={600}
            transitionTimingFunction="ease"
            onClose={() => {
              navigate("/dashboard/vendorBookings");
              setConfirmBooking(false);
            }}
          >
            <Stack>
              <Group position="apart">
                <Group position="left">
                  <Text weight={900}>Booking ID: {"12345678910"}</Text>
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
                    <Group position="left">
                      <Text>
                        {/* {
                selectedVendorPackage?.vendorBusinessId
                  ?.vendorBusinessTitle
              } */}
                        Business Name Here
                      </Text>
                    </Group>
                    <Group position="left">
                      <Text>{bookedDateAndTime} </Text>
                    </Group>
                    <Group position="left">
                      <Text>
                        {/* {selectedVendorPackage?.vendorPackageTitle} */}
                        Package name here
                      </Text>
                    </Group>
                    <Group position="left">
                      <Text>
                        {/* {selectedVendorPackage?.packageDuration} */}
                        Package Duration here
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
                  <Text> {totalPrice.toLocaleString()}</Text>
                </Group>
                {/*              <Group position="apart">
<Text>Discount</Text>
<Text>-{(totalPrice * 0.25).toLocaleString()}</Text>
</Group>*/}
                <Group position="apart">
                  <Text>Tax</Text>
                  <Text>+{(totalPrice * 0.17).toLocaleString()}</Text>
                </Group>
                <Group position="apart">
                  <Text>Total</Text>
                  <Text>
                    {(totalPrice + totalPrice * 0.17).toLocaleString()}
                  </Text>
                </Group>
                <Divider />
                <Group position="apart">
                  <Text>Amount Paid</Text>
                  <Text>
                    {(
                      (totalPrice - totalPrice * 0.25 + totalPrice * 0.17) *
                      0.25
                    ).toLocaleString()}
                  </Text>
                </Group>
                <Divider />
                <Group position="apart">
                  <Text>Amount Remaining: </Text>
                  <Text>
                    {(
                      totalPrice +
                      totalPrice * 0.17 -
                      (totalPrice - totalPrice * 0.25 + totalPrice * 0.17) *
                        0.25
                    ).toLocaleString()}
                  </Text>
                </Group>
              </Paper>
            </Stack>

            <Group position="center">
              <Button
                component={Link}
                to="/shahrukhTest/bookings"
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
            {params.bookingId ? (
              <Title order={2} align="center" py="xl">
                Vendor Package Booking Update
              </Title>
            ) : (
              <Title order={2} align="center" py="xl">
                Vendor Package Booking
              </Title>
            )}
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
                    onClick={() => navigate("/dashboard/vendorBookings")}
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
                      hidden={params.bookingId ? true : false}
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
                        form1.setFieldValue("vendorCategory", "");

                        setTime("");
                        setVendorCategory("");

                        setIdOfSelectedPackage("");

                        setTotalPrice(0);

                        setHidden(true);
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
                      <Grid.Col lg={12}>
                        <Select
                          size="md"
                          disabled={
                            params.vendorPackageId
                              ? false
                              : idOfSelectedPackage !== ""
                          }
                          label="Event Type"
                          placeholder="Event Type"
                          value={eventType}
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
                          disabled={
                            params.vendorPackageId
                              ? false
                              : idOfSelectedPackage !== ""
                          }
                          minDate={dayjs(new Date())
                            .startOf("month")
                            .add(new Date().getDate(), "days")
                            .toDate()}
                          maxDate={dayjs(new Date()).add(365, "days").toDate()}
                          placeholder="Pick date"
                          label="Event Date"
                          icon={<IconCalendar size={16} />}
                          value={value1}
                          onInput={(e) => {
                            onChange(e);
                            setIdOfSelectedPackage("");
                            setTotalPrice(0);
                            setHidden(true);
                          }}
                          {...form1.getInputProps("date")}
                        />
                      </Grid.Col>
                      <Grid.Col lg={6}>
                        <Select
                          size="md"
                          label="Event Time"
                          disabled={
                            params.vendorPackageId
                              ? false
                              : idOfSelectedPackage !== ""
                          }
                          placeholder="Time"
                          value={time}
                          // onChange={(e) => {
                          //   setTime(e.target.value);
                          //   setIdOfSelectedPackage("");
                          //   setIdOfSelectedMenu("");
                          //   setMenuPrice(0);
                          //   setChargesError("");
                          //   setHidden(true);

                          //   setTotalPrice(0);
                          // }}
                          data={[
                            {
                              value: "1 Day",
                              label: "1 Day",
                            },
                            {
                              value: "2 Days",
                              label: "2 Days",
                            },
                            {
                              value: "3 Days",
                              label: "3 Days",
                            },
                            {
                              value: "4 Days",
                              label: "4 Days",
                            },
                          ]}
                          rightSection={<IconChevronDown size={14} />}
                          rightSectionWidth={40}
                          {...form1.getInputProps("time")}
                        />
                      </Grid.Col>
                      {/* <Grid.Col lg={6}>
              <Select
                size="md"
                // disabled={vendor === ""}
                label="Service Category"
                placeholder="Select Category"
                searchable
                value={vendorCategory}
                // value={selectedVendorCategory}
                // onChange={setSelectedVendorCategory}
                nothingFound="None Found"
                data={CategoryData ? CategoryData : []}
                {...form1.getInputProps("vendorCategory")}
              />
            </Grid.Col> */}
                    </Grid>

                    {vendorDetails?.vendorServicePackages && (
                      <VendorPackagesForBooking
                        isUpdate={params.bookingId ? true : false}
                        vendorPackageDetails={
                          vendorDetails?.vendorServicePackages
                            ? vendorDetails?.vendorServicePackages
                            : []
                        }
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                        setIdOfSelectedPackage={setIdOfSelectedPackage}
                        idOfSelectedPackage={
                          params.vendorPackageId || idOfSelectedPackage
                        }
                        bookedDateAndTime={bookedDateAndTime}
                        bookingDateAndTime={bookingDateAndTime}
                        // vendorCategory={form1.values.vendorCategory}
                        vendorCategory=""
                        setHidden={setHidden}
                        error={error}
                        setError={setError}
                        setDisabled={setDisabled}
                        setVendorCategory={setVendorCategory}
                        hideSelectButton={hideSelectButton}
                        setSelectedVendorPackage={setSelectedVendorPackage}
                        time={time}
                        form1={form1}
                      />
                    )}

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
                          disabled={disabled || !idOfSelectedPackage}
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
                    Total <b>Rs. {totalPrice}</b>
                  </Text>
                </Group>
                <Paper py="xl">
                  <form
                    onSubmit={form.onSubmit((values) => handleSubmit1(values))}
                  >
                    <Grid>
                      <Grid.Col md={12} lg={6}>
                        <TextInput
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
                      {params.bookingId ? (
                        <Text weight="bold" size="xl" py="md">
                          Review And Confirm
                        </Text>
                      ) : (
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
                            onClick={() =>
                              scrollIntoView({ alignment: "center" })
                            }
                            style={{
                              background: "#E60084",
                            }}
                          >
                            Pay
                          </Button>
                        </Group>
                      )}

                      <Text weight="bold" color="red" size="xl" py="md">
                        Total Cost Rs. {totalPrice}
                      </Text>
                    </Group>
                    <ViewAllVendorPaymentTableReceipts
                      bookedDateAndTime={bookedDateAndTime}
                      vendorTitle={vendorDetails?.vendorBusinessTitle}
                      vendorAddress={vendorDetails?.address}
                      vendorEmail={vendorDetails?.infoEmail}
                      vendorPhone={vendorDetails?.contactPhone}
                      vendorWhatsapp={vendorDetails?.contactWhatsApp}
                      packageTitle={selectedVendorPackage?.vendorPackageTitle}
                      packageDuration={selectedVendorPackage?.packageDuration}
                      bookingDesription={description}
                      totalPrice={totalPrice}
                      customerName={customerName}
                      customerEmail={customerEmail}
                      customerPhone={customerPhone}
                    />
                    {params.bookingId ? (
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
                            onClick={() => {
                              updateVendorPackageBooking();
                            }}
                            rightIcon={<IconArrowRight />}
                          >
                            UPDATE
                          </Button>
                        </Grid.Col>
                      </Grid>
                    ) : (
                      <>
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
                              <Title
                                className={classes.title}
                                order={2}
                                pt="sm"
                              >
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
                              setConfirmBooking={setConfirmBooking}
                              amountPayable={
                                (totalPrice +
                                  totalPrice * taxPercentage -
                                  totalPrice * discountPercentage) *
                                bookingPercentage
                              }
                              // start={start}
                            />
                          </Grid.Col>
                        </Grid>
                      </>
                    )}
                  </form>
                </Paper>
              </Stepper.Step>
            </Stepper>
          </Paper>
        </Paper>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default NewVendorBookingFile;
