import { Box, Select, Text } from "@mantine/core";
import React from "react";

const BottomNavbarSelectCity = () => {
  return (
    <Box>
      <Text weight={500} size={"lg"}>
        Choose a city
      </Text>
      <Select
        size="lg"
        radius={"md"}
        placeholder="Choose a city"
        data={[
          { value: "islamabad", label: "Islamabad" },
          { value: "rawalpindi", label: "Rawalpindi" },
          { value: "lahore", label: "Lahore" },
          { value: "karachi", label: "Karachi" },
        ]}
      />
    </Box>
  );
};

export default BottomNavbarSelectCity;
