import React from "react";
import { createStyles, Text, Avatar, Group } from "@mantine/core";
import RatingStars from "../RatingStars/RatingStars";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 100,
    // paddingTop: theme.spacing.sm,
  },
}));

const Comments = ({ review }) => {
  const { classes } = useStyles();

  return (
    <div>
      <Group pt="xl">
        <Avatar
          src={review?.customerId ? review?.customerId?.profileImage : ""}
          alt="asdasd"
          radius="50%"
          size="xl"
        />
        <div>
          <Text size="sm">{review?.customerId?.name}</Text>
          <Text size="xs" color="dimmed">
            {review?.createdAt ? review?.createdAt?.split("T")[0] : ""}
          </Text>
          <RatingStars
            dontShow={true}
            rating={review.rating ? review.rating : 5}
          />
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {review?.customerReview ? review?.customerReview : ""}
      </Text>
    </div>
  );
};

export default Comments;
