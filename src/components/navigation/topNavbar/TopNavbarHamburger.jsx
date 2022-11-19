import { ActionIcon } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import React from "react";

const TopNavbarHamburger = ({ setDrawerState }) => {
  return (
    <ActionIcon>
      <IconMenu2
        onClick={() => {
          setDrawerState(true);
        }}
      />
    </ActionIcon>
  );
};

export default TopNavbarHamburger;
