import { ActionIcon } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons";
import React from "react";

const TopNavbarHamburger = ({ setDrawerState }) => {
  return (
    <ActionIcon variant="outline" size={43} className="border fgColorF">
      <IconMenu2
        onClick={() => {
          setDrawerState(true);
        }}
      />
    </ActionIcon>
  );
};

export default TopNavbarHamburger;
