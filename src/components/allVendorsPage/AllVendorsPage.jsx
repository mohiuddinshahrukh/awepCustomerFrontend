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

import searchBackground from "../../assets/searchBackgroundCarouselImages/1.jpg";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import AllVendorsGrid from "./AllVendorsGrid";
import AllVendorCategories from "./AllVendorCategories";
import AllVendorCities from "./AllVendorCities";
import AllVendorDuration from "./AllVendorDuration";
import AllVendorsCustomerBudget from "./AllVendorsCustomerBudget";
import AllVendorRatingFilter from "./AllVendorRatingFilter";

const fetchAllVendors = async () => {
  try {
    const apiResponse = await axios.get(
      "https://a-wep.herokuapp.com/customer/getVendorBusinesses"
    );

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
const AllVendorsPage = () => {
  const [venueType, setVenueType] = useState([]);
  const [allVendors, setAllVendors] = useState([]);
  console.log("Venue Type", venueType);
  useEffect(() => {
    console.count();
    fetchAllVendors().then(setAllVendors);
  }, []);

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
                data={[
                  { value: "islamabad", label: "Islamabad" },
                  { value: "rawalpindi", label: "Rawalpindi" },
                  { value: "lahore", label: "Lahore" },
                  { value: "karachi", label: "Karachi" },
                ]}
              />
              <DatePicker
                size={"lg"}
                styles={{ label: { color: "white" } }}
                placeholder="Pick date"
                label="Event date"
                minDate={dayjs(new Date())
                  .startOf("month")
                  .add(5, "days")
                  .toDate()}
                maxDate={dayjs(new Date())
                  .endOf("month")
                  .subtract(5, "days")
                  .toDate()}
              />
              <Select
                size={"lg"}
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
              <Text size={"lg"} align="left" weight={500}>
                Advance Filters
              </Text>
              <AllVendorRatingFilter />
              <AllVendorCities />
              <AllVendorsCustomerBudget />
              <AllVendorCategories />
              <AllVendorDuration />
            </Stack>
          </Grid.Col>
          <Grid.Col span={matches1026 ? 12 : 9}>
            <AllVendorsGrid allVendors={allVendors} />
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default AllVendorsPage;
