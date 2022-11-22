import { useEffect, useState } from "react";
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
  Grid,
  NativeSelect,
  Checkbox,
  Paper,
  Avatar,
  Text,
  ActionIcon,
  Divider,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCalendar, IconChevronDown } from "@tabler/icons";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenusOfSpecificVenue from "../MenusOfSpecifcVenue/MenusOfSpecificVenue";
import MenusOfSpecificVenueForBooking from "../MenusOfSpecifcVenue/MenusOfSpecificVenueForBooking";

const NewBookingFile = () => {
  const [venueDetails, setVenueDetails] = useState();
  console.log("VENUE DETAILS are", venueDetails);
  const [refresh, setRefresh] = useState(true);
  const [idOfSelectedSubVenue, setIdOfSelectedSubVenue] = useState("");
  const [eventType, setEventType] = useState("");
  console.log("event type is", eventType);
  const [selectedVenueServices, setSelectedVenueServices] = useState([]);
  console.log("selectedVenueServices are", selectedVenueServices);

  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedVenueServiceObject, setSelectedVenueServiceObject] = useState(
    []
  );
  console.log("selectedVenueServiceObject is", selectedVenueServiceObject);
  const [checked, setChecked] = useState(false);
  const [hallCharges, setHallCharges] = useState(0);
  console.log("hall charges are", hallCharges);

  const [menuPrice, setMenuPrice] = useState(0);
  console.log("Totalprice", totalPrice);
  console.log("menuPrice", menuPrice);

  const [hidden, setHidden] = useState(true);

  const [selectedTheme, setSelectedTheme] = useState("");
  console.log("selected theme", selectedTheme);

  const [active, setActive] = useState(0);
  const params = useParams();
  console.log("params", params);
  const date = new Date(params.date);
  const time = params.time;
  const guests = params.guests;
  const venueId = params.venueId;
  useEffect(() => {
    if (venueDetails?.providedVenueServices?.length > 0) {
      if (
        selectedVenueServices.length ===
        venueDetails?.providedVenueServices?.length
      ) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    } else {
      setChecked(false);
    }
  }, [selectedVenueServices]);
  useEffect(() => {
    const url = `https://a-wep.herokuapp.com/customer/getSpecificVenueDetails/${venueId}`;
    if (refresh) {
      axios.get(url).then((res) => {
        console.log(res.data);
        if (res.data.status === "success") {
          console.log("we are here in api call");
          setVenueDetails(res.data.data);
          setRefresh(false);
        } else {
          alert("Error");
        }
      });
    }
  }, [refresh]);
  console.log("date is haha", date);
  const form = useForm({
    initialValues: {
      date: date,
      time: time,
      eventType: "",
      guests: guests,
      website: "",
      github: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          date: !values.date && "Date is required",
          time: !values.time && "Time is required",
          guests: !values.guests && "Guests is required",
        };
      }

      if (active === 1) {
        return {};
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container size="xl" my="xl">
      <Stepper active={active} breakpoint="sm">
        <Stepper.Step label="First step" description="Profile settings">
          <Grid>
            <Grid.Col>
              <NativeSelect
                required
                size="md"
                label="Event Type"
                placeholder="Event Type"
                data={[
                  {
                    value: "MEHNDI",
                    label: "MEHNDI",
                  },
                  {
                    value: "BARAT",
                    label: "BARAT",
                  },
                  {
                    value: "WALIMA",
                    label: "WALIMA",
                  },
                  {
                    value: "SEMINAR",
                    label: "SEMINAR",
                  },
                  {
                    value: "OTHER",
                    label: "OTHER",
                  },
                ]}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={40}
                {...form.getInputProps("eventType")}
              />
            </Grid.Col>

            <Grid.Col lg={6}>
              <DatePicker
                inputFormat="YYYY-MM-DD"
                size="md"
                required
                disabled
                minDate={dayjs(new Date())
                  .startOf("month")
                  .add(new Date().getDate(), "days")
                  .toDate()}
                maxDate={dayjs(new Date()).add(365, "days").toDate()}
                placeholder="Pick date"
                label="Event Date"
                icon={<IconCalendar size={16} />}
                {...form.getInputProps("date")}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <NativeSelect
                required
                disabled
                size="md"
                label="Event Time"
                placeholder="Time"
                data={[
                  {
                    value: "LUNCH",
                    label: "Lunch",
                  },
                  {
                    value: "DINNER",
                    label: "Dinner",
                  },
                ]}
                rightSection={<IconChevronDown size={14} />}
                rightSectionWidth={40}
                {...form.getInputProps("time")}
              />
            </Grid.Col>
            <Grid.Col lg={6}>
              <TextInput
                type="number"
                disabled
                size="md"
                min={49}
                required
                label="Number of Guests"
                placeholder="Enter Number of Guests"
                {...form.getInputProps("guests")}
              />
            </Grid.Col>
          </Grid>
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Personal information">
          <Grid>
            <Grid.Col lg={hidden ? 12 : 6}>
              <Checkbox
                size="md"
                label="Select All"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                onClick={() => {
                  const SelectedVenueServiceObjects =
                    venueDetails?.providedVenueServices;
                  if (!checked) {
                    setSelectedVenueServices(
                      venueDetails?.providedVenueServices?.map(
                        (m) => m.serviceTitle
                      )
                    );

                    console.log("555555", SelectedVenueServiceObjects);
                    setSelectedVenueServiceObject(SelectedVenueServiceObjects);

                    setTotalPrice(
                      SelectedVenueServiceObjects.reduce((acc, curr) => {
                        const price =
                          curr.duration === "Per Hour"
                            ? acc + curr.servicePrice * 3
                            : acc + curr.servicePrice;
                        return price;
                      }, 0)
                    );
                  } else {
                    setSelectedVenueServices([]);
                    setSelectedVenueServiceObject([]);
                    setTotalPrice(
                      totalPrice -
                        SelectedVenueServiceObjects.reduce((acc, curr) => {
                          const price =
                            curr.duration === "Per Hour"
                              ? acc + curr.servicePrice * 3
                              : acc + curr.servicePrice;
                          return price;
                        }, 0)
                    );
                  }
                }}
              />
              <Checkbox.Group
                value={selectedVenueServices}
                onChange={(e) => {
                  if (e.length > 0) {
                    setHidden(false);
                  } else {
                    setHidden(true);
                  }
                  setSelectedVenueServices(e);
                  const SelectedVenueServiceObjects =
                    venueDetails?.providedVenueServices?.filter((g) =>
                      e.includes(g.serviceTitle)
                    );
                  console.log("555555", SelectedVenueServiceObjects);
                  setSelectedVenueServiceObject(SelectedVenueServiceObjects);

                  setTotalPrice(
                    SelectedVenueServiceObjects.reduce((acc, curr) => {
                      const price =
                        curr.duration === "Per Hour"
                          ? acc + curr.servicePrice * 3
                          : acc + curr.servicePrice;
                      return price;
                    }, 0)
                  );
                }}
                // onChange={setSelectedVenueServices}
                size="md"
                pb="xl"
              >
                <Grid>
                  {venueDetails?.providedVenueServices?.map((row, index) => {
                    return (
                      <Grid.Col lg={12} key={index}>
                        <Group>
                          <Checkbox
                            key={row.serviceTitle}
                            value={row.serviceTitle}
                            label={
                              <Paper
                                style={{
                                  display: "flex",
                                  // justifyContent:"center"
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={row.coverImage} alt="it's me" />
                                <div
                                  style={{
                                    paddingLeft: "1rem",
                                  }}
                                >
                                  <Text align="justify">
                                    {row.serviceTitle}{" "}
                                    <b>
                                      (Rs.{" "}
                                      {row.servicePrice === 0
                                        ? "Complimentary"
                                        : row.servicePrice}
                                      )
                                    </b>
                                  </Text>

                                  <Text
                                    align="justify"
                                    size="xs"
                                    color="dimmed"
                                  >
                                    {row.serviceDescription}
                                  </Text>
                                </div>
                              </Paper>
                            }
                            pr="md"
                          />
                        </Group>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Checkbox.Group>
            </Grid.Col>
            {!hidden && (
              <Grid.Col lg={6}>
                <Paper withBorder radius="xl" p="xl">
                  <Grid justify="flex-end">
                    <Grid.Col lg={5}>
                      <Text weight="bold">Service Name</Text>
                    </Grid.Col>
                    <Grid.Col lg={2}>
                      <Text weight="bold"> Cost</Text>
                    </Grid.Col>
                    <Grid.Col lg={2}>
                      <Text weight="bold">Multiple</Text>
                    </Grid.Col>
                    <Grid.Col lg={3}>
                      <Text weight="bold">Total Cost</Text>
                    </Grid.Col>
                  </Grid>
                  <Divider p="sm" />

                  <Grid>
                    {selectedVenueServiceObject?.map((service, index) => (
                      <>
                        <Grid.Col lg={5} key={index}>
                          <Text weight="bold">
                            <Text>{service.serviceTitle}</Text>
                          </Text>
                        </Grid.Col>

                        <Grid.Col lg={2}>
                          <Text>Rs. {service.servicePrice}</Text>
                        </Grid.Col>
                        <Grid.Col lg={2}>
                          {service.duration === "Per Hour" ? (
                            <Text>3 Hours</Text>
                          ) : (
                            <Text>1 Event</Text>
                          )}
                        </Grid.Col>
                        <Grid.Col lg={3}>
                          {service.duration === "Per Hour" ? (
                            <Text>Rs. {service.servicePrice * 3}</Text>
                          ) : (
                            <Text>Rs. {service.servicePrice}</Text>
                          )}
                        </Grid.Col>
                      </>
                    ))}
                  </Grid>
                  <Divider p="sm" />
                </Paper>
              </Grid.Col>
            )}
          </Grid>
        </Stepper.Step>

        <Stepper.Step label="Third step" description="Personal information">
          <Group position="apart">
            <Text weight="bold" size="xl" py="md">
              Menu Selection
            </Text>
            <Text weight="bold" size="xl" py="md" color="red">
              Total <b>Rs. {hallCharges + totalPrice + menuPrice * guests}</b>
            </Text>
          </Group>
          {/* {venueDetails?.menus?.length !== 0 && ( */}
          <MenusOfSpecificVenueForBooking
            // targetRef={""}
            menus={venueDetails?.menus ? venueDetails?.menus : [{}]}
          />
          {/* )} */}
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Social media">
          <TextInput
            label="Website"
            placeholder="Website"
            {...form.getInputProps("website")}
          />
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps("github")}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.values, null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group position="right" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
      </Group>
    </Container>
  );
};
export default NewBookingFile;
