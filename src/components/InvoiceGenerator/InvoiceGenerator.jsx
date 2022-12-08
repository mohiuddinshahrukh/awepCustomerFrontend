import {
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Table,
  Text,
} from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import WaterMark from "./AWEP_WATERMARK.svg";
// import borderLeftRight from "./AWEP_BORDER_LOGO_LEFT_RIGHT.svg";
// import borderTopBottom from "./AWEP_BORDER_LOGO_TOP_BOTTOM.svg";

const subvenueHeadCells = [
  { title: "ID", align: "center" },
  { title: "Subvenue Title", align: "left" },
  { title: "Event Date & Time", align: "left" },
  { title: "Hall Charges", align: "left" },
  { title: "Persons", align: "right" },
];
const servicesHeadCells = [
  { title: "ID", align: "center" },
  { title: "Service", align: "left" },
  { title: "Duration", align: "left" },
  // { title: "Details", align: "left" },
  { title: "Service Charge", align: "right" },
];
const menuHeadCells = [
  { title: "ID", align: "center" },
  { title: "Menu Title", align: "left" },
  { title: "Dishes", align: "left" },
  { title: "Cost Per Head", align: "right" },
];
const billHeadCells = [
  { title: "ID", align: "center" },
  { title: "Item", align: "left" },
  { title: "Item Cost", align: "right" },
];

