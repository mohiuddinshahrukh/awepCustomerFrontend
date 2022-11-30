import { Avatar, Card, Group, Paper, Stack, Text } from "@mantine/core";
import React from "react";

const CustomerTestimonialsCard = ({ testimonial }) => {
  return (
    <div>
      <Card
        className="border"
        sx={{
          height: "206px",
          width: "267px",
          boxSizing: "border-box",
          ":hover": {
            boxShadow: "0 5px 12px #0003",
            cursor: "pointer",
            transform: "translateY(-8px)",
          },
          transition: "transform .35s",
          boxShadow: "0 2px 8px #00000026",
          borderRadius: "0.5rem",
        }}
      >
        <Card.Section p={"lg"}>
          <Text lineClamp={1} size={"lg"} weight={500}>
            {testimonial.venueName}
          </Text>
        </Card.Section>
        <Card.Section px={"lg"}>
          <Text color={"dimmed"} lineClamp={4} size={"md"}>
            {testimonial.venueDescription}
          </Text>
        </Card.Section>
      </Card>
      <Group noWrap mt={"md"}>
        <Avatar size={"lg"} radius={"xl"} src={testimonial.coverImage} />
        <Stack spacing={0}>
          <Text lineClamp={1} weight={500}>
            {testimonial.infoEmail.split("@")[0]}
          </Text>
          <Text color={"dimmed"} lineClamp={1}>
            {testimonial.createdAt.split("T")[0]}
          </Text>
        </Stack>
      </Group>
    </div>
  );
};

export default CustomerTestimonialsCard;
