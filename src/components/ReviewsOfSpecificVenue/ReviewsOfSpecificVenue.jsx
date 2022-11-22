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

const ReviewsOfSpecificVenue = ({
  targetRef,
  rating,
  flexibility,
  responseTime,
  valueForMoney,
  qualityOfService,
  professionalism,
  ratingCount,
  reviews,
}) => {
  // const reviews = [1, 2, 3];
  return (
    <div
      ref={targetRef}
      style={{
        paddingTop: 40,
      }}
    >
      <Group position="apart" pb="xl">
        <Text weight="bold" size="lg">
          {ratingCount} Reviews
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
          <Text>
            Recommended By {((rating / 5) * 100)?.toFixed(1)} % of Users
          </Text>
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
                  {qualityOfService ? qualityOfService : 5}
                </Text>
              </Group>

              <Progress
                value={(qualityOfService * 100) / 5}
                mt={5}
                color={(qualityOfService * 100) / 5 > 80 ? "green" : "yellow"}
              />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Response Time
                </Text>
                <Text size="sm" color="dimmed">
                  {responseTime ? responseTime : 5}
                </Text>
              </Group>

              <Progress
                value={(responseTime * 100) / 5}
                mt={5}
                color={(responseTime * 100) / 5 > 80 ? "green" : "yellow"}
              />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Value For Money
                </Text>
                <Text size="sm" color="dimmed">
                  {valueForMoney ? valueForMoney : 5}
                </Text>
              </Group>

              <Progress
                value={(valueForMoney * 100) / 5}
                mt={5}
                color={(valueForMoney * 100) / 5 > 80 ? "green" : "yellow"}
              />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Flexibility
                </Text>
                <Text size="sm" color="dimmed">
                  {flexibility ? flexibility : 5}
                </Text>
              </Group>

              <Progress
                value={(flexibility * 100) / 5}
                mt={5}
                color={(flexibility * 100) / 5 > 80 ? "green" : "yellow"}
              />
            </div>
            <div>
              <Group position="apart" mt="xs">
                <Text size="sm" color="dimmed">
                  Professionalism
                </Text>
                <Text size="sm" color="dimmed">
                  {professionalism ? professionalism : 5}
                </Text>
              </Group>

              <Progress
                value={(professionalism * 100) / 5}
                mt={5}
                color={(professionalism * 100) / 5 > 80 ? "green" : "yellow"}
              />
            </div>
          </SimpleGrid>
        </div>
      </Group>
      {reviews?.map((review, index) => (
        <Comments key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewsOfSpecificVenue;
