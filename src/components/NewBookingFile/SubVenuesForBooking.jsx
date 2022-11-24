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

const venueDetails = [
  {
    name: "Athena Weissnat",
    company: "Little - Rippin",
    email: "Elouise.Prohaska@yahoo.com",
  },
  {
    name: "Deangelo Runolfsson",
    company: "Greenfelder - Krajcik",
    email: "Kadin_Trantow87@yahoo.com",
  },
  {
    name: "Danny Carter",
    company: "Kohler and Sons",
    email: "Marina3@hotmail.com",
  },
  {
    name: "Trace Tremblay PhD",
    company: "Crona, Aufderhar and Senger",
    email: "Antonina.Pouros@yahoo.com",
  },
  {
    name: "Derek Dibbert",
    company: "Gottlieb LLC",
    email: "Abagail29@hotmail.com",
  },
  {
    name: "Viola Bernhard",
    company: "Funk, Rohan and Kreiger",
    email: "Jamie23@hotmail.com",
  },
  {
    name: "Austin Jacobi",
    company: "Botsford - Corwin",
    email: "Genesis42@yahoo.com",
  },
  {
    name: "Hershel Mosciski",
    company: "Okuneva, Farrell and Kilback",
    email: "Idella.Stehr28@yahoo.com",
  },
  {
    name: "Mylene Ebert",
    company: "Kirlin and Sons",
    email: "Hildegard17@hotmail.com",
  },
  {
    name: "Lou Trantow",
    company: "Parisian - Lemke",
    email: "Hillard.Barrows1@hotmail.com",
  },
  {
    name: "Dariana Weimann",
    company: "Schowalter - Donnelly",
    email: "Colleen80@gmail.com",
  },
  {
    name: "Dr. Christy Herman",
    company: "VonRueden - Labadie",
    email: "Lilyan98@gmail.com",
  },
  {
    name: "Katelin Schuster",
    company: "Jacobson - Smitham",
    email: "Erich_Brekke76@gmail.com",
  },
  {
    name: "Melyna Macejkovic",
    company: "Schuster LLC",
    email: "Kylee4@yahoo.com",
  },
  {
    name: "Pinkie Rice",
    company: "Wolf, Trantow and Zulauf",
    email: "Fiona.Kutch@hotmail.com",
  },
  {
    name: "Brain Kreiger",
    company: "Lueilwitz Group",
    email: "Rico98@hotmail.com",
  },
];

//
const SubVenuesForBooking = ({ subvenueDetails }) => {
  const [viewModal, setViewModal] = useState(false);
  const [index, setIndex] = useState(0);
  const data = subvenueDetails.map((subVenue) => ({
    subVenueName: subVenue.subVenueName,
    company: "Little - Rippin",
    email: "",
  }));
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
          <ActionIcon pl="md"></ActionIcon>
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
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
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
