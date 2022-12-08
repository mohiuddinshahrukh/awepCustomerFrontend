import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Cash, Download, Eye, Filter, Plus, Search } from "tabler-icons-react";
import {
  ActionIcon,
  Avatar,
  BackgroundImage,
  Center,
  Menu,
  ScrollArea,
} from "@mantine/core";
import { SimpleGrid } from "@mantine/core";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useForm } from "@mantine/form";
import { TextInput, Box, Select, Checkbox } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { NumberInput, Group } from "@mantine/core";
import { visuallyHidden } from "@mui/utils";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { Modal, Button, Title, Text, Grid } from "@mantine/core";
import { Trash } from "tabler-icons-react";
import { TrashOff } from "tabler-icons-react";
import { Edit } from "tabler-icons-react";
import { X } from "tabler-icons-react";
import { LoadingOverlay } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
// import "./CustomerTable.css";
import axios from "axios";
import { Paper } from "@mui/material";
import DownloadAsCSV from "../csvDATA/DownloadAsCSV";
import { useCallback } from "react";
// COMPONENT_PRINTING
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
// HTML2CANVAS
// import html2canvas from "html2canvas";
// function downloadImage() {
//   console.log("DOWNLOAD IMAGE COMPONENET 1");
//   html2canvas(document.querySelector("#capture")).then((canvas) => {
//     exportComponentAsPNG(canvas);

// exportComponentAsPNG(componentRef, {
//   fileName: menuTitle,
//   html2CanvasOptions: { allowTaint: true },
// });
//   console.log("DOWNLOAD IMAGE COMPONENET 2");
// }

import html2canvas from "html2canvas";
import PDFTable from "../Download_PDF_Table/PDFTable";
import jsPDF from "jspdf";
import { useMediaQuery } from "@mantine/hooks";

import { createStyles } from "@mantine/core";
import DownloadCSVPDFMENU from "../download_CSV_PDF_MENU/DownloadCSVPDFMENU";

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

const exportAsImage = async (el, imageFileName) => {
  const canvas = await html2canvas(el);
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);
};
const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

function createData(
  SR,
  _id,
  menuTitle,
  dishes,
  eventType,
  dishCategories,
  price,
  minPrice,
  createdAt,
  venueId,
  venueName,
  image
) {
  return {
    SR,
    _id,
    menuTitle,
    dishes,
    eventType,
    dishCategories,
    price,
    minPrice,
    createdAt,
    venueId,
    venueName,
    image,
  };
}

function createDishData(_id, title, image, description) {
  return { value: title, label: title, image: image, description: description };
}
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

