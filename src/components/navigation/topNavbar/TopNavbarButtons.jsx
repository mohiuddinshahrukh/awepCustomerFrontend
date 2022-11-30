import { Button, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const TopNavbarButtons = ({ buttonsData }) => {
  const buttons = buttonsData?.map((button, index) => {
    return (
      <Button
        className={
          button.variant !== "outline" ? "bgColor hover" : "border fgColorF"
        }
        key={index}
        variant={button.variant}
        component={Link}
        to={button.path}
      >
        {button.title}
      </Button>
    );
  });
  return <Group>{buttons}</Group>;
};

export default TopNavbarButtons;
