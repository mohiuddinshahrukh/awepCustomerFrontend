import {
  ActionIcon,
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import moment from "moment";
import img1 from "../../assets/searchBackgroundCarouselImages/1.jpg";
import img2 from "../../assets/searchBackgroundCarouselImages/2.jpg";
import img3 from "../../assets/searchBackgroundCarouselImages/3.jpg";
import img4 from "../../assets/searchBackgroundCarouselImages/4.jpg";
import img5 from "../../assets/searchBackgroundCarouselImages/5.jpg";
import img6 from "../../assets/searchBackgroundCarouselImages/6.jpg";
import img7 from "../../assets/searchBackgroundCarouselImages/7.jpg";
import img8 from "../../assets/searchBackgroundCarouselImages/8.jpg";
import img9 from "../../assets/searchBackgroundCarouselImages/9.jpg";
import img10 from "../../assets/searchBackgroundCarouselImages/10.jpg";
import img11 from "../../assets/searchBackgroundCarouselImages/11.jpg";
import img12 from "../../assets/searchBackgroundCarouselImages/12.jpg";
import img13 from "../../assets/searchBackgroundCarouselImages/13.jpg";
import img14 from "../../assets/searchBackgroundCarouselImages/14.jpg";
import img15 from "../../assets/searchBackgroundCarouselImages/15.jpg";
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
import SearchBackgroundOpacityDiv from "../landingPage/searchAndBG/SearchBackgroundOpacityDiv";
import { Carousel } from "@mantine/carousel";
import { IconFilter, IconSearch, IconX } from "@tabler/icons";

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
  const [search, setSearch] = useState("");
  console.log("search is", search);
  const [opened, setOpened] = useState(false);
  const [vendorSort, setVendorSort] = useState("mostRelevant");
  const [refresh, setRefresh] = useState(true);
  const [rangeValue, setRangeValue] = useState([minPrice, maxPrice]);

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
        setRefresh(false);
        setRangeValue([min, max]);
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
    search,
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
      //filter vendors with vendorBusinessTitle or vendorPackageTitle same as search
      if (search !== "") {
        console.log("wea are in ifff", search);
        let searchMatch = false;
        if (
          vendor?.vendorBusinessTitle
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
        ) {
          searchMatch = true;
        }
        if (vendor?.vendorServicePackages?.length > 0) {
          vendor?.vendorServicePackages?.forEach((vendorPackage) => {
            if (
              vendorPackage?.vendorPackageTitle
                ?.toLowerCase()
                ?.includes(search?.toLowerCase())
            ) {
              searchMatch = true;
            }
          });
        }
        if (!searchMatch) {
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
          } else if (!vendorServicePackage.bookedOn) {
            dateMatch = true;
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
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const matches1026 = useMediaQuery("(max-width: 1026px)");
  const matches992 = useMediaQuery("(max-width: 992px)");
  return (
    <Paper>
      <Paper
        withBorder
        style={{
          height: "40vh",
          position: "relative",
        }}
      >
        <Carousel
          style={{ position: "absolute", width: "100%" }}
          align="start"
          height={"40vh"}
          orientation="vertical"
          draggable={false}
          withControls={false}
          plugins={[autoplay.current]}
          //   onMouseEnter={autoplay.current.stop}
          //   onMouseLeave={autoplay.current.play}

          //   slideGap="md"
        >
          {[
            { src: img1 },
            { src: img2 },
            { src: img3 },
            { src: img4 },
            { src: img5 },
            { src: img6 },
            { src: img7 },
            { src: img8 },
            { src: img9 },
            { src: img10 },
            { src: img11 },
            { src: img12 },
            { src: img13 },
            { src: img14 },
            { src: img15 },
          ]?.map((image, index) => {
            return (
              <Carousel.Slide key={index}>
                <Image height={"40vh"} src={image.src} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
        <SearchBackgroundOpacityDiv />
        <Center style={{ width: "100%", height: "100%" }}>
          <Group
            style={{ width: "100%", height: "100%" }}
            noWrap
            position="center"
            px={matches992 ? "xl" : "lg"}
          >
            <Group style={{ zIndex: 10 }} align={"flex-end"}>
              <Grid align={"flex-end"}>
                <Grid.Col sm={12} md={4} lg={3}>
                  <Select
                    size={matches992 ? "md" : "lg"}
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
                </Grid.Col>
                <Grid.Col sm={12} md={4} lg={3}>
                  {" "}
                  <DatePicker
                    value={date}
                    onChange={setDate}
                    size={matches992 ? "md" : "lg"}
                    styles={{ label: { color: "white" } }}
                    placeholder="Pick date"
                    label="Event date"
                    minDate={dayjs(new Date())
                      .startOf("month")
                      .add(new Date().getDate(), "days")
                      .toDate()}
                    maxDate={dayjs(new Date()).add(365, "days").toDate()}
                  />
                </Grid.Col>
                <Grid.Col sm={12} md={4} lg={3}>
                  {" "}
                  <Select
                    size={matches992 ? "md" : "lg"}
                    value={time}
                    onChange={setTime}
                    styles={{ label: { color: "white" } }}
                    label="Duration"
                    placeholder="Select A Duration"
                    data={[
                      { value: "1 Day", label: "1 Day" },
                      { value: "2 Days", label: "2 Days" },
                      { value: "3 Days", label: "3 Days" },
                      { value: "5 Days", label: "5 Days" },
                    ]}
                  />
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={3}>
                  <Button
                    className="button"
                    uppercase
                    size={matches992 ? "md" : "lg"}
                    component={Link}
                    to={`/allVendors${date ? "/date/" + date : ""}${
                      time ? "/time/" + time : ""
                    }${city ? "/city/" + city : ""}`}
                    fullWidth
                    // to={searchSupplier === "vendor" ? "/allVenues" : "/allVendors"}
                  >
                    Search
                  </Button>
                </Grid.Col>
              </Grid>
            </Group>
          </Group>
        </Center>
      </Paper>
      <Container size={"xl"} my={"md"}>
        <Modal
          hidden={!matches1026}
          opened={opened}
          onClose={() => setOpened(false)}
          title={
            <Text size={"lg"} align="left" weight={500}>
              Advance Filters
            </Text>
          }
        >
          <Stack spacing={"sm"}>
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
              setRangeValue={setRangeValue}
              rangeValue={rangeValue}
            />
            <AllRatingFilter rating={rating} setRating={setRating} />
            <Group position="center" noWrap>
              {city !== "" ||
              date !== null ||
              time !== "" ||
              minPriceFilter !== 0 ||
              maxPriceFilter !== 100000 ||
              categories.length !== 0 ||
              rating !== null ? (
                <Button
                  variant="outline"
                  className="buttonOutline"
                  onClick={() => {
                    setCity("");
                    setDate(null);
                    setTime("");
                    setRating(null);
                    let minPriceReset = minPrice;
                    let maxPriceReset = maxPrice;
                    console.log("minPriceReset", minPriceReset);
                    console.log("maxPriceReset", maxPriceReset);
                    setMinPriceFilter(0);
                    setMaxPriceFilter(100000);
                    setMinPrice(minPriceReset);
                    setMaxPrice(maxPriceReset);
                    setRangeValue([minPriceReset, maxPriceReset]);
                    setCategories([]);
                    setOpened(false);
                  }}
                  fullWidth
                >
                  Reset
                </Button>
              ) : null}
              <Button
                className="button"
                onClick={() => setOpened(false)}
                fullWidth
              >
                Apply
              </Button>
            </Group>
          </Stack>
        </Modal>

        <Group hidden={!matches1026 || refresh} position="right" py="md" noWrap>
          <TextInput
            icon={<IconSearch size={22} />}
            placeholder="Search"
            value={search}
            style={{ width: "100%" }}
            onChange={(e) => setSearch(e.target.value)}
            rightSection={
              search !== "" && (
                <IconX
                  style={{ cursor: "pointer" }}
                  size={22}
                  onClick={() => {
                    setSearch("");
                  }}
                />
              )
            }
          />
          <Button
            className="border"
            onClick={() => setOpened(true)}
            variant="outline"
          >
            <Text className="fgColorF">Filter</Text>
            <IconFilter size={30} color="#e60084" stroke={1.5} />
          </Button>
        </Group>
        <Grid>
          <Grid.Col
            hidden={matches1026 || refresh ? true : false}
            span={3}
            mt={6}
          >
            <Stack spacing={"sm"}>
              <Group position="apart" noWrap>
                <Text size={"lg"} align="left" weight={500}>
                  Advance Filters
                </Text>
                {city !== "" ||
                date !== null ||
                time !== "" ||
                minPriceFilter !== 0 ||
                maxPriceFilter !== 100000 ||
                categories.length !== 0 ||
                rating !== null ? (
                  <Button
                    className="button"
                    size="sm"
                    align="right"
                    onClick={() => {
                      setCity("");
                      setDate(null);
                      setTime("");
                      setRating(null);
                      let minPriceReset = minPrice;
                      let maxPriceReset = maxPrice;
                      console.log("minPriceReset", minPriceReset);
                      console.log("maxPriceReset", maxPriceReset);
                      setMinPriceFilter(0);
                      setMaxPriceFilter(100000);
                      setMinPrice(minPriceReset);
                      setMaxPrice(maxPriceReset);
                      setRangeValue([minPriceReset, maxPriceReset]);
                      setCategories([]);
                      setOpened(false);
                    }}
                  >
                    Reset
                  </Button>
                ) : null}
              </Group>
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
                setRangeValue={setRangeValue}
                rangeValue={rangeValue}
              />
              <AllRatingFilter rating={rating} setRating={setRating} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={matches1026 ? 12 : 9}>
            {allVendors?.length > 0 ? (
              <AllVendorsGrid
                allVendors={filteredVendors}
                search={search}
                setSearch={setSearch}
                vendorSort={vendorSort}
                setVendorSort={setVendorSort}
                date={date}
                time={time}
              />
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
