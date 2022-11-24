import { Select } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

const fetchAllVendorsCategories = async () => {
  try {
    const apiResponse = await axios.get(
      "https://a-wep.herokuapp.com/customer/getVendorCategories"
    );

    if (apiResponse.data.status === "success") {
      console.log(
        "Successfully fetched all VENDOR CATEGORIES:",
        apiResponse.data.data
      );
      return apiResponse.data.data;
    } else if (apiResponse.data.status === "error") {
      console.log("Error while fetching all VENDOR CATEGORIES");
    } else {
      console.log(
        "Failed to fetch all VENDOR CATEGORIES, dont know this error"
      );
    }
  } catch (e) {
    console.log("ERROR in fetching all VENDOR CATEGORIES:", e);
  }
};
const AllVendorCategories = () => {
  const [allVendorsCategories, setAllVendorsCategories] = useState([]);
  useEffect(() => {
    console.count();
    fetchAllVendorsCategories().then(setAllVendorsCategories);
  }, []);

  return (
    <Select
      placeholder="Categories Filter"
      label="Categories Filter"
      defaultValue={"all"}
      data={[
        {
          value: "all",
          label: "all",
        },
      ].concat(
        allVendorsCategories.map((category) => {
          return {
            value: category.categoryTitle,
            label: category.categoryTitle,
          };
        })
      )}
    />
  );
};

export default AllVendorCategories;
