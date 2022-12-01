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
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

import searchBackground from "../../assets/searchBackgroundCarouselImages/1.jpg";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import AllVendorsGrid from "./AllVendorsGrid";
import AllVendorCategories from "./AllVendorCategories";
import AllVendorCities from "./AllVendorCities";
import AllVendorDuration from "./AllVendorDuration";
import AllVendorsCustomerBudget from "./AllVendorsCustomerBudget";
import AllVendorRatingFilter from "./AllVendorRatingFilter";
import AdvanceFilterByCities from "../allVenuesPage/AdvanceFilterByCities";
import AllRatingFilter from "../allVenuesPage/AllRatingFilter";
import FiveCardsSkeleton from "../skeletons/SixCardsSkeleton";

const AllVendorsPage = () => {
  const params = useParams();
  console.log("PARAMS:", params);
  const [city, setCity] = useState(params.city ? params.city : "");
  const [date, setDate] = useState(params.date ? new Date(params.date) : null);
  const [time, setTime] = useState(params.time ? params.time : "");
  const [rating, setRating] = useState(null);
  console.log("rating", rating);
  const [minPrice, setMinPrice] = useState(0);
  console.log("minPrice", minPrice);
  const [maxPrice, setMaxPrice] = useState(100000);
  console.log("maxPrice", maxPrice);
  const [maxPriceFilter, setMaxPriceFilter] = useState(100000);
  console.log("maxPriceFilter", maxPriceFilter);
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  console.log("minPriceFilter", minPriceFilter);
  const [categories, setCategories] = useState([]);
  console.log("categories", categories);
  const [filteredVendors, setFilteredVendors] = useState([]);

  const [allVendors, setAllVendors] = useState([]);
  const fetchAllVendors = async () => {
    try {
      const apiResponse = await axios.get(
        "https://a-wep.herokuapp.com/customer/getVendorBusinesses"
      );

      if (apiResponse.data.status === "success") {
        console.log("Successfully fetched all vendors:", apiResponse.data.data);
        setFilteredVendors(apiResponse.data.data);
        let vendorPackages = apiResponse.data.data
          ?.map((vendorPackage) => vendorPackage.vendorServicePackages)
          ?.flat();

        //find minimum and maximum price of menus
        let min = Math.min(
          ...vendorPackages?.map((vendorPackage) => vendorPackage.price)
        );
        let max = Math.max(
          ...vendorPackages?.map((vendorPackage) => vendorPackage.price)
        );
        console.log("min:", min);
        console.log("max:", max);
        setMinPrice(min);
        setMaxPrice(max);
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        console.log("Error while fetching all vendors");
      } else {
        console.log("Failed to fetch all vendors, dont know this error");
      }
    } catch (e) {
      console.log("ERROR in fetching all vendors:", e);
    }
  };
  console.log("allVendors", allVendors);
  useEffect(() => {
    console.count();
    fetchAllVendors().then(setAllVendors);
  }, []);
  useEffect(() => {
    filterVendors();
  }, [
    allVendors,
    city,
    date,
    time,
    rating,
    minPriceFilter,
    maxPriceFilter,
    categories,
  ]);

  const filterVendors = () => {
    console.log("Filtering vendors", params.city);

    //filter vendors according to the filter options
    let filteredVendor = allVendors?.filter((vendor) => {
      //filter by vendor city

      if (city !== "" && city !== "all") {
        if (city !== vendor.city) {
          return false;
        }
      }
      if (rating !== null) {
        if (rating > vendor.rating) {
          return false;
        }
      }

      //subVenues have a bookedOn object in which the date and time is concated and stored in key value pair. find the all the vendors which have at lease one sub vendor which is not booked on the selected date and time
      if (date !== null) {
        const bookedDateAndTime = moment(date).format().split("T")[0];
        console.log("testing date and time", bookedDateAndTime);
        console.log("date and", date);
        let dateMatch = false;
        vendor?.vendorServicePackages?.forEach((vendorServicePackage) => {
          if (vendorServicePackage.bookedOn) {
            const bookingsOnDate =
              vendorServicePackage.bookedOn[bookedDateAndTime] || 0;
            if (bookingsOnDate < vendorServicePackage.noOfBookingsPerDay) {
              dateMatch = true;
            }
          }
        });
        if (!dateMatch) {
          return false;
        }
      }

      //filter vendors which have at least one menu in the minPriceFilter and maxPriceFilter range and if a vendor does not have any menus then it will also be shown

      if (minPriceFilter !== 0 || maxPriceFilter !== 0) {
        let priceMatch = false;
        vendor?.vendorServicePackages?.forEach((vendorPackage) => {
          console.log("vendorPackages we kj   have", vendorPackage);

          if (
            vendorPackage.price >= minPriceFilter &&
            vendorPackage.price <= maxPriceFilter
          ) {
            priceMatch = true;
          }
        });
        if (!priceMatch) {
          return false;
        }
      }

      //filter vendors according to the selected categories
      console.log("categories", categories);
      if (categories?.length > 0) {
        let categoryMatch = false;
        vendor?.vendorCategories?.forEach((cat) => {
          if (categories.includes(cat.categoryTitle)) {
            categoryMatch = true;
          }
        });
        if (!categoryMatch) {
          return false;
        }
      }

      return true;
    });
    console.log("Filtered vendors:", filteredVendor);
    setFilteredVendors(filteredVendor);
  };
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
        <Center style={{ width: "100%", height: "100%" }}>
          <Group
            style={{ width: "100%", height: "100%" }}
            noWrap
            position="center"
          >
            <Group align={"flex-end"}>
              <Select
                size={"lg"}
                styles={{ label: { color: "white" } }}
                label="City"
                placeholder="Select A City"
                value={city}
                onChange={setCity}
                data={[
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
                  { value: "1 Day", label: "1 Day" },
                  { value: "2 Days", label: "2 Days" },
                  { value: "3 Days", label: "3 Days" },
                  { value: "5 Days", label: "5 Days" },
                ]}
              />
              <Button
                size={"lg"}
                component={Link}
                // to={searchSupplier === "vendor" ? "/allVenues" : "/allVendors"}
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
              <Text size={"lg"} align="left" weight={500}>
                Advance Filters
              </Text>
              <AdvanceFilterByCities city={city} setCity={setCity} />
              <AllVendorCategories
                categories={categories}
                setCategories={setCategories}
              />
              {/* <AllVendorDuration time={time} setTime={setTime} /> */}

              <AllVendorsCustomerBudget
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                setMinPriceFilter={setMinPriceFilter}
                setMaxPriceFilter={setMaxPriceFilter}
              />
              <AllRatingFilter rating={rating} setRating={setRating} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={matches1026 ? 12 : 9}>
            {allVendors?.length > 0 ? (
              <AllVendorsGrid allVendors={filteredVendors} />
            ) : (
              <FiveCardsSkeleton />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default AllVendorsPage;
