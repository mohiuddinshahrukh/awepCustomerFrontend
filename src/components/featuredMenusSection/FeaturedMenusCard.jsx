import { Box, Paper, ScrollArea, Text, Title } from "@mantine/core";
import React from "react";

const FeaturedMenusCard = () => {
  return (
    <Paper
      withBorder
      component={ScrollArea}
      shadow="md"
      p="xl"
      radius="md"
      // sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title align="center" order={3} className={classes.title}>
          {menuName}
        </Title>
        <Title align="center" order={4}>
          PKR: {menuPrice} PER HEAD
        </Title>

        {dishCategoriesFinalArray.map((dishCategory, globalIndex) => {
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
    </Paper>
  );
};

export default FeaturedMenusCard;
