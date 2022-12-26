import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useListState, useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AdvanceFilterMenuCharges from "./AdvanceFilterMenuCharges";
import AdvanceFilterVenueCapacity from "./AdvanceFilterVenueCapacity";
import AdvanceFilterByCities from "./AdvanceFilterByCities";
import AdvanceFilterVenueServices from "./AdvanceFilterVenueServices";
import AdvanceSearchAndFilters from "./AdvanceFilterVenueType";
import AllVenuesGrid from "./AllVenuesGrid";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import AllRatingFilter from "./AllRatingFilter";
import moment from "moment";
import FiveCardsSkeleton from "../skeletons/SixCardsSkeleton";
import SearchBackgroundOpacityDiv from "../landingPage/searchAndBG/SearchBackgroundOpacityDiv";
import { Carousel } from "@mantine/carousel";
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
import { IconFilter, IconSearch, IconX } from "@tabler/icons";
import LoaderAWEP from "../LoaderAWEP/LoaderAWEP";
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
  let initialValues = [
    { value: "HALL", label: "Halls", checked: true },
    { value: "MARQUEE", label: "Marquees", checked: true },
    { value: "OUTDOOR", label: "Out Doors", checked: true },
  ];
  const [venueType, setVenueType] = useListState(initialValues);
  console.log("values in check boxes", venueType);
  const allChecked = venueType.every((value) => value.checked);
  const indeterminate = venueType.some((value) => value.checked) && !allChecked;
  const [refresh, setRefresh] = useState(true);

  const [filteredServices, setFilteredServices] = useState([]);
  const [reset, setReset] = useState(false);
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
  const [rangeValue, setRangeValue] = useState([minPrice, maxPrice]);

  const [search, setSearch] = useState("");
  console.log("search is", search);
  const [venueSort, setVenueSort] = useState("mostRelevant");

  const [opened, setOpened] = useState(false);

  const fetchAllVenueServices = async () => {
    try {
      const apiResponse = await axios.get(
        "https://a-wep.herokuapp.com/customer/getAllVenueServices"
      );
      console.log("API Response", apiResponse);
      if (apiResponse.data.status === "success") {
        setRefresh(false);

        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        console.log(
          "Error while fetching all venue services",
          apiResponse.data.error
        );
        setVisible(false);
      } else {
        console.log("Unknown Error: ", apiResponse.data.error);
      }
    } catch (error) {
      setVisible(false);
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
        setRangeValue([min, max]);

        setVisible(false);
        return apiResponse.data.data;
      } else if (apiResponse.data.status === "error") {
        console.log("Error while fetching all venues");
        setVisible(false);
      } else {
        console.log("Failed to fetch all venues, dont know this error");
        setVisible(false);
      }
    } catch (e) {
      console.log("ERROR in fetching all venues:", e);
      setVisible(false);
    }
  };

  const filterVenues = () => {
    console.log("Filtering venues", params.city);

    //filter venues according to the filter options
    let filteredVenues = allVenues?.filter((venue) => {
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
      if (venueCapacity?.length > 0) {
        let venueCapacityMatch = false;
        venueCapacity.forEach((capacity) => {
          if (capacity === "100") {
            if (
              venue?.subVenues?.some(
                (e) => e?.subVenueMinCapacity >= 0 && e?.subVenueCapacity <= 100
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "300") {
            if (
              venue?.subVenues?.some(
                (e) =>
                  e?.subVenueMinCapacity >= 100 && e?.subVenueCapacity <= 300
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "600") {
            if (
              venue?.subVenues?.some(
                (e) =>
                  e?.subVenueMinCapacity >= 300 && e?.subVenueCapacity <= 600
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "1000") {
            if (
              venue?.subVenues?.some(
                (e) =>
                  e?.subVenueMinCapacity >= 600 && e?.subVenueCapacity <= 1000
              )
            ) {
              venueCapacityMatch = true;
              return false;
            }
          } else if (capacity === "1500") {
            if (
              venue?.subVenues?.some(
                (e) =>
                  e?.subVenueMinCapacity >= 1000 && e?.subVenueCapacity <= 1500
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
        if (filteredArray?.length > 0) {
          console.log("MATCHED");
          venueTypeMatch = true;
        }

        if (!venueTypeMatch) {
          return false;
        }
      }
      if (filteredServices?.length > 0) {
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
          } else if (!subVenue.bookedOn) {
            dateMatch = true;
          }
        });
        if (!dateMatch) {
          return false;
        }
      }
      if (search !== "") {
        console.log("wea are in ifff", search);
        let searchMatch = false;
        if (venue?.venueName?.toLowerCase()?.includes(search?.toLowerCase())) {
          searchMatch = true;
        }
        if (venue?.subVenues?.length > 0) {
          venue?.subVenues?.forEach((subVenue) => {
            if (
              subVenue?.subVenueName
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

      if (minPriceFilter === 0 && maxPriceFilter === 100000) {
        return true;
      } else {
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
      }

      //filter venues which have venues and subVenues with name matching the search

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
    search,
    minPrice,
    maxPrice,
  ]);
  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const matches1026 = useMediaQuery("(max-width: 1026px)");
  const matches992 = useMediaQuery("(max-width: 992px)");
  const [visible, setVisible] = useState(true);

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
                <Image height={"40vh"} style={{}} src={image.src} />
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
          >
            <Group
              style={{ zIndex: 10 }}
              align={"flex-end"}
              px={matches992 ? "xl" : "lg"}
            >
              <Grid align={"flex-end"}>
                <Grid.Col sm={12} md={4} lg={3}>
                  {" "}
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
                  <Select
                    size={matches992 ? "md" : "lg"}
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
                </Grid.Col>
                <Grid.Col sm={12} md={12} lg={3}>
                  <Button
                    className="button"
                    size={matches992 ? "md" : "lg"}
                    component={Link}
                    to={`/allVenues${date ? "/date/" + date : ""}${
                      time ? "/time/" + time : ""
                    }${city ? "/city/" + city : ""}`}
                    uppercase
                    fullWidth

                    // to={searchSupplier === "venue" ? "/allVenues" : "/allVendors"}
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
            <AdvanceFilterMenuCharges
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              setMinPriceFilter={setMinPriceFilter}
              setMaxPriceFilter={setMaxPriceFilter}
              rangeValue={rangeValue}
              setRangeValue={setRangeValue}
            />
            <AdvanceSearchAndFilters
              setVenueType={setVenueType}
              venueType={venueType}
              indeterminate={indeterminate}
              allChecked={allChecked}
            />
            <AdvanceFilterVenueCapacity
              venueCapacity={venueCapacity}
              setVenueCapacity={setVenueCapacity}
            />
            {allServices?.length > 0 && (
              <AdvanceFilterVenueServices
                allServices={allServices}
                setFilteredServices={setFilteredServices}
                filteredServices={filteredServices}
                reset={reset}
                setReset={setReset}
              />
            )}
            <AllRatingFilter rating={rating} setRating={setRating} />
            {/* <AdvanceFilterVenuePrice /> */}

            {/* <AdvanceFilterHallCharges /> */}
            <Group position="center" noWrap>
              {city !== "all" ||
              date !== null ||
              time !== "" ||
              minPriceFilter !== 0 ||
              maxPriceFilter !== 100000 ||
              venueType === venueType.every((value) => value.checked) ||
              indeterminate === venueType.some((value) => value.checked) ||
              !allChecked ||
              venueCapacity.length !== 0 ||
              filteredServices.length !== 0 ||
              rating !== 0 ? (
                <Button
                  variant="outline"
                  className="buttonOutline"
                  onClick={() => {
                    setCity("all");
                    setDate(null);
                    setTime("");
                    setRating(0);
                    setVenueCapacity([]);

                    let minPriceReset = minPrice;
                    let maxPriceReset = maxPrice;
                    console.log("minPriceReset", minPriceReset);
                    console.log("maxPriceReset", maxPriceReset);
                    setMinPriceFilter(0);
                    setMaxPriceFilter(100000);
                    setMinPrice(minPriceReset);
                    setMaxPrice(maxPriceReset);
                    setRangeValue([minPriceReset, maxPriceReset]);
                    setVenueType.setState((current) =>
                      current.map((value) => ({
                        ...value,
                        checked: true,
                      }))
                    );
                    setReset(true);
                    setFilteredServices([]);
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
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%" }}
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
                <Text size={matches992 ? "md" : "lg"} align="left" weight={500}>
                  Advance Filters
                </Text>
                {city !== "" ||
                date !== null ||
                time !== "" ||
                minPriceFilter !== 0 ||
                maxPriceFilter !== 100000 ||
                venueType === venueType.every((value) => value.checked) ||
                indeterminate === venueType.some((value) => value.checked) ||
                !allChecked ||
                venueCapacity.length !== 0 ||
                filteredServices.length !== 0 ||
                rating !== null ? (
                  <Button
                    className="button"
                    size="sm"
                    align="right"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCity("");
                      setDate(null);
                      setTime("");
                      setRating(null);
                      setVenueCapacity([]);

                      let minPriceReset = minPrice;
                      let maxPriceReset = maxPrice;
                      console.log("minPriceReset", minPriceReset);
                      console.log("maxPriceReset", maxPriceReset);
                      setMinPriceFilter(0);
                      setMaxPriceFilter(100000);
                      setMinPrice(minPriceReset);
                      setMaxPrice(maxPriceReset);
                      setRangeValue([minPriceReset, maxPriceReset]);
                      setVenueType.setState((current) =>
                        current.map((value) => ({
                          ...value,
                          checked: true,
                        }))
                      );
                      setReset(true);
                      setFilteredServices([]);
                    }}
                  >
                    Reset
                  </Button>
                ) : null}
              </Group>

              <AdvanceFilterByCities city={city} setCity={setCity} />
              <AdvanceFilterMenuCharges
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                setMinPriceFilter={setMinPriceFilter}
                setMaxPriceFilter={setMaxPriceFilter}
                rangeValue={rangeValue}
                setRangeValue={setRangeValue}
              />
              <AdvanceSearchAndFilters
                setVenueType={setVenueType}
                venueType={venueType}
                indeterminate={indeterminate}
                allChecked={allChecked}
              />
              <AdvanceFilterVenueCapacity
                venueCapacity={venueCapacity}
                setVenueCapacity={setVenueCapacity}
              />
              {allServices?.length > 0 && (
                <AdvanceFilterVenueServices
                  allServices={allServices}
                  setFilteredServices={setFilteredServices}
                  filteredServices={filteredServices}
                  reset={reset}
                  setReset={setReset}
                />
              )}
              <AllRatingFilter rating={rating} setRating={setRating} />
              {/* <AdvanceFilterVenuePrice /> */}

              {/* <AdvanceFilterHallCharges /> */}
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={matches1026 ? 12 : 9}
            style={{
              position: "relative",
            }}
          >
            <LoaderAWEP visible={visible} />
            {allVenues?.length > 0 ? (
              <AllVenuesGrid
                date={date}
                time={time}
                allVenues={filteredVenues}
                search={search}
                setSearch={setSearch}
                venueSort={venueSort}
                setVenueSort={setVenueSort}
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

export default AllVenuesPage;
