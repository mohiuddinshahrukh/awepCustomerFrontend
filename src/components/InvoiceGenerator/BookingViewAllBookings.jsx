import {
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import WaterMark from "./AWEP_WATERMARK.svg";

import InvoiceHeaders from "./InvoiceHeaders";
import AdvanceStamp from "./AWEP_ADVANCE_PAID_STAMP.svg";
import CompleteStamp from "./AWEP_COMPLETE_PAID_STAMP.svg";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandWhatsapp,
  IconDeviceMobile,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPrinter,
} from "@tabler/icons";

const subvenueHeadCells = [
  { title: "ID", align: "center" },
  { title: "Subvenue Title", align: "left" },
  { title: "", align: "" },

  { title: "Event Date & Time", align: "left" },
  // { title: "Hall Charges Rs.", align: "right" },
  // { title: "Persons", align: "right" },
];
const servicesHeadCells = [
  { title: "ID", align: "center" },
  { title: "Service", align: "left" },
  { title: "Duration", align: "left" },
  { title: "Individual Cost Rs.", align: "right" },
  { title: "Total Cost Rs.", align: "right" },
];
const menuHeadCells = [
  { title: "ID", align: "center" },
  { title: "Menu Title", align: "left" },
  { title: "Dishes", align: "left" },
  { title: "Cost Per Head Rs.", align: "right" },
];
const billHeadCells = [
  { title: "Item ", align: "left" },
  { title: "Item Cost Rs.", align: "right" },
  { title: "Per Head Rs.", align: "right" },
];

