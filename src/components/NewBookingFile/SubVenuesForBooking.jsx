import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Avatar,
  ActionIcon,
  Modal,
  Button,
  Title,
  Paper,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconEye,
} from "@tabler/icons";
import SpecificSubVenueDetails from "../SubVenuesOfSpecifcVenue/SpecificSubVenueDetails";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",

    "&:first-child": {
      width: "100px",
    },
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data, search) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(data, payload) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}
// DATA

const SubVenuesForBooking = ({
  isUpdate,
  subvenueDetails,
  bookingDateAndTime,
  setIdOfSelectedSubVenue,
  idOfSelectedSubVenue,
  bookedDateAndTime,
  noOfGuests,
  setHidden,
  error,
  setError,
  setDisabled,
  setChargesError,
  hallCharges,
  setHallCharges,
  setNoOfGuests,
  hideSelectButton,
  time,
  form1,
}) => {
  console.log("number of guests", noOfGuests);
  const [viewModal, setViewModal] = useState(false);
  const [index, setIndex] = useState(0);

  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(subvenueDetails);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(subvenueDetails, { sortBy: field, reversed, search })
    );
  };

  useEffect(() => {
    console.log("@TESTING subvenue details", subvenueDetails, isUpdate);
    if (isUpdate) {
      let subVenue = subvenueDetails.filter(
        (subVenue) => subVenue._id === idOfSelectedSubVenue
      );
      console.log(
        "@TESTING subvenue details in isUpdate",
        idOfSelectedSubVenue,
        subVenue
      );
      setSortedData(subVenue);
      available(subVenue[0]);
    } else {
      filtering();
    }
  }, [noOfGuests, bookedDateAndTime, time]);

  const filtering = () => {
    if (idOfSelectedSubVenue === "") {
      const filteredSubVenues = subvenueDetails.filter((subVenue) => {
        if (subVenue.bookedOn) {
          if (subVenue.bookedOn[bookedDateAndTime]) {
            return false;
          }
        }
        if (noOfGuests) {
          return subVenue.subVenueCapacity >= noOfGuests;
        }
        return true;
      });

      return setSortedData(filteredSubVenues);
    } else if (idOfSelectedSubVenue !== "") {
      return setSortedData(
        subvenueDetails.filter(
          (subVenue) => subVenue._id === idOfSelectedSubVenue
        )
      );
    }
  };
  const available = (subVenue) => {
    console.log("@TESTING aVaileble called");
    let error = "";
    if (subVenue.bookedOn) {
      console.log("@TESTING BOOKED ON", subVenue.bookedOn);
      console.log("@TESTING BOOKED ON", bookedDateAndTime, bookingDateAndTime);
      if (
        bookingDateAndTime &&
        bookedDateAndTime != bookingDateAndTime &&
        subVenue.bookedOn[bookedDateAndTime]
      ) {
        console.log("@TESTING BOOKED ON", subVenue.bookedOn[bookedDateAndTime]);

        error += "SubVenue is not available on this date and time \n";
      }
    }
    if (noOfGuests) {
      console.log(
        "@TESTING no of guests",
        noOfGuests,
        subVenue.subVenueCapacity
      );
      if (subVenue.subVenueCapacity < noOfGuests) {
        console.log("@TESTING no of guests", subVenue.subVenueCapacity);
        error += "Number of guests exceeds the capacity of the subvenue ";
      }
      checkForCharges(
        subVenue.subVenueMinCapacity,
        subVenue.subVenueBookingCharges
      );
    }
    console.log("@TESTING ERROR", error);
    setError(error);
    error ? setDisabled(true) : setDisabled(false);
  };

  const filteringAfterSelection = (id) => {
    let filteredSubVenues = subvenueDetails.filter(
      (subVenue) => subVenue._id === id
    );
    setSortedData(filteredSubVenues);
  };

  const checkForCharges = (minCapacity, charges) => {
    if (minCapacity > noOfGuests) {
      setChargesError(
        "Minimum Booking Charges Will Be Applied. Either Increase the number of guests to at least " +
          minCapacity +
          " or Minimum booking charges will be applied of Rs. " +
          charges
      );
      console.log("Minimum Booking Charges Will Be Applied", charges);
      setHallCharges(charges);
    } else {
      setChargesError("");
      setHallCharges(0);
    }
  };

  const rows = sortedData?.map((row, index) => (
    <tr
      key={index}
      style={{
        backgroundColor: idOfSelectedSubVenue === row._id ? "#e6e6e6" : "white",
      }}
    >
      {console.log("ROW", row)}
      <td>{index + 1}</td>
      <td>
        <Avatar size={"lg"} radius="xl" src={row.coverImage}></Avatar>
      </td>
      <td>{row.subVenueName}</td>
      <td>{row.subVenueMinCapacity}</td>
      <td>{row.subVenueCapacity}</td>
      <td>{row.subVenueType}</td>
      <td>
        <Group>
          <ActionIcon
            onClick={() => {
              console.log("open");
              setViewModal(true);
              setIndex(index);
            }}
          >
            <IconEye />
          </ActionIcon>
          <Button
            size="xs"
            hidden={hideSelectButton || isUpdate}
            style={{
              backgroundColor:
                row._id === idOfSelectedSubVenue ? "#E60084" : "white",
              color: row._id === idOfSelectedSubVenue ? "white" : "#B8258B",
              border: "1px solid #B8258B",
            }}
            // hidden={hideSelectButton}
            disabled={row._id === idOfSelectedSubVenue}
            onClick={() => {
              // refreshStates();

              setIdOfSelectedSubVenue(row._id);
              setHidden(true);
              setError("");
              setDisabled(false);
              filteringAfterSelection(row._id);

              checkForCharges(
                row.subVenueMinCapacity,
                row.subVenueBookingCharges
              );
              // }
            }}
          >
            {row._id !== idOfSelectedSubVenue ? "Select" : "Selected"}
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      {rows.length > 0 ? (
        <>
          {" "}
          {console.log("TESTING ERROR, ", error)}
          {error === ""
            ? !isUpdate && (
                <Title py="xl" order={3} align="center">
                  Available Sub Venues
                </Title>
              )
            : !isUpdate && (
                <Text
                  py="xl"
                  size="xl"
                  align="center"
                  color="red"
                  weight="bold"
                >
                  Please Select A Venue To Proceed
                </Text>
              )}
          <Paper withBorder shadow="xl" radius="md">
            <Modal
              opened={viewModal}
              size="50%"
              onClose={() => setViewModal(false)}
            >
              <SpecificSubVenueDetails subVenue={subvenueDetails[index]} />
            </Modal>

            <Table
              horizontalSpacing="md"
              verticalSpacing="xs"
              sx={{ tableLayout: "fixed", minWidth: 700 }}
            >
              <thead>
                <tr>
                  <Th
                    sorted={sortBy === "ID"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("ID")}
                  >
                    ID
                  </Th>
                  <th style={{ width: "10%" }}>Image</th>
                  <Th
                    sorted={sortBy === "subVenueName"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("subVenueName")}
                  >
                    Name
                  </Th>
                  <Th
                    sorted={sortBy === "subVenueMinCapacity"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("subVenueMinCapacity")}
                  >
                    Min Capacity
                  </Th>
                  <Th
                    sorted={sortBy === "company"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("company")}
                  >
                    Max Capacity
                  </Th>
                  <Th
                    sorted={sortBy === "company"}
                    reversed={reverseSortDirection}
                    onSort={() => setSorting("company")}
                  >
                    Type
                  </Th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{rows?.length > 0 ? rows : null}</tbody>
            </Table>
            <Text color="red" align="center" hidden={!error}>
              {error}
            </Text>
          </Paper>
        </>
      ) : (
        <>
          <Text pt="xl" size="xl" align="center" color="red" weight="bold">
            No Sub Venues Available
          </Text>
          <Text size="lg" align="center" color="red">
            No Sub Venues Available For Your Selection. Please Select Another
            Date Or Time To Proceed Or Contact The Vendor For More Details On
            Availability On The Selected Date And Time . Thank You !
          </Text>
        </>
      )}
    </ScrollArea>
  );
};

export default SubVenuesForBooking;
