import {
  Badge,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import moment from "moment";
import React from "react";
import Congrats from "./Congrats.png";

const BookingResponse = ({ bookingResponse }) => {
  return (
    <Stack>
      <Group position="apart">
        <Group position="left">
          <Text weight={900}>Booking ID: {bookingResponse?.trackingId}</Text>
        </Group>
        <Badge size="lg">New Booking</Badge>
      </Group>
      <Paper
        withBorder
        p="xl"
        shadow="md"
        sx={{
          ":hover": {
            transform: `scale(1.05)`,
            transition: "0.3s",
          },
        }}
      >
        <Grid>
          <Grid.Col span={6}>
            {bookingResponse?.subVenueAndDataObject &&
              Object.keys(bookingResponse?.subVenueAndDataObject).map((key) => {
                return (
                  <Text>
                    {bookingResponse?.subVenueAndDataObject[key]?.subVenueName}
                  </Text>
                );
              })}
            <Group position="left">
              <Text>
                {moment(bookingResponse?.bookingDate).format().split("T")[0]} /{" "}
                {bookingResponse?.bookingTime}
              </Text>
            </Group>

            <Group position="left">
              <Text>{bookingResponse?.eventType}</Text>
            </Group>
            <Group position="left">
              <Text>
                {bookingResponse?.numberOfGuests} <b>Persons</b>
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Image height={125} src={Congrats} />
          </Grid.Col>
        </Grid>
      </Paper>
      <Paper
        withBorder
        p="xl"
        shadow="md"
        sx={{
          ":hover": {
            transform: `scale(1.05)`,
            transition: "0.3s",
          },
        }}
      >
        <Group position="apart">
          <Text>Subtotal</Text>
          <Text>
            <b>{bookingResponse?.price?.totalPrice?.toLocaleString()}</b>
          </Text>
        </Group>
        <Group position="apart">
          <Text>Discount</Text>
          <Text>
            <b>
              {(
                bookingResponse?.price?.totalPrice *
                bookingResponse?.price?.discountPercentage
              )?.toLocaleString()}
            </b>
          </Text>
        </Group>
        <Group position="apart">
          <Text>Tax</Text>
          <Text>
            +
            <b>
              {(
                bookingResponse?.price?.totalPrice *
                bookingResponse?.price?.taxPercentage
              )?.toLocaleString()}
            </b>
          </Text>
        </Group>
        <Group position="apart">
          <Text>Total</Text>
          <Text>
            <b>
              {bookingResponse?.price?.totalPriceAfterTaxAndDiscount?.toLocaleString()}
            </b>
          </Text>
        </Group>
        <Divider />
        <Group position="apart">
          <Text>Amount Paid</Text>
          <Text>
            <b>
              {bookingResponse?.price?.paidAmount
                ?.toLocaleString()
                ?.toLocaleString()}
            </b>
          </Text>
        </Group>
        <Divider />
        <Group position="apart">
          <Text>Amount Remaining: </Text>
          <Text>
            {bookingResponse?.price?.remainingAmount?.toLocaleString()}
          </Text>
        </Group>
        <Divider />
      </Paper>
    </Stack>
  );
};

export default BookingResponse;
