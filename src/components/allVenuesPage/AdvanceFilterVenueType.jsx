// import { Select } from "@mantine/core";
// import React from "react";

// const venueTypes = [
//   {
//     value: "all",
//     label: "All",
//   },
//   { value: "HALL", label: "Halls" },
//   { value: "MARQUEE", label: "Marquees" },
//   { value: "OUTDOOR", label: "Outdoors" },
// ];
// const AdvanceFilterVenueType = ({
//   accordionsData,
//   venueType,
//   setVenueType,
// }) => {
//   console.log("ACCORDION DATA: ", accordionsData);
//   return (
//     <Select
//       label="Venue Types Filter"
//       defaultValue={"all"}
//       value={venueType}
//       onChange={setVenueType}
//       data={venueTypes}
//       placeholder="Venue Types Filter"
//     />
//   );
// };

// export default AdvanceFilterVenueType;

import { Checkbox, Input, Select, Text } from "@mantine/core";
import React, { useState } from "react";
import { useListState, randomId } from "@mantine/hooks";

const venueTypes = [
  {
    value: "all",
    label: "All",
  },
  { value: "HALL", label: "Halls" },
  { value: "MARQUEE", label: "Marquees" },
  { value: "OUTDOOR", label: "Outdoors" },
];
const AdvanceFilterVenueType = ({
  venueType,
  setVenueType,
  indeterminate,
  allChecked,
}) => {
  console.log("allChecked", allChecked);
  console.log("indeterminate", indeterminate);

  const items = venueType.map((value, index) => (
    <Checkbox
      // ml={}
      label={value.label}
      color="blue"
      key={value.key}
      checked={value.checked}
      onChange={(event) =>
        setVenueType.setItemProp(index, "checked", event.currentTarget.checked)
      }
    />
  ));

  return (
    <Input.Wrapper label="Filter By Venue Type">
      <Checkbox
        color="green"
        pt={5}
        checked={allChecked}
        indeterminate={indeterminate}
        label="All Venue Types"
        transitionDuration={0}
        onChange={() =>
          setVenueType.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </Input.Wrapper>
  );
};

export default AdvanceFilterVenueType;
