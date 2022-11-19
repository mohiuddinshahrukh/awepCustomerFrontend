import { Button, createStyles } from "@mantine/core";
import React from "react";
const useStyles = createStyles(() => ({
  button: {
    padding: "0.5rem 1rem",
    // backgroundColor: "#775A97",
    color: "#775A97",
    borderColor: "#775A97",
    ":hover": {
      color: "#ffffff",

      backgroundColor: "#56416D",
    },
  },
}));
const CustomButtonUnFilled = ({ title, navigateTo }) => {
  const { classes } = useStyles();

  return (
    <Button className={classes.button} radius="md" variant="outline">
      {title}
    </Button>
  );
};

export default CustomButtonUnFilled;
