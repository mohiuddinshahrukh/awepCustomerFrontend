import "./styling.css";

import {
  Grid,
  Paper,
  Text,
  Button,
  Checkbox,
  Group,
  Divider,
  ActionIcon,
  Avatar,
} from "@mantine/core";

import React from "react";
import { IconArrowLeft, IconArrowRight, IconEdit } from "@tabler/icons";

const ServiceSelection = (props) => {
  const {
    allSubVenues,
    allVenues,
    venue,
    idOfSelectedSubVenue,
    selectedSubVenueServices,
    setSelectedSubVenueServices,
    selectedSubVenueServiceObject,
    setSelectedSubVenueServiceObject,
    selectedVenueServices,
    setSelectedVenueServices,
    selectedVenueServiceObject,
    setSelectedVenueServiceObject,
    subVenueWiseServicePrices,
    venueWiseServicePrices,
    hallCharges,
    totalPrice,
    setTotalPrice,
    noOfGuests,
    menuPrice,
    checked,
    setChecked,
    checkedVenueServices,
    setCheckedVenueServices,
    setHidden,
    setOldServicePrice,
    setServiceTitle,
    setFreeService,
    matches1200,
    setAlterPrice,
    setAlterPriceId,
    prevStep,
    nextStep,
    setAlterServiceSelection,
    stagePrice,
  } = props;
  return (
    <>
      <Group position="apart">
        <Text weight="bold" size="xl" py="md">
          What Services Do You Want To Avail?
        </Text>
        <Text weight="bold" size="xl" py="md" color="red">
          Total without Tax and Discount :{" "}
          <strong>
            Rs. {hallCharges + totalPrice + stagePrice + menuPrice * noOfGuests}
          </strong>
        </Text>
      </Group>
      <Paper pb="xl">
        <Grid>
          <Grid.Col>
            <Divider size="md" />
          </Grid.Col>
          <Grid.Col>
            <Text underline weight="bold" align="center" size="lg" color="gray">
              Venue Services
            </Text>
          </Grid.Col>
          <Grid.Col>
            <Divider size="md" />
          </Grid.Col>
          <Grid.Col
            lg={
              !selectedVenueServiceObject ||
              selectedVenueServiceObject?.length === 0
                ? 12
                : 6
            }
          >
            <Checkbox
              size="md"
              label="Select All"
              checked={checkedVenueServices}
              onChange={() => {
                let allServices = allVenues
                  .filter((f) => f._id === venue)[0]
                  ?.providedVenueServices?.filter(
                    (f) => f.isAlsoSubVenueService !== true
                  );

                let allServicesTitle = allServices?.map((m) => m.serviceTitle);
                // MODIFY PRICES
                let prevServicePrices =
                  selectedVenueServiceObject?.reduce((a, b) => {
                    let price =
                      b.duration === "Per Hour"
                        ? b.servicePrice * 3
                        : b.servicePrice;
                    return a + price;
                  }, 0) || 0;

                if (!checkedVenueServices) {
                  let newServicePrices =
                    allServices.reduce((a, b) => {
                      let price =
                        b.duration === "Per Hour"
                          ? b.servicePrice * 3
                          : b.servicePrice;
                      return a + price;
                    }, 0) || 0;

                  setTotalPrice(
                    (prev) => prev + newServicePrices - prevServicePrices
                  );
                  // setVenueWiseServicePrices(newServicePrices);
                } else {
                  // setVenueWiseServicePrices(0);
                  setTotalPrice((prev) => prev - prevServicePrices);
                }
                // set array of titles to selectedSubVenueServices in form of [id]: [array of services]
                setSelectedVenueServices(
                  !checkedVenueServices ? allServicesTitle : []
                );
                // set array of serviceObjects to selectedSubVenueServiceObject in form of [id]: [array of serviceObjects]
                setSelectedVenueServiceObject(
                  !checkedVenueServices ? allServices : []
                );

                //////////////////////////////////////////
                //set checked
                setCheckedVenueServices(!checkedVenueServices ? true : false);
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

                const SelectedServiceObjects = allVenues
                  .filter((f) => f._id === venue)?.[0]
                  ?.providedVenueServices?.filter(
                    (f) => f.isAlsoSubVenueService !== true
                  )
                  ?.filter((g) => e.includes(g.serviceTitle));

                setSelectedVenueServiceObject(SelectedServiceObjects);

                let totalPrice = Object.values(selectedSubVenueServiceObject)
                  .flat()
                  .concat(SelectedServiceObjects)
                  .reduce((acc, curr) => {
                    const price =
                      curr.duration === "Per Hour"
                        ? acc + curr.servicePrice * 3
                        : acc + curr.servicePrice;
                    return price;
                  }, 0);

                setTotalPrice(totalPrice);

                if (
                  e.length ===
                  allVenues
                    .filter((f) => f._id === venue)[0]
                    ?.providedVenueServices?.filter(
                      (f) => f.isAlsoSubVenueService !== true
                    ).length
                ) {
                  setCheckedVenueServices(true);
                } else {
                  setCheckedVenueServices(false);
                }
              }}
              size="md"
              pb="xl"
            >
              <Grid>
                {allVenues
                  .filter((e) => e._id === venue)[0]
                  ?.providedVenueServices?.filter(
                    (f) => f.isAlsoSubVenueService !== true
                  )
                  ?.map((row) => {
                    return (
                      <React.Fragment key={row?._id}>
                        <Grid.Col lg={12}>
                          <Group noWrap position="apart">
                            <Checkbox
                              styles={{
                                label: {
                                  padding: "0",
                                  margin: "0",
                                },
                              }}
                              key={row.serviceTitle}
                              value={row.serviceTitle}
                              description={
                                row.serviceDescription?.length > 50
                                  ? row.serviceDescription.substring(0, 50) +
                                    "..."
                                  : row.serviceDescription
                              }
                              label={
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Avatar
                                    size="md"
                                    src={row.coverImage}
                                    name={row.serviceTitle}
                                    mx="sm"
                                  />
                                  {row.serviceTitle} (
                                  <b>
                                    {row.servicePrice === 0
                                      ? "Complimentary"
                                      : "Rs. " + row.servicePrice}
                                  </b>
                                  )
                                </div>
                              }
                              pr="md"
                            />
                            {selectedVenueServices?.includes(
                              row.serviceTitle
                            ) && (
                              <ActionIcon
                                onClick={() => {
                                  setOldServicePrice(row.servicePrice);
                                  setServiceTitle(row.serviceTitle);
                                  setFreeService(
                                    row.servicePrice === 0 ? true : false
                                  );
                                  setAlterPriceId(venue);
                                  setAlterPrice(true);
                                  setAlterServiceSelection("venue");
                                }}
                              >
                                <IconEdit />
                              </ActionIcon>
                            )}
                          </Group>
                        </Grid.Col>
                      </React.Fragment>
                    );
                  })}
              </Grid>
            </Checkbox.Group>
          </Grid.Col>
          {!(
            !selectedVenueServiceObject ||
            selectedVenueServiceObject?.length === 0
          ) &&
            matches1200 && (
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
                      <React.Fragment key={service?._id}>
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
                      </React.Fragment>
                    ))}
                  </Grid>
                  <Divider p="sm" />

                  <Grid>
                    <Grid.Col lg={9}>
                      <Text weight="bold">Total Price Of Services</Text>
                    </Grid.Col>
                    <Grid.Col lg={3}>
                      <Text weight="bold">
                        Rs. {venueWiseServicePrices || 0}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Paper>
              </Grid.Col>
            )}
        </Grid>
        {/* THIS IS FOR SUBVENUE  */}
        <Grid>
          {idOfSelectedSubVenue?.map((id) => {
            let specificSubVenue = allSubVenues.filter(
              (f) => f._id === id
            )?.[0];

            return (
              <React.Fragment key={id}>
                <Grid.Col>
                  <Divider size="md" />
                </Grid.Col>
                <Grid.Col>
                  <Text
                    underline
                    weight="bold"
                    align="center"
                    size="lg"
                    color="gray"
                  >
                    Services Of {specificSubVenue?.subVenueName}
                  </Text>
                </Grid.Col>
                <Grid.Col>
                  <Divider size="md" />
                </Grid.Col>
                <Grid.Col
                  lg={
                    !selectedSubVenueServiceObject[id] ||
                    selectedSubVenueServiceObject[id]?.length === 0
                      ? 12
                      : 6
                  }
                >
                  <Text
                    hidden={specificSubVenue?.subVenueServices?.length !== 0}
                    color="gray"
                    align="center"
                  >
                    No Services For This SubVenue
                  </Text>
                  {specificSubVenue?.subVenueServices?.length !== 0 && (
                    <Checkbox
                      size="md"
                      label="Select All"
                      checked={checked[id]}
                      onChange={() => {
                        let allServices = allSubVenues.filter(
                          (f) => f._id === id
                        )[0]?.subVenueServices;
                        let allServicesTitle = allServices.map(
                          (m) => m.serviceTitle
                        );
                        // MODIFY PRICES
                        let prevServicePrices =
                          selectedSubVenueServiceObject[id]?.reduce((a, b) => {
                            let price =
                              b.duration === "Per Hour"
                                ? b.servicePrice * 3
                                : b.servicePrice;
                            return a + price;
                          }, 0) || 0;

                        if (!checked[id]) {
                          let newServicePrices =
                            allServices.reduce((a, b) => {
                              let price =
                                b.duration === "Per Hour"
                                  ? b.servicePrice * 3
                                  : b.servicePrice;
                              return a + price;
                            }, 0) || 0;

                          setTotalPrice(
                            (prev) =>
                              prev + newServicePrices - prevServicePrices
                          );
                        } else {
                          setTotalPrice((prev) => prev - prevServicePrices);
                        }
                        // set array of titles to selectedSubVenueServices in form of [id]: [array of services]
                        setSelectedSubVenueServices((prev) => ({
                          ...prev,
                          [id]: !checked[id] ? allServicesTitle : [],
                        }));
                        // set array of serviceObjects to selectedSubVenueServiceObject in form of [id]: [array of serviceObjects]
                        setSelectedSubVenueServiceObject((prev) => ({
                          ...prev,
                          [id]: !checked[id] ? allServices : [],
                        }));

                        //////////////////////////////////////////
                        //set checked
                        setChecked((prev) => ({
                          ...prev,
                          [id]: !checked[id] ? true : false,
                        }));
                      }}
                    />
                  )}
                  <Checkbox.Group
                    value={selectedSubVenueServices?.[id]}
                    onChange={(e) => {
                      if (e.length > 0) {
                        setHidden(false);
                      } else {
                        setHidden(true);
                      }

                      setSelectedSubVenueServices((prev) => {
                        return {
                          ...prev,
                          [id]: e,
                        };
                      });

                      const SelectedServiceObjects = allSubVenues
                        .filter((f) => f._id === id)?.[0]
                        ?.subVenueServices.filter((g) =>
                          e.includes(g.serviceTitle)
                        );

                      let newServiceObject = {
                        ...selectedSubVenueServiceObject,
                        [id]: SelectedServiceObjects,
                      };
                      setSelectedSubVenueServiceObject(newServiceObject);
                      // setSubVenueWiseServicePrices((prev) => ({
                      //   ...prev,
                      //   [id]: SelectedServiceObjects.reduce((acc, curr) => {
                      //     const price =
                      //       curr.duration === "Per Hour"
                      //         ? acc + curr.servicePrice * 3
                      //         : acc + curr.servicePrice;
                      //     return price;
                      //   }, 0),
                      // }));

                      let totalPrice = Object.values(newServiceObject)
                        .flat()
                        .concat(selectedVenueServiceObject)
                        .reduce((acc, curr) => {
                          const price =
                            curr.duration === "Per Hour"
                              ? acc + curr.servicePrice * 3
                              : acc + curr.servicePrice;
                          return price;
                        }, 0);

                      setTotalPrice(totalPrice);

                      //set checked[id] if all services are selected
                      if (
                        e.length ===
                        allSubVenues.filter((f) => f._id === id)[0]
                          ?.subVenueServices.length
                      ) {
                        setChecked((prev) => ({
                          ...prev,
                          [id]: true,
                        }));
                      } else {
                        setChecked((prev) => ({
                          ...prev,
                          [id]: false,
                        }));
                      }
                    }}
                    size="md"
                    pb="xl"
                  >
                    <Grid>
                      {allSubVenues
                        .filter((e) => e._id === id)[0]
                        ?.subVenueServices.map((row) => {
                          return (
                            <>
                              <Grid.Col lg={12}>
                                <Group noWrap position="apart">
                                  <Checkbox
                                    styles={{
                                      label: {
                                        padding: "0",
                                        margin: "0",
                                      },
                                    }}
                                    key={row.serviceTitle}
                                    value={row.serviceTitle}
                                    description={
                                      row.serviceDescription?.length > 50
                                        ? row.serviceDescription.substring(
                                            0,
                                            50
                                          ) + "..."
                                        : row.serviceDescription
                                    }
                                    label={
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          size="md"
                                          src={row.coverImage}
                                          name={row.serviceTitle}
                                          mx="sm"
                                        />
                                        {row.serviceTitle} (
                                        <b>
                                          {row.servicePrice === 0
                                            ? "Complimentary"
                                            : "Rs. " + row.servicePrice}
                                        </b>
                                        )
                                      </div>
                                    }
                                    pr="md"
                                  />
                                  {selectedSubVenueServices?.[id]?.includes(
                                    row.serviceTitle
                                  ) && (
                                    <ActionIcon
                                      onClick={() => {
                                        setOldServicePrice(row.servicePrice);
                                        setServiceTitle(row.serviceTitle);
                                        setFreeService(
                                          row.servicePrice === 0 ? true : false
                                        );
                                        setAlterPriceId(id);
                                        setAlterPrice(true);
                                        setAlterServiceSelection("subVenue");
                                      }}
                                    >
                                      <IconEdit />
                                    </ActionIcon>
                                  )}
                                </Group>
                              </Grid.Col>
                            </>
                          );
                        })}
                    </Grid>
                  </Checkbox.Group>
                </Grid.Col>
                {!(
                  !selectedSubVenueServiceObject[id] ||
                  selectedSubVenueServiceObject[id]?.length === 0
                ) &&
                  matches1200 && (
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
                          {selectedSubVenueServiceObject?.[id]?.map(
                            (service, index) => (
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
                            )
                          )}
                        </Grid>
                        <Divider p="sm" />

                        <Grid>
                          <Grid.Col lg={9}>
                            <Text weight="bold">Total Price Of Services</Text>
                          </Grid.Col>
                          <Grid.Col lg={3}>
                            <Text weight="bold">
                              Rs. {subVenueWiseServicePrices[id] || 0}
                            </Text>
                          </Grid.Col>
                        </Grid>
                      </Paper>
                    </Grid.Col>
                  )}
              </React.Fragment>
            );
          })}
        </Grid>
        <Grid justify="flex-end" py="md">
          <Grid.Col xs={6} sm={3} md={3} lg={3}>
            <Button
              size="md"
              fullWidth
              variant="filled"
              color="red"
              // disabled={loading}
              leftIcon={<IconArrowLeft />}
              onClick={prevStep}
            >
              BACK
            </Button>
          </Grid.Col>
          <Grid.Col xs={6} sm={3} md={3} lg={3}>
            <Button
              size="md"
              fullWidth
              variant="filled"
              color="dark"
              rightIcon={<IconArrowRight />}
              onClick={nextStep}
            >
              NEXT
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default ServiceSelection;
