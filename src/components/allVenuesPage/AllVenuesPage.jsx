import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { useListState, useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdvanceFilterHallCharges from "./AdvanceFilterHallCharges";
import AdvanceFilterMenuCharges from "./AdvanceFilterMenuCharges";
import AdvanceFilterVenueCapacity from "./AdvanceFilterVenueCapacity";
import AdvanceFilterByCities from "./AdvanceFilterByCities";
import AdvanceFilterVenuePrice from "./AdvanceFilterVenuePrice";
import AdvanceFilterVenueServices from "./AdvanceFilterVenueServices";
import AdvanceSearchAndFilters from "./AdvanceFilterVenueType";
import AllVenuesGrid from "./AllVenuesGrid";
import searchBackground from "../../assets/searchBackgroundCarouselImages/1.jpg";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import AllRatingFilter from "./AllRatingFilter";
import moment from "moment";

const AllVenuesPage = () => {
  const params = useParams();
  console.log("PARAMS:", params);
  const [city, setCity] = useState(params.city ? params.city : "");
  const [date, setDate] = useState(params.date ? new Date(params.date) : null);
  const [time, setTime] = useState(params.time ? params.time : "");
  const [venueCapacity, setVenueCapacity] = useState([]);
  console.log(venueCapacity, "venueCapacity");
  const [rating, setRating] = useState(null);
  console.log("rating", rating);
  const [services, setServices] = useState([]);
  const [menuPrices, setMenuPrices] = useState([]);
  // const [venueType, setVenueType] = useState("all");
  const [allVenues, setAllVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  console.log("All venues:", allVenues);
  console.log("Filtered venues:", filteredVenues);
  const initialValues = [
    { value: "HALL", label: "Halls", checked: true },
    { value: "MARQUEE", label: "Marquees", checked: true },
    { value: "OUTDOOR", label: "Out Doors", checked: true },
  ];
  const [venueType, setVenueType] = useListState(initialValues);
  console.log("values in check boxes", venueType);
  const allChecked = venueType.every((value) => value.checked);
  const indeterminate = venueType.some((value) => value.checked) && !allChecked;

  const [filteredServices, setFilteredServices] = useState([]);
  console.log("filteredServices we retrieved", filteredServices);
  const [allMenus, setAllMenus] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  console.log("minPrice", minPrice);
  const [maxPrice, setMaxPrice] = useState(100000);
  console.log("maxPrice", maxPrice);
  const [maxPriceFilter, setMaxPriceFilter] = useState(100000);
  console.log("maxPriceFilter", maxPriceFilter);
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  console.log("minPriceFilter", minPriceFilter);
  const [allServices, setAllServices] = useState([]);
  const fetchAllVenueServices = async () => {
    try {
      const apiResponse = await axios.get(
        "https://a-wep.herokuapp.com/customer/getAllVenueServices"
      );
      console.log("API Response", apiResponse);
      if (apiResponse.data.status === "success") {
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        console.log(
          "Error while fetching all venue services",
          apiResponse.data.error
        );
      } else {
        console.log("Unknown Error: ", apiResponse.data.error);
      }
    } catch (error) {
      console.log("Error in fetchAllVenueServices catch block", error);
    }
  };
  useEffect(() => {
    fetchAllVenueServices().then(setAllServices);
    console.count();
  }, []);

  const fetchAllVenues = async () => {
    try {
      const apiResponse = await axios.get(
        "https://a-wep.herokuapp.com/customer/getVenues"
      );

      if (apiResponse.data.status === "success") {
        console.log("Successfully fetched all venues:", apiResponse.data.data);
        setFilteredVenues(apiResponse.data.data);
        let menus = apiResponse.data.data?.map((venue) => venue.menus)?.flat();
        console.log("Menus:", menus);
        setAllMenus(menus);

        //find minimum and maximum price of menus
        let min = Math.min(...menus?.map((menu) => menu.price));
        let max = Math.max(...menus?.map((menu) => menu.price));
        console.log("min:", min);
        console.log("max:", max);
        setMinPrice(min);
        setMaxPrice(max);

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

  const filterVenues = () => {
    console.log("Filtering venues", params.city);

    //filter venues according to the filter options
    let filteredVenues = allVenues.filter((venue) => {
      //filter by venue city

      if (city !== "" && city !== "all") {
        if (city !== venue.venueCity) {
          return false;
        }
      }
      if (rating !== null) {
        if (rating > venue.rating) {
          return false;
        }
      }
      //filter by subvenue types
      // if (venueType !== "all") {
      //   let venueTypeMatch = false;
      //   // venueType.forEach((type) => {
      //   if (
      //     venue?.subVenues?.map((e) => e?.subVenueType)?.includes(venueType)
      //   ) {
      //     console.log("MATCHED");
      //     venueTypeMatch = true;
      //     // return false;
      //   }
      //   // });
      //   if (!venueTypeMatch) {
      //     return false;
      //   }
      // }
      //filter by venue capacity
      //if venueCapacity includes 100, than filter venues which have at least 1 subVenue with capacity between 0 and 100. if venueCapacity includes 300, than filter venues which have at least 1 subVenue with capacity between 100 and 300.
      //if venueCapacity includes 600, than filter venues which have at least 1 subVenue with capacity between 300 and 600. if venueCapacity includes 1000, than filter venues which have at least 1 subVenue with capacity between 600 and 1000.
      //if venueCapacity includes 1500, than filter venues which have at least 1 subVenue with capacity between 1000 and 1500.
      //if venueCapacity includes 1501, than filter venues which have at least 1 subVenue with capacity greater than 1500.
      if (venueCapacity.length > 0) {
        let venueCapacityMatch = false;
        venueCapacity.forEach((capacity) => {
          if (capacity === "100") {
            if (
              venue?.subVenues?.some(
                (e) => e?.subVenueCapacity >= 0 && e?.subVenueCapacity <= 100
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "300") {
            if (
              venue?.subVenues?.some(
                (e) => e?.subVenueCapacity >= 100 && e?.subVenueCapacity <= 300
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "600") {
            if (
              venue?.subVenues?.some(
                (e) => e?.subVenueCapacity >= 300 && e?.subVenueCapacity <= 600
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "1000") {
            if (
              venue?.subVenues?.some(
                (e) => e?.subVenueCapacity >= 600 && e?.subVenueCapacity <= 1000
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "1500") {
            if (
              venue?.subVenues?.some(
                (e) =>
                  e?.subVenueCapacity >= 1000 && e?.subVenueCapacity <= 1500
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "1501") {
            if (venue?.subVenues?.some((e) => e?.subVenueCapacity > 1500)) {
              venueCapacityMatch = true;
              return false;
            }
          }
        });
        if (!venueCapacityMatch) {
          return false;
        }
      }

      if (indeterminate || allChecked) {
        let venueTypeMatch = false;
        //make array of venue types only of checked values
        let venueTypes = venueType
          .filter((value) => value.checked)
          .map((value) => value.value);
        console.log("venueTypes", venueTypes);
        const filteredArray = venue?.subVenues?.filter((value) =>
          venueTypes.includes(value.subVenueType)
        );
        console.log("filteredArray", filteredArray);
        if (filteredArray.length > 0) {
          console.log("MATCHED");
          venueTypeMatch = true;
        }

        if (!venueTypeMatch) {
          return false;
        }
      }
      if (filteredServices.length > 0) {
        //get all services of a venue in an array
        let serviceMatch = false;

        let venueServices = venue.providedVenueServices.map(
          (e) => e?.serviceTitle
        );
        console.log("venueServices with title", venueServices);

        // serviceMatch =
        //   JSON.stringify(venueServices) == JSON.stringify(filteredServices);

        //check if filtered services is a subset of venue services
        serviceMatch = filteredServices.every((value) =>
          venueServices.includes(value)
        );
        console.log("serviceMatch", serviceMatch);
        if (!serviceMatch) {
          return false;
        }
      }
      //subVenues have a bookedOn object in which the date and time is concated and stored in key value pair. find the all the venues which have at lease one sub venue which is not booked on the selected date and time
      if (date !== null && time !== "") {
        const bookedDateAndTime = moment(date).format().split("T")[0] + time;
        console.log("testing date and time", bookedDateAndTime);
        console.log("date and time", date, time);
        let dateMatch = false;
        venue?.subVenues?.forEach((subVenue) => {
          if (subVenue.bookedOn) {
            if (subVenue?.bookedOn[bookedDateAndTime] === undefined) {
              console.log(
                "subVenue.bookedOn",
                subVenue.subVenueName,
                subVenue.bookedOn
              );
              dateMatch = true;
            }
          }
        });
        if (!dateMatch) {
          return false;
        }
      }

      if (minPriceFilter !== 0 || maxPriceFilter !== 0) {
        let priceMatch = false;
        venue?.menus?.forEach((menu) => {
          console.log("menus we kj   have", menu);

          if (
            (menu.price >= minPriceFilter && menu.price <= maxPriceFilter) ||
            menu === undefined
          ) {
            priceMatch = true;
          }
        });
        if (!priceMatch) {
          return false;
        }
      }

      return true;
    });
    console.log("Filtered venues:", filteredVenues);
    setFilteredVenues(filteredVenues);
  };
  useEffect(() => {
    console.count();
    fetchAllVenues().then(setAllVenues);
  }, []);
  useEffect(() => {
    filterVenues();
  }, [
    allVenues,
    city,
    date,
    time,
    venueCapacity,
    rating,
    services,
    menuPrices,
    venueType,
    filteredServices,
    minPriceFilter,
    maxPriceFilter,
  ]);

  const matches1026 = useMediaQuery("(max-width: 1026px)");
  return (
    <Paper>
      <Paper
        withBorder
        style={{
          backgroundImage: `url(${searchBackground})`,
          // backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "35vh",
          position: "relative",
        }}
      >
        {" "}
        <Center style={{ width: "100%", height: "100%" }}>
          <Group
            style={{ width: "100%", height: "100%" }}
            noWrap
            position="center"

            // style={{
            //   width: "100%",
            //   left: "50%",
            //   transform: "translateX(-50%)",
            //   // border: "1px solid red",
            //   position: "absolute",
            //   bottom: "20%",
            //   zIndex: 10,
            // }}
          >
            <Group align={"flex-end"}>
              {" "}
              {/*              <Select
                size={"lg"}
                styles={{ label: { color: "white" } }}
                label="Supplier"
                placeholder="Select A Supplier"
                // onChange={setSearchSupplier}
                data={[
                  { value: "venue", label: "Venue" },
                  { value: "vendor", label: "Vendor" },
                ]}
              />*/}
              <Select
                size={"lg"}
                styles={{ label: { color: "white" } }}
                label="City"
                placeholder="Select A City"
                value={city}
                onChange={setCity}
                data={[
                  { value: "all", label: "All" },
                  { value: "islamabad", label: "Islamabad" },
                  { value: "rawalpindi", label: "Rawalpindi" },
                  { value: "lahore", label: "Lahore" },
                  { value: "karachi", label: "Karachi" },
                ]}
              />
              <DatePicker
                value={date}
                onChange={setDate}
                size={"lg"}
                styles={{ label: { color: "white" } }}
                placeholder="Pick date"
                label="Event date"
                minDate={dayjs(new Date())
                  .startOf("month")
                  .add(new Date().getDate(), "days")
                  .toDate()}
                maxDate={dayjs(new Date()).add(365, "days").toDate()}
              />
              <Select
                size={"lg"}
                value={time}
                onChange={setTime}
                styles={{ label: { color: "white" } }}
                label="Time"
                placeholder="Select A Time"
                data={[
                  { value: "LUNCH", label: "Lunch" },
                  { value: "DINNER", label: "Dinner" },
                ]}
              />
              <Button
                size={"lg"}
                component={Link}
                // to={searchSupplier === "venue" ? "/allVenues" : "/allVendors"}
                style={{ backgroundColor: "#775A97" }}
              >
                Search
              </Button>
            </Group>
          </Group>
        </Center>
      </Paper>
      <Container size={"xl"} my={"md"}>
        <Grid>
          <Grid.Col mt={"sm"} hidden={matches1026 ? true : false} span={3}>
            <Stack spacing={"sm"}>
              <Group position="apart" noWrap>
                <Text size={"lg"} align="left" weight={500}>
                  Advance Filters
                </Text>
                {/* <Text
                  size="md"
                  align="right"
                  color="red"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCity("all");
                    setDate(null);
                    setTime("");
                    setMinPriceFilter(minPrice);
                    setMaxPriceFilter(maxPrice);
                    setMinPrice(minPrice);
                    setMaxPrice(maxPrice);
                    setVenueType(initialValues);
                  }}
                >
                  Clear All
                </Text> */}
              </Group>
              <AdvanceFilterByCities city={city} setCity={setCity} />
              <AdvanceFilterMenuCharges
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                setMinPriceFilter={setMinPriceFilter}
                setMaxPriceFilter={setMaxPriceFilter}
              />
              <AdvanceSearchAndFilters
                setVenueType={setVenueType}
                venueType={venueType}
                indeterminate={indeterminate}
                allChecked={allChecked}
              />
              <AllRatingFilter rating={rating} setRating={setRating} />
              {allServices.length > 0 && (
                <AdvanceFilterVenueServices
                  allServices={allServices}
                  setFilteredServices={setFilteredServices}
                  filteredServices={filteredServices}
                />
              )}
              {/* <AdvanceFilterVenuePrice /> */}
              <AdvanceFilterVenueCapacity
                venueCapacity={venueCapacity}
                setVenueCapacity={setVenueCapacity}
              />
              {/* <AdvanceFilterHallCharges /> */}
            </Stack>
          </Grid.Col>
          <Grid.Col span={matches1026 ? 12 : 9}>
            <AllVenuesGrid allVenues={filteredVenues} />
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default AllVenuesPage;
