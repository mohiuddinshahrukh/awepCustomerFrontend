// import React, { useEffect, useState } from "react";

// import axios from "axios";
// import { Accordion, Checkbox, Select } from "@mantine/core";
// const fetchAllVenueServices = async () => {
//   try {
//     const apiResponse = await axios.get(
//       "https://a-wep.herokuapp.com/customer/getAllVenueServices"
//     );
//     console.log("API Response", apiResponse);
//     if (apiResponse.data.status === "success") {
//       return apiResponse.data.data;
//     } else if (apiResponse.data.status === "error") {
//       console.log(
//         "Error while fetching all venue services",
//         apiResponse.data.error
//       );
//     } else {
//       console.log("Unknown Error: ", apiResponse.data.error);
//     }
//   } catch (error) {
//     console.log("Error in fetchAllVenueServices catch block", error);
//   }
// };
// const AdvanceFilterVenueServices = () => {
//   const [allServices, setAllServices] = useState([]);
//   useEffect(() => {
//     fetchAllVenueServices().then(setAllServices);
//     console.count();
//   }, []);

//   return (
//     <Select
//       label="Services Filter"
//       defaultValue={"all"}
//       placeholder="Services Filter"
//       data={[
//         {
//           value: "all",
//           label: "all",
//         },
//       ].concat(
//         allServices?.map((service) => {
//           return {
//             value: service.serviceTitle,
//             label: service.serviceTitle,
//           };
//         })
//       )}
//     />
//   );
// };

// export default AdvanceFilterVenueServices;
import { useListState, randomId } from "@mantine/hooks";
import { Checkbox, Input, Spoiler } from "@mantine/core";
import { useEffect } from "react";

const AdvanceFilterVenueServices = ({ allServices, setFilteredServices }) => {
  const initialValues = allServices?.map((service) => {
    return {
      value: service.serviceTitle,
      label: service.serviceTitle,
      checked: false,
    };
  });
  const [values, handlers] = useListState(initialValues);
  console.log("values of services", values);
  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  useEffect(() => {
    let services = values
      .filter((value) => value.checked)
      .map((value) => value.value);
    console.log("services are filtered", services);
    setFilteredServices(services);
  }, [values]);

  const items = values.map((value, index) => (
    <Checkbox
      key={value.value}
      // mt="xs"
      // ml={33}
      label={value.label}
      // key={value.key}
      checked={value.checked}
      onChange={(event) =>
        handlers.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  return (
    <Spoiler
      maxHeight={165}
      showLabel="Show More Services"
      hideLabel="Show Less Services"
      transitionDuration={0}
    >
      <Input.Wrapper label="Filter By Services">
        <Checkbox
          mt="xs"
          color="green"
          checked={allChecked}
          indeterminate={indeterminate}
          label="Select All Services"
          transitionDuration={0}
          onChange={() =>
            handlers.setState((current) =>
              current.map((value) => ({ ...value, checked: !allChecked }))
            )
          }
        />
        {items}
      </Input.Wrapper>{" "}
    </Spoiler>
  );
};

export default AdvanceFilterVenueServices;
