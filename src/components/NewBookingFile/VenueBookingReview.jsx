import {
  ActionIcon,
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import moment from "moment";
import { useMediaQuery } from "@mantine/hooks";
import { createStyles } from "@mantine/core";
import { Edit } from "tabler-icons-react";
import { useState } from "react";
import { useEffect } from "react";
const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },
  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const VenueBookingReview = (props) => {
  useEffect(() => {}, [props.setDescription]);
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);
  const [editedDescription, setEditedDescription] = useState(false);
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const matches500 = useMediaQuery("(min-width: 500px)");
  var SRNo = 1;
  return (
    <div
      style={{
        border: "1px solid #c5c5c5",
        padding: "1rem",
      }}
    >
      <Modal
        padding="xl"
        size="xl"
        title="Edit Booking Description"
        opened={opened}
        onClose={() => {
          setOpened(!opened);
        }}
      >
        <Textarea
          minRows={10}
          maxLength={1000}
          label="Enter Description"
          defaultValue={props.description}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <Button
          onClick={() => {
            console.log("CLICKED");
            props.setDescription(editedDescription);
            setOpened(!opened);
          }}
        >
          Submit
        </Button>
      </Modal>
      <Title order={3} align="center">
        {props.allVenues
          .filter((e) => e._id === props.venue)
          .map((e) => e.venueName)}{" "}
      </Title>
      <Title order={3} align="center" pb="xl">
        {props.allSubVenues
          .filter((e) => e._id === props.idOfSelectedSubVenue)
          .map((e) => e.subVenueName)}
      </Title>
      <Grid
        justify="space-between"
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Grid.Col md={6}>
          <Group>
            <Text weight="bold">Event Date:</Text>
            {moment(props.value1).format().split("T")[0]}
          </Group>
          <Group>
            <Text weight="bold">Event Time:</Text>
            <Text>{props.time}</Text>
          </Group>
          <Group>
            <Text weight="bold">Event Type:</Text>
            <Text>{props.eventType}</Text>
          </Group>
          <Group>
            <Text weight="bold">Number of Guests:</Text>
            <Text>{props.noOfGuests} </Text>
          </Group>
        </Grid.Col>
        <Grid.Col md={6}>
          <Group>
            <Text weight="bold">Booking For:</Text>
            <Text>
              {props.allCustomers
                .filter((e) => e._id === props.customer)
                .map((e) => e.name)}
            </Text>
          </Group>
          <Group>
            <Text weight="bold">POC Phone:</Text>
            <Text>{props.phone}</Text>
          </Group>
          <Group>
            <Text weight="bold">POC Email:</Text>
            <Text>{props.email}</Text>{" "}
          </Group>
        </Grid.Col>
      </Grid>
      <Divider size="md" />
      {matches1200 && (
        <>
          <Grid
            justify="space-between"
            align="center"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Grid.Col lg={6}>
              <Text weight="bold">Particulars </Text>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Text weight="bold">Amount</Text>
            </Grid.Col>
          </Grid>
          <Divider size="md" />
          <Grid
            justify="space-between"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Grid.Col
              lg={6}
              style={{
                borderRight: "1px solid #e0e0e0",
              }}
            >
              <Grid>
                <Grid.Col lg={3}>
                  <Text weight="bold"> SR No. </Text>
                </Grid.Col>
                <Grid.Col lg={9}>
                  <Text weight="bold">Description </Text>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Grid>
                <Grid.Col lg={4}>
                  <Text weight="bold">Individual Cost</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                  <Text weight="bold">Multiple</Text>
                </Grid.Col>
                <Grid.Col lg={4}>
                  <Text weight="bold">Total Cost</Text>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
          <Divider />
        </>
      )}

      {props.hallCharges !== 0 && (
        <>
          {matches1200 ? (
            <Grid
              justify="space-between"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <Grid.Col
                lg={6}
                style={{
                  borderRight: "1px solid #e0e0e0",
                }}
              >
                <Grid>
                  <Grid.Col lg={3}>
                    <Text weight="bold">{SRNo++} </Text>
                  </Grid.Col>
                  <Grid.Col lg={9}>
                    <Text weight="bold">Hall Charges </Text>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
              <Grid.Col lg={6}>
                <Grid>
                  <Grid.Col lg={4}>
                    <Text weight="bold">{props.hallCharges}</Text>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <Text weight="bold">1</Text>
                  </Grid.Col>
                  <Grid.Col lg={4}>
                    <Text weight="bold">{props.hallCharges}</Text>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          ) : (
            <>
              <Group position="apart" py="md">
                <Title order={4}>Hall Charges</Title>

                <Text weight="bold">{props.hallCharges}</Text>
              </Group>
              <Divider />
            </>
          )}
        </>
      )}
      <Divider />

      {props.selectedVenueServiceObject?.map((service, index) => (
        <div
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          key={index}
        >
          {matches1200 ? (
            <>
              <Grid justify="space-between">
                <Grid.Col
                  lg={6}
                  style={{
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  <Grid>
                    <Grid.Col lg={3}>
                      <Text weight="bold">{SRNo++} </Text>
                    </Grid.Col>
                    <Grid.Col lg={9}>
                      <Text weight="bold">
                        <Text>{service.serviceTitle}</Text>
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col lg={6}>
                  <Grid>
                    <Grid.Col lg={4}>
                      <Text>Rs. {service.servicePrice}</Text>
                    </Grid.Col>
                    <Grid.Col lg={4}>
                      {service.duration === "Per Hour" ? (
                        <Text>3 Hours</Text>
                      ) : (
                        <Text>1 Event</Text>
                      )}
                    </Grid.Col>
                    <Grid.Col lg={4}>
                      {service.duration === "Per Hour" ? (
                        <Text>Rs. {service.servicePrice * 3}</Text>
                      ) : (
                        <Text>Rs. {service.servicePrice}</Text>
                      )}
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
              <Divider />
            </>
          ) : (
            <>
              <Title order={4}>{service.serviceTitle}</Title>
              <Group position="apart">
                <Text>Individual Cost</Text>
                <Text weight="bold">Rs. {service.servicePrice}</Text>
              </Group>
              <Group position="apart">
                <Text>Multiple</Text>
                {service.duration === "Per Hour" ? (
                  <Text weight="bold">3 Hours</Text>
                ) : (
                  <Text weight="bold">1 Event</Text>
                )}
              </Group>
              <Group position="apart">
                <Text>Total</Text>
                {service.duration === "Per Hour" ? (
                  <Text weight="bold">Rs. {service.servicePrice * 3}</Text>
                ) : (
                  <Text weight="bold">Rs. {service.servicePrice}</Text>
                )}
              </Group>
              <Divider />
            </>
          )}
        </div>
      ))}
      {props.selectedMenu && (
        <div
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          {matches1200 ? (
            <>
              <Grid justify="space-between">
                <Grid.Col
                  lg={6}
                  style={{
                    borderRight: "1px solid #e0e0e0",
                  }}
                >
                  <Grid>
                    <Grid.Col lg={3}>
                      <Text weight="bold">{SRNo++} </Text>
                    </Grid.Col>
                    <Grid.Col lg={9}>
                      <Text weight="bold">
                        <Text>{props.selectedMenu?.menuTitle}</Text>
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col lg={6}>
                  <Grid>
                    <Grid.Col lg={4}>
                      <Text>Rs. {props.selectedMenu?.price}</Text>
                    </Grid.Col>
                    <Grid.Col lg={4}>
                      <Text>{props.noOfGuests} Guests</Text>
                    </Grid.Col>
                    <Grid.Col lg={4}>
                      <Text>
                        Rs. {props.selectedMenu?.price * props.noOfGuests}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
              <Divider />
            </>
          ) : (
            <>
              <Title order={4}>{props.selectedMenu?.menuTitle}</Title>
              <Group position="apart">
                <Text>Per Person Cost</Text>
                <Text weight="bold">Rs. {props.selectedMenu?.price}</Text>
              </Group>
              <Group position="apart">
                <Text>Guests</Text>
                <Text>{props.noOfGuests} Guests</Text>
              </Group>
              <Group position="apart">
                <Text>Total</Text>
                <Text>Rs. {props.selectedMenu?.price * props.noOfGuests}</Text>
              </Group>
              <Divider />
            </>
          )}
        </div>
      )}

      <Grid align="flex-start" grow gutter="xs">
        <Grid.Col span={11}>
          <Stack spacing={3}>
            <Text weight="bold" size="md">
              Booking Description:
            </Text>
            <Text
              style={{
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              <i>{props.description}</i>
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}>
          <Group position="right">
            <ActionIcon
              onClick={() => {
                setOpened(!opened);
                console.log("Open modal @123");
              }}
            >
              <Edit />
            </ActionIcon>
          </Group>
        </Grid.Col>
      </Grid>

      <Divider size="md" />
      <Group position="apart" py="md">
        <Text weight="bold">
          <i>Total</i>
        </Text>
        <Text weight="bold">
          <i>
            Rs.{" "}
            {props.totalPrice +
              props.hallCharges +
              (props.selectedMenu?.price ? props.selectedMenu.price : 0) *
                props.noOfGuests}
          </i>
        </Text>
      </Group>
      <Divider size="md" />
      <Group position="apart" py="md">
        <Text weight="bold">
          <i>GST 0%</i>
        </Text>

        <Text weight="bold">Rs. 0</Text>
      </Group>
      <Divider size="md" />
      <Group position="apart" py="md">
        <Text weight="bold" color="red">
          <i>Grand Total</i>
        </Text>

        <Text weight="bold" color="red">
          Rs.{" "}
          {props.totalPrice +
            props.hallCharges +
            (props.selectedMenu?.price ? props.selectedMenu.price : 0) *
              props.noOfGuests}
        </Text>
      </Group>
      <Divider size="md" />
      {props.step === 5 ? (
        <Group position="apart" py="md">
          <Text weight="bold">
            <i>Amount Paid</i>
          </Text>

          <Text weight="bold">
            <i>Rs. 0</i>
          </Text>
        </Group>
      ) : (
        <Group position="apart" py="md">
          {props.step === 7 ? (
            <Text weight="bold">
              <i>Amount Paid</i>
            </Text>
          ) : (
            <Text weight="bold">
              <i>Amount Payable</i>
            </Text>
          )}

          <Text weight="bold">
            <i>
              Rs.{" "}
              {(props.totalPrice +
                props.hallCharges +
                (props.selectedMenu?.price ? props.selectedMenu.price : 0) *
                  props.noOfGuests) *
                0.2}
            </i>
          </Text>
        </Group>
      )}
      <Divider size="md" />
      {props.step === 5 ? (
        <Group position="apart" py="md">
          <Text weight="bold">
            <i>Remaining</i>
          </Text>

          <Text weight="bold">
            <i>
              Rs.{" "}
              {props.totalPrice +
                props.hallCharges +
                (props.selectedMenu?.price ? props.selectedMenu.price : 0) *
                  props.noOfGuests}
            </i>
          </Text>
        </Group>
      ) : (
        <Group position="apart" py="md">
          <Text weight="bold">
            <i>Remaining</i>
          </Text>

          <Text weight="bold">
            <i>
              Rs.{" "}
              {(props.totalPrice +
                props.hallCharges +
                (props.selectedMenu?.price ? props.selectedMenu.price : 0) *
                  props.noOfGuests) *
                0.8}
            </i>
          </Text>
        </Group>
      )}
    </div>
  );
};

export default VenueBookingReview;
