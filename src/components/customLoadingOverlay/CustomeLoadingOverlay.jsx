import { LoadingOverlay } from "@mantine/core";
import React from "react";

const CustomeLoadingOverlay = ({ visible }) => {
  return (
    <LoadingOverlay
      visible={visible}
      loaderProps={{ size: "xl", color: "pink", variant: "bars" }}
      overlayOpacity={0.5}
      overlayColor="#c5c5c5"
    />
  );
};

export default CustomeLoadingOverlay;
