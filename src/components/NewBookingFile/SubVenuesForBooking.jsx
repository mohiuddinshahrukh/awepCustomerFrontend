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
  subvenueDetails,

  setIdOfSelectedSubVenue,
  idOfSelectedSubVenue,
  refreshStates,
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
  const [viewModal, setViewModal] = useState(false);
  const [index, setIndex] = useState(0);

  console.log("SUBVENUE DETAILS", subvenueDetails);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(subvenueDetails);
  console.log("@SORTED DATA: ", sortData);
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

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(subvenueDetails, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };
  useEffect(() => {
    filtering();
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
    <tr key={index}>
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
            color="dark"
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
      <Modal
        opened={viewModal}
        onClose={() => setViewModal(false)}
        title="Introduce yourself!"
      >
        <SpecificSubVenueDetails subVenue={subvenueDetails[index]} />
      </Modal>
      {/* <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      /> */}
      {error === "" ? (
        <Title py="xl" order={3} align="center">
          Available Sub Venues
        </Title>
      ) : (
        <Text py="xl" size="xl" align="center" color="red" weight="bold">
          Please Select A Venue To Proceed
        </Text>
      )}
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
            <th

            //   sorted={sortBy === "email"}
            //   reversed={reverseSortDirection}
            //   onSort={() => setSorting("email")}
            >
              Image
            </th>
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
            <Th
              sorted={sortBy === "subVenueType"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("subVenueType")}
            >
              Actions
            </Th>
          </tr>
        </thead>
        <tbody>{rows?.length > 0 ? rows : null}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default SubVenuesForBooking;
// <tr>
//               <td colSpan={Object.keys(subvenueDetails[0]).length}>
//                 <Text weight={500} align="center">
//                   Nothing found
//                 </Text>
//               </td>
//             </tr>
