import {
  Center,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import CustomButtonUnFilled from "../CustomButton/CustomButtonUnFilled";
import RatingStars from "../RatingStars/RatingStars";
import Comments from "./Comments";

const ReviewsOfSpecificVenue = ({ rating }) => {
  const reviews = [1, 2, 3];
  return (
    <div
      style={{
        paddingTop: 40,
      }}
    >
      <Group position="apart">
        <Text weight="bold" size="lg">
          33 Reviews
        </Text>
        <CustomButtonUnFilled title="Write A Review" />
      </Group>
      <Group>
        <div
          style={{
            border: "1px solid #E5E5E5",
            width: "180px",
            height: "180px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <Text align="center" size={50}>
              {rating ? rating.toFixed(1) : 0}
            </Text>
            <Text pb="xs" align="center">
              out of 5.0
            </Text>
            <RatingStars dontShow={true} />
          </div>
        </div>
        <div>
          <Text>Recommended By 100% of Users</Text>
          <SimpleGrid
            cols={3}
            breakpoints={[
              { maxWidth: "md", cols: 3, spacing: "sm" },
              { maxWidth: "sm", cols: 2, spacing: "sm" },
            ]}
          >
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Quality Of Service
                </Text>
                <Text size="sm" color="dimmed">
                  62%
                </Text>
              </Group>

              <Progress value={62} mt={5} />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Response Time
                </Text>
                <Text size="sm" color="dimmed">
                  62%
                </Text>
              </Group>

              <Progress value={62} mt={5} />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Value For Money
                </Text>
                <Text size="sm" color="dimmed">
                  62%
                </Text>
              </Group>

              <Progress value={62} mt={5} />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Flexibility
                </Text>
                <Text size="sm" color="dimmed">
                  62%
                </Text>
              </Group>

              <Progress value={62} mt={5} />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Professionalism
                </Text>
                <Text size="sm" color="dimmed">
                  62%
                </Text>
              </Group>

              <Progress value={62} mt={5} />
            </div>
          </SimpleGrid>
        </div>
      </Group>
      {reviews.map((e) => (
        <Comments />
      ))}
    </div>
  );
};

export default ReviewsOfSpecificVenue;
