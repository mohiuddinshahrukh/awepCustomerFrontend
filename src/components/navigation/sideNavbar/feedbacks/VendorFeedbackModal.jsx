import {
  Avatar,
  Center,
  createStyles,
  Grid,
  Group,
  Modal,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import ReviewBreakDown from "./ReviewBreakDown";
const useStyles = createStyles((theme) => ({
  comment: {
    maxWidth: "500px",
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    // paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
  card: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));
const VendorFeedbackModal = ({ review }) => {
  console.log("FLOWED REVIEW", review);
  const matches1400 = useMediaQuery("(min-width: 1400px)");
  const matches1000 = useMediaQuery("(min-width: 1000px)");
  const matches500 = useMediaQuery("(min-width: 500px)");
  const { classes } = useStyles();
  const overallRating = [
    {
      label: "Total Review",
      value: review.rating,
    },
    {
      label: "Service Quality ",
      value: review.qualityOfService,
    },
    {
      label: "Responsiveness",
      value: review.responseTime,
    },
    {
      label: "Professionalism",
      value: review.professionalism,
    },
    {
      label: "Value For Money",
      value: review.valueForMoney,
    },
    {
      label: "Flexibility",
      value: review.flexibility,
    },
  ];
  return (
    <Grid>
      <Grid.Col>
        <Paper style={{ borderBottom: "1px solid #eaeaea" }} radius="md">
          <Group>
            <Avatar
              src={review.customerId.profileImage}
              alt={"An Image of the customer who left the review"}
              size="xl"
            />
            <div>
              <Text size="lg">{review.customerId.name}</Text>
              <Text size="md" color="dimmed">
                {review.createdAt}
              </Text>
              <Text size="md" color="dimmed">
                {review.customerId.email}
              </Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <div className={classes.content}>{}</div>
          </TypographyStylesProvider>
          {review.customerReview !== "" && (
            <>
              <Text weight="bold" pt="md">
                Feedback Reply from{" "}
                {review.vendorBusinessId.vendorBusinessTitle}
              </Text>
              <TypographyStylesProvider className={classes.body}>
                <div className={classes.content}>
                  <p>{review.customerReview}</p>
                </div>
              </TypographyStylesProvider>
            </>
          )}
          <Text weight="bold" pt="md">
            Review Break Down
          </Text>
          <SimpleGrid cols={matches1400 ? 3 : matches1000 ? 2 : 1}>
            {overallRating.map((rating, index) => {
              return (
                <Paper withBorder radius="md" key={index}>
                  <Group>
                    <RingProgress
                      size={80}
                      roundCaps
                      thickness={8}
                      sections={[
                        {
                          value: rating.value * 20,
                          color:
                            rating.value > 4
                              ? "green"
                              : rating.value > 2
                              ? "yellow"
                              : "red",
                        },
                      ]}
                      label={
                        <Center>
                          <Text weight={700} size="xl">
                            {rating.value}
                          </Text>
                        </Center>
                      }
                    />

                    <div>
                      <Text size="md" transform="uppercase" weight={700}>
                        {rating.label}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              );
            })}
          </SimpleGrid>
          <Text weight="bold" pt="md">
            Booking Details
          </Text>
          {matches500 ? (
            <>
              <Group>
                <Text size="md">Vendor name: </Text>
                <Text size="md">
                  {review.vendorBusinessId.vendorBusinessTitle}
                </Text>
              </Group>
              <Group>
                <Text size="md">Vendor Package Title:</Text>
                <Text size="md">
                  {review.vendorPackageId.vendorPackageTitle}
                </Text>
              </Group>
              <Group>
                <Text size="md">Booking Date:</Text>
                <Text size="md">
                  {review.vendorPackageBookingId.bookingDate.split("T")[0]}
                </Text>
              </Group>
            </>
          ) : (
            <>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Venue Name:
                </Text>
                <Text size="md">
                  {" "}
                  {review.vendorBusinessId.vendorBusinessTitle}
                </Text>
              </Stack>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Sub Venue Name:
                </Text>
                <Text size="md">
                  {review.vendorPackageId.vendorPackageTitle}
                </Text>
              </Stack>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Booking Date:
                </Text>
                <Text size="md">
                  {review.vendorPackageBookingId.bookingDate.split("T")[0]}
                </Text>
              </Stack>
            </>
          )}
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default VendorFeedbackModal;
