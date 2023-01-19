import axios from "axios";
import "./styling.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Group,
  Select,
  SimpleGrid,
  Center,
  Textarea,
  createStyles,
  RingProgress,
  useMantineTheme,
  NumberInput,
  Switch,
} from "@mantine/core";
import { Modal } from "@mantine/core";
import moment from "moment";
import dayjs from "dayjs";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import SubVenuesForBooking from "../SubVenuesForBooking/SubVenuesForBooking";
import StripePromise from "../paymentGateways/StripePromise";
import { useMediaQuery } from "@mantine/hooks";
import { useScrollIntoView } from "@mantine/hooks";
import { socket } from "../Socket/Socket";
import ServiceSelection from "./ServiceSelection";
// import BookingResponse from "./BookingResponse";
import MenusOfSpecificVenueForBooking from "../MenusOfSpecifcVenue/MenusOfSpecificVenueForBooking";
import ThemesOfSpecificVenueForBooking from "../ThemesOfSpecificVenue/ThemesOfSpecificVenueForBooking";
import StagesOfSpecificVenueForBooking from "../StagesOfSpecificVenue/StagesOfSpecificVenueForBooking";
import BookingViewAllBookings from "../InvoiceGenerator/BookingViewAllBookings";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconTrash,
  IconTrashOff,
  IconX,
} from "@tabler/icons";
import { IconCalendar, IconChevronDown } from "@tabler/icons";
import BookingResponse from "./BookingResponse";
// import BookingResponse from "./BookingResponse";

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

  const [body, setBody] = useState({});
  console.log("BOOOOOOOOOODY state", body);
  const theme = useMantineTheme();

  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 });
  const { classes } = useStyles();
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  // paymentSuccesful
  const [paidSuccessfully, setPaidSuccessfully] = useState(false);
  //CODE FOR PRINTING
  const componentRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const [bookingResponse, setBookingResponse] = useState({});
  console.log("bookingResponse", bookingResponse);
  const [text, setText] = useState("old boring text");

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

  const [allCustomers, setAllCustomers] = useState([]);
  const [allSubVenues, setAllSubVenues] = useState([]);
  console.log("allSubVenues", allSubVenues);
  const [alterServiceSelection, setAlterServiceSelection] = useState("");
  const [allVenues, setAllVenues] = useState([]);
  const [customer, setCustomer] = useState("");
  const [venue, setVenue] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [eventDate, setEventDate] = useState(undefined);
  const [time, setTime] = useState(params?.time ? params?.time : "");
  const [noOfGuests, setNoOfGuests] = useState(
    params?.guests ? params?.guests : 0
  );
  const [idOfSelectedSubVenue, setIdOfSelectedSubVenue] = useState([]);
  const [subVenue, setSubVenue] = useState([]);

  const [chargesError, setChargesError] = useState("");
  const [fulfillmentMessage, setFulfillmentMessage] = useState(
    "Select A Sub Venue And Press Next"
  );
  const [totalAvailableCapacity, setTotalAvailableCapacity] = useState(0);

  const [checkForMultiBooking, setCheckForMultiBooking] = useState(false);
  const [messageColor, setMessageColor] = useState("grey");
  const [eventType, setEventType] = useState(
    params?.eventType ? params?.eventType : ""
  );

  const [selectedSubVenueServices, setSelectedSubVenueServices] = useState({});
  const [selectedVenueServices, setSelectedVenueServices] = useState([]);

  const [alterPrice, setAlterPrice] = useState(false);
  const [alterPriceId, setAlterPriceId] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [oldServicePrice, setOldServicePrice] = useState();
  const [freeService, setFreeService] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedSubVenueServiceObject, setSelectedSubVenueServiceObject] =
    useState({});
  const [selectedVenueServiceObject, setSelectedVenueServiceObject] = useState(
    []
  );

  const [subVenueWiseServicePrices, setSubVenueWiseServicePrices] = useState(
    {}
  );
  const [venueWiseServicePrices, setVenueWiseServicePrices] = useState(0);

  const [bookingPercentage, setBookingPercentage] = useState(0.2);
  const [taxPercentage, setTaxPercentage] = useState(0.17);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const [checked, setChecked] = useState({});
  const [checkedVenueServices, setCheckedVenueServices] = useState(false);

  const [hallCharges, setHallCharges] = useState(0);
  console.log("hallCharges", hallCharges);
  const [idOfSelectedMenu, setIdOfSelectedMenu] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuPrice, setMenuPrice] = useState(0);
  const [menuPolicy, setMenuPolicy] = useState(false);

  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [hidden, setHidden] = useState(true);
  const [hideSelectButton, setHideSelectButton] = useState(false);
  // const { start, clear } = useTimeout(() => setConfirmBooking(false), 10000);

  const [idOfSelectedTheme, setIdOfSelectedTheme] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const [idOfSelectedStage, setIdOfSelectedStage] = useState("");
  const [selectedStage, setSelectedStage] = useState("");

  const [stagePrice, setStagePrice] = useState(0);

  const data = [
    {
      percent: bookingPercentage * 100,
      Amount: (
        (hallCharges +
          totalPrice +
          stagePrice +
          menuPrice * noOfGuests +
          (hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests) *
            taxPercentage -
          (hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests) *
            discountPercentage) *
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
        hallCharges +
        totalPrice +
        menuPrice * noOfGuests -
        (hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests) *
          discountPercentage +
        (hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests) *
          taxPercentage -
        (hallCharges +
          totalPrice +
          menuPrice * noOfGuests -
          (hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests) *
            discountPercentage +
          (hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests) *
            taxPercentage) *
          bookingPercentage
      ).toLocaleString(),
      color: "green",
      title: `${(1 - bookingPercentage) * 100} % Remaining Payment`,
      description: `Remaining ${
        (1 - bookingPercentage) * 100
      } % Payment is Required 7 Days Before The Event Date`,
    },
  ];
  const items = data.map((item, index) => (
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

  const refreshStates = () => {
    setTotalPrice(0);
    setSelectedSubVenueServices([]);
    setSelectedSubVenueServiceObject([]);
  };

  let navigate = useNavigate();

  const form1 = useForm({
    // validateInputOnChange: true,
    initialValues: {
      // venue: "",
      date: params.date ? new Date(params.date) : null,
      noOfGuests: params.guests ? params.guests : "",
      eventType: params.eventType ? params.eventType : "",
      time: params.time ? params.time : "",
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
  const alterPriceForm = useForm({
    validateInputOnChange: true,
    initialValues: {
      newPrice: 0,
    },
    validate: {
      newPrice: (value) =>
        value >= 0 ? null : "Please Enter Valid Service Price",
    },
  });
  const form = useForm({
    validateInputOnChange: ["phone", "email"],
    initialValues: { phone: "", email: "", description: "" },

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
    new moment(form1.values.date).format().split("T")[0] + time;

  const handleAlterPrice = async (event) => {
    var { newPrice } = event;
    if (alterServiceSelection === "venue") {
      selectedVenueServiceObject
        ?.filter((e) => e.serviceTitle === serviceTitle)
        .map((e) => (e.servicePrice = parseInt(newPrice)));

      //changing price of totalPrice
      let priceChange = newPrice - oldServicePrice;
      setTotalPrice(totalPrice + priceChange);
      //changing price of venueWiseServicePrices

      setVenueWiseServicePrices((prev) => prev + priceChange);

      // allVenues.filter((e) => e._id === venue)[0]. = parseInt(
    } else if (alterServiceSelection === "subVenue") {
      // setAllVenueServices(allVenueServices);
      selectedSubVenueServiceObject?.[alterPriceId]
        ?.filter((e) => e.serviceTitle === serviceTitle)
        .map((e) => (e.servicePrice = parseInt(newPrice)));

      //changing price of totalPrice
      let priceChange = newPrice - oldServicePrice;
      setTotalPrice(totalPrice + priceChange);

      setSubVenueWiseServicePrices((prev) => ({
        ...prev,
        [alterPriceId]: prev[alterPriceId] + priceChange,
      }));
    }

    alterPriceForm.reset();

    setAlterPrice(false);
  };

  const handleSubmit = async (event) => {
    var { noOfGuests, eventType } = event;
    setNoOfGuests(noOfGuests);
    setEventType(eventType);

    if (idOfSelectedSubVenue.length === 0) {
      setError("Please Select A Venue To Proceed");
      setDisabled(true);
      return;
    } else {
      setEventDate(new moment(form1.values.date).format().split("T")[0]);

      let servicesOfVenue = allVenues?.[0]?.providedVenueServices?.filter((e) =>
        selectedVenueServices?.includes(e.serviceTitle)
      );
      setSelectedVenueServiceObject(servicesOfVenue);
      let providedVenueServices = allVenues?.[0]?.providedVenueServices?.filter(
        (service) => !service.isAlsoSubVenueService
      );

      if (selectedVenueServices?.length === providedVenueServices?.length) {
        setCheckedVenueServices(true);
      }

      let servicesOfSubVenue = {};
      let subVenueServicesAllChecked = {};
      allSubVenues
        ?.filter((e) => idOfSelectedSubVenue.includes(e._id))
        .map((subVenue) => {
          servicesOfSubVenue[subVenue._id] = subVenue?.subVenueServices?.filter(
            (f) => {
              return selectedSubVenueServices[subVenue._id]?.includes(
                f.serviceTitle
              );
            }
          );
          subVenue.subVenueServices.length ===
            servicesOfSubVenue[subVenue._id].length &&
            (subVenueServicesAllChecked[subVenue._id] = true);
        });
      setChecked(subVenueServicesAllChecked);

      setSelectedSubVenueServiceObject(servicesOfSubVenue);

      nextStep();
    }
  };
  const handleSubmit1 = async (event) => {
    var { phone, email, description } = event;

    setPhone(phone);
    setEmail(email);
    setDescription(description);
    let customer = JSON.parse(localStorage.getItem("customerData"));
    console.log("hiii", customer);
    setCustomer(customer?.id);
    let totalAmountWithoutTaxAndDiscount =
      hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests;
    let totalAmount =
      totalAmountWithoutTaxAndDiscount +
      totalAmountWithoutTaxAndDiscount * taxPercentage -
      totalAmountWithoutTaxAndDiscount * discountPercentage;
    let paidAmount = 0;
    if (params.bookingId) {
      paidAmount = bookingDetails.price.paidAmount;
    } else {
      paidAmount = totalAmount * bookingPercentage;
    }
    let remainingAmount = totalAmount - paidAmount;

    let customerName = customer?.name;

    let venueId = allVenues?.[0];

    const tempBody = {
      venueName: venueId.venueName,
      venueId: venueId,

      hallCharges: hallCharges,
      city: venueCity,
      subVenues: idOfSelectedSubVenue,

      customerId: customer,
      customerName: customerName[0],
      bookingDate: moment(eventDate).format(),
      bookingTime: time,

      selectedStage: {
        design: selectedStage || null,
      },
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
        totalPrice: totalAmountWithoutTaxAndDiscount,
        paidAmount: paidAmount,
        remainingAmount: remainingAmount,
        discountPercentage: discountPercentage,
        taxPercentage: taxPercentage,
        totalPriceAfterTaxAndDiscount: totalAmount,
      },

      selectedVenueServices: selectedVenueServiceObject,
      bookingDescription: description,
      numberOfGuests: noOfGuests,
      eventType: eventType,
    };
    tempBody.subVenueAndDataObject = {};

    for (let index in idOfSelectedSubVenue) {
      tempBody.subVenueAndDataObject[idOfSelectedSubVenue[index]] = {
        subVenueId: idOfSelectedSubVenue[index],
        subVenueName: subVenue[index].subVenueName,
        minimumBookingCharges: subVenue[index].minimumBookingCharges,
        selectedSubVenueServices:
          selectedSubVenueServiceObject[idOfSelectedSubVenue[index]],
      };
    }
    if (idOfSelectedMenu === "") {
      delete tempBody.selectedMenu;
    }
    setBody(tempBody);
    nextStep();
    // makeVenueBooking();
  };

  const [venueDetails, setVenueDetails] = useState({});
  console.log("hello venue Details", venueDetails);

  const getVenueDetails = () => {
    const url = `https://a-wep.herokuapp.com/customer/getSpecificVenueDetails/${params.venueId}`;
    axios.get(url).then((res) => {
      if (res.data.status === "success") {
        res.data.data.subVenues.map((e) => {
          e.venueId = {
            _id: res.data.data._id,
            venueName: res.data.data.venueName,
            venueCity: res.data.data.venueCity,
          };
        });
        setVenueDetails(res.data.data);
        setAllVenues([res.data.data]);
        setVenueCity(res.data.data.venueCity);

        setAllSubVenues(res.data.data?.subVenues);
        setRefresh(false);
        setVisible(false);
      } else {
        alert("Error");
      }
    });
  };

  useEffect(() => {
    getVenueDetails();
  }, [refresh]);

  useEffect(() => {
    if (paidSuccessfully) {
      makeVenueBooking();
      setStepperDisabled(true);
    }
  }, [paidSuccessfully]);

  const [bookingDetails, setBookingDetails] = useState({});

  // local prices
  useEffect(() => {
    let subVenueWiseServicePrices = {};
    Object.entries(selectedSubVenueServiceObject).map(([key, value]) => {
      value.map((e) => {
        subVenueWiseServicePrices[key] =
          (subVenueWiseServicePrices[key] || 0) +
          e.servicePrice * (e.duration === "Per Hour" ? 3 : 1);
      });
    });

    setSubVenueWiseServicePrices(subVenueWiseServicePrices);
  }, [selectedSubVenueServiceObject]);
  // local prices
  useEffect(() => {
    setVenueWiseServicePrices(
      selectedVenueServiceObject.reduce((acc, curr) => {
        return (acc += curr.servicePrice);
      }, 0)
    );
  }, [selectedVenueServiceObject]);

  const makeVenueBooking = async () => {
    setVisible(true);
    // let totalAmountWithoutTaxAndDiscount =
    //   hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests;
    // let totalAmount =
    //   totalAmountWithoutTaxAndDiscount +
    //   totalAmountWithoutTaxAndDiscount * taxPercentage -
    //   totalAmountWithoutTaxAndDiscount * discountPercentage;
    // let paidAmount = 0;
    // if (params.bookingId) {
    //   paidAmount = bookingDetails.price.paidAmount;
    // } else {
    //   paidAmount = totalAmount * bookingPercentage;
    // }
    // let remainingAmount = totalAmount - paidAmount;

    // let customerName = allCustomers
    //   .filter((e) => e._id === customer)
    //   .map((e) => e.name);

    // const body = {
    //   hallCharges: hallCharges,
    //   city: venueCity,
    //   subVenues: idOfSelectedSubVenue,

    //   customerId: customer,
    //   customerName: customerName[0],
    //   bookingDate: moment(eventDate).format(),
    //   bookingTime: time,

    //   selectedStage: {
    //     design: selectedStage || null,
    //   },
    //   selectedVenueTheme: {
    //     theme: selectedTheme,
    //   },
    //   selectedMenu: {
    //     menu: idOfSelectedMenu,
    //     price: menuPrice,
    //     modifiedMenu: selectedMenu,
    //   },
    //   pointOfContact: {
    //     email: email,
    //     phone: phone,
    //   },
    //   price: {
    //     totalPrice: totalAmountWithoutTaxAndDiscount,
    //     paidAmount: paidAmount,
    //     remainingAmount: remainingAmount,
    //     discountPercentage: discountPercentage,
    //     taxPercentage: taxPercentage,
    //     totalPriceAfterTaxAndDiscount: totalAmount,
    //   },

    //   selectedVenueServices: selectedVenueServiceObject,
    //   bookingDescription: description,
    //   numberOfGuests: noOfGuests,
    //   eventType: eventType,
    // };
    // body.subVenueAndDataObject = {};

    // for (let index in idOfSelectedSubVenue) {
    //   body.subVenueAndDataObject[idOfSelectedSubVenue[index]] = {
    //     subVenueId: idOfSelectedSubVenue[index],
    //     subVenueName: subVenue[index].subVenueName,
    //     minimumBookingCharges: subVenue[index].minimumBookingCharges,
    //     selectedSubVenueServices:
    //       selectedSubVenueServiceObject[idOfSelectedSubVenue[index]],
    //   };
    // }
    // if (idOfSelectedMenu === "") {
    //   delete body.selectedMenu;
    // }

    const headers = {
      "Content-Type": "application/json",
      token: localStorage.getItem("customerToken"),
    };
    try {
      let url = params?.bookingId
        ? `https://a-wep.herokuapp.com/customer/updateSubVenueBooking/${params.bookingId}`
        : "https://a-wep.herokuapp.com/customer/bookSubVenue";

      const response = await axios({
        method: params?.bookingId ? "PATCH" : "POST",
        url: url,
        data: body,
        headers: headers,
      });

      if (response.data.status === "error") {
        console.log("this is rspons error", response);

        showNotification({
          title: `${response.data.message}`,
          color: "red",
          message: `${response.data.error.message}`,
        });

        setVisible(false);
      } else {
        console.log("this is rspons", response);
        setBookingResponse(response.data.data);
        setConfirmBooking(true);
        socket.socket.emit("generateNotification", {
          userId: JSON.parse(localStorage.getItem("superAdminData")).id,
          title: "Subvenue Booking Successful",
          message: `Customer For Booking: ${email}`,
          link: "https://awep-superadmin-team-awep.vercel.app/viewbookings",
        });

        showNotification({
          color: "green",
          title: `Successfully`,
          message: params?.bookingId
            ? `BOOKING UPDATED SUCCESSFULLY!!`
            : `SUB VENUE BOOKED SUCCESSFULLY!!`,
        });

        nextStep();
        setVisible(false);
      }
    } catch (err) {}
    setVisible(false);
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
  useEffect(() => {
    if (params.bookingId) {
      getBookingDetails(params.bookingId);
    }
  }, []);
  const getBookingDetails = async (bookingId) => {
    if (params.bookingId) {
      const headers = {
        "Content-Type": "application/json",
        token: localStorage.getItem("customerToken"),
      };
      axios({
        method: "get",
        url: `https://a-wep.herokuapp.com/customer/getSubVenueBooking/${params.bookingId}`,
        headers: headers,
      }).then((res) => {
        if (res.data.status === "success") {
          console.log("this is res", res);
          const response = res.data.data;
          setBookingDetails(response);
          setTime(response.bookingTime);
          setNoOfGuests(response.numberOfGuests);
          form1.setFieldValue("noOfGuests", response.numberOfGuests);
          form1.setFieldValue("time", response.bookingTime);
          form1.setFieldValue("date", new Date(response.bookingDate));
          form1.setFieldValue("eventType", response.eventType);
          form.setFieldValue("customer", response.customerId?._id);
          form.setFieldValue("phone", response.pointOfContact?.phone);
          form.setFieldValue("email", response.pointOfContact?.email);
          form.setFieldValue("description", response.bookingDescription);
          setPhone(response.pointOfContact?.phone);
          setEmail(response.pointOfContact?.email);
          setDescription(response.bookingDescription);
          setEventDate(new Date(response.bookingDate));
          let serviceTitles = response.selectedVenueServices.map(
            (service) => service.serviceTitle
          );
          setSelectedVenueServices(serviceTitles);

          let venueServices = {}; // venue services that user selected in booking
          // save all venue services in venueServices object and then compare with selectedVenueServices
          response.venueId?.providedVenueServices?.map(
            (service) => (venueServices[service.serviceTitle] = true)
          );

          // if a selectedVenueService is not in venueServices object then add it to venueServices
          response.selectedVenueServices.map((service) => {
            if (!venueServices[service.serviceTitle]) {
              response.venueId?.providedVenueServices?.push(service);
            }
          });

          let subVenueServices = {}; // subVenue services that user selected in booking
          // save all subVenue services in subVenueServices object and then compare with selectedSubVenueServices
          response.subVenues.map((subVenue) => {
            subVenueServices[subVenue._id] = {};

            subVenue?.subVenueServices?.map(
              (service) =>
                (subVenueServices[subVenue._id][service.serviceTitle] = true)
            );
          });

          // if a selectedSubVenueService is not in subVenueServices object then add it to subVenueServices
          Object.entries(response.subVenueAndDataObject).forEach(
            ([key, value], index) => {
              value.selectedSubVenueServices?.map((service) => {
                if (!subVenueServices[key][service.serviceTitle]) {
                  response.subVenues[index]?.subVenueServices?.push(service);
                }
              });
            }
          );

          //////MODIFY SERVICE PRICES///////////////////////////////////////////////////////////
          let venueServicePrices = {};
          for (let service of response.selectedVenueServices) {
            venueServicePrices[service.serviceTitle] = service.servicePrice;
          }
          console.log("GANGA NAHAEY", response.venueId);
          console.log("GANGA NAHAEY", response.venueId.providedVenueServices);
          response.venueId?.providedVenueServices.map((service) => {
            service.servicePrice =
              venueServicePrices[service.serviceTitle] || service.servicePrice;
          });

          // change price of subVenue services according to selectedVenueServices
          let servicePrices = {};
          Object.entries(response.subVenueAndDataObject).forEach(
            ([key, value], index) => {
              let services = {};
              for (let service of value.selectedSubVenueServices) {
                services[service.serviceTitle] = service.servicePrice;
              }
              servicePrices[key] = services;
            }
          );
          Object.entries(response.subVenueAndDataObject).forEach(
            ([key, value], index) => {
              let services = {};
              for (let service of value.selectedSubVenueServices) {
                services[service.serviceTitle] = service.servicePrice;
              }
              servicePrices[key] = services;
            }
          );

          response.subVenues.forEach((subVenue) => {
            subVenue.subVenueServices.map((service) => {
              service.servicePrice =
                servicePrices[subVenue._id]?.[service.serviceTitle] ||
                service.servicePrice;
            });
          });

          Object.entries(response.subVenueAndDataObject).forEach(
            ([key, value]) => {
              let serviceTitles = value.selectedSubVenueServices.map(
                (service) => service.serviceTitle
              );

              setSelectedSubVenueServices((prevState) => ({
                ...prevState,
                [key]: serviceTitles,
              }));

              setSelectedSubVenueServiceObject((prevState) => ({
                ...prevState,
                [key]: value.selectedSubVenueServices,
              }));
            }
          );

          //////////////////////////////////////
          let totalPrice = response.price?.totalPrice || 0;
          let menuPrice = response.selectedMenu?.price || 0;
          let stagePrice = response.selectedStage?.design?.price || 0;
          let hallCharges = response?.hallCharges || 0;
          let newPrice =
            totalPrice -
            menuPrice * response?.numberOfGuests -
            stagePrice -
            hallCharges;
          setTotalPrice(newPrice);
          setHallCharges(hallCharges);
          setMenuPolicy(response?.venueId?.menuPolicy);
          setAllCustomers([response?.customerId]);
          setCustomer(response?.customerId?._id);
          setSelectedStage(response.selectedStage?.design || null);
          setSelectedTheme(response.selectedVenueTheme?.theme || null);
          setIdOfSelectedTheme(response?.selectedVenueTheme?.theme?._id);
          setIdOfSelectedStage(response?.selectedStage?.design?._id);
          setVenueCity(response.city);
          setAllVenues([response?.venueId]);
          setVenue(response?.venueId?._id);
          setEventType(response?.eventType);
          setStagePrice(response.selectedStage?.design?.price || 0);
          setIdOfSelectedMenu(response?.selectedMenu?.menu?._id);
          setSelectedMenu(response?.selectedMenu?.modifiedMenu || null);
          let idsOfSelectedSubVenue = [];
          for (let index in response?.subVenues) {
            idsOfSelectedSubVenue.push(response.subVenues[index]._id);
          }
          setAllSubVenues(response.subVenues);
          setMenuPrice(response.selectedMenu?.price || 0);
          setIdOfSelectedSubVenue(idsOfSelectedSubVenue);
          setSubVenue(response.subVenues);
          setVisible(false);
          setRefresh(false);
        } else {
          console.log("error", res.data);
          // alert("Error");
        }
      });
    }
  };

  //calling useEffect for sub venue hall charges

  useEffect(() => {
    // if (!params.bookingId) {
    console.log("@@@sub venue hall charges", subVenue);
    console.log("@@@menupolicy", menuPolicy);

    let minCapacity =
      subVenue.reduce((a, b) => a + b.subVenueMinCapacity, 0) || 0;
    console.log("@@@minCapacity", minCapacity);

    let perHeadWithMenu =
      subVenue.reduce((a, b) => a + b.perHeadWithMenu, 0) || 0;
    let averagePerHeadWithMenu = perHeadWithMenu / subVenue.length || 0;
    console.log("@@@perHeadWithMenu", perHeadWithMenu);
    let perHeadWithoutMenu =
      subVenue.reduce((a, b) => a + b.perHeadWithoutMenu, 0) || 0;
    let averagePerHeadWithoutMenu = perHeadWithoutMenu / subVenue.length || 0;
    console.log("@@@perHeadWithoutMenu", perHeadWithoutMenu);

    if (menuPolicy) {
      console.log("@@@menuPolicy", menuPolicy);
      if (minCapacity > noOfGuests) {
        console.log("@@@menuPolicy2 if", menuPolicy);

        // idOfSelectedMenu === ""
        //   ?
        setChargesError(
          "Minimum Booking Charges Will Be Applied. Either Increase the number of guests to at least " +
            minCapacity +
            " or Extra charges will be applied of Rs. " +
            averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
        );
        // : setChargesError(
        //     "Minimum Booking Charges Will Be Applied. Either Increase the number of guests to at least " +
        //       minCapacity +
        //       " or Extra charges will be applied of Rs. " +
        //       averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
        //   );

        console.log(
          "@@@T-DEBUG",
          idOfSelectedMenu === "" || idOfSelectedMenu === undefined
        );
        console.log("@@@T-DEBUG", averagePerHeadWithoutMenu * minCapacity);
        console.log(
          "@@@T-DEBUG",
          averagePerHeadWithMenu * noOfGuests +
            averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
        );
        idOfSelectedMenu === "" || idOfSelectedMenu === undefined
          ? setHallCharges(averagePerHeadWithoutMenu * minCapacity)
          : setHallCharges(
              averagePerHeadWithMenu * noOfGuests +
                averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
            );
      } else {
        console.log("@@@menuPolicy3 else", menuPolicy);

        setChargesError("");
        idOfSelectedMenu === "" || idOfSelectedMenu === undefined
          ? setHallCharges(averagePerHeadWithoutMenu * noOfGuests)
          : setHallCharges(averagePerHeadWithMenu * noOfGuests);
      }
    } else {
      console.log("@@@menuPolicy4 false else", menuPolicy);

      console.log("menu policy false");
      if (minCapacity > noOfGuests) {
        console.log("@@@menuPolicy false else if5", menuPolicy);

        // idOfSelectedMenu === "" ||
        //   (idOfSelectedMenu === undefined &&
        setChargesError(
          "Minimum Booking Charges Will Be Applied. Either Increase the number of guests to at least " +
            minCapacity +
            " or Extra charges will be applied of Rs. " +
            averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
        );
        // : setChargesError(
        //     "Minimum Booking Charges Will Be Applied. Either Increase the number of guests to at least " +
        //       minCapacity +
        //       " or Extra charges will be applied of Rs. " +
        //       averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
        //   );
        idOfSelectedMenu === "" || idOfSelectedMenu === undefined
          ? setHallCharges(averagePerHeadWithoutMenu * minCapacity)
          : setHallCharges(
              averagePerHeadWithoutMenu * noOfGuests +
                averagePerHeadWithoutMenu * (minCapacity - noOfGuests)
            );
      } else {
        console.log("@@@menuPolicy6 else else esle", menuPolicy);

        setChargesError("");
        idOfSelectedMenu === "" || idOfSelectedMenu === undefined
          ? setHallCharges(averagePerHeadWithMenu * noOfGuests)
          : setHallCharges(averagePerHeadWithoutMenu * noOfGuests);
      }
      // }
    }
  }, [noOfGuests, idOfSelectedSubVenue, subVenue, idOfSelectedMenu]);

  return (
    <Paper
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
      p={0}
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
        zIndex={1000}
        size={600}
        transitionTimingFunction="ease"
        onClose={() => {
          setConfirmBooking(false);
          navigate("/dashboard/venueBookings");
        }}
      >
        <BookingResponse bookingResponse={bookingResponse} />

        <Group position="center">
          <Button
            component={Link}
            to="/"
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
      <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        title="Alter Service Price"
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={alterPrice}
        padding={50}
        size="lg"
        onClose={() => setAlterPrice(false)}
      >
        <form
          onSubmit={alterPriceForm.onSubmit((values) =>
            handleAlterPrice(values)
          )}
        >
          <Checkbox
            checked={freeService}
            label="Free Service"
            size="md"
            onChange={(event) => {
              setFreeService(event.currentTarget.checked);
              alterPriceForm.setFieldValue("newPrice", 0);
            }}
          />
          <NumberInput
            size="md"
            required
            // type="number"
            min={0}
            disabled={freeService}
            hideControls
            max={100000}
            label={`Enter New Price of ${serviceTitle}`}
            description={`Original Price: ${oldServicePrice}`}
            {...alterPriceForm.getInputProps("newPrice")}
          />
          <Center py="md">
            <Button type="submit">Change Price</Button>
          </Center>
        </form>
      </Modal>
      <Center>
        <Paper
          // py="xl"
          style={{
            width: "90%",
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
                  onClick={() => navigate("/dashboard/venueBookings")}
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
            // pt="xl"
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
                    hidden={params?.bookingId}
                    size="md"
                    disabled={venueCity === ""}
                    variant="filled"
                    color="red"
                    // disabled={loading}
                    // leftIcon={<IconX />}
                    onClick={() => {
                      setVenueCity("");
                      setVenue("");
                      setEventType(params?.eventType ? params?.eventType : "");
                      setTime("");
                      setNoOfGuests(0);
                      // form1.setFieldValue("noOfGuests", "");
                      setIdOfSelectedSubVenue([]);
                      setSelectedSubVenueServices([]);
                      setSelectedSubVenueServiceObject([]);
                      setIdOfSelectedMenu("");
                      setIdOfSelectedTheme("");
                      setTotalPrice(0);
                      setMenuPrice(0);
                      setChargesError("");
                      setHallCharges(0);
                      setHidden(true);
                      setChecked({});
                      setEventDate(new Date());
                      form1.reset();
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
                        required
                        size="md"
                        disabled={idOfSelectedSubVenue?.length !== 0}
                        label="Event Type"
                        placeholder="Event Type"
                        value={eventType}
                        onChange={(e) => {
                          setEventType(e);
                        }}
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
                        required
                        disabled={idOfSelectedSubVenue?.length !== 0}
                        minDate={dayjs(new Date())
                          .startOf("month")
                          .add(new Date().getDate(), "days")
                          .toDate()}
                        maxDate={dayjs(new Date()).add(365, "days").toDate()}
                        placeholder="Pick date"
                        label="Event Date"
                        icon={<IconCalendar size={16} />}
                        value={eventDate}
                        // onChange={onChange}
                        onInput={(e) => {
                          setEventDate(e);
                          setIdOfSelectedSubVenue([]);
                          setIdOfSelectedMenu("");
                          setTotalPrice(0);
                          setHidden(true);
                          setMenuPrice(0);
                        }}
                        {...form1.getInputProps("date")}
                      />
                    </Grid.Col>
                    <Grid.Col lg={6}>
                      <Select
                        required
                        size="md"
                        label="Event Time"
                        disabled={idOfSelectedSubVenue?.length !== 0}
                        placeholder="Time"
                        value={time}
                        onChange={(e) => {
                          setTime(e);
                          setIdOfSelectedSubVenue([]);
                          setIdOfSelectedMenu("");
                          setMenuPrice(0);
                          setChargesError("");
                          setHidden(true);
                          setTotalPrice(0);
                        }}
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
                        required
                        disabled={params?.bookingId}
                        value={noOfGuests}
                        label="Number of Guests"
                        placeholder="Enter Number of Guests"
                        onInput={(e) => {
                          setTotalAvailableCapacity(0);
                          setNoOfGuests(e.target.value);
                          setIdOfSelectedSubVenue([]);
                          setMenuPrice(0);
                          setChargesError("");
                          setHallCharges(0);
                          setIdOfSelectedMenu("");
                          setTotalPrice(0);
                        }}
                        onChange={(e) => {
                          setNoOfGuests(e.target.value);
                        }}
                        {...form1.getInputProps("noOfGuests")}
                      />
                    </Grid.Col>
                  </Grid>
                  <div hidden={params.bookingId}>
                    <Text align="center" color="dimmed" pt="md">
                      <b>Did You Know?</b>
                    </Text>
                    {/* <Center>
                      <Group noWrap align="center">
                        <Text color="dimmed">
                          Sub Venues That Can Accommodate Your Number Of Guests
                          Are
                        </Text>
                        <Text style={{ color: "#e60084" }}>Marked In Pink</Text>
                      </Group>
                    </Center> */}
                    <Text color="dimmed" align="center" pt="md">
                      You Can Also Book Multiple Venues If A Single SubVenue
                      Does Not Facilitate Your Number Of Guest.
                    </Text>
                  </div>
                  <Center hidden={params.bookingId}>
                    <Group py="md">
                      <Text
                        style={{
                          color: !checkForMultiBooking ? "purple" : "dimgray",
                          fontWeight: !checkForMultiBooking ? "bold" : "normal",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        Book Single SubVenue
                      </Text>
                      <Switch
                        // disabled={

                        // }
                        checked={checkForMultiBooking}
                        onChange={(event) => {
                          setIdOfSelectedSubVenue([]);
                          setIdOfSelectedMenu("");

                          setTotalAvailableCapacity(0);
                          setCheckForMultiBooking(event.currentTarget.checked);
                          setFulfillmentMessage("");
                          setChargesError("");
                        }}
                        color="grape"
                        size="md"
                        styles={{
                          track: {
                            backgroundColor: "#61467b",
                          },
                        }}
                      />
                      <Text
                        style={{
                          color: checkForMultiBooking ? "purple" : "dimgray",
                          fontWeight: checkForMultiBooking ? "bold" : "normal",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        Book Multiple SubVenues
                      </Text>
                    </Group>
                  </Center>
                  <Text
                    align="center"
                    color={messageColor}
                    weight={messageColor === "grey" ? "bolder" : "normal"}
                  >
                    {fulfillmentMessage}
                  </Text>

                  {allSubVenues.length > 0 && (
                    <SubVenuesForBooking
                      isUpdate={params.bookingId ? true : false}
                      setIdOfSelectedSubVenue={setIdOfSelectedSubVenue}
                      allSubVenues={allSubVenues}
                      setSubVenue={setSubVenue}
                      subVenue={subVenue}
                      idOfSelectedSubVenue={idOfSelectedSubVenue}
                      refreshStates={refreshStates}
                      bookedDateAndTime={bookedDateAndTime}
                      noOfGuests={noOfGuests}
                      venueCity={venueCity}
                      venue={params.venueId}
                      setHidden={setHidden}
                      error={error}
                      setError={setError}
                      setDisabled={setDisabled}
                      setChargesError={setChargesError}
                      hallCharges={hallCharges}
                      setHallCharges={setHallCharges}
                      setVenueCity={setVenueCity}
                      setVenue={setVenue}
                      setNoOfGuests={setNoOfGuests}
                      hideSelectButton={hideSelectButton}
                      time={time}
                      form1={form1}
                      fulfillmentMessage={fulfillmentMessage}
                      setFulfillmentMessage={setFulfillmentMessage}
                      allVenues={allVenues}
                      messageColor={messageColor}
                      setMessageColor={setMessageColor}
                      checkForMultiBooking={checkForMultiBooking}
                      setCheckForMultiBooking={setCheckForMultiBooking}
                      totalAvailableCapacity={totalAvailableCapacity}
                      setTotalAvailableCapacity={setTotalAvailableCapacity}
                      idOfSelectedMenu={idOfSelectedMenu}
                      setMenuPolicy={setMenuPolicy}
                      menuPolicy={menuPolicy}
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
                        disabled={
                          (disabled || totalAvailableCapacity < noOfGuests) &&
                          !params.bookingId
                        }
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
              label="Select Services"
              description="Select Venue Services"
              allowStepSelect={active > 1}
              disabled={stepperDisabled}
            >
              <ServiceSelection
                alterServiceSelection={alterServiceSelection}
                setAlterServiceSelection={setAlterServiceSelection}
                allSubVenues={allSubVenues}
                allVenues={allVenues}
                venue={venue}
                setVenue={setVenue}
                idOfSelectedSubVenue={idOfSelectedSubVenue}
                selectedSubVenueServices={selectedSubVenueServices}
                setSelectedSubVenueServices={setSelectedSubVenueServices}
                selectedSubVenueServiceObject={selectedSubVenueServiceObject}
                setSelectedSubVenueServiceObject={
                  setSelectedSubVenueServiceObject
                }
                selectedVenueServices={selectedVenueServices}
                setSelectedVenueServices={setSelectedVenueServices}
                selectedVenueServiceObject={selectedVenueServiceObject}
                setSelectedVenueServiceObject={setSelectedVenueServiceObject}
                subVenueWiseServicePrices={subVenueWiseServicePrices}
                setSubVenueWiseServicePrices={setSubVenueWiseServicePrices}
                venueWiseServicePrices={venueWiseServicePrices}
                setVenueWiseServicePrices={setVenueWiseServicePrices}
                hallCharges={hallCharges}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                noOfGuests={noOfGuests}
                menuPrice={menuPrice}
                checked={checked}
                setChecked={setChecked}
                checkedVenueServices={checkedVenueServices}
                setCheckedVenueServices={setCheckedVenueServices}
                setHidden={setHidden}
                setOldServicePrice={setOldServicePrice}
                setServiceTitle={setServiceTitle}
                setFreeService={setFreeService}
                matches1200={matches1200}
                setAlterPrice={setAlterPrice}
                setAlterPriceId={setAlterPriceId}
                stagePrice={stagePrice}
                prevStep={prevStep}
                nextStep={nextStep}
              />
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
                      Total without Tax and Discount :{" "}
                      <b>
                        Rs.{" "}
                        {hallCharges +
                          totalPrice +
                          stagePrice +
                          menuPrice * noOfGuests}
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
                      Total without Tax and Discount:{" "}
                      <b>
                        Rs.{" "}
                        {hallCharges +
                          totalPrice +
                          stagePrice +
                          menuPrice * noOfGuests}{" "}
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
            {venueDetails?.stages?.length !== 0 && (
              <Stepper.Step
                color={!stepperDisabled ? "grape" : "gray"}
                label="Stage Selection"
                description="Select A Stage"
                allowStepSelect={active > 2}
                disabled={stepperDisabled}
              >
                <Paper pb="xl">
                  <Group position="apart">
                    <Text weight="bold" size="xl" py="md">
                      Stage Selection
                    </Text>
                    <Text weight="bold" size="xl" py="md" color="red">
                      Total without Tax and Discount:{" "}
                      <b>
                        Rs.{" "}
                        {hallCharges +
                          totalPrice +
                          stagePrice +
                          menuPrice * noOfGuests}
                      </b>
                    </Text>
                  </Group>
                  {idOfSelectedTheme === "" && (
                    <Text size="xl" color="red" weight="bold">
                      Please Select A Stage{" "}
                    </Text>
                  )}
                </Paper>

                <StagesOfSpecificVenueForBooking
                  setStagePrice={setStagePrice}
                  stages={venueDetails?.stages}
                  setIdOfSelectedStage={setIdOfSelectedStage}
                  idOfSelectedStage={idOfSelectedStage}
                  setSelectedStage={setSelectedStage}
                  selectedStage={selectedStage}
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
                  Total without Tax and Discount :{" "}
                  <b>
                    Rs.{" "}
                    {hallCharges +
                      totalPrice +
                      stagePrice +
                      menuPrice * noOfGuests}
                  </b>
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
                        minRows={10}
                        maxLength={1000}
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
                        // disabled={disabled}
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
              label="Payment Details"
              description="Please proceed with the minimum"
              allowStepSelect={active > 4}
              disabled={stepperDisabled}
            >
              <Paper style={{ width: "100%" }} py="xl">
                <Group position="apart">
                  {!params.bookingId ? (
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
                  ) : (
                    <Text weight="bold" size="xl" py="md">
                      Review and Update
                    </Text>
                  )}

                  <Text weight="bold" size="xl" py="md" color="red">
                    Total without Tax and Discount :{" "}
                    <b>
                      Rs.{" "}
                      {hallCharges +
                        totalPrice +
                        stagePrice +
                        menuPrice * noOfGuests}
                    </b>
                  </Text>
                </Group>

                <BookingViewAllBookings singleInvoice={body} />

                {!params.bookingId ? (
                  <>
                    {" "}
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
                        {/* <Center> */}
                        <StripePromise
                          paidSuccessfully={paidSuccessfully}
                          setPaidSuccessfully={setPaidSuccessfully}
                          onClickBack={prevStep}
                          setConfirmBooking={setConfirmBooking}
                          // start={start}
                          amountPayable={
                            (hallCharges +
                              totalPrice +
                              stagePrice +
                              menuPrice * noOfGuests +
                              (hallCharges +
                                totalPrice +
                                stagePrice +
                                menuPrice * noOfGuests) *
                                taxPercentage -
                              (hallCharges +
                                totalPrice +
                                stagePrice +
                                menuPrice * noOfGuests) *
                                discountPercentage) *
                            bookingPercentage
                          }
                        />
                        {/* </Center> */}
                      </Grid.Col>
                    </Grid>
                  </>
                ) : (
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
                        // disabled={disabled}
                        // loading={loading}
                        rightIcon={<IconArrowRight />}
                        onClick={makeVenueBooking}
                      >
                        Update
                      </Button>
                    </Grid.Col>
                  </Grid>
                )}
              </Paper>
            </Stepper.Step>
          </Stepper>
        </Paper>
      </Center>
    </Paper>
  );
};

export default NewBookingFile;