const InvoiceGenerator = () => {
  const [singleInvoice, setSingleInvoice] = useState();
  const fetchData = async () => {
    let response = await axios.get(
      https://a-wep-production.herokuapp.com/superAdmin/getAllSubVenueBookings"
    );
    console.log("RESPONSE: ", response.data.data[0]);
    if (response) {
      setSingleInvoice(response.data.data[12]);
    } else {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    fetchData();
    // return () => {
    //   console.log("fetching  data");
    //   fetchData();
    //   console.log("fetched data");
    // };
  }, []);
  let awepLogoSize = 50;
  let invoiceTextBG = "#F8F9FA";
  let invoiceTextColor = "black";
  let invoiceTextSize = 32;

  let randomInvoiceNumber = "23456789asbd";
  let randomAccountNumber = "173281sdba12d";

  const subvenueHeaders = (
    <tr>
      {subvenueHeadCells.map((headCell, index) => {
        return (
          <th key={index} style={{ whiteSpace: "nowrap" }}>
            <Text align={headCell.align}>{headCell.title}</Text>
          </th>
        );
      })}
    </tr>
  );
  const serviceHeaders = (
    <tr>
      {servicesHeadCells.map((headCell, index) => {
        return (
          <th key={index} style={{ whiteSpace: "nowrap" }}>
            <Text align={headCell.align}>{headCell.title}</Text>
          </th>
        );
      })}
    </tr>
  );
  const menuHeaders = (
    <tr>
      {menuHeadCells.map((headCell, index) => {
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
      {billHeadCells.map((headCell, index) => {
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
          <td align="right">{service?.servicePrice.toLocaleString()}</td>
        </tr>
      );
    }
  );
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `AWEP_Invoice_${singleInvoice?.subVenueName}_${singleInvoice?.customerName}_${singleInvoice?.pointOfContact?.phone}`,
    content: () => componentRef.current,
    copyStyles: true,
    pageStyle: { margin: "10px" },
  });
  return (
    <Paper style={{ border: "1px solid red" }}>
      <Text>Print Invoice</Text>
      <Button
        onClick={() => {
          console.log("Downloading your invoice");
          handlePrint();
        }}
      >
        Print Invoice
      </Button>
      <Container
        ref={componentRef}
        p="md"
        m="md"
        style={{
          border: "1px solid #eaeaea",
          background: `rgba(255, 255, 255, .1) url(${WaterMark}) center center repeat-y`,
          backgroundSize: "80%",
          //   border: "15px solid transparent",
          //   borderImageSource: `url(${borderTopBottom})`,
          //   borderImageRepeat: "repeat",
          //   borderImageSlice: 46,
        }}
      >
        <Text size={awepLogoSize} align="center">
          AURA GRANDE VENUE
        </Text>

        <Paper
          withBorder
          style={{ backgroundColor: invoiceTextBG, margin: "10px 0px" }}
        >
          <Text size={invoiceTextSize} color={invoiceTextColor} align="center">
            INVOICE
          </Text>
        </Paper>

        <Grid gutter="xs" grow>
          <Grid.Col span={6}>
            <Grid>
              {/*<Grid.Col>
                <Text align="left">
                  <u>Invoice Details</u>
                </Text>
              </Grid.Col>*/}
              <Grid.Col>
                <Text align="left">
                  Invoice Date:{" "}
                  {moment(new Date(singleInvoice?.createdAt)).format(
                    "DD/MM/YYYY"
                  )}{" "}
                </Text>
              </Grid.Col>

              <Grid.Col>
                <Text align="left">Invoice Number: {randomInvoiceNumber}</Text>
              </Grid.Col>
              <Grid.Col>
                <Text align="left">Account Number: {randomAccountNumber}</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={6}>
            <Grid>
              {/*<Grid.Col>
                <Text align="left">
                  <u>Customer Details</u>
                </Text>
              </Grid.Col>*/}
              <Grid.Col>
                <Text>
                  <Text>Name: {singleInvoice?.customerName}</Text>
                </Text>
              </Grid.Col>
              <Grid.Col>
                <Text>
                  Contact Number: {singleInvoice?.pointOfContact?.phone}
                </Text>
              </Grid.Col>
              <Grid.Col>
                <Text>Email: {singleInvoice?.pointOfContact?.email}</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <Paper
          withBorder
          style={{ backgroundColor: invoiceTextBG, margin: "10px 0px" }}
        >
          <Grid>
            <Grid.Col span={12}>
              {" "}
              <Text
                size={invoiceTextSize}
                color={invoiceTextColor}
                align="left"
              >
                Subvenue Details
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
        <Table striped withBorder withColumnBorders>
          <thead>{subvenueHeaders}</thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>{singleInvoice?.subVenueName}</td>
              <td>
                {moment(new Date(singleInvoice?.bookingDate)).format(
                  "DD/MM/YYYY"
                )}{" "}
                {singleInvoice?.bookingTime}
              </td>
              <td>
                {singleInvoice?.subVenueBookingCharges === 0
                  ? "NO"
                  : singleInvoice?.subVenueBookingCharges}
              </td>
              <td align="right">
                {singleInvoice?.numberOfGuests.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </Table>

        <Paper
          withBorder
          style={{ backgroundColor: invoiceTextBG, margin: "10px 0px" }}
        >
          <Grid>
            <Grid.Col span={12}>
              {" "}
              <Text
                size={invoiceTextSize}
                color={invoiceTextColor}
                align="left"
              >
                Service Details
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
        <Table striped withBorder withColumnBorders>
          <thead>{serviceHeaders}</thead>
          <tbody>
            {serviceRows}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              {/*<td></td>*/}
              <td align="right" style={{ whiteSpace: "" }}>
                Total&nbsp;Service&nbsp;Charges:&nbsp;
                <b>
                  {singleInvoice?.selectedVenueServices
                    ?.map((service) => service.servicePrice)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </b>
              </td>
            </tr>
          </tbody>
        </Table>

        <Paper
          withBorder
          style={{ backgroundColor: invoiceTextBG, margin: "10px 0px" }}
        >
          <Grid>
            <Grid.Col span={12}>
              <Text
                size={invoiceTextSize}
                color={invoiceTextColor}
                align="left"
              >
                Menu Details
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>

        <Table striped withBorder withColumnBorders>
          <thead>{menuHeaders}</thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>{singleInvoice?.selectedMenu?.menu?.menuTitle}</td>

              <td>
                {/*<Group spacing={3}>*/}
                {singleInvoice?.selectedMenu?.menu?.dishes.map(
                  (dish, index) => {
                    return (
                      <Text p={0} m={0} key={index}>
                        {dish.dishName}{" "}
                        {singleInvoice?.selectedMenu?.menu?.dishes.length - 1 >
                        index
                          ? ","
                          : ""}
                      </Text>
                    );
                  }
                )}
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
                Total Menu Cost:{" "}
                <b>
                  {(
                    singleInvoice?.selectedMenu?.price *
                    singleInvoice?.numberOfGuests
                  ).toLocaleString()}
                </b>
              </td>
            </tr>
          </tbody>
        </Table>
        <Paper
          withBorder
          style={{ backgroundColor: invoiceTextBG, margin: "10px 0px" }}
        >
          <Grid>
            <Grid.Col span={12}>
              <Text
                size={invoiceTextSize}
                color={invoiceTextColor}
                align="left"
              >
                Customers Request
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
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
          <Grid>
            <Grid.Col span={12}>
              <Text
                size={invoiceTextSize}
                color={invoiceTextColor}
                align="left"
              >
                Billing
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
        <Table striped withBorder withColumnBorders>
          <thead>{billHeaders}</thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>Hall Charges</td>

              <td align="right">
                <b>{singleInvoice?.subVenueBookingCharges}</b>
              </td>
            </tr>
            <tr>
              <td align="center">2</td>
              <td>Service Charges</td>

              <td align="right" style={{ whiteSpace: "nowrap" }}>
                <b>
                  {singleInvoice?.selectedVenueServices
                    ?.map((service) => service.servicePrice)
                    .reduce((a, b) => a + b, 0)
                    .toLocaleString()}
                </b>
              </td>
            </tr>
            <tr>
              <td align="center">3</td>
              <td>Menu Charges</td>

              <td align="right" style={{ whiteSpace: "nowrap" }}>
                <b>
                  {(
                    singleInvoice?.selectedMenu?.price *
                    singleInvoice?.numberOfGuests
                  ).toLocaleString()}
                </b>
              </td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td align="right">
                Subtotal:{" "}
                <b>
                  {(
                    singleInvoice?.subVenueBookingCharges +
                    singleInvoice?.selectedVenueServices
                      ?.map((service) => service.servicePrice)
                      .reduce((a, b) => a + b, 0) +
                    singleInvoice?.selectedMenu?.price *
                      singleInvoice?.numberOfGuests
                  ).toLocaleString()}
                </b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right">
                Discount <b>25%</b> : -
                <b>
                  {(
                    (singleInvoice?.subVenueBookingCharges +
                      singleInvoice?.selectedVenueServices
                        ?.map((service) => service.servicePrice)
                        .reduce((a, b) => a + b, 0) +
                      singleInvoice?.selectedMenu?.price *
                        singleInvoice?.numberOfGuests) *
                    0.25
                  ).toLocaleString()}
                </b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right">
                Tax <b>17%</b> : +
                <b>
                  {(
                    (singleInvoice?.subVenueBookingCharges +
                      singleInvoice?.selectedVenueServices
                        ?.map((service) => service.servicePrice)
                        .reduce((a, b) => a + b, 0) +
                      singleInvoice?.selectedMenu?.price *
                        singleInvoice?.numberOfGuests) *
                    0.17
                  ).toLocaleString()}
                </b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right">
                Total:{" "}
                <b>
                  {(
                    singleInvoice?.subVenueBookingCharges +
                    singleInvoice?.selectedVenueServices
                      ?.map((service) => service.servicePrice)
                      .reduce((a, b) => a + b, 0) +
                    singleInvoice?.selectedMenu?.price *
                      singleInvoice?.numberOfGuests +
                    (singleInvoice?.subVenueBookingCharges +
                      singleInvoice?.selectedVenueServices
                        ?.map((service) => service.servicePrice)
                        .reduce((a, b) => a + b, 0) +
                      singleInvoice?.selectedMenu?.price *
                        singleInvoice?.numberOfGuests) *
                      0.17 -
                    (singleInvoice?.subVenueBookingCharges +
                      singleInvoice?.selectedVenueServices
                        ?.map((service) => service.servicePrice)
                        .reduce((a, b) => a + b, 0) +
                      singleInvoice?.selectedMenu?.price *
                        singleInvoice?.numberOfGuests) *
                      0.25
                  ).toLocaleString()}
                </b>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td align="right">
                Deposit Due:{" "}
                <b>
                  {(
                    (singleInvoice?.subVenueBookingCharges +
                      singleInvoice?.selectedVenueServices
                        ?.map((service) => service.servicePrice)
                        .reduce((a, b) => a + b, 0) +
                      singleInvoice?.selectedMenu?.price *
                        singleInvoice?.numberOfGuests +
                      (singleInvoice?.subVenueBookingCharges +
                        singleInvoice?.selectedVenueServices
                          ?.map((service) => service.servicePrice)
                          .reduce((a, b) => a + b, 0) +
                        singleInvoice?.selectedMenu?.price *
                          singleInvoice?.numberOfGuests) *
                        0.17 -
                      (singleInvoice?.subVenueBookingCharges +
                        singleInvoice?.selectedVenueServices
                          ?.map((service) => service.servicePrice)
                          .reduce((a, b) => a + b, 0) +
                        singleInvoice?.selectedMenu?.price *
                          singleInvoice?.numberOfGuests) *
                        0.25) *
                    0.25
                  ).toLocaleString()}
                </b>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Paper>
  );
};

export default InvoiceGenerator;
