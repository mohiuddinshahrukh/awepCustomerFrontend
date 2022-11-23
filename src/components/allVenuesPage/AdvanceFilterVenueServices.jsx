import React, { useEffect, useState } from "react";

import axios from "axios";
import { Accordion, Checkbox, Select } from "@mantine/core";
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

  return (
    <Select
      label="Services Filter"
      defaultValue={"all"}
      placeholder="Services Filter"
      data={[
        {
          value: "all",
          label: "all",
        },
      ].concat(
        allServices?.map((service) => {
          return {
            value: service.serviceTitle,
            label: service.serviceTitle,
          };
        })
      )}
    />
  );
};

export default AdvanceFilterVenueServices;
