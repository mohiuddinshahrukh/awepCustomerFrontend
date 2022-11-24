import {
  Button,
  createStyles,
  NativeSelect,
  NumberInput,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import InputMask from "react-input-mask";
import {
  IconCalendar,
  IconClock,
  IconConfetti,
  IconMail,
  IconPhone,
  IconUsers,
} from "@tabler/icons";
import dayjs from "dayjs";
import { DatePicker } from "@mantine/dates";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles(() => ({
  button: {
    backgroundColor: "#775A97",
    ":hover": {
      backgroundColor: "#56416D",
    },
  },
  stickySThings: {
    position: "-webkit-sticky",
    position: "sticky",
    top: 20,
  },
}));

const BookVenueSideColums = ({
  subVenue,
  onClickFunction,
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  eventType,
  setEventType,
  date,
  setDate,
  time,
  setTime,
  guests,
  setGuests,
  venueId,
  isSignIn,
  setIsSignIn,
}) => {
  const navigate = useNavigate();
  console.log("AAAA", setIsSignIn);
  // const signIn = setIsSignIn;
  const { classes } = useStyles();
  // console.log(signIn);
  // const form = useForm({
  //   // validateInputOnChange: true,
  //   initialValues: {
  //     // email: contactEmail,
  //     // phone: contactPhone,
  //     date: date,
  //     time: time,
  //     guests: guests,
  //   },
  //   validate: {
  //     guests: (value) =>
  //       value > 50 && value <= 10000 ? null : "Estimated guest count",
  //     time: (value) => (value !== "" ? null : "Please select a time"),
  //     date: (value) => (value !== "" ? null : "Please select a date"),
  //   },
  // });
  const [error, setError] = useState({});
  const handleSubmit = async (event) => {
    var { eventType, date, time, guests } = event;
    console.log("onClickFunction 11");
    //validation comes here
    const errorValues = {};
    if (date === "") {
      errorValues.date = "Please select a date";
    }
    if (time === "") {
      errorValues.time = "Please select a time";
    }
    if (eventType === "") {
      errorValues.eventType = "Please select a event type";
    }

    console.log("guests1", guests);
    if (!(guests >= 50 && guests <= 10000) || guests == "") {
      console.log("guests2", guests);
      errorValues.guests = "Should Be 50-10000";
    }
    if (Object.keys(errorValues).length > 0) {
      setError(errorValues);
    } else {
      if (localStorage.getItem("userToken") !== null) {
        console.log("onClickFunction SUBVENUE");

        navigate(
          `/venueBooking/${eventType}/${date}/${time}/${guests}/${venueId}`
        );
      } else {
        console.log("onClickFunction if not signed in");

        setIsSignIn(true);

        showNotification({
          title: "Please Login First",
          message: "You need to login first to book a venue",
          color: "red",
          icon: <IconMail />,
        });
      }
    }
  };

  return (
    <Paper
      withBorder
      radius="md"
      shadow="md"
      p="md"
      className={classes.stickySThings}
    >
      <Text align="center" weight="bold" size="xl">
        Booking
      </Text>

      <Select
        label="Event Type"
        placeholder="Event Type"
        radius="md"
        size="md"
        error={error?.eventType}
        rightSection={<IconConfetti color="gray" size={20} stroke={1} />}
        value={eventType}
        defaultValue={undefined}
        // onChange={setTime}
        onChange={(event) => {
          setError(() => {
            return { ...error, eventType: "" };
          });
          setEventType(event);
        }}
        data={[
          { label: "Mehendi", value: "MEHNDI" },
          { label: "Walima", value: "WALIMA" },
          { label: "Barat", value: "BARAT" },
          { label: "Seminar", value: "SEMINAR" },
          { label: "Other", value: "OTHER" },
        ]}
        // {...form.getInputProps("eventType")}
      />
      <NumberInput
        label="Guests"
        placeholder="Guests"
        radius="md"
        error={error?.guests}
        pt="md"
        size="md"
        hideControls
        min={50}
        max={10000}
        rightSection={<IconUsers color="gray" size={20} stroke={1} />}
        value={guests}
        onChange={(event) => setGuests(event)}
        onInput={() => {
          setError(() => {
            return { ...error, guests: "" };
          });
        }}
        // {...form.getInputProps("guests")}
      />
      <DatePicker
        inputFormat="YYYY-MM-DD"
        radius="md"
        pt="md"
        error={error?.date}
        size="md"
        required
        minDate={dayjs(new Date())
          .startOf("month")
          .add(new Date().getDate(), "days")
          .toDate()}
        maxDate={dayjs(new Date()).add(365, "days").toDate()}
        placeholder="Pick date"
        label="Event Date"
        onChange={(event) => {
          setError(() => {
            return { ...error, date: "" };
          });
          setDate(event);
        }}
        // onInput={setDate}
        rightSection={<IconCalendar color="gray" size={20} stroke={1} />}
        value={date}

        // onChange={onChange}

        // {...form.getInputProps("date")}
      />
      <Select
        label="Time"
        placeholder="Select time"
        radius="md"
        py="md"
        size="md"
        error={error?.time}
        rightSection={<IconClock color="gray" size={20} stroke={1} />}
        value={time}
        defaultValue={undefined}
        // onChange={setTime}
        onChange={(event) => {
          setError(() => {
            return { ...error, time: "" };
          });
          setTime(event);
        }}
        data={[
          { label: "Lunch", value: "LUNCH" },
          { label: "Dinner", value: "DINNER" },
        ]}
        // {...form.getInputProps("time")}
      />
      <Button
        className={classes.button}
        radius="md"
        // type="submit"
        onClick={() => handleSubmit({ eventType, date, time, guests })}
        size="md"
        fullWidth
      >
        Book Now
      </Button>
      {/* </form> */}
    </Paper>
  );
};

export default BookVenueSideColums;
