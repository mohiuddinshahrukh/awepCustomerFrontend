import {
  Button,
  createStyles,
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
// import InputMask from "react-input-mask";
import {
  IconCalendar,
  IconClock,
  IconMail,
  IconPhone,
  IconUsers,
} from "@tabler/icons";
import dayjs from "dayjs";
import { DatePicker } from "@mantine/dates";
const useStyles = createStyles(() => ({
  button: {
    backgroundColor: "#775A97",
    ":hover": {
      backgroundColor: "#56416D",
    },
  },
}));

const BookVenueSideColums = () => {
  const { classes } = useStyles();

  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState();
  const form = useForm({
    // validateInputOnChange: true,
    initialValues: {
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
    },

    validate: {
      email: (value) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.trim())
          ? // /^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(value.trim())
            null
          : "Check that the email is correct",

      phone: (value) =>
        /^(03)(\d{9})$/.test(value)
          ? null
          : "Please enter a valid phone number",
      guests: (value) =>
        value > 50 && value < 10000 ? null : "Estimated guest count",
      time: (value) => (value !== "" ? null : "Please select a time"),
      date: (value) => (value !== "" ? null : "Please select a date"),
    },
  });
  const handleSubmit = async (event) => {
    var { email, name, phone } = event;
    const body = {
      email,
      name,
      phone,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const response = await axios({
        method: "post",
        url: "https://a-wep.herokuapp.com/superAdmin/addUser",
        data: body,
        headers: headers,
      });
      console.log(response.data);

      if (response.data.status === "error") {
        showNotification({
          title: `ERROR`,
          color: "red",

          //   icon: <IconX size={18} />,
          message: `${response.data.error.message}`,
        });
      } else {
        showNotification({
          title: `SUCCESS`,
          color: "green",

          message: `SUCCESSFULLY NAVIGATED!!`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper withBorder radius="md" shadow="md" p="md">
      <Text align="center" weight="bold" size="xl">
        Booking
      </Text>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          type="email"
          label="Email"
          placeholder="Email"
          radius="md"
          pt="md"
          size="md"
          rightSection={<IconMail color="gray" size={20} stroke={1} />}
          value={contactEmail}
          onInput={(event) => setContactEmail(event.currentTarget.value)}
          {...form.getInputProps("email")}
        />
        <TextInput
          type="tel"
          label="Phone"
          placeholder="Phone"
          radius="md"
          mask="03999999999"
          pt="md"
          size="md"
          rightSection={<IconPhone color="gray" size={20} stroke={1} />}
          value={contactPhone}
          onInput={(event) => setContactPhone(event.currentTarget.value)}
          {...form.getInputProps("phone")}
        />
        <NumberInput
          label="Guests"
          placeholder="Guests"
          radius="md"
          pt="md"
          size="md"
          hideControls
          min={50}
          max={10000}
          rightSection={<IconUsers color="gray" size={20} stroke={1} />}
          value={guests}
          onInput={(event) => setGuests(event.currentTarget.value)}
          {...form.getInputProps("guests")}
        />
        <DatePicker
          inputFormat="YYYY-MM-DD"
          radius="md"
          pt="md"
          size="md"
          required
          minDate={dayjs(new Date())
            .startOf("month")
            .add(new Date().getDate(), "days")
            .toDate()}
          maxDate={dayjs(new Date()).add(365, "days").toDate()}
          placeholder="Pick date"
          label="Event Date"
          rightSection={<IconCalendar color="gray" size={20} stroke={1} />}
          value={date}
          // onChange={onChange}

          {...form.getInputProps("date")}
        />
        <Select
          label="Time"
          placeholder="Select time"
          radius="md"
          py="md"
          size="md"
          rightSection={<IconClock color="gray" size={20} stroke={1} />}
          value={time}
          onChange={setTime}
          data={[
            { label: "Lunch", value: "LUNCH" },
            { label: "Dinner", value: "DINNER" },
          ]}
          {...form.getInputProps("time")}
        />
        <Button
          className={classes.button}
          radius="md"
          type="submit"
          size="md"
          fullWidth
        >
          Book Now
        </Button>
      </form>
    </Paper>
  );
};

export default BookVenueSideColums;
