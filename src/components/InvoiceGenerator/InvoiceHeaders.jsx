import { Paper, Text } from "@mantine/core";
import React from "react";
let awepLogoSize = 40;
let headerBackgroundColor = "#1ABD9C";
let headerTextColor = "white";
let headerTextSize = 26;
const InvoiceHeaders = ({ title }) => {
  return (
    <Paper
      withBorder
      style={{ backgroundColor: headerBackgroundColor, margin: "10px 0px" }}
    >
      <Text size={headerTextSize} color={headerTextColor} align="center">
        {title}
      </Text>
    </Paper>
  );
};

export default InvoiceHeaders;
