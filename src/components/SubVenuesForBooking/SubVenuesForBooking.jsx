import * as React from "react";

import {
  Image,
  SimpleGrid,
  ActionIcon,
  Card,
  Avatar,
  Badge,
  Table,
  ScrollArea,
  Paper,
  UnstyledButton,
  Center,
} from "@mantine/core";

import { useState } from "react";
import { Modal, Button, Title, Text, Group, Grid } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";

import { createStyles } from "@mantine/core";

import "./CustomerTable.css";

import { useEffect } from "react";
import {
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconSelector,
} from "@tabler/icons";

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
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "_id",
    numeric: true,
    disablePadding: true,
    label: "ID",
    sort: true,
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
    sort: false,
  },
  {
    id: "subVenueName",
    numeric: false,
    disablePadding: false,
    label: "Sub Venue",
    sort: true,
  },
  {
    id: "venueId",
    numeric: false,
    disablePadding: false,
    label: "Venue",
    sort: true,
  },

  {
    id: "subVenueMinCapacity",
    numeric: false,
    disablePadding: false,
    label: "Min Capacity",
    sort: true,
  },
  {
    id: "subVenueCapacity",
    numeric: false,
    disablePadding: false,
    label: "Max Capacity",
    sort: true,
  },
  {
    id: "subVenueType",
    numeric: false,
    disablePadding: false,
    label: "Type",
    sort: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
    sort: false,
  },
];
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

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <thead>
      <tr>
        {headCells.map((headCell) => (
          <Th
          // sorted={sortBy === "name"}
          // reversed={reverseSortDirection}
          // onSort={() => setSorting("name")}
          >
            {headCell.label}
          </Th>
          // <TableCell
          //   style={{ fontWeight: "bold" }}
          //   key={headCell.id}
          //   // align={headCell.numeric ? 'right' : 'left'}
          //   // padding={headCell.disablePadding ? 'none' : 'normal'}
          //   sortDirection={orderBy === headCell.id ? order : false}
          // >
          //   {headCell.sort === true ? (
          //     <TableSortLabel
          //       active={orderBy === headCell.id}
          //       direction={orderBy === headCell.id ? order : "asc"}
          //       onClick={createSortHandler(headCell.id)}
          //     >
          //       {headCell.label}
          //       {orderBy === headCell.id ? (
          //         <Box component="span" sx={visuallyHidden}>
          //           {order === "desc"
          //             ? "sorted descending"
          //             : "sorted ascending"}
          //         </Box>
          //       ) : null}
          //     </TableSortLabel>
          //   ) : (
          //     headCell.label
          //   )}
          // </TableCell>
        ))}
      </tr>
    </thead>
  );
}
const SubVenuesForBooking = (props) => {
  const matches800 = useMediaQuery("(min-width: 800px)");
  const { classes } = useStyles();

  const [refresh, setRefresh] = React.useState(true);
  const [allSubVenues, setAllSubVenues] = React.useState(
    props.allSubVenues || []
  );
  console.log("SET HUAWY YA NAHI", allSubVenues);
  const [subVenueAddress, setSubVenueAddress] = useState("");
  const [selectedVenueServices, setSelectedSubVenueServices] = useState([]);
  const [venueName, setVenueName] = useState([]);
  const [subVenueName, setSubVenueName] = useState("");
  const [subVenueCapacity, setSubVenueCapacity] = useState();
  const [subVenueMinCapacity, setSubVenueMinCapacity] = useState();
  const [subVenueType, setSubVenueType] = useState("");
  const [subVenueDescription, setSubVenueDescription] = useState("");
  const [subVenueImages, setVenueImages] = useState([]);
  const [subVenueVideos, setVenueVideos] = useState([]);
  const [filterString, setFilterString] = useState([]);

  const checkIfRequirementFulfilled = (
    availableCapacity,
    noOfSubVenues,
    hallCharges,
    minCapacity
  ) => {
    console.log(
      "first",
      availableCapacity,
      noOfSubVenues,
      hallCharges,
      minCapacity,
      !props.checkForMultiBooking,
      minCapacity >= props.noOfGuests
    );
    if (availableCapacity < props.noOfGuests) {
      props.setFulfillmentMessage(
        "Not Enough Capacity In This Sub Venue. Please Select Another Sub Venue As Well"
      );
      props.setMessageColor("red");
    } else if (!props.checkForMultiBooking && minCapacity > props.noOfGuests) {
      // props.setMessageColor("red");
      // props.setFulfillmentMessage(
      //   `Extra Charges Will Be Applied. Either Increase the number of guests to at least ${minCapacity} or Minimum booking charges will be applied of Rs. ${hallCharges}`
      // );
    } else {
      props.setMessageColor("green");
      props.setFulfillmentMessage(
        "This Venue Can Accommodate Your Guests. Press Next To Continue"
      );
    }
    if (noOfSubVenues <= 0) {
      props.setFulfillmentMessage("");
    }
  };

  React.useEffect(() => {
    if (refresh && !props?.isUpdate) {
      setAllSubVenues(props.allSubVenues);
      setFilterString(props.allSubVenues);
    } else if (refresh && props?.isUpdate) {
      setAllSubVenues(props.allSubVenues);
      setFilterString(props.allSubVenues);
      setRefresh(false);
    }

    filtering();
  }, [
    refresh,
    props.noOfGuests,
    props.venueCity,
    props.bookedDateAndTime,
    props.time,
    props.idOfSelectedSubVenue,
    props.checkForMultiBooking,
  ]);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [viewOpened, setViewOpened] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const checkDisabled = () => {};

  useEffect(() => {
    checkDisabled();
  }, [props.idOfSelectedSubVenue]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterString.length) : 0;

  const filtering = () => {
    // Single Sub Venue Booking Filters
    console.log("FILTERING ::::::::::::::::::::::::::::::", props);
    if (!props.isUpdate) {
      if (
        props.idOfSelectedSubVenue?.length === 0 &&
        !props.checkForMultiBooking
      ) {
        console.log("ID OF SELECTED SUBVENUE IS 0");
        const filteredSubVenues = allSubVenues.filter((subVenue) => {
          if (subVenue.bookedOn) {
            if (subVenue.bookedOn[props.bookedDateAndTime]) {
              return false;
            }
          }

          if (props.venueCity && props.noOfGuests && props.venue) {
            return (
              subVenue.venueId.venueCity === props.venueCity &&
              subVenue.venueId._id.includes(props.venue) &&
              subVenue.subVenueCapacity >= props.noOfGuests
            );
          } else if (props.venueCity && props.venue) {
            return (
              subVenue.venueId._id.includes(props.venue) &&
              subVenue.venueId.venueCity === props.venueCity
            );
          } else if (props.venueCity && props.noOfGuests) {
            return (
              subVenue.subVenueCapacity >= props.noOfGuests &&
              subVenue.venueId.venueCity === props.venueCity
            );
          } else if (props.noOfGuests && props.venue) {
            return (
              subVenue.subVenueCapacity >= props.noOfGuests &&
              subVenue.venueId._id.includes(props.venue)
            );
          } else if (props.venueCity) {
            return subVenue.venueId.venueCity === props.venueCity;
          } else if (props.noOfGuests) {
            return subVenue.subVenueCapacity >= props.noOfGuests;
          } else if (props.venue) {
            return subVenue.venueId._id.includes(props.venue);
          }
          return true;
        });
        console.log(
          "Filtering 2::::::::::::::::::",
          props.venueCity,
          props.venue,
          props.noOfGuests
        );
        console.log("Filtering 3::::::::::::::::::", filteredSubVenues);
        return setFilterString(filteredSubVenues);
      }
      if (
        props.idOfSelectedSubVenue?.length === 0 &&
        props.checkForMultiBooking
      ) {
        let filteredSubVenues = allSubVenues?.filter((subVenue) => {
          if (subVenue.bookedOn) {
            if (subVenue.bookedOn[props.bookedDateAndTime]) {
              return false;
            }
          }

          if (props.venueCity && props.noOfGuests && props.venue) {
            return (
              subVenue.venueId.venueCity === props.venueCity &&
              subVenue.venueId._id.includes(props.venue) &&
              subVenue.subVenueCapacity < props.noOfGuests
            );
          } else if (props.venueCity && props.venue) {
            return (
              subVenue.venueId._id.includes(props.venue) &&
              subVenue.venueId.venueCity === props.venueCity
            );
          } else if (props.venueCity && props.noOfGuests) {
            return (
              subVenue.subVenueCapacity < props.noOfGuests &&
              subVenue.venueId.venueCity === props.venueCity
            );
          } else if (props.noOfGuests && props.venue) {
            return (
              subVenue.subVenueCapacity < props.noOfGuests &&
              subVenue.venueId._id.includes(props.venue)
            );
          } else if (props.venueCity) {
            return subVenue.venueId.venueCity === props.venueCity;
          } else if (props.venue) {
            return subVenue.venueId._id.includes(props.venue);
          }

          return true;
        });
        // if sum of all subvenues of a venue is less than no of guests then remove that venue
        let venuesAvailableCapacity = {};
        filteredSubVenues.forEach((subVenue) => {
          if (venuesAvailableCapacity[subVenue.venueId._id]) {
            venuesAvailableCapacity[subVenue.venueId._id] +=
              subVenue.subVenueCapacity;
          } else {
            venuesAvailableCapacity[subVenue.venueId._id] =
              subVenue.subVenueCapacity;
          }
        });

        // filter out all venues whose capacity is less than no of guests
        filteredSubVenues = filteredSubVenues.filter((subVenue) => {
          if (
            venuesAvailableCapacity[subVenue.venueId._id] >= props.noOfGuests
          ) {
            return true;
          }
          return false;
        });

        return setFilterString(filteredSubVenues);
      }

      if (props.idOfSelectedSubVenue?.length !== 0) {
        let venueId = filterString?.find((e) =>
          props.idOfSelectedSubVenue?.includes(e._id)
        )?.venueId?._id;

        return setFilterString(
          allSubVenues.filter((subVenue) => {
            if (subVenue.bookedOn) {
              if (subVenue.bookedOn[props.bookedDateAndTime]) {
                return false;
              }
            }

            if (subVenue?.venueId?._id === venueId) {
              if (props.checkForMultiBooking) {
                return subVenue.subVenueCapacity < props.noOfGuests;
              } else {
                return subVenue.subVenueCapacity >= props.noOfGuests;
              }
            }
            return false;
          })
        );
      }
    } else {
      return setFilterString(props.subVenue);
    }
  };

  return (
    <Paper style={{ position: "relative" }}>
      {viewOpened ? (
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
          opened={viewOpened}
          onClose={() => setViewOpened(false)}
          size={matches800 ? "60%" : "md"}
          radius="md"
          centered
          title={<Title>Sub Venue Details</Title>}
        >
          <Paper
            p="xl"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Card shadow="sm" p="lg" radius="md">
              <Card.Section>
                <Carousel
                  withIndicators
                  height={300}
                  slideSize="50%"
                  slideGap="md"
                  loop
                  align="start"
                  slidesToScroll={2}
                  breakpoints={[
                    { maxWidth: "md", slideSize: "50%" },
                    { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                  ]}
                >
                  {subVenueImages.map((image, index) => (
                    <Carousel.Slide key={index}>
                      <Image src={image} height={280} alt="subVenue Image" />
                    </Carousel.Slide>
                  ))}
                  {subVenueVideos?.map((video, index) => (
                    <Carousel.Slide key={index}>
                      <video src={video} height={280} controls />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Card.Section>
              <Grid>
                <Grid.Col md={12} lg={6}>
                  <Title pt="xs" order={2} weight={500}>
                    {subVenueName}
                  </Title>
                  <Title order={3}>
                    <b>Venue: </b>
                    {venueName}
                  </Title>

                  <Text size="lg">
                    <b>Address:</b> {subVenueAddress}
                  </Text>
                </Grid.Col>
                <Grid.Col md={12} lg={12}>
                  <Text size="lg">{subVenueDescription}</Text>
                  <Text size="lg">
                    <b>Sub Venue Type:</b> {subVenueType}
                  </Text>
                  <Text size="lg">
                    <b>Total Capacity:</b> {subVenueCapacity}
                  </Text>
                  <Text size="lg">
                    <b>Minimum Booking Capacity:</b> {subVenueMinCapacity}
                  </Text>
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col lg={12}>
                  {selectedVenueServices?.length > 0 ? (
                    <Text size="lg">
                      <b>Selected Services:</b>
                    </Text>
                  ) : null}
                </Grid.Col>
                {selectedVenueServices?.map((service) => (
                  <Grid.Col lg={6}>
                    <div
                      key={service._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar color="cyan" radius="xl" size="md">
                        <Image
                          src={service.coverImage}
                          height={160}
                          alt="serviceImage"
                        />
                      </Avatar>
                      <div>
                        <Text size="lg" pl="md">
                          {service.serviceTitle} (Rs. {service.servicePrice})
                        </Text>

                        <Text size="md" color="dimmed" pl="md">
                          {service.serviceDescription}
                        </Text>
                      </div>
                    </div>
                  </Grid.Col>
                ))}
              </Grid>
            </Card>
          </Paper>
        </Modal>
      ) : null}

      {filterString?.length !== 0 ? (
        <Paper sx={{ width: "100%", mb: 2 }}>
          {props.error === "" ? (
            <Title py="xl" order={3} align="center">
              {props.isUpdate ? "Selected" : "Available"} Sub Venues
            </Title>
          ) : (
            <Text py="xl" size="xl" align="center" color="red" weight="bold">
              Please Select A Venue To Proceed
            </Text>
          )}
          <Text>{props.totalAvailableCapacity}</Text>
          {matches800 ? (
            <>
              <ScrollArea>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={filterString.length}
                  />
                  <tbody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 allSubVenues.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(filterString, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        row.city = row.venueId?.venueCity;
                        row.venueName = row.venueId?.venueName;
                        return (
                          <tr key={index}>
                            <td>{row.SR || index + 1}</td>
                            <td component="th" scope="row">
                              <img
                                src={row.coverImage}
                                alt=""
                                className="imageing"
                              />
                            </td>
                            <td align="left">{row.subVenueName}</td>
                            <td align="left">{row.venueName}</td>
                            <td align="left">{row.subVenueMinCapacity}</td>
                            <td align="left">{row.subVenueCapacity}</td>
                            <td align="left">{row.subVenueType}</td>
                            <td align="left">
                              <SimpleGrid
                                cols={2}
                                breakpoints={[
                                  { maxWidth: "1600", cols: 1, spacing: "md" },
                                ]}
                              >
                                <ActionIcon
                                  color="dark"
                                  variant="transparent"
                                  onClick={() => {
                                    setVenueName(row.venueId?.venueName);
                                    setSubVenueName(row.subVenueName);
                                    setSubVenueCapacity(row.subVenueCapacity);
                                    setSubVenueMinCapacity(
                                      row.subVenueMinCapacity
                                    );
                                    setSubVenueDescription(
                                      row.subVenueDescription
                                    );
                                    setSubVenueAddress(row.subVenueAddress);
                                    setSubVenueType(row.subVenueType);
                                    setVenueImages(row.images);
                                    setVenueVideos(row.videos);
                                    setSelectedSubVenueServices(
                                      row.subVenueServices
                                    );
                                    setViewOpened(true);
                                  }}
                                >
                                  <IconEye color="#a905b6" />
                                </ActionIcon>
                                {!props.isUpdate && (
                                  <ActionIcon pl="md">
                                    {!props.idOfSelectedSubVenue?.includes(
                                      row._id
                                    ) ? (
                                      <Button
                                        size="xs"
                                        color="dark"
                                        hidden={props.hideSelectButton}
                                        disabled={
                                          !props.checkForMultiBooking &&
                                          props.idOfSelectedSubVenue?.length > 0
                                            ? true
                                            : props.idOfSelectedSubVenue
                                                ?.length > 0 &&
                                              props.checkForMultiBooking &&
                                              !props.idOfSelectedSubVenue?.includes(
                                                row._id
                                              ) &&
                                              props.totalAvailableCapacity >=
                                                props.noOfGuests
                                            ? true
                                            : false
                                        }
                                        onClick={() => {
                                          if (!props.checkForMultiBooking) {
                                            props.setIdOfSelectedSubVenue([
                                              row._id,
                                            ]);
                                            props.setSubVenue([row]);
                                          } else {
                                            props.setIdOfSelectedSubVenue(
                                              (selectedSubVenues) => [
                                                ...selectedSubVenues,
                                                row._id,
                                              ]
                                            );
                                            props.setSubVenue((subVenue) => [
                                              ...subVenue,
                                              row,
                                            ]);
                                          }
                                          props.setTotalAvailableCapacity(
                                            (totalAvailableCapacity) =>
                                              totalAvailableCapacity +
                                              row.subVenueCapacity
                                          );
                                          props.setHidden(true);
                                          props.setError("");
                                          props.setDisabled(false);
                                          props.setVenue(row.venueId._id);
                                          checkIfRequirementFulfilled(
                                            props.totalAvailableCapacity +
                                              row.subVenueCapacity,
                                            props.idOfSelectedSubVenue?.length +
                                              1,
                                            row.minimumBookingCharges,
                                            row.subVenueMinCapacity
                                          );
                                          props.setMenuPolicy(
                                            row.venueId.menuPolicy
                                          );
                                        }}
                                      >
                                        Select
                                      </Button>
                                    ) : (
                                      <Button
                                        size="xs"
                                        color="red"
                                        hidden={props.hideSelectButton}
                                        onClick={() => {
                                          if (!props.checkForMultiBooking) {
                                            props.setIdOfSelectedSubVenue([]);
                                            props.setSubVenue([]);
                                          } else {
                                            props.setIdOfSelectedSubVenue(
                                              (selectedSubVenues) =>
                                                selectedSubVenues.filter(
                                                  (e) => e !== row._id
                                                )
                                            );
                                            props.setSubVenue((subVenue) =>
                                              subVenue.filter(
                                                (e) => e._id !== row._id
                                              )
                                            );
                                          }
                                          props.setTotalAvailableCapacity(
                                            (totalAvailableCapacity) =>
                                              totalAvailableCapacity -
                                              row.subVenueCapacity
                                          );
                                          props.setHidden(true);
                                          props.setError("");
                                          props.setDisabled(false);

                                          props.setChargesError("");
                                          props.setMessageColor("grey");
                                          checkIfRequirementFulfilled(
                                            props.totalAvailableCapacity -
                                              row.subVenueCapacity,
                                            props.idOfSelectedSubVenue?.length -
                                              1
                                          );

                                          props.setMenuPolicy(
                                            row.venueId.menuPolicy
                                          );
                                        }}
                                      >
                                        Unselect
                                      </Button>
                                    )}
                                  </ActionIcon>
                                )}
                              </SimpleGrid>
                            </td>
                          </tr>
                        );
                      })}
                    {emptyRows > 0 && (
                      <tr>
                        <td colSpan={6} />
                      </tr>
                    )}
                  </tbody>
                </Table>
              </ScrollArea>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filterString.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
            </>
          ) : (
            filterString.map((row) => {
              return (
                <Card
                  withBorder
                  radius="md"
                  p="md"
                  className={classes.card}
                  key={row._id}
                >
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setVenueName(row.venueId?.venueName);
                      // setCity(row.venueId.venueCity);
                      setSubVenueName(row.subVenueName);
                      setSubVenueCapacity(row.subVenueCapacity);
                      setSubVenueMinCapacity(row.subVenueMinCapacity);
                      setSubVenueDescription(row.subVenueDescription);
                      setSubVenueAddress(row.subVenueAddress);
                      setSubVenueType(row.subVenueType);

                      setVenueImages(row.images);
                      setVenueVideos(row.videos);
                      setSelectedSubVenueServices(row.subVenueServices);
                      setViewOpened(true);
                    }}
                  >
                    <Card.Section>
                      <Image
                        src={row.coverImage}
                        alt={row.subVenueName}
                        height={180}
                      />
                    </Card.Section>

                    <Card.Section className={classes.section} mt="md">
                      <Group position="apart">
                        <Text size="lg" weight={500}>
                          {row.subVenueName}
                        </Text>
                        <Badge size="sm">{row.subVenueType}</Badge>
                      </Group>
                      <Group>
                        <Text size="sm" weight={500}>
                          {row.subVenueAddress}
                        </Text>
                      </Group>
                      <Group position="apart">
                        <Text size="sm" weight={500}>
                          Min Capacity
                        </Text>
                        <Text size="sm">{row.subVenueMinCapacity}</Text>
                      </Group>
                      <Group position="apart">
                        <Text size="sm" weight={500}>
                          Max Capacity
                        </Text>
                        <Text size="sm">{row.subVenueCapacity}</Text>
                      </Group>
                      <Text size="sm" mt="xs">
                        {row.subVenueDescription}
                      </Text>
                    </Card.Section>
                  </div>

                  <Group mt="xs">
                    <Button
                      size="xs"
                      radius="md"
                      style={{ flex: 1 }}
                      color="dark"
                      hidden={props.hideSelectButton}
                      disabled={row._id === props.idOfSelectedSubVenue}
                      onClick={() => {
                        // props.refreshStates();
                        props.setIdOfSelectedSubVenue(row._id);
                        props.setHidden(true);
                        props.setError("");
                        props.setDisabled(false);
                        props.setSubVenue(row);
                        // props.setNoOfGuests(row.subVenueMinCapacity);

                        props.setVenue(row.venueId._id);
                        // props.setVenueCity(row.venueId.venueCity);
                        // setFilterString(
                        //   allSubVenues.filter(
                        //     (e) => e._id === row._id
                        //   )
                        // );
                        // filteringAfterSelection(row._id);
                        // if (
                        //   !props.noOfGuests ||
                        //   props.noOfGuests === 0
                        // ) {
                        //   props.form1.setFieldValue(
                        //     "noOfGuests",
                        //     row.subVenueMinCapacity
                        //   );
                        // } else {
                        // console.log("HALLCHARGES@@");
                        // if (!props.checkForMultiBooking) {
                        //   console.log("HALLCHARGES@@");
                        //   checkForChargesForSingleSubVenue(
                        //     row.venueId?.menuPolicy,
                        //     row.subVenueMinCapacity,
                        //     row.perHeadWithoutMenu,
                        //     row.perHeadWithMenu
                        //   );
                        // } else if (props.checkForMultiBooking) {
                        //   console.log("HALLCHARGES@@ NOT APPLY");
                        //   props.setHallCharges(
                        //     (hallCharges) =>
                        //       hallCharges - row.minimumBookingCharges
                        //   );
                        // }
                      }}
                    >
                      {row._id !== props.idOfSelectedSubVenue
                        ? "Select"
                        : "Selected"}
                    </Button>
                  </Group>
                </Card>
              );
            })
          )}
        </Paper>
      ) : (
        <Text weight="bold" align="center">
          No Data Found
        </Text>
      )}
    </Paper>
  );
};
export default SubVenuesForBooking;
