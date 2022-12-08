import {
  Button,
  Container,
  Grid,
  Group,
  List,
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
import {
  BrandWhatsapp,
  DeviceMobile,
  Mail,
  MapPin,
  Phone,
} from "tabler-icons-react";
import InvoiceHeaders from "./InvoiceHeaders";
// import borderLeftRight from "./AWEP_BORDER_LOGO_LEFT_RIGHT.svg";
// import borderTopBottom from "./AWEP_BORDER_LOGO_TOP_BOTTOM.svg";

const subvenueHeadCells = [
  { title: "ID", align: "center" },
  { title: "Subvenue Title", align: "left" },
  { title: "Event Date & Time", align: "left" },
  { title: "Hall Charges Rs.", align: "right" },
  { title: "Persons", align: "right" },
];
const servicesHeadCells = [
  { title: "ID", align: "center" },
  { title: "Service", align: "left" },
  { title: "Duration", align: "left" },
  { title: "Individual Cost Rs.", align: "right" },
  // { title: "Details", align: "left" },
  { title: "Total Cost Rs.", align: "right" },
];
const menuHeadCells = [
  { title: "ID", align: "center" },
  { title: "Menu Title", align: "left" },
  { title: "Dishes", align: "left" },
  { title: "Cost Per Head Rs.", align: "right" },
];
const billHeadCells = [{ title: "Item Cost Rs.", align: "right" }];
let iconSize = 20;
const InvoiceGenerator = () => {
  const [hallCharges, setHallCharges] = useState(0);
  const [serviceCharges, setServiceCharges] = useState(0);
  const [menuCharges, setMenuCharges] = useState(0);
  const [subtotalCharges, setSubtotalCharges] = useState(0);
  const [discountCharges, setDiscountCharges] = useState(0);
  const [taxCharges, setTaxCharges] = useState(0);
  const [totalCharges, setTotalCharges] = useState(0);
  const [totalDepositDue, setDepositDueCharges] = useState(0);
  const [totalDepositRemainging, setDepositRemaingingCharges] = useState(0);
  const [singleInvoice, setSingleInvoice] = useState();
  console.log("hallCharges", hallCharges);
  const fetchData = async () => {
    let response = await axios.get(
      "https://a-wep-production.herokuapp.com/superAdmin/getAllSubVenueBookings"
    );
    console.log("RESPONSE: ", response.data.data[0]);
    if (response) {
      const retrievedData = response.data.data[4];
      setSingleInvoice(retrievedData);
      setDepositRemaingingCharges(
        retrievedData?.subVenueBookingCharges +
          retrievedData?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests +
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price *
              retrievedData?.numberOfGuests) *
            0.17 -
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price *
              retrievedData?.numberOfGuests) *
            0.25 -
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests +
            (retrievedData?.subVenueBookingCharges +
              retrievedData?.selectedVenueServices
                ?.map(
                  (service) =>
                    service.servicePrice *
                    (service.duration === "Per Event" ? 1 : 3)
                )
                .reduce((a, b) => a + b, 0) +
              retrievedData?.selectedMenu?.price *
                retrievedData?.numberOfGuests) *
              0.17 -
            (retrievedData?.subVenueBookingCharges +
              retrievedData?.selectedVenueServices
                ?.map(
                  (service) =>
                    service.servicePrice *
                    (service.duration === "Per Event" ? 1 : 3)
                )
                .reduce((a, b) => a + b, 0) +
              retrievedData?.selectedMenu?.price *
                retrievedData?.numberOfGuests) *
              0.25) *
            0.25
      );
      setDepositDueCharges(
        (retrievedData?.subVenueBookingCharges +
          retrievedData?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests +
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price *
              retrievedData?.numberOfGuests) *
            0.17 -
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price *
              retrievedData?.numberOfGuests) *
            0.25) *
          0.25
      );
      setTotalCharges(
        retrievedData?.subVenueBookingCharges +
          retrievedData?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests +
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price *
              retrievedData?.numberOfGuests) *
            0.17 -
          (retrievedData?.subVenueBookingCharges +
            retrievedData?.selectedVenueServices
              ?.map(
                (service) =>
                  service.servicePrice *
                  (service.duration === "Per Event" ? 1 : 3)
              )
              .reduce((a, b) => a + b, 0) +
            retrievedData?.selectedMenu?.price *
              retrievedData?.numberOfGuests) *
            0.25
      );
      setTaxCharges(
        (retrievedData?.subVenueBookingCharges +
          retrievedData?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests) *
          0.17
      );
      setDiscountCharges(
        (retrievedData?.subVenueBookingCharges +
          retrievedData?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests) *
          0.25
      );
      setSubtotalCharges(
        retrievedData?.subVenueBookingCharges +
          retrievedData?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests
      );
      setMenuCharges(
        retrievedData?.selectedMenu?.price * retrievedData?.numberOfGuests
      );
      setServiceCharges(
        retrievedData?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0)
      );
      setHallCharges(retrievedData?.subVenueBookingCharges);
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
  let awepLogoSize = 40;
  let invoiceTextBG = "#F8F9FA";
  let invoiceTextColor = "black";
  let invoiceTextSize = 26;
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
            {service?.duration === "Per Event"
              ? service?.servicePrice.toLocaleString()
              : (service?.servicePrice * 3).toLocaleString()}
          </td>
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
    <Paper>
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
          {singleInvoice?.venueName}
        </Text>
        <Group spacing={3} align="center" position="center">
          <MapPin size={iconSize} />
          <Text size="md">{singleInvoice?.venueId?.venueAddress}</Text>
        </Group>

        <Group spacing={3} align="center" position="center">
          <Mail size={iconSize} />
          <Text size="md" align="center">
            {singleInvoice?.venueId?.infoEmail}
          </Text>
        </Group>
        <Group spacing="xs" align="center" position="center">
          <Group spacing={3} align="center" position="center">
            <Phone size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.venueId?.contactLandline}
            </Text>
          </Group>
          <Group spacing={3} align="center" position="center">
            <DeviceMobile size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.venueId?.contactPhone}
            </Text>
          </Group>
          <Group spacing={3} align="center" position="center">
            <BrandWhatsapp size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.venueId?.contactWhatsApp}
            </Text>
          </Group>
        </Group>
        <InvoiceHeaders title={"INVOICE"} />

        <Grid gutter={0} grow styles={{}}>
          <Grid.Col span={6}>
            <Grid gutter={0} grow>
              {/*<Grid.Col>
                <Text align="left">
                  <u>Invoice Details</u>
                </Text>
              </Grid.Col>*/}
              <Grid.Col>
                <Text align="left">
                  Invoice Date:{" "}
                  {moment(new Date(singleInvoice?.createdAt)).format(
                    "DD-MMMM-YYYY"
                  )}{" "}
                </Text>
              </Grid.Col>

              <Grid.Col>
                <Text align="left">Invoice Number: {randomInvoiceNumber}</Text>
              </Grid.Col>
              {/*              <Grid.Col>
<Text align="left">Account Number: {randomAccountNumber}</Text>
</Grid.Col>*/}
            </Grid>
          </Grid.Col>

          <Grid.Col span={6}>
            <Grid gutter={0} grow styles={{}}>
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
        <InvoiceHeaders title={"Subvenue Details"} />

        <Table striped withBorder withColumnBorders>
          <thead>{subvenueHeaders}</thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>{singleInvoice?.subVenueName}</td>
              <td>
                {moment(new Date(singleInvoice?.bookingDate)).format(
                  "DD-MMMM-YYYY"
                )}{" "}
                {singleInvoice?.bookingTime === "LUNCH"
                  ? `${singleInvoice?.bookingTime} (12:00-3:00)`
                  : `${singleInvoice?.bookingTime} (07:00-10:00)`}
              </td>
              <td align={"right"}>{hallCharges?.toLocaleString()}</td>
              <td align="right">
                {singleInvoice?.numberOfGuests?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td align="right" style={{ whiteSpace: "nowrap" }}>
                Total Hall Charges Rs. <b>{hallCharges?.toLocaleString()}</b>
              </td>
            </tr>
          </tbody>
        </Table>
        <InvoiceHeaders title={"Service Details"} />

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
                <b>{serviceCharges?.toLocaleString()}</b>
              </td>
            </tr>
          </tbody>
        </Table>
        <InvoiceHeaders title={"Menu Details"} />

        <Table striped withBorder withColumnBorders>
          <thead>{menuHeaders}</thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>{singleInvoice?.selectedMenu?.menu?.menuTitle}</td>

              <td>
                {/*<Group spacing={3}>*/}
                <List>
                  {singleInvoice?.selectedMenu?.menu?.dishes.map(
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
                Total Menu Cost Rs. <b>{menuCharges.toLocaleString()}</b>
              </td>
            </tr>
          </tbody>
        </Table>
        <InvoiceHeaders title={"Customers Request"} />

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
          <Text size={invoiceTextSize} color={invoiceTextColor} align="left" p>
            Billing
          </Text>
        </Paper>
        <Table striped withBorder withColumnBorders>
          <thead>{billHeaders}</thead>
          <tbody>
            <tr>
              <td align="right">
                Hall Charges Rs. <b>{hallCharges?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right" style={{ whiteSpace: "nowrap" }}>
                Service Charges Rs. <b>{serviceCharges?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right" style={{ whiteSpace: "nowrap" }}>
                Menu Charges Rs. <b>{menuCharges?.toLocaleString()}</b>
              </td>
            </tr>

            <tr>
              <td align="right">
                Subtotal: <b>{subtotalCharges?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right">
                Discount <b>25%</b> : -
                <b>{discountCharges?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right">
                Tax <b>17%</b> : +<b>{taxCharges?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right">
                Total Rs. <b>{totalCharges?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right">
                Deposit Due Rs. <b>{totalDepositDue?.toLocaleString()}</b>
              </td>
            </tr>
            <tr>
              <td align="right">
                Deposit Remainging Rs.{" "}
                <b>{totalDepositRemainging?.toLocaleString()}</b>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Paper>
  );
};

export default InvoiceGenerator;
