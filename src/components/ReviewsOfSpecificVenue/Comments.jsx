import React from "react";
import { createStyles, Text, Avatar, Group } from "@mantine/core";
import RatingStars from "../RatingStars/RatingStars";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 100,
    // paddingTop: theme.spacing.sm,
  },
}));

const Comments = () => {
  const { classes } = useStyles();

  return (
    <div>
      <Group pt="xl">
        <Avatar src="{author.image}" alt="asdasd" radius="50%" size="xl" />
        <div>
          <Text size="sm">sdsadasdsa</Text>
          <Text size="xs" color="dimmed">
            "sadsadasd"
          </Text>
          <RatingStars dontShow={true} />
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        asdsadsadas
      </Text>
    </div>
  );
};

export default Comments;