const BookingViewAllBookings = ({ singleInvoice }) => {
  //
  const matches500 = useMediaQuery("(min-width: 500px)");
  //

  const hallCharges = singleInvoice?.hallCharges;

  const venueServiceCharges = singleInvoice?.selectedVenueServices
    ?.map((service) => {
      return service?.duration === "Per Event"
        ? service?.servicePrice
        : service?.servicePrice * 3;
    })
    ?.reduce((a, b) => a + b, 0);

  const subvenueServiceCharges = Object.values(
    singleInvoice?.subVenueAndDataObject
  )
    ?.map((services) => {
      if (services?.selectedSubVenueServices?.length > 0) {
        return services?.selectedSubVenueServices
          ?.map((service) => {
            return service?.duration === "Per Event"
              ? service?.servicePrice
              : service?.servicePrice * 3;
          })
          ?.reduce((a, b) => a + b, 0);
      }
    })
    ?.reduce((a, b) => a + b, 0);
  const menuCharges =
    singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests;

  const stageCharges = singleInvoice?.selectedStage?.design?.price
    ? singleInvoice?.selectedStage?.design?.price
    : 0;
  const subtotalCharges =
    hallCharges + menuCharges + venueServiceCharges + subvenueServiceCharges;

  const discountCharges = (subtotalCharges * 0) / 100;
  const taxCharges = subtotalCharges * 0.17;

  const totalCharges = subtotalCharges - discountCharges + taxCharges;
  const totalDepositDue = (totalCharges * 20) / 100;

  const totalDepositRemainging = totalCharges - totalDepositDue;
  let iconSize = 20;
  let awepLogoSize = 40;
  let invoiceTextBG = "#1ABD9C";
  let invoiceTextColor = "white";
  let invoiceTextSize = 26;
  let randomInvoiceNumber = "23456789asbd";
  //   let randomAccountNumber = "173281sdba12d";

  const subvenueHeaders = (
    <tr>
      {subvenueHeadCells?.map((headCell, index) => {
        return (
          <th key={index} style={{ whiteSpace: "nowrap" }}>
            <Text align={headCell.align}>{headCell.title}</Text>
          </th>
        );
      })}
    </tr>
  );

  const subVenueRows = Object.values(singleInvoice?.subVenueAndDataObject)?.map(
    (subVenue, index) => {
      return (
        <tr>
          <td align="center">{index + 1}</td>
          <td>{subVenue?.subVenueName}</td>
          <td></td>
          <td align="left">
            {moment(new Date(singleInvoice?.bookingDate)).format(
              "DD-MMMM-YYYY"
            )}{" "}
            {singleInvoice?.bookingTime === "LUNCH"
              ? `${singleInvoice?.bookingTime} (12:00-3:00)`
              : `${singleInvoice?.bookingTime} (07:00-10:00)`}
          </td>
        </tr>
      );
    }
  );
  const serviceHeaders = (
    <tr>
      {servicesHeadCells?.map((headCell, index) => {
        return (
          <th key={index} style={{ whiteSpace: "nowrap", fontSize: "" }}>
            <Text align={headCell.align}>{headCell.title}</Text>
          </th>
        );
      })}
    </tr>
  );
  const menuHeaders = (
    <tr>
      {menuHeadCells?.map((headCell, index) => {
        return (
          <th key={index} style={{ whiteSpace: "nowrap" }}>
            <Text align={headCell.align}>{headCell.title}</Text>
          </th>
        );
      })}
    </tr>
  );
  const billHeaders = (
    <tr>
      {billHeadCells?.map((headCell, index) => {
        return (
          <th key={index} style={{ whiteSpace: "nowrap" }}>
            <Text align={headCell.align}>{headCell.title}</Text>
          </th>
        );
      })}
    </tr>
  );

  const serviceRows = singleInvoice?.selectedVenueServices?.map(
    (service, index) => {
      return (
        <tr key={index}>
          <td align="center">{index + 1}</td>
          <td>{service?.serviceTitle}</td>
          <td>{service?.duration}</td>
          {/*          <td>
              <Text align="justify">{service?.serviceDescription}</Text>
            </td>*/}
          <td align="right">
            <Text>
              {service?.servicePrice.toLocaleString()}
              {service?.duration === "Per Event" ? (
                <span
                  component={Text}
                  style={{ color: "GrayText", fontSize: 12 }}
                >
                  &nbsp;x 1
                </span>
              ) : (
                <span
                  component={Text}
                  style={{ color: "GrayText", fontSize: 12 }}
                >
                  &nbsp;x 3
                </span>
              )}
            </Text>
          </td>
          <td align="right">
            {" "}
            {service?.duration === "Per Event"
              ? service?.servicePrice.toLocaleString()
              : (service?.servicePrice * 3).toLocaleString()}
          </td>{" "}
        </tr>
      );
    }
  );
  const SubvenueServiceRows = Object.values(
    singleInvoice?.subVenueAndDataObject
  )?.map((services) => {
    if (services?.selectedSubVenueServices?.length > 0) {
      return (
        <Table>
          <thead>
            <tr style={{ backgroundColor: "#031B3C", color: "white" }}>
              <td
                colSpan={5}
                align="center"
                style={{ whiteSpace: "nowrap", fontSize: "22px" }}
              >
                Subvenue: {services?.subVenueName}
              </td>
            </tr>
          </thead>
          <thead>{serviceHeaders}</thead>

          <tbody>
            {services?.selectedSubVenueServices?.map((service, index) => {
              return (
                <>
                  <tr>
                    <td align="center">{index + 1}</td>
                    <td>{service?.serviceTitle}</td>
                    <td>{service?.duration}</td>
                    <td align="right">
                      <Text>
                        {service?.servicePrice?.toLocaleString()}
                        {service?.duration === "Per Event" ? (
                          <span
                            component={Text}
                            style={{ color: "GrayText", fontSize: 12 }}
                          >
                            &nbsp;x 1
                          </span>
                        ) : (
                          <span
                            component={Text}
                            style={{ color: "GrayText", fontSize: 12 }}
                          >
                            &nbsp;x 3
                          </span>
                        )}
                      </Text>
                    </td>
                    <td align="right">
                      {service?.duration === "Per Event"
                        ? service?.servicePrice?.toLocaleString()
                        : (service?.servicePrice * 3)?.toLocaleString()}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td align="right" style={{ whiteSpace: "nowrap" }}>
              Total&nbsp;Service&nbsp;Charges Rs.&nbsp;
              <b>
                {services?.selectedSubVenueServices
                  ?.map((data) => {
                    return data?.duration === "Per Event"
                      ? data?.servicePrice
                      : data?.servicePrice * 3;
                  })
                  ?.reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </b>
            </td>
          </tr>
        </Table>
      );
    } else {
    }
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `AWEP_Invoice_${singleInvoice?.subVenueName}_${singleInvoice?.customerName}_${singleInvoice?.pointOfContact?.phone}`,
    content: () => componentRef.current,
    copyStyles: true,
    pageStyle: { margin: "10px" },
  });
  return (
    <Paper style={{ width: "100%" }}>
      <Button
        rightIcon={<IconPrinter />}
        uppercase
        color="dark"
        size="md"
        onClick={() => {
          console.log("Downloading your invoice");
          handlePrint();
        }}
      >
        Print Invoice
      </Button>
      <Container
        fluid
        ref={componentRef}
        p="md"
        m="md"
        style={{
          overflow: "auto",
          border: "1px solid #eaeaea",
          background: `rgba(255, 255, 255, .1) url(${WaterMark}) center center repeat-y`,
          backgroundSize: "80%",
        }}
      >
        <div
          style={{
            border: "1px solid white",
            backgroundColor: "#031B3C",
            padding: "5px",
            color: "white",
            borderStyle: "inset",
          }}
        >
          <Title align="center">AWEP</Title>
        </div>
        <Text size={awepLogoSize} align="center">
          {singleInvoice?.venueName}
        </Text>
        <Group spacing={3} align="center" position="center">
          <IconMapPin size={iconSize} />
          <Text size="md">{singleInvoice?.venueId?.venueAddress}</Text>
        </Group>

        <Group spacing={3} align="center" position="center">
          <IconMail size={iconSize} />
          <Text size="md" align="center">
            {singleInvoice?.venueId?.infoEmail}
          </Text>
        </Group>
        <Group spacing="xs" align="center" position="center">
          <Group spacing={3} align="center" position="center">
            <IconPhone size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.venueId?.contactLandline}
            </Text>
          </Group>
          <Group spacing={3} align="center" position="center">
            <IconDeviceMobile size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.venueId?.contactPhone}
            </Text>
          </Group>
          <Group spacing={3} align="center" position="center">
            <IconBrandWhatsapp size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.venueId?.contactWhatsApp}
            </Text>
          </Group>
        </Group>
        <InvoiceHeaders colorOption={"#1ABD9C"} title={"INVOICE"} />

        <Grid gutter={0} grow styles={{}}>
          <Grid.Col lg={6}>
            <Grid gutter={0} grow styles={{}}>
              {/*<Grid.Col>
                  <Text align="left">
                    <u>Customer Details</u>
                  </Text>
                </Grid.Col>*/}
              <Grid.Col>
                <Text>
                  <Text>
                    <b>Name</b>: {singleInvoice?.customerName}
                  </Text>
                </Text>
              </Grid.Col>
              <Grid.Col>
                <Text>
                  <b>Contact Number</b>: {singleInvoice?.pointOfContact?.phone}
                </Text>
              </Grid.Col>
              <Grid.Col>
                <Text>
                  <b>Email</b>: {singleInvoice?.pointOfContact?.email}
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col lg={6}>
            <Grid gutter={0} grow>
              {/*<Grid.Col>
                <Text align="left">
                  <u>Invoice Details</u>
                </Text>
              </Grid.Col>*/}
              <Grid.Col>
                {singleInvoice?.createdAt && (
                  <Text align="left">
                    <b>Invoice Date</b>:{" "}
                    {moment(new Date(singleInvoice?.createdAt)).format(
                      "DD-MMMM-YYYY"
                    )}{" "}
                  </Text>
                )}
              </Grid.Col>

              <Grid.Col>
                {singleInvoice?.trackingId && (
                  <Text align="left">
                    <b>Invoice Number</b>: {singleInvoice?.trackingId}
                  </Text>
                )}
              </Grid.Col>
              <Grid.Col>
                {singleInvoice?.paymentStatus && (
                  <Text align="left">
                    <b>Payment Status</b>: {singleInvoice?.paymentStatus}
                  </Text>
                )}
              </Grid.Col>
              <Grid.Col>
                <Text align="left">
                  <b>Guests</b>:{" "}
                  {singleInvoice?.numberOfGuests?.toLocaleString()}
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <InvoiceHeaders colorOption={"#1ABD9C"} title={"Subvenue Details"} />

        {matches500 ? (
          <Table striped withBorder withColumnBorders>
            <thead>{subvenueHeaders}</thead>
            <tbody>
              {subVenueRows}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  Total Hall Charges Rs.{" "}
                  <b>{singleInvoice?.hallCharges?.toLocaleString()}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Paper>
            <Group position="center">
              {moment(new Date(singleInvoice?.bookingDate)).format(
                "DD-MMMM-YYYY"
              )}
            </Group>
            <Group position="center">
              {singleInvoice?.bookingTime === "LUNCH"
                ? `${singleInvoice?.bookingTime} (12:00-3:00)`
                : `${singleInvoice?.bookingTime} (07:00-10:00)`}
            </Group>
            <Group position="apart">
              <Text>Subvenue</Text>
              <Text>{singleInvoice?.subVenueName}</Text>
            </Group>
            <Group position="apart">
              <Text>Persons</Text>
              <Text>{singleInvoice?.numberOfGuests?.toLocaleString()}</Text>
            </Group>
            <Group position="apart">
              <Text>Hall Charges Rs.</Text>
              <Text>{hallCharges?.toLocaleString()}</Text>
            </Group>
          </Paper>
        )}
        <InvoiceHeaders colorOption={"#1ABD9C"} title={"Service Details"} />
        <Text align="center">Services breakdown</Text>
        <InvoiceHeaders
          title={`Venue: ${singleInvoice.venueName}`}
          colorOption={"#031B3C"}
        />
        {matches500 ? (
          <Table striped withBorder withColumnBorders>
            <thead>{serviceHeaders}</thead>
            <tbody>
              {serviceRows}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  Total&nbsp;Service&nbsp;Charges Rs.&nbsp;
                  <b>{venueServiceCharges?.toLocaleString()}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <>
            {singleInvoice?.selectedVenueServices?.map((service, index) => {
              return (
                <>
                  {" "}
                  <Paper key={index}>
                    <Group position="apart" spacing={3}>
                      <Text>{service?.serviceTitle}</Text>
                      <Text>{service?.duration}</Text>{" "}
                    </Group>
                    <Group position="apart" spacing={3}>
                      {" "}
                      <Text>
                        {service?.servicePrice.toLocaleString()}
                        {service?.duration === "Per Event" ? (
                          <span
                            component={Text}
                            style={{ color: "GrayText", fontSize: 12 }}
                          >
                            &nbsp;x 1
                          </span>
                        ) : (
                          <span
                            component={Text}
                            style={{ color: "GrayText", fontSize: 12 }}
                          >
                            &nbsp;x 3
                          </span>
                        )}
                      </Text>
                      <Text align="right">
                        {service?.duration === "Per Event"
                          ? service?.servicePrice.toLocaleString()
                          : (service?.servicePrice * 3).toLocaleString()}
                      </Text>
                    </Group>
                  </Paper>
                  <Divider />
                </>
              );
            })}

            <Text align="right" style={{ whiteSpace: "nowrap" }}>
              Total Rs.
              <b>{subvenueServiceCharges?.toLocaleString()}</b>
            </Text>
          </>
        )}

        {matches500 ? (
          <Table striped withBorder withColumnBorders>
            <tbody>{SubvenueServiceRows}</tbody>
          </Table>
        ) : (
          <>
            {singleInvoice?.selectedVenueServices?.map((service, index) => {
              return (
                <>
                  {" "}
                  <Paper key={index}>
                    <Group position="apart" spacing={3}>
                      <Text>{service?.serviceTitle}</Text>
                      <Text>{service?.duration}</Text>{" "}
                    </Group>
                    <Group position="apart" spacing={3}>
                      {" "}
                      <Text>
                        {service?.servicePrice.toLocaleString()}
                        {service?.duration === "Per Event" ? (
                          <span
                            component={Text}
                            style={{ color: "GrayText", fontSize: 12 }}
                          >
                            &nbsp;x 1
                          </span>
                        ) : (
                          <span
                            component={Text}
                            style={{ color: "GrayText", fontSize: 12 }}
                          >
                            &nbsp;x 3
                          </span>
                        )}
                      </Text>
                      <Text align="right">
                        {service?.duration === "Per Event"
                          ? service?.servicePrice.toLocaleString()
                          : (service?.servicePrice * 3).toLocaleString()}
                      </Text>
                    </Group>
                  </Paper>
                  <Divider />
                </>
              );
            })}

            <Text align="right" style={{ whiteSpace: "nowrap" }}>
              Total Rs.
              <b>{subvenueServiceCharges?.toLocaleString()}</b>
            </Text>
          </>
        )}
        <InvoiceHeaders colorOption={"#1ABD9C"} title={"Menu Details"} />

        {matches500 ? (
          <Table striped withBorder withColumnBorders>
            <thead>{menuHeaders}</thead>
            <tbody>
              <tr>
                <td align="center">1</td>
                <td>{singleInvoice?.selectedMenu?.modifiedMenu?.menuTitle}</td>

                <td>
                  {/*<Group spacing={3}>*/}
                  <List>
                    {singleInvoice?.selectedMenu?.modifiedMenu?.dishes?.map(
                      (dish, index) => {
                        return (
                          <List.Item p={0} m={0} key={index}>
                            {dish.dishName}
                          </List.Item>
                        );
                      }
                    )}
                  </List>
                  {/*</Group>*/}
                </td>

                <td align="right">
                  {singleInvoice?.selectedMenu?.price.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  <Text> Persons X Menu Cost Per Head</Text>
                  <Text>
                    Total Menu Cost Rs. <b>{menuCharges.toLocaleString()}</b>
                  </Text>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Paper>
            <Text align="left" mb={3}>
              <b>{singleInvoice?.selectedMenu?.modifiedMenu?.menuTitle}</b>
            </Text>
            <Text mb={3}>
              {/*<Group spacing={3}>*/}
              <List>
                {singleInvoice?.selectedMenu?.modifiedMenu?.dishes?.map(
                  (dish, index) => {
                    return (
                      <List.Item p={0} m={0} key={index}>
                        {dish.dishName}
                      </List.Item>
                    );
                  }
                )}
              </List>
              {/*</Group>*/}
            </Text>
            <Group position="apart">
              <Text>Menu Cost Per Head</Text>
              <Text>
                <b>{singleInvoice?.selectedMenu?.price.toLocaleString()}</b>
              </Text>
            </Group>
            <Group position="apart">
              <Text> Persons</Text>
              <Text>
                {" "}
                <b>{singleInvoice.numberOfGuests}</b>
              </Text>
            </Group>
            <Group position="apart">
              <Text> Total Menu Cost Rs</Text>
              <Text>
                <b>{menuCharges.toLocaleString()}</b>
              </Text>
            </Group>
          </Paper>
        )}

        {singleInvoice?.selectedVenueTheme?.theme && (
          <>
            <InvoiceHeaders colorOption={"#1ABD9C"} title={"Theme Details"} />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Theme Title</th>
                  <th>Color 1</th>
                  <th>Color 2</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[singleInvoice?.selectedVenueTheme.theme]?.map(
                  (theme, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{theme?.themeTitle}</td>
                        <td>
                          <div
                            style={{
                              border: `1px solid black`,
                              height: "35px",
                              width: "35px",
                              backgroundColor: theme?.themeColors?.[0],
                              borderRadius: "50%",
                            }}
                          ></div>
                        </td>
                        <td>
                          {" "}
                          <div
                            style={{
                              border: `1px solid black`,
                              height: "35px",
                              width: "35px",
                              backgroundColor: theme?.themeColors?.[1],
                              borderRadius: "50%",
                            }}
                          ></div>
                        </td>
                        <td>{theme?.themeDescription}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>{" "}
          </>
        )}

        {singleInvoice?.selectedStage.design && (
          <>
            <InvoiceHeaders colorOption={"#1ABD9C"} title={"Stage Details"} />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Stage Title</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {[singleInvoice.selectedStage.design]?.map((stage, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{stage?.stageTitle}</td>
                      <td>{stage?.price?.toLocaleString()}</td>
                      <td>{stage?.description}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td align="right">
                    Total Stage Cost Rs.{" "}
                    <b>
                      {singleInvoice?.selectedStage?.design?.price?.toLocaleString()}
                    </b>
                  </td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
        <InvoiceHeaders colorOption={"#1ABD9C"} title={"Customers Request"} />
        <Text
          align="justify"
          style={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {singleInvoice?.bookingDescription}
        </Text>
        <Paper
          withBorder
          style={{
            backgroundColor: invoiceTextBG,
            margin: "10px 0px",
            pageBreakBefore: "always",
          }}
        >
          <Text size={invoiceTextSize} color={invoiceTextColor} align="center">
            Billing Details
          </Text>
        </Paper>
        <Grid>
          <Grid.Col lg={12}>
            {" "}
            <Table striped withBorder withColumnBorders>
              <thead>{billHeaders}</thead>
              <tbody>
                <tr>
                  <td align="left">Hall Charges</td>
                  <td align="right">
                    <b>{hallCharges?.toLocaleString()}</b>
                  </td>
                  <td align="right">
                    <b>
                      {(
                        hallCharges / singleInvoice?.numberOfGuests
                      )?.toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ whiteSpace: "nowrap" }}>
                    Service Charges
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>
                      {(
                        subvenueServiceCharges + venueServiceCharges
                      ).toLocaleString()}
                    </b>
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>
                      {(
                        (subvenueServiceCharges + venueServiceCharges) /
                        singleInvoice?.numberOfGuests
                      ).toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ whiteSpace: "nowrap" }}>
                    Menu Charges
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>{menuCharges?.toLocaleString()}</b>
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>
                      {(
                        menuCharges / singleInvoice?.numberOfGuests
                      )?.toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ whiteSpace: "nowrap" }}>
                    Stage Charges
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>{stageCharges?.toLocaleString()}</b>
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>NA</b>
                  </td>
                </tr>
                {/*
<tr>
  <td align="left">Miscellaneous Charges</td>
  <td align="right">
    <b>NA</b>
  </td>
  <td align="right">
    <b>
      {(
        stageCharges / singleInvoice?.numberOfGuests
      )?.toLocaleString()}
    </b>
  </td>
</tr>*/}
                <tr>
                  <td align="left">Per Head Cost</td>
                  <td align="right"></td>
                  <td align="right">
                    <Text style={{ fontSize: "12px" }}>
                      <b style={{ fontSize: "14px" }}>
                        {(
                          subtotalCharges / singleInvoice.numberOfGuests
                        )?.toLocaleString()}
                      </b>
                      /per head
                    </Text>
                  </td>{" "}
                </tr>
                <tr>
                  <td align="left">Misc Cost (Stage, Decor)</td>
                  <td align="right"></td>
                  <td align="right">
                    <b>{stageCharges?.toLocaleString()}</b>
                  </td>{" "}
                </tr>

                <tr>
                  <td align="left">Subtotal</td>
                  <td align="left"></td>
                  <td align="right">
                    <b>{subtotalCharges?.toLocaleString()}</b>
                  </td>
                  {/*<td align="right">
                  <b>
                    {(
                      subtotalCharges / singleInvoice?.numberOfGuests
                    )?.toLocaleString()}
                  </b>
                </td>*/}
                </tr>
                <tr>
                  <td align="left">
                    Discount <b>25%</b>
                  </td>
                  <td></td>
                  <td align="right">
                    -<b>{discountCharges?.toLocaleString()}</b>
                  </td>
                  {/* <td align="right">
                 -
                 <b>
                   {(
                     discountCharges / singleInvoice?.numberOfGuests
                   )?.toLocaleString()}
                 </b>
               </td>*/}
                </tr>
                <tr>
                  <td align="left">
                    Tax <b>17%</b>
                  </td>
                  <td></td>
                  <td align="right">
                    +<b>{taxCharges?.toLocaleString()}</b>
                  </td>
                  {/*<td align="right">
                  +
                  <b>
                    {(
                      taxCharges / singleInvoice?.numberOfGuests
                    )?.toLocaleString()}
                  </b>
                </td>*/}
                </tr>
                <tr>
                  <td align="left">Total</td>
                  <td></td>
                  <td align="right">
                    <b>{totalCharges?.toLocaleString()}</b>
                  </td>
                  {/*<td align="right">
                  <b>
                    {(
                      totalCharges / singleInvoice?.numberOfGuests
                    )?.toLocaleString()}
                  </b>
                </td>*/}
                </tr>
                <tr>
                  <td align="left">
                    Deposit <b>PAID</b>
                  </td>
                  <td colSpan={2} align="right">
                    <b>{totalDepositDue?.toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Deposit <b>REMAINING</b>
                  </td>
                  <td colSpan={2} align="right">
                    <b>{totalDepositRemainging?.toLocaleString()}</b>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col hidden={matches500 ? false : true} span={12}>
            <Text weight={500}>
              <b>Terms & Conditions</b>
            </Text>
            <Text>
              Advance Amount is <b>Not</b> Refundable (Paid Via Stripe)
            </Text>
            <Text>
              The Venue is liable to change its payment policy at anytime{" "}
              <b>without prior notice</b>
            </Text>
            {singleInvoice?.venueId?.disAllowedVendors?.length > 0 ? (
              <Text>
                All vendors <b>except</b> the following are allowed to provide
                their services:{" "}
                {singleInvoice?.venueId?.disAllowedVendors?.map(
                  (vendor, index) => {
                    if (
                      index <
                      singleInvoice?.venueId?.disAllowedVendors?.length - 1
                    ) {
                      return <b>{vendor}, </b>;
                    } else {
                      return <b>{vendor}</b>;
                    }
                  }
                )}
              </Text>
            ) : (
              ""
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default BookingViewAllBookings;