const MenuOfSpecificVenueForBooking = (props) => {
  const ID = props.venue;
  const headCells = [
    {
      id: "SR",
      numeric: true,
      disablePadding: true,
      label: "ID",
      sort: true,
    },

    {
      id: "menuTitle",
      numeric: true,
      disablePadding: true,
      label: "Menu Title",
      sort: true,
    },
    {
      id: "venueName",
      numeric: true,
      disablePadding: true,
      label: "Venue Title",
      sort: true,
    },

    {
      id: "price",
      numeric: false,
      disablePadding: false,
      label: "Price (Rs. Per Head)",
      sort: true,
    },
    {
      id: "menuPrice",
      numeric: false,
      disablePadding: false,
      label: `Price For ${props.noOfGuests} Guests (Rs.)`,
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
    const {
      order,
      orderBy,

      onRequestSort,
    } = props;
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
                  <Text> {headCell.label}</Text>
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

  const { classes } = useStyles();

  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const matches500 = useMediaQuery("(min-width: 500px)");
  let navigate = useNavigate();
  // HOOKS
  const [opened, setOpened] = useState(false);
  const [opened1, setOpened1] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [getVenueInformation, setVenueInformation] = useState([]);
  const [checkedDishes, setCheckedDishes] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [dishesData, setDishesData] = useState([]);
  const [menuSuggestedPrice, setMenuSuggestedPrice] = useState(0);
  const [menu, setMenu] = useState([]);
  const [rows, setRows] = useState([]);

  const [getmenuTitle, setmenuTitle] = useState("");
  const [getmenuPrice, setmenuPrice] = useState("");
  const [getmenucreatedAt, setmenucreatedAt] = useState("");
  const [getmenuDishes, setmenuDishes] = useState([]);
  const [getmenuDishCategories, setmenuDishCategories] = useState([]);
  const [getVenueName, setVenueName] = useState("");
  const [getVenueId, setVenueId] = useState("");
  // Search and filter
  const [status, setStatus] = useState("all");
  const [city, setCity] = useState("all");
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [filterString, setFilterString] = useState([]);
  const filtering = () => {
    console.log("SEARCH: ", search);
    console.log("FILTER STRING: ", filterString);
    if (props.idOfSelectedMenu === "") {
      return setFilterString(
        menu.filter(
          (x) => x.venueId === ID
          //   x.menuTitle.toLowerCase().includes(search.toLowerCase()) ||
          //   x.venueName.toLowerCase().includes(search.toLowerCase()) ||
          //   x.price.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   x.minPrice.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   x.createdAt.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (props.idOfSelectedMenu !== "") {
      return setFilterString(
        menu.filter(
          (x) => x._id === props.idOfSelectedMenu
          //   x.menuTitle.toLowerCase().includes(search.toLowerCase()) ||
          //   x.venueName.toLowerCase().includes(search.toLowerCase()) ||
          //   x.price.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   x.minPrice.toString().toLowerCase().includes(search.toLowerCase()) ||
          //   x.createdAt.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };
  const FetchVenues = () => {
    let url = "https://a-wep.herokuapp.com/superAdmin/getAllVenues";
    axios.get(url).then((res) => {
      console.log("VENUE RESPONSE FROM API: ", res);
      if (res.data.status === "success") {
        setVenueInformation(res.data.data);
      }
    });
  };

  //CODE FOR PRINTING
  const [printingTriggered, setPrintingTriggered] = useState(false);
  const componentRef = useRef(null);
  const compToPrint = useRef(null);
  const onBeforeGetContentResolve = useRef(null);

  const [text, setText] = useState("old boring text");

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      resolve();
    });
  }, [setLoading, setText, printingTriggered]);
  // PRINTING USE EFFECT
  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <Group position="left" mb={10}>
        <Button
          size="md"
          variant="filled"
          color="dark"
          type="submit"
          // disabled={disabled}
          // loading={loading}
          rightIcon={<Download />}
          onClick={() => {
            // PDF_Print_Method();
            console.log("Print");
            setPrintingTriggered(true);
          }}
          uppercase
        >
          Print Menu
        </Button>
      </Group>
    );
  }, []);
  // GET MENUS
  useEffect(() => {
    FetchVenues();
    const url = "https://a-wep.herokuapp.com/superAdmin/getMenus";
    // setVisible(true);
    if (refresh) {
      axios.get(url).then((res) => {
        // customer = (id, img, name, date, email, contact, status)
        if (res.data.status === "success") {
          console.log("RESPONSE DATA: ", res.data.data);
          var sr = 1;

          let data = res.data.data.map((menu) =>
            createData(
              (menu.SR = sr++),
              menu._id != null ? menu._id : "Menu Base id is NULL",
              menu.menuTitle != null ? menu.menuTitle : "Menu Name is null",
              menu.dishes != null ? menu.dishes : "Dishes is null",
              menu.eventType != null ? menu.eventType : "All",
              menu.dishCategories != null
                ? menu.dishCategories
                : "Dishes is null",

              menu.price,
              menu.minPrice,
              menu.createdAt,
              menu.venueId ? menu.venueId._id : "NO ID",
              menu.venueId ? menu.venueId.venueName : "No ID",
              menu.image
                ? menu.image
                : "https://i.pinimg.com/736x/6c/c3/cc/6cc3cc2a17539c0e6cdfb9beb96642b0.jpg"
            )
          );

          res.data.data.map((Menu) => {
            Menu.CREATED_AT_DATE =
              Menu.createdAt.split("T")[0] +
              "_" +
              Menu.createdAt.split("T")[1].split(".")[0];
            Menu.VENUE_NAME = Menu.venueId.venueName;
          });
          setRows(res.data.data);
          setMenu(data);
          setLoading(false);
          setRefresh(false);
          setVisible(false);
        } else {
          alert("Error");
        }
      });
    }
    filtering();
  }, [refresh, search]);

  function createDishes(_id, dishCategory, dishName, dishImage, dishPrice) {
    return {
      id: _id,
      dishCategory: dishCategory,
      value: dishName,
      label: dishName,
      image: dishImage,
      dishPrice: dishPrice,
    };
  }

  const FetchDishCategoies = () => {
    let url = "https://a-wep.herokuapp.com/superAdmin/getDishCategories";
    axios.get(url).then((res) => {
      console.log("Successfully Fetched Data", res.data);
      // customer = (id, img, name, date, email, contact, status)
      if (res.data.status === "success") {
        let data = res.data.data.map((x) =>
          createDishData(x._id, x.title, x.image, x.description, x.price)
        );
        let url = "https://a-wep.herokuapp.com/superAdmin/getDishes";
        axios.get(url).then((res) => {
          console.log("Successfully Fetched Data", res.data);
          // customer = (id, img, name, date, email, contact, status)
          if (res.data.status === "success") {
            let data = res.data.data.map((x) =>
              createDishes(
                x._id,
                x.dishCategory,
                x.dishName,
                x.dishImage,
                x.dishPrice,
                x.description
              )
            );

            setDishesData(data);
          } else {
            alert("Error");
          }
        });
        setCategoriesData(data);
      } else {
        alert("Error");
      }
    });
  };

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - menu.length) : 0;

  const [_id, setId] = useState("");
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuMinPrice, setmenuMinPrice] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [getDishCategories, setGetDishCategories] = useState([]);
  const [getDishesData, setGetDishesData] = useState([]);
  const [getImage, setImage] = useState("");

  // Unused Vars
  // const [getVenue, setVenue] = useState([]);
  // const [dishCategory, setDishCategory] = useState("");
  // const [dishName, setDishName] = useState("");
  // const [dishImage, setDishImage] = useState("");
  // const [dishPrice, setDishPrice] = useState("");
  // const [dishDescription, setDishDescription] = useState("");

  const viewProfile = (
    _id,
    menuTitle,
    price,
    minPrice,
    createdAt,
    dishes,
    dishCategories,
    venueName,
    image,
    venueId
  ) => {
    console.log("IMAGE:", image);
    console.log("Dishes", dishes);
    console.log("Dish Categories", dishCategories);

    setId(_id);
    setMenuTitle(menuTitle);
    setMenuPrice(price);
    setmenuMinPrice(minPrice);
    setCreatedAt(createdAt);
    setGetDishCategories(dishCategories);
    setGetDishesData(dishes);
    setImage(image);
    setVenueName(venueName);
    setVenueId(venueId);
    setOpened1(true);
  };

  return (
    <Paper style={{ position: "relative" }}>
      <LoadingOverlay
        visible={visible}
        loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
        overlayOpacity={0.5}
        overlayColor="#c5c5c5"
      />

      {/* <Paper shadow="xl" style={{ marginBottom: 10 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            leftIcon={<Plus />}
            variant="filled"
            color="dark"
            radius="lg"
            p="s"
            m="md"
            onClick={() => {
              navigate("/addMenu");
            }}
          >
            ADD MENU
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextInput
              label="Search"
              placeholder="Search..."
              m="md"
              icon={<Search size={14} />}
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
           
          </div>
        </div>
      </Paper> */}

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
        title={<Title>View Menu</Title>}
        // centered
        overlayOpacity={0.55}
        overlayBlur={3}
        // size={matches800 ? "60%" : "md"}
        // size={"500px"}
        size="lg"
        opened={opened1}
        onClose={() => setOpened1(false)}
        // style={{ width: "500px", minHeight: "800px" }}
      >
        {/*  
      <ReactToPrint
          content={reactToPrintContent}
          documentTitle="invoiceGenerated"
          onAfterPrint={handleAfterPrint}
          onBeforeGetContent={handleOnBeforeGetContent}
          onBeforePrint={handleBeforePrint}
          removeAfterPrint
          trigger={reactToPrintTrigger}
      /> */}

        <Center>
          <div
            id="capture"
            ref={componentRef}
            style={{
              position: "relative",
              borderRadius: "5px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              width: "500px",
              minHeight: "800px",
            }}
          >
            <div
              style={{
                height: "fit-content",
                backgroundImage: `url(${getImage})`,
                backgroundRepeat: "repeat-y",

                backgroundSize: "100% 100%",
              }}
            >
              <Text
                align="center"
                px="sm"
                mr="5px"
                style={{
                  backgroundColor: "white",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
                size="xl"
              >
                <u>PKR: {menuPrice} Per Head</u>
              </Text>

              <Text mt="11%" style={{}} align="center" size="2rem">
                {getVenueName}
              </Text>
              <Text style={{}} align="center" size="2rem">
                {menuTitle}
              </Text>

              <Paper
                styles={{ border: 0, borderRadius: 0, boxShadow: 0 }}
                component={ScrollArea}
                style={{
                  backgroundColor: "transparent",
                  height: "450px",
                }}
              >
                <Text
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    top: 0,
                    bottom: 0,
                  }}
                >
                  {getDishCategories?.map((dishCategory, globalIndex) => {
                    return (
                      <Box
                        key={globalIndex}
                        color="green"
                        orientation="horizontal"
                        label={dishCategory}
                        size="md"
                      >
                        <Text
                          mt="xl"
                          style={{ color: "#95CE78" }}
                          size={26.24}
                          align="center"
                        >
                          {dishCategory}
                        </Text>

                        {getDishesData?.map((dish, localIndex) => {
                          if (dish.dishCategory === dishCategory) {
                            return (
                              <Text
                                align="center"
                                key={localIndex}
                                size={21.87}
                                style={{ color: "black" }}
                              >
                                {dish.dishName}
                              </Text>
                            );
                          } else {
                          }
                        })}
                      </Box>
                    );
                  })}
                </Text>
              </Paper>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  backgroundColor: "white",
                  padding: "10px",
                  width: "100%",
                }}
              >
                {getVenueInformation.map((venue) => {
                  if (venue._id === getVenueId) {
                    return (
                      <>
                        <Group>
                          <Text>
                            Contact Numbers: {venue.contactPhone}
                            {", "}
                            {venue.contactLandline}
                          </Text>
                        </Group>
                        <Group>
                          <Text>Email Address: {venue.feedbackEmail}</Text>
                        </Group>
                        <Group>
                          <Text>Address: {venue.venueAddress}</Text>
                        </Group>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </Center>
      </Modal>

      {filterString.length !== 0 ? (
        <Paper sx={{ width: "100%", mb: 2 }}>
          {matches800 ? (
            <>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={menu.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
             customer.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(filterString, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              <Text>{row?.SR}</Text>
                            </TableCell>

                            <TableCell component="th" scope="row">
                              <Text>{row?.menuTitle}</Text>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Text>{row?.venueName}</Text>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Text>{row?.price}</Text>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Text color="red" weight="bold">
                                {row.price * props.noOfGuests}
                              </Text>
                            </TableCell>

                            <TableCell>
                              <SimpleGrid cols={3}>
                                <ActionIcon
                                  variant="transparent"
                                  onClick={() => {
                                    // FetchDishCategoies();
                                    console.log("id", row?._id);
                                    console.log("title", row?.menuTitle);
                                    console.log("price", row?.price);
                                    console.log("min price", row?.minPrice);
                                    console.log("created at", row?.createdAt);
                                    console.log("dishes", row?.dishes);
                                    console.log(
                                      "dishcategories",
                                      row?.dishCategories
                                    );
                                    viewProfile(
                                      row?._id,
                                      row?.menuTitle,
                                      row?.price,
                                      row?.minPrice,
                                      row?.createdAt,
                                      row?.dishes,
                                      row?.dishCategories,
                                      row?.venueName,
                                      row?.image,
                                      row?.venueId
                                    );

                                    // setId(row?._id);
                                    // setmenuTitle(row?.menuTitle);
                                    // setmenuPrice(row?.price);
                                    // setmenuMinPrice(row?.minPrice);
                                    // setmenucreatedAt(row?.createdAt);
                                    // setmenuDishes(row?.dishes);
                                    // setmenuDishCategories(row?.dishCategories);
                                  }}
                                >
                                  <Eye />
                                </ActionIcon>

                                <Button
                                  size="xs"
                                  color="dark"
                                  disabled={row._id === props.idOfSelectedMenu}
                                  // disabled={
                                  //   row._id === props.idOfSelectedMenu
                                  // }
                                  onClick={() => {
                                    props.setIdOfSelectedMenu(row._id);
                                    props.setMenuPrice(row.price);
                                    props.setSelectedMenu(row);
                                    setFilterString(
                                      menu.filter((e) => e._id === row._id)
                                    );
                                  }}
                                >
                                  {row._id !== props.idOfSelectedMenu
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
                count={menu.length}
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
                    onClick={() => {
                      // FetchDishCategoies();
                      console.log("id", row?._id);
                      console.log("title", row?.menuTitle);
                      console.log("price", row?.price);
                      console.log("min price", row?.minPrice);
                      console.log("created at", row?.createdAt);
                      console.log("dishes", row?.dishes);
                      console.log("dishcategories", row?.dishCategories);
                      viewProfile(
                        row?._id,
                        row?.menuTitle,
                        row?.price,
                        row?.minPrice,
                        row?.createdAt,
                        row?.dishes,
                        row?.dishCategories,
                        row?.venueName,
                        row?.image,
                        row?.venueId
                      );

                      // setId(row?._id);
                      // setmenuTitle(row?.menuTitle);
                      // setmenuPrice(row?.price);
                      // setmenuMinPrice(row?.minPrice);
                      // setmenucreatedAt(row?.createdAt);
                      // setmenuDishes(row?.dishes);
                      // setmenuDishCategories(row?.dishCategories);
                    }}
                  >
                    <Group noWrap>
                      {/* <Avatar src={row?.coverImage} size={94} radius="md" /> */}
                      <div>
                        <Group
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text size="lg" weight={500} className={classes.name}>
                            {row?.menuTitle.length > 15
                              ? row?.menuTitle.substring(0, 15) + "..."
                              : row?.menuTitle}
                          </Text>
                        </Group>
                        <Group noWrap spacing={10} mt={3}>
                          <Text size="xs" color="dimmed" weight="bold">
                            For:{" "}
                          </Text>

                          <Text size="xs" color="dimmed">
                            {row?.venueName.length > 15
                              ? row?.venueName.substring(0, 15) + "..."
                              : row?.venueName}
                          </Text>
                        </Group>
                        <Group noWrap spacing={10} mt={3}>
                          <Cash size={16} className={classes.icon} />
                          <Text size="xs" color="dimmed">
                            Rs. {row?.price}
                          </Text>
                        </Group>
                      </div>
                    </Group>
                  </div>

                  <div>
                    <Button
                      size="xs"
                      color="dark"
                      disabled={row._id === props.idOfSelectedMenu}
                      // disabled={
                      //   row._id === props.idOfSelectedMenu
                      // }
                      onClick={() => {
                        props.setIdOfSelectedMenu(row._id);
                        props.setMenuPrice(row.price);
                        props.setSelectedMenu(row);
                        setFilterString(menu.filter((e) => e._id === row._id));
                      }}
                    >
                      {row._id !== props.idOfSelectedMenu
                        ? "Select"
                        : "Selected"}
                    </Button>
                  </div>
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
    </Paper>
  );
};

export default MenuOfSpecificVenueForBooking;
