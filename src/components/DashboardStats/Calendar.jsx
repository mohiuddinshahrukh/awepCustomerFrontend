import React, { useEffect, useState } from "react";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import {
  Container,
  Group,
  NativeSelect,
  Paper,
  Select,
  Text,
} from "@mantine/core";
import axios from "axios";

const BookingCalendar = ({ size, initialMonth }) => {
  const [refresh, setRefresh] = useState(true);
  const [stats, setStats] = useState([]);
  const [value, setValue] = useState(initialMonth);
  console.log("@@@@@", stats.AllUsersWeeklyRegistered);
  const [allSubVenues, setAllSubVenues] = useState([]);
  console.log("allSubVenues", allSubVenues);
  const [selectedSubVenues, setSelectedSubVenues] = useState("");
  console.log("selectedSubVenues", selectedSubVenues);

  // const url3 = "getMySubVenues";
  // useEffect(() => {
  //   if (refresh) {
  //     axios.get(url3).then((res) => {
  //       console.log(res.data);
  //       // customer = (id, img, name, date, email, contact, status)
  //       if (res.data.status === "success") {
  //         setAllSubVenues(res.data.data);
  //         setSelectedSubVenues(res.data.data[0]._id);
  //         setRefresh(false);
  //         // setVisible(false);
  //       } else {
  //         alert("Error");
  //       }
  //     });
  //   }
  // }, [refresh]);

  // const data = allSubVenues.map((item) => ({
  //   value: item._id,
  //   label: item.subVenueName,
  // }));

  // const dataWeHave = allSubVenues
  //   .filter((e) => e._id === selectedSubVenues)
  //   .map((e) => e.bookedOn)[0];

  // console.log("dataWeHave", dataWeHave);

  const dataWeHave = {
    "2022-10-14LUNCH": "2022-10-14LUNCH",
    "2022-10-14DINNER": "2022-10-14DINNER",
    // "2022-10-15LUNCH": "2022-10-15LUNCH",
    "2022-10-15DINNER": "2022-10-15DINNER",
    "2022-10-16LUNCH": "2022-10-16LUNCH",
    "2022-10-17DINNER": "2022-10-17DINNER",
    "2022-11-17DINNER": "2022-11-17DINNER",
    "2022-10-17LUNCH": "2022-10-17LUNCH",
    "2022-11-17LUNCH": "2022-11-17LUNCH",
    "2022-11-17DINNER": "2022-11-17DINNER",
    "2022-11-18LUNCH": "2022-11-18LUNCH",
    "2022-12-17DINNER": "2022-12-17DINNER",
    "2022-12-01LUNCH": "2022-12-01LUNCH",
    "2022-12-05LUNCH": "2022-12-05LUNCH",
    "2022-12-17DINNER": "2022-12-17DINNER",
  };
  return (
    <div>
      <Paper radius="lg">
        {/* {stats && (
          <Calendar
            size={size}
            initialMonth={initialMonth}
            dayStyle={(date) => {
              let formatedDate = dayjs(date)?.format("YYYY-MM-DD");
              if (dataWeHave) {
                if (
                  dataWeHave[`${formatedDate}LUNCH`] &&
                  !dataWeHave[`${formatedDate}DINNER`]
                ) {
                  return {
                    backgroundColor: "red",
                    color: "#fff",
                    margin: "1px",
                    borderRadius: "50%",
                  };
                } else if (
                  dataWeHave[`${formatedDate}DINNER`] &&
                  !dataWeHave[`${formatedDate}LUNCH`]
                ) {
                  return {
                    backgroundColor: "blue",
                    color: "#fff",
                    margin: "1px",
                    borderRadius: "50%",
                  };
                } else if (
                  dataWeHave[`${formatedDate}LUNCH`] &&
                  dataWeHave[`${formatedDate}DINNER`]
                ) {
                  return {
                    backgroundColor: "green",
                    color: "#fff",
                    margin: "1px",
                    borderRadius: "50%",
                  };
                }
              }
            }}
          />
        )} */}
        <Calendar
          value={value}
          onChange={setValue}
          fullWidth
          size="md"
          styles={(theme) => ({
            cell: {
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`,
            },
            day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
            weekday: { fontSize: theme.fontSizes.lg },
            weekdayCell: {
              fontSize: theme.fontSizes.xl,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[0],
              border: `1px solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[4]
                  : theme.colors.gray[2]
              }`,
              height: 70,
            },
          })}
        />
      </Paper>
    </div>
  );
};

export default BookingCalendar;
