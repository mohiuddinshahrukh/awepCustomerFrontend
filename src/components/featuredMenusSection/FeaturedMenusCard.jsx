import {
  Box,
  createStyles,
  Paper,
  ScrollArea,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    height: 400,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    // color: theme.black,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  dishCategory: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
const FeaturedMenusCard = ({ menu }) => {
  let menuName = menu?.menuTitle ? menu?.menuTitle : "Menu Name";
  let menuPrice = menu?.price ? menu?.price : "Menu Price";
  let dishes = menu?.dishes;

  const { classes } = useStyles();
  let dishCategoriesArray = dishes?.map((dish, index) => {
    return dish?.dishCategory;
  });
  let dishCategoriesFinalArray = Array?.from(new Set(dishCategoriesArray));
  return (
    <Paper
      component={Link}
      to={`/specificVenue/${menu?.venueId}`}
      p="xl"
      radius="md"
      sx={{
        backgroundImage: `url(${menu.image})`,
        height: 400,
        width: 302,
        backgroundSize: "cover",
        backgroundPosition: "center",

        borderRadius: "0.5rem",
        ":hover": {
          boxShadow: "0 5px 12px #0003",

          // transform: "scale(1.005)",
        },
        boxShadow: "0 2px 8px #00000026",
        transition: "box-shadow .2s",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease",
        transitionDelay: "0s",
        transitionProperty: "box-shadow",
      }}
      className="border"
    >
      <ScrollArea style={{ height: "350px" }}>
        <div>
          <Title align="center" order={4}>
            {menu?.venue?.venueName}
          </Title>
          <Title align="center" order={3}>
            {menuName}
          </Title>
          <Title align="center" color={"red"} order={5}>
            PKR: {menuPrice} PER HEAD
          </Title>

          {dishCategoriesFinalArray?.map((dishCategory, globalIndex) => {
            return (
              <Box
                key={globalIndex}
                color="green"
                orientation="horizontal"
                label={dishCategory}
                size="md"
              >
                <Text
                  mt="sm"
                  style={{ color: "#95CE78" }}
                  size="lg"
                  align="center"
                >
                  {dishCategory}
                </Text>

                {dishes?.map((dish, localIndex) => {
                  if (dish.dishCategory === dishCategory) {
                    return (
                      <Text
                        align="center"
                        key={localIndex}
                        size="md"
                        // style={{ color: "black" }}
                      >
                        {dish.dishName}
                      </Text>
                    );
                  }
                })}
              </Box>
            );
          })}
        </div>
      </ScrollArea>
    </Paper>
  );
};

export default FeaturedMenusCard;
