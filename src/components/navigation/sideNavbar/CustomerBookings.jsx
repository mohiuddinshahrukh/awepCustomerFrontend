import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconEdit,
} from "@tabler/icons";
import axios from "axios";
// const venueBookings = [
//   {
//     name: "Athena Weissnat",
//     company: "Little - Rippin",
//     email: "Elouise.Prohaska@yahoo.com",
//   },
//   {
//     name: "Deangelo Runolfsson",
//     company: "Greenfelder - Krajcik",
//     email: "Kadin_Trantow87@yahoo.com",
//   },
//   {
//     name: "Danny Carter",
//     company: "Kohler and Sons",
//     email: "Marina3@hotmail.com",
//   },
//   {
//     name: "Trace Tremblay PhD",
//     company: "Crona, Aufderhar and Senger",
//     email: "Antonina.Pouros@yahoo.com",
//   },
//   {
//     name: "Derek Dibbert",
//     company: "Gottlieb LLC",
//     email: "Abagail29@hotmail.com",
//   },
//   {
//     name: "Viola Bernhard",
//     company: "Funk, Rohan and Kreiger",
//     email: "Jamie23@hotmail.com",
//   },
//   {
//     name: "Austin Jacobi",
//     company: "Botsford - Corwin",
//     email: "Genesis42@yahoo.com",
//   },
//   {
//     name: "Hershel Mosciski",
//     company: "Okuneva, Farrell and Kilback",
//     email: "Idella.Stehr28@yahoo.com",
//   },
//   {
//     name: "Mylene Ebert",
//     company: "Kirlin and Sons",
//     email: "Hildegard17@hotmail.com",
//   },
//   {
//     name: "Lou Trantow",
//     company: "Parisian - Lemke",
//     email: "Hillard.Barrows1@hotmail.com",
//   },
//   {
//     name: "Dariana Weimann",
//     company: "Schowalter - Donnelly",
//     email: "Colleen80@gmail.com",
//   },
//   {
//     name: "Dr. Christy Herman",
//     company: "VonRueden - Labadie",
//     email: "Lilyan98@gmail.com",
//   },
//   {
//     name: "Katelin Schuster",
//     company: "Jacobson - Smitham",
//     email: "Erich_Brekke76@gmail.com",
//   },
//   {
//     name: "Melyna Macejkovic",
//     company: "Schuster LLC",
//     email: "Kylee4@yahoo.com",
//   },
//   {
//     name: "Pinkie Rice",
//     company: "Wolf, Trantow and Zulauf",
//     email: "Fiona.Kutch@hotmail.com",
//   },
//   {
//     name: "Brain Kreiger",
//     company: "Lueilwitz Group",
//     email: "Rico98@hotmail.com",
//   },
// ];

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

const fetchAllVenues = async () => {
  try {
    const apiResponse = await axios({
      method: "get",
      url: "https://a-wep.herokuapp.com/customer/getSubVenueBookings",
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
    console.log("API RESPONSE: ", apiResponse.data);

    if (apiResponse.data.status === "success") {
      console.log("Successfully fetched all venues:", apiResponse.data.data);
      return apiResponse.data.data;
    } else if (apiResponse.data.status === "error") {
      console.log("Error while fetching all venues");
    } else {
      console.log("Failed to fetch all venues, dont know this error");
    }
  } catch (e) {
    console.log("ERROR in fetching all venues:", e);
  }
};

const CustomerBookings = () => {
  const [venueBookings, setVenueBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(venueBookings);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // FETCH ALL VENUES
  useEffect(() => {
    fetchAllVenues().then(setVenueBookings);
  }, []);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(venueBookings, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(venueBookings, {
        sortBy,
        reversed: reverseSortDirection,
        search: value,
      })
    );
  };

  const rows = venueBookings?.map((row, index) => (
    <tr key={index}>
      <td align="center">{index + 1}</td>
      <td>{row.subVenueName}</td>
      <td>{row.eventType}</td>
      <td>
        {row.createdAt.split("T")[0] +
          " " +
          row.createdAt.split("T")[1].split(".")[0]}
      </td>
      <td>
        {row.bookingDate.split("T")[0] +
          " " +
          row.bookingDate.split("T")[1].split(".")[0]}
      </td>
      <td>
        <Badge color={row.bookingStatus === "IN PROGRESS" ? "blue" : "red"}>
          {row.bookingStatus}
        </Badge>
      </td>
      <td>
        <Badge color={row.paymentStatus === "ADVANCE PAID" ? "yellow" : "blue"}>
          {row.paymentStatus}
        </Badge>
      </td>
      <td align="right">{row.numberOfGuests}</td>
      <td align="center">
        <Group spacing={0} noWrap align={"center"} position="center">
          <ActionIcon
            onClick={() => {
              console.log("Clicked on view button");
            }}
          >
            <IconEye />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              console.log("Clicked on edit button");
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  const headerData = [
    "ID",
    "Sub Venue Name",
    "Event Type",
    "Booking Lodged At",
    "Event Date & Time",
    "Booking Status",
    "Payment Status",
    "Guests",
    "Action",
  ];
  const headers = (
    <tr>
      {headerData.map((header) => {
        return <th>{header}</th>;
      })}
    </tr>
  );
  return (
    <Table striped withBorder withColumnBorders>
      <thead>{headers}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default CustomerBookings;
