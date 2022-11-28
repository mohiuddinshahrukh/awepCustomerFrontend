import {
  Avatar,
  Center,
  createStyles,
  Grid,
  Group,
  Paper,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

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

const VenueFeedbackModal = ({ viewFeedbackData }) => {
  const matches1400 = useMediaQuery("(min-width: 1400px)");
  const matches1000 = useMediaQuery("(min-width: 1000px)");
  const matches500 = useMediaQuery("(min-width: 500px)");
  const { classes } = useStyles();
  const overallRating = [
    {
      label: "Total Review",
      value: viewFeedbackData.rating,
    },
    {
      label: "Service Quality ",
      value: viewFeedbackData.qualityOfService,
    },
    {
      label: "Responsiveness",
      value: viewFeedbackData.responseTime,
    },
    {
      label: "Professionalism",
      value: viewFeedbackData.professionalism,
    },
    {
      label: "Value For Money",
      value: viewFeedbackData.valueForMoney,
    },
    {
      label: "Flexibility",
      value: viewFeedbackData.flexibility,
    },
  ];
  console.log("FEEDBACK: ", viewFeedbackData);
  return (
    <Grid>
      <Grid.Col>
        <Paper
          style={{ borderBottom: "1px solid #eaeaea" }}
          radius="md"
          key={viewFeedbackData.customerId.name}
        >
          <Group>
            <Avatar
              src={viewFeedbackData.customerId.profileImage}
              alt={viewFeedbackData.customerId.name}
              size="xl"
            />
            <div>
              <Text size="lg">{viewFeedbackData.customerId.name}</Text>
              <Text size="md" color="dimmed">
                {viewFeedbackData.createdAt}
              </Text>
              <Text size="md" color="dimmed">
                {viewFeedbackData.customerId.email}
              </Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <div className={classes.content}>
              {viewFeedbackData.customerId.customerReview}
            </div>
          </TypographyStylesProvider>
          {viewFeedbackData.customerId.customerReview !== "" && (
            <>
              <Text weight="bold" pt="md">
                Feedback Reply from {viewFeedbackData.venueId.venueName}
              </Text>
              <TypographyStylesProvider className={classes.body}>
                <div className={classes.content}>
                  <p>{viewFeedbackData.customerId.customerReview}</p>
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
                <Text size="md">Venue Name: </Text>
                <Text size="md">{viewFeedbackData.venueId.venueName}</Text>
              </Group>
              <Group>
                <Text size="md">Sub Venue Name:</Text>
                <Text size="md">
                  {viewFeedbackData.subVenueId.subVenueName}
                </Text>
              </Group>
              <Group>
                <Text size="md">Booking Date:</Text>
                <Text size="md">
                  {viewFeedbackData.subVenueBookingId.bookingDate.split("T")[0]}
                </Text>
              </Group>
              <Group>
                <Text size="md">Booking Time:</Text>
                <Text size="md">
                  {viewFeedbackData.subVenueBookingId.bookingTime === "LUNCH"
                    ? "Lunch (12:00 PM - 04:00 PM)"
                    : "Dinner (07:00 PM - 10:00 PM)"}
                </Text>
              </Group>
            </>
          ) : (
            <>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Venue Name:
                </Text>
                <Text size="md">{viewFeedbackData.venueId.venueName}</Text>
              </Stack>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Sub Venue Name:
                </Text>
                <Text size="md">
                  {viewFeedbackData.subVenueId.subVenueName}
                </Text>
              </Stack>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Booking Date:
                </Text>
                <Text size="md">
                  {viewFeedbackData.subVenueBookingId.bookingDate.split("T")[0]}
                </Text>
              </Stack>
              <Stack spacing={0}>
                <Text size="md" weight={600}>
                  Booking Time:
                </Text>
                <Text size="md">
                  {viewFeedbackData.subVenueBookingId.bookingTime === "LUNCH"
                    ? "Lunch (12:00 PM - 04:00 PM)"
                    : "Dinner (07:00 PM - 10:00 PM)"}
                </Text>
              </Stack>
            </>
          )}
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default VenueFeedbackModal;
