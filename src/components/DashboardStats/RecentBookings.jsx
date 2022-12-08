import React from "react";
import {
  createStyles,
  Avatar,
  Text,
  Group,
  Paper,
  ScrollArea,
} from "@mantine/core";
import {
  IconPhoneCall,
  IconAt,
  IconFriends,
  IconToolsKitchen2,
} from "@tabler/icons";

import { useState } from "react";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const RecentBookings = ({ processedBookings }) => {
  const [guests, setGuests] = useState("200");
  const [menu, setMenu] = useState("Menu-1");
  const [phone, setPhone] = useState("1234567890");
  const [subVenue, setSubVenue] = useState("Sub Venue");
  const [date, setDate] = useState("12/12/2021");
  const [time, setTime] = useState("Lunch");
  const [day, setDay] = useState("Monday");
  const [venue, setVenue] = useState("Venue");

  const { classes } = useStyles();
  return (
    <div>
      <ScrollArea style={{ height: 500 }} py="sm"  pr="lg" scrollHideDelay={0}>
        {processedBookings.slice(0, 5).map((booking, index) => (
          <Paper withBorder radius="lg" p="md" my="md" >
            {console.log("BOOKING ", index, booking)}
            <Group position="apart">
              <Text size="lg" weight={500} className={classes.name}>
                {booking.date?.split("T")[0]
                  ? booking.date?.split("T")[0]
                  : "N/A"}
              </Text>
              <Text size="lg" weight={500} className={classes.name}>
                {booking.time ? booking.time : "N/A"}
              </Text>
            </Group>

            <Group position="apart">
              <Text
                size="xs"
                sx={{ textTransform: "uppercase" }}
                weight={700}
                color="dimmed"
              >
                {booking.venue ? booking.venue : "N/A"}
                {/* {booking.subVenue ? booking.subVenue : "N/A"} */}
              </Text>
              <Text
                size="xs"
                sx={{ textTransform: "uppercase" }}
                weight={700}
                color="dimmed"
              >
                {day}
              </Text>
            </Group>
            <Text
              size="xs"
              sx={{ textTransform: "uppercase" }}
              weight={500}
              color="dimmed"
              p={0}
            >
              {booking.subVenue ? booking.subVenue : "N/A"}
            </Text>

            <Group position="apart">
              <Group noWrap spacing={10} mt={3}>
                <IconToolsKitchen2 size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {booking.menu ? booking.menu : "N/A"}
                </Text>
              </Group>
              <Group noWrap spacing={10} mt={5}>
                <IconFriends size={16} className={classes.icon} />
                <Text size="xs" color="dimmed">
                  {booking.guests ? booking.guests : "N/A"}
                </Text>
              </Group>
            </Group>
          </Paper>
        ))}
        <Text
          pr={16}
          align="right"
          size="lg"
          weight="bold"
          color={"red"}
          // onClick={() => navigate("/viewbookings")}
          style={{ cursor: "pointer" }}
        >
          + View All
        </Text>
      </ScrollArea>
    </div>
  );
};

export default RecentBookings;
