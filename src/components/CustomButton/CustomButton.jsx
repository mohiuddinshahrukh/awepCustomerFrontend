import { Button, createStyles } from "@mantine/core";
import React from "react";
const useStyles = createStyles(() => ({
  button: {
    backgroundColor: "#775A97",
    ":hover": {
      backgroundColor: "#56416D",
    },
  },
}));
const CustomButton = ({ title, navigateTo }) => {
  const { classes } = useStyles();

  return (
    <Button className={classes.button} radius="md">
      {title}
    </Button>
  );
};

export default CustomButton;
