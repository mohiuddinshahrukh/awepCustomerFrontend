import * as React from "react";
import Table from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import TableRow from "@mui/material/TableRow";
// import DownloadCSVPDFMENU from "../download_CSV_PDF_MENU/DownloadCSVPDFMENU";
import {
  AlignJustified,
  Cash,
  Download,
  Eye,
  Filter,
  Plus,
  Search,
  UserSearch,
} from "tabler-icons-react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";

import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import {
  Box,
  SimpleGrid,
  ActionIcon,
  Stack,
  Modal,
  Button,
  Title,
  Text,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  Select,
  TextInput,
  Menu,
  Avatar,
} from "@mantine/core";

import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

import { showNotification } from "@mantine/notifications";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";

import { Trash, TrashOff, Edit } from "tabler-icons-react";

import "./CustomerTable.css";
import axios from "axios";

import { useMediaQuery } from "@mantine/hooks";

import { createStyles } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

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
    numeric: true,
    disablePadding: true,
    label: "Image",
    sort: false,
  },

  {
    id: "venueName",
    numeric: false,
    disablePadding: false,
    label: "Venue",
    sort: true,
  },
  {
    id: "themeTitle",
    numeric: false,
    disablePadding: false,
    label: "Title",
    sort: true,
  },
  // {
  //   id: "themeDescription",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Description",
  //   sort: true,
  // },
  {
    id: "primaryColor",
    numeric: false,
    disablePadding: false,
    label: "Primary Color",
    sort: true,
  },
  {
    id: "secondaryColor",
    numeric: false,
    disablePadding: false,
    label: "Secondary Color",
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sort === true ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Text>{headCell.label}</Text>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const ThemesForSpecificVenue = (props) => {
  const ID = props.venue;
  const { classes } = useStyles();
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const matches500 = useMediaQuery("(min-width: 500px)");
  let navigate = useNavigate();
  // SEARCH & FILTER
  const [specificity, setSpecificity] = useState("all");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [opened, setOpened] = useState(false);
  const [opened1, setOpened1] = useState(false);

  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const [filterString, setFilterString] = useState([]);
  const [themes, setThemes] = React.useState([]);

  const filtering = () => {
    console.log("FILTER STRING: ", filterString);
    if (props.idOfSelectedTheme === "") {
      return setFilterString(
        themes
        // .filter(
        //   (x) => x.venueId?._id === ID
        //   x.menuTitle.toLowerCase().includes(search.toLowerCase()) ||
        //   x.venueName.toLowerCase().includes(search.toLowerCase()) ||
        //   x.price.toString().toLowerCase().includes(search.toLowerCase()) ||
        //   x.minPrice.toString().toLowerCase().includes(search.toLowerCase()) ||
        //   x.createdAt.toLowerCase().includes(search.toLowerCase())
        // )
      );
    } else if (props.idOfSelectedTheme !== "") {
      return setFilterString(
        themes.filter(
          (x) => x._id === props.idOfSelectedTheme
          //   x.menuTitle.toLowerCase().includes(search.toLowerCase()) ||
          //   x.venueName.toLowerCase().includes(search.toLowerCase()) ||
          //   x.price.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   x.minPrice.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   x.createdAt.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };
  const url =
    "https://a-wep.herokuapp.com/superAdmin/getVenueThemesForBooking/venue/" +
    ID;
  React.useEffect(() => {
    // setVisible(true);
    if (refresh) {
      axios.get(url).then((res) => {
        console.log(res.data);
        // themes = (id, img, name, date, email, contact, status)

        if (res.data.status === "success") {
          var sr = 1;
          res.data.data.map((theme) => {
            theme.SR = sr++;

            theme.CREATED_AT_DATE =
              theme.createdAt.split("T")[0] +
              "_" +
              theme.createdAt.split("T")[1].split(".")[0];
          });
          console.log("SR", res.data.data);
          setThemes(res.data.data);
          setLoading(false);
          setRefresh(false);
          setVisible(false);
        } else {
          console.log(res.data);
        }
      });
    }
    filtering();
  }, [refresh, search, specificity]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - themes.length) : 0;

  const [id, setId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [themeTitle, setThemeTitle] = useState("");
  const [themeDescription, setThemeDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [images, setImages] = useState([]);
  const [eventType, setEventType] = useState([]);
  const [venueName, setVenueName] = useState("");

  const deleteVenueService = (id) => {
    setOpened(true);
    setId(id);
  };
  const confirmDelete = () => {
    setVisible(true);
    setOpened(false);
    axios.delete(`deleteTheme/${id}`).then((res) => {
      if (res.data.status === "success") {
        // console.log(res.data);
        showNotification({
          autoClose: 5000,
          color: "red",

          title: "SUCCESS",
          message: `THEME HAS BEEN DELETED FROM THE SYSTEM!`,
        });
      } else {
        // alert("Error");
        console.log("ooppsss", res.data);
      }
      setRefresh(true);
      setVisible(false);
    });
  };
  return (
    <Paper style={{ position: "relative" }}>
      {" "}
      <LoadingOverlay
        visible={visible}
        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
      />
      <Box sx={{ width: "100%" }}>
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
          title={<Title>Venue Theme</Title>}
          centered
          size={matches800 ? "xl" : "md"}
          // size="calc(60vw - 87px)"
          opened={opened1}
          onClose={() => setOpened1(false)}
        >
          <Carousel
            sx={{ maxWidth: "100%", maxHeight: "100%" }}
            slideSize="100%"
            loop
            // mx="auto"
            withIndicators
            height={300}
          >
            {images?.map((image) => (
              <Carousel.Slide>
                <Image width="xl" height={300} src={image} alt="Cover Image" />
              </Carousel.Slide>
            ))}
          </Carousel>
          <Grid>
            <Grid.Col>
              <Text pt="md" size="md" weight={700}>
                {themeTitle}
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Group>
                <Group>
                  <Button
                    size="xs"
                    radius={50}
                    style={{
                      backgroundColor: secondaryColor,
                    }}
                  ></Button>
                  <Text>{secondaryColor}</Text>
                </Group>
                <Group>
                  <Button
                    size="xs"
                    radius={50}
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  ></Button>
                  <Text>{primaryColor}</Text>
                </Group>
              </Group>
            </Grid.Col>
            <Grid.Col>
              <Text>
                <b>At:</b> {venueName} <b>For</b> {eventType} Events
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Text>{themeDescription}</Text>
            </Grid.Col>
          </Grid>
        </Modal>

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
          opened={opened}
          transition="rotate-left"
          transitionDuration={600}
          size={600}
          transitionTimingFunction="ease"
          onClose={() => setOpened(false)}
        >
          <Title align="center" order={3}>
            Are you Sure You Want to Delete This Theme?
          </Title>
          <Grid align="center" justify="space-around" p="md">
            <Grid.Col align="center" xs={3} sm={3} md={4} lg={4}>
              <Button
                align="center"
                color="light"
                leftIcon={<TrashOff size={14} />}
                onClick={() => setOpened(false)}
              >
                No, Don't Delete
              </Button>
            </Grid.Col>
            <Grid.Col align="center" xs={5} sm={4} md={4} lg={4}>
              <Button
                align="center"
                color="red"
                leftIcon={<Trash size={14} />}
                onClick={() => confirmDelete()}
              >
                Yes, Delete Theme
              </Button>
            </Grid.Col>
          </Grid>
        </Modal>
        {filterString.length !== 0 ? (
          <Paper sx={{ width: "100%", mb: 2 }}>
            {matches800 ? (
              <>
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    stickyHeader={true}
                  >
                    <EnhancedTableHead
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={themes.length}
                    />
                    <TableBody>
                      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 themes.slice().sort(getComparator(order, orderBy)) */}
                      {stableSort(filterString, getComparator(order, orderBy))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          row.venueName = row.venueId?.venueName
                            ? row.venueId?.venueName
                            : "No Venue Name";
                          row.primaryColor = row.themeColors[0];
                          row.secondaryColor = row.themeColors[1];
                          return (
                            <TableRow key={row?._id}>
                              <TableCell component="th" scope="row">
                                <Text>{row?.SR}</Text>
                              </TableCell>

                              <TableCell align="left">
                                <Avatar
                                  radius="xl"
                                  size="md"
                                  src={row?.coverImage}
                                />
                              </TableCell>
                              <TableCell align="left">
                                <Text> {row?.venueName}</Text>
                              </TableCell>
                              <TableCell align="left">
                                <Text>
                                  {" "}
                                  {row?.themeTitle.length > 20
                                    ? row?.themeTitle.slice(0, 20) + "..."
                                    : row?.themeTitle}
                                </Text>
                              </TableCell>
                              {/* <TableCell align="left">
                                <Text lineClamp={1}>
                                  {row?.themeDescription.length > 30
                                    ? row?.themeDescription.slice(0, 30) + "..."
                                    : row?.themeDescription}
                                </Text>
                              </TableCell> */}
                              <TableCell align="left">
                                <Group>
                                  <Button
                                    size="xs"
                                    radius={50}
                                    style={{
                                      backgroundColor: row?.primaryColor,
                                    }}
                                  ></Button>
                                  <Text>{row?.primaryColor}</Text>
                                </Group>
                              </TableCell>

                              <TableCell>
                                <Group>
                                  <Button
                                    size="xs"
                                    radius={50}
                                    style={{
                                      backgroundColor: row?.secondaryColor,
                                    }}
                                  ></Button>
                                  <Text>{row?.secondaryColor}</Text>
                                </Group>
                              </TableCell>

                              <TableCell>
                                <SimpleGrid cols={2}>
                                  <ActionIcon variant="transparent">
                                    <Eye
                                      onClick={() => {
                                        setThemeDescription(
                                          row?.themeDescription
                                        );
                                        setThemeTitle(row?.themeTitle);
                                        setCoverImage(row?.coverImage);
                                        setImages(row?.images);
                                        setPrimaryColor(row?.themeColors[0]);
                                        setSecondaryColor(row?.themeColors[1]);
                                        setEventType(row?.eventType);
                                        setVenueName(row?.venueName);

                                        setId(row?._id);

                                        setOpened1(true);
                                      }}
                                    />
                                  </ActionIcon>
                                  <Button
                                    size="xs"
                                    color="dark"
                                    disabled={
                                      row._id === props.idOfSelectedTheme
                                    }
                                    // disabled={
                                    //   row._id === props.idOfSelectedMenu
                                    // }
                                    onClick={() => {
                                      props.setIdOfSelectedTheme(row._id);

                                      props.setSelectedTheme(row);
                                      setFilterString(
                                        themes.filter((e) => e._id === row._id)
                                      );
                                    }}
                                  >
                                    {row._id !== props.idOfSelectedTheme
                                      ? "Select"
                                      : "Selected"}
                                  </Button>
                                </SimpleGrid>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={themes.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              filterString.map((row) => {
                return (
                  <Group position="apart" p="md">
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setThemeDescription(row?.themeDescription);
                        setThemeTitle(row?.themeTitle);
                        setCoverImage(row?.coverImage);
                        setImages(row?.images);
                        setPrimaryColor(row?.themeColors[0]);
                        setSecondaryColor(row?.themeColors[1]);
                        setEventType(row?.eventType);
                        setVenueName(row?.venueName);

                        setId(row?._id);

                        setOpened1(true);
                      }}
                    >
                      <Group noWrap>
                        <Avatar src={row?.coverImage} size={94} radius="md" />
                        <div>
                          <Group
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              size="lg"
                              weight={500}
                              className={classes.name}
                            >
                              {row?.themeTitle.length > 10
                                ? row?.themeTitle.substring(0, 12) + "..."
                                : row?.themeTitle}
                            </Text>
                          </Group>
                          <Group noWrap spacing={10} mt={3}>
                            <Text size="sm" color="dimmed">
                              {row?.venueName}
                            </Text>
                          </Group>
                          <div>
                            <Text
                              size="xs"
                              color="dimmed"
                              mt={3}
                              align="justify"
                            >
                              {row?.themeDescription.length > 20
                                ? row?.themeDescription.substr(0, 20) + ".. "
                                : row?.themeDescription}
                            </Text>
                          </div>
                          <Group noWrap spacing={10} mt={3}>
                            <Text size="xs" color="dimmed">
                              Colors
                            </Text>
                            <Button
                              size="xs"
                              radius={50}
                              style={{
                                width: "10",
                                height: "10px",
                                backgroundColor: row?.themeColors[0],
                              }}
                            ></Button>
                            <Button
                              size="xs"
                              radius={50}
                              style={{
                                width: "10",
                                height: "10px",
                                backgroundColor: row?.themeColors[1],
                              }}
                            ></Button>
                          </Group>
                        </div>
                      </Group>
                    </div>
                    <Group>
                      <Button
                        size="xs"
                        color="dark"
                        disabled={row._id === props.idOfSelectedTheme}
                        // disabled={
                        //   row._id === props.idOfSelectedMenu
                        // }
                        onClick={() => {
                          props.setIdOfSelectedTheme(row._id);

                          props.setSelectedTheme(row);
                          setFilterString(
                            themes.filter((e) => e._id === row._id)
                          );
                        }}
                      >
                        {row._id !== props.idOfSelectedTheme
                          ? "Select"
                          : "Selected"}
                      </Button>
                    </Group>
                  </Group>
                );
              })
            )}
          </Paper>
        ) : (
          <Text weight="bold" align="center">
            No Data Found
          </Text>
        )}
      </Box>
    </Paper>
  );
};

export default ThemesForSpecificVenue;
