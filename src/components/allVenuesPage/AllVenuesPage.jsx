import { Container, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AllVenuesGrid from "./AllVenuesGrid";

const fetchAllVenues = async () => {
  try {
    const apiResponse = await axios.get(
      "https://a-wep.herokuapp.com/customer/getVenues"
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
const AllVenuesPage = () => {
  const [allVenues, setAllVenues] = useState([]);
  useEffect(() => {
    console.count();
    fetchAllVenues().then(setAllVenues);
  }, []);

  const matches1026 = useMediaQuery("(max-width: 1026px)");
  return (
    <Container size={"xl"}>
      <Grid>
        <Grid.Col hidden={matches1026 ? true : false} span={3}>
          Advance Search and Filters
        </Grid.Col>
        <Grid.Col span={matches1026 ? 12 : 9}>
          <AllVenuesGrid allVenues={allVenues} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AllVenuesPage;
