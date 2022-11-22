import { Accordion, Checkbox } from "@mantine/core";
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

  const [categories, setCategories] = useState([]);
  const accordion = (
    <Accordion>
      <Accordion.Item value="categories">
        <Accordion.Control>Categories</Accordion.Control>
        <Accordion.Panel>
          <Checkbox.Group>
            {allVendorsCategories.map((category, index) => {
              return (
                <Checkbox
                  key={index}
                  checked={categories}
                  label={category.categoryTitle}
                  value={category.categoryTitle}
                  onChange={(event) =>
                    setCategories(event.currentTarget.checked)
                  }
                />
              );
            })}
          </Checkbox.Group>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
  return <div>{accordion}</div>;
};

export default AllVendorCategories;
