import React, { useEffect, useState } from "react";

import axios from "axios";
import { Accordion, Checkbox } from "@mantine/core";
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
const AdvanceFilterVenueServices = () => {
  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    fetchAllVenueServices().then(setAllServices);
    console.count();
  }, []);

  const services = allServices?.map((service, index) => {
    return (
      <Checkbox
        key={index}
        // onChange={(event) =>
        //   setVenueType(event.currentTarget.checked)
        // }
        value={service.serviceTitle}
        label={service.serviceTitle}
      />
    );
  });
  return (
    <Accordion defaultValue="Venue Services">
      <Accordion.Item value={"venueServices"}>
        <Accordion.Control>{"Venue Services"}</Accordion.Control>
        <Accordion.Panel>
          <Checkbox.Group

          // defaultValue={["react"]}
          >
            {services}
          </Checkbox.Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default AdvanceFilterVenueServices;
