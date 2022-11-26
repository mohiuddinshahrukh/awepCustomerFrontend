import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  Avatar,
  ActionIcon,
  Button,
  Title,
  Paper,
  Modal,
  Rating,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconEye,
} from "@tabler/icons";
import SpecificPackageDetails from "../SpecificVendorPackages/SpecificPackageDetails";

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

const VendorPackagesForBooking = ({
  isUpdate,
  bookingDateAndTime,
  vendorPackageDetails,
  setIdOfSelectedPackage,
  idOfSelectedPackage,
  setTotalPrice,
  bookedDateAndTime,
  vendorCategory,
  setHidden,
  error,
  setError,
  setDisabled,
  hideSelectButton,
  time,
  setSelectedVendorPackage,
  form1,
}) => {
  const [viewModal, setViewModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [sortedData, setSortedData] = useState(vendorPackageDetails);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(vendorPackageDetails, { sortBy: field, reversed }));
  };

  useEffect(() => {
    if (isUpdate) {
      let vendorPackage = vendorPackageDetails.filter(
        (e) => e._id === idOfSelectedPackage
      );

      setSortedData(vendorPackage);
      available(vendorPackage[0]);
    } else {
      filtering();
    }
  }, [vendorCategory, bookedDateAndTime, time]);
  const available = (vendorPackage) => {
    console.log("@TESTING aVaileble called");
    let error = "";

    if (vendorPackage.bookedOn) {
      const bookingsOnDate =
        (bookingDateAndTime &&
          bookedDateAndTime != bookingDateAndTime &&
          vendorPackage.bookedOn[bookedDateAndTime]) ||
        0;
      if (bookingsOnDate >= vendorPackage.noOfBookingsPerDay) {
        error += "SubVenue is not available on this date and time \n";
      }
    }

    console.log("@TESTING ERROR", error);
    setError(error);
    error ? setDisabled(true) : setDisabled(false);
  };
  const filtering = () => {
    if (idOfSelectedPackage === "") {
      const filteredPackages = vendorPackageDetails.filter(
        (vendorServicePackage) => {
          if (vendorServicePackage.bookedOn) {
            const bookingsOnDate =
              vendorServicePackage.bookedOn[bookedDateAndTime] || 0;
            if (bookingsOnDate >= vendorServicePackage.noOfBookingsPerDay) {
              return false;
            }
          }
          // if (vendorCategory) {
          //   console.log("@AFTER@filterObjects CATEGORY FILTER");
          //   return vendorServicePackage.serviceCategories?.includes(
          //     vendorCategory
          //   );
          // }
          return true;
        }
      );
      return setSortedData(filteredPackages);
    } else if (idOfSelectedPackage !== "") {
      return setSortedData(
        vendorPackageDetails.filter((e) => e._id === idOfSelectedPackage)
      );
    }
  };
  const filteringAfterSelection = (id) => {
    let filteredSubVenues = vendorPackageDetails.filter(
      (vendorPackage) => vendorPackage._id === id
    );
    setSortedData(filteredSubVenues);
  };

  const rows = sortedData?.map((row, index) => (
    <tr key={index}>
      {console.log("ROW", row)}
      <td>{index + 1}</td>
      <td>
        <Avatar size={"lg"} radius="xl" src={row.coverImage}></Avatar>
      </td>
      <td>{row.vendorPackageTitle}</td>
      <td>{row.price}</td>
      <td>{row.packageDuration}</td>
      <td>
        <Rating fractions={2} readOnly value={row.rating} />
      </td>
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
                row._id === idOfSelectedPackage ? "#E60084" : "white",
              color: row._id === idOfSelectedPackage ? "white" : "#B8258B",
              border: "1px solid #B8258B",
            }}
            // hidden={hideSelectButton}
            disabled={row._id === idOfSelectedPackage}
            onClick={() => {
              // refreshStates();
              setTotalPrice(row.price);
              setIdOfSelectedPackage(row._id);
              setHidden(true);
              setError("");
              setDisabled(false);
              filteringAfterSelection(row._id);
              setSelectedVendorPackage(row);

              // }
            }}
          >
            {row._id !== idOfSelectedPackage ? "Select" : "Selected"}
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      {error === ""
        ? !isUpdate && (
            <Title py="xl" order={3} align="center">
              Available Packages
            </Title>
          )
        : !isUpdate && (
            <Text py="xl" size="xl" align="center" color="red" weight="bold">
              Please Select A Package To Proceed
            </Text>
          )}
      {sortedData.length !== 0 ? (
        <Paper withBorder shadow="xl" radius="md">
          <Modal
            opened={viewModal}
            size="50%"
            onClose={() => setViewModal(false)}
          >
            <SpecificPackageDetails
              vendorPackage={vendorPackageDetails[index]}
            />
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
                  sorted={sortBy === "vendorPackageTitle"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("vendorPackageTitle")}
                >
                  Name
                </Th>
                <Th
                  sorted={sortBy === "price"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("price")}
                >
                  Price
                </Th>
                <Th
                  sorted={sortBy === "packageDuration"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("packageDuration")}
                >
                  Duration
                </Th>
                <Th
                  sorted={sortBy === "rating"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("rating")}
                >
                  Rating
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
      ) : (
        <Text py="xl" size="xl" align="center" color="red" weight="bold">
          No Vendor Packages Available For Your Selection. Please Select Another
          Date Or Time To Proceed Or Contact The Vendor For More Details On
          Availability Of Packages On The Selected Date And Time . Thank You !
        </Text>
      )}
    </ScrollArea>
  );
};

export default VendorPackagesForBooking;
