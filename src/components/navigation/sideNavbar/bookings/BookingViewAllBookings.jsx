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
// import borderLeftRight from "./AWEP_BORDER_LOGO_LEFT_RIGHT.svg";
// import borderTopBottom from "./AWEP_BORDER_LOGO_TOP_BOTTOM.svg";
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
const billHeadCells = [
  { title: "Item ", align: "left" },
  { title: "Item Cost Rs.", align: "right" },
];

const BookingViewAllBookings = ({ singleInvoice }) => {
  //

  const matches1200 = useMediaQuery("(min-width: 1200px)");
  const matches1000 = useMediaQuery("(min-width: 1000px)");
  const matches800 = useMediaQuery("(min-width: 800px)");
  const matches500 = useMediaQuery("(min-width: 500px)");
  //

  const [hallCharges, setHallCharges] = useState(
    singleInvoice?.subVenueBookingCharges
  );
  const [serviceCharges, setServiceCharges] = useState(
    singleInvoice?.selectedVenueServices
      ?.map(
        (service) =>
          service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
      )
      .reduce((a, b) => a + b, 0)
  );
  const [menuCharges, setMenuCharges] = useState(
    singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests
  );
  const [subtotalCharges, setSubtotalCharges] = useState(
    singleInvoice?.subVenueBookingCharges +
      singleInvoice?.selectedVenueServices
        ?.map(
          (service) =>
            service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
        )
        .reduce((a, b) => a + b, 0) +
      singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests
  );
  const [discountCharges, setDiscountCharges] = useState(
    (singleInvoice?.subVenueBookingCharges +
      singleInvoice?.selectedVenueServices
        ?.map(
          (service) =>
            service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
        )
        .reduce((a, b) => a + b, 0) +
      singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
      0.25
  );
  const [taxCharges, setTaxCharges] = useState(
    (singleInvoice?.subVenueBookingCharges +
      singleInvoice?.selectedVenueServices
        ?.map(
          (service) =>
            service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
        )
        .reduce((a, b) => a + b, 0) +
      singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
      0.17
  );
  const [totalCharges, setTotalCharges] = useState(
    singleInvoice?.subVenueBookingCharges +
      singleInvoice?.selectedVenueServices
        ?.map(
          (service) =>
            service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
        )
        .reduce((a, b) => a + b, 0) +
      singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests +
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
        0.17 -
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
        0.25
  );
  const [totalDepositDue, setDepositDueCharges] = useState(
    (singleInvoice?.subVenueBookingCharges +
      singleInvoice?.selectedVenueServices
        ?.map(
          (service) =>
            service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
        )
        .reduce((a, b) => a + b, 0) +
      singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests +
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
        0.17 -
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
        0.25) *
      0.25
  );
  const [totalDepositRemainging, setDepositRemaingingCharges] = useState(
    singleInvoice?.subVenueBookingCharges +
      singleInvoice?.selectedVenueServices
        ?.map(
          (service) =>
            service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
        )
        .reduce((a, b) => a + b, 0) +
      singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests +
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
        0.17 -
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
        0.25 -
      (singleInvoice?.subVenueBookingCharges +
        singleInvoice?.selectedVenueServices
          ?.map(
            (service) =>
              service.servicePrice * (service.duration === "Per Event" ? 1 : 3)
          )
          .reduce((a, b) => a + b, 0) +
        singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests +
        (singleInvoice?.subVenueBookingCharges +
          singleInvoice?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
          0.17 -
        (singleInvoice?.subVenueBookingCharges +
          singleInvoice?.selectedVenueServices
            ?.map(
              (service) =>
                service.servicePrice *
                (service.duration === "Per Event" ? 1 : 3)
            )
            .reduce((a, b) => a + b, 0) +
          singleInvoice?.selectedMenu?.price * singleInvoice?.numberOfGuests) *
          0.25) *
        0.25
  );
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
  const serviceHeaders = (
    <tr>
      {servicesHeadCells?.map((headCell, index) => {
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
        ref={componentRef}
        p="md"
        m="md"
        style={{
          overflow: "auto",
          border: "1px solid #eaeaea",
          background: `rgba(255, 255, 255, .1) url(${WaterMark}) center center repeat-y`,
          backgroundSize: "80%",
          //   border: "15px solid transparent",
          //   borderImageSource: `url(${borderTopBottom})`,
          //   borderImageRepeat: "repeat",
          //   borderImageSlice: 46,
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
        <InvoiceHeaders title={"INVOICE"} />

        <Grid gutter={0} grow styles={{}}>
          <Grid.Col lg={6}>
            <Grid gutter={0} grow>
              {/*<Grid.Col>
                  <Text align="left">
                    <u>Invoice Details</u>
                  </Text>
                </Grid.Col>*/}
              <Grid.Col>
                <Text align="left">
                  <b>Invoice Date</b>:{" "}
                  {moment(new Date(singleInvoice?.createdAt)).format(
                    "DD-MMMM-YYYY"
                  )}{" "}
                </Text>
              </Grid.Col>

              <Grid.Col>
                <Text align="left">
                  <b>Invoice Number</b>: {randomInvoiceNumber}
                </Text>
              </Grid.Col>
              {/*              <Grid.Col>
  <Text align="left">Account Number: {randomAccountNumber}</Text>
  </Grid.Col>*/}
            </Grid>
          </Grid.Col>

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
        </Grid>
        <InvoiceHeaders title={"Subvenue Details"} />

        {matches500 ? (
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
        <InvoiceHeaders title={"Service Details"} />

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
                  <b>{serviceCharges?.toLocaleString()}</b>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <>
            {singleInvoice?.selectedVenueServices?.map((service, index) => {
              return (
                <Paper key={index}>
                  <Paper>
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
                    {/*          <td>
<Text align="justify">{service?.serviceDescription}</Text>
</td>*/}
                  </Paper>
                  <Divider />
                </Paper>
              );
            })}

            <Text align="right" style={{ whiteSpace: "nowrap" }}>
              Total Rs.
              <b>{serviceCharges?.toLocaleString()}</b>
            </Text>
          </>
        )}
        <InvoiceHeaders title={"Menu Details"} />

        {matches500 ? (
          <Table striped withBorder withColumnBorders>
            <thead>{menuHeaders}</thead>
            <tbody>
              <tr>
                <td align="center">1</td>
                <td>{singleInvoice?.selectedMenu?.menu?.menuTitle}</td>

                <td>
                  {/*<Group spacing={3}>*/}
                  <List>
                    {singleInvoice?.selectedMenu?.menu?.dishes?.map(
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
              <b>{singleInvoice?.selectedMenu?.menu?.menuTitle}</b>
            </Text>
            <Text mb={3}>
              {/*<Group spacing={3}>*/}
              <List>
                {singleInvoice?.selectedMenu?.menu?.dishes?.map(
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
          <Text size={invoiceTextSize} color={invoiceTextColor} align="center">
            Billing Details
          </Text>
        </Paper>
        <Grid>
          {" "}
          <Grid.Col hidden={matches500 ? false : true} span={6}>
            <Center>
              <Image
                height={300}
                width={300}
                src={
                  singleInvoice.paymentStatus === "ADVANCE PAID"
                    ? AdvanceStamp
                    : CompleteStamp
                }
              />
            </Center>
            <Text>Paid Via Stripe</Text>
            <Text>Advance Amount is Not Refundable</Text>
            <Text>
              The Venue is liable to change its payment policy at anytime
              without prior notice
            </Text>
          </Grid.Col>
          <Grid.Col lg={6}>
            {" "}
            <Table striped withBorder withColumnBorders>
              <thead>{billHeaders}</thead>
              <tbody>
                <tr>
                  <td align="left">Hall Charges</td>
                  <td align="right">
                    <b>{hallCharges?.toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ whiteSpace: "nowrap" }}>
                    Service Charges
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>{serviceCharges?.toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left" style={{ whiteSpace: "nowrap" }}>
                    Menu Charges
                  </td>
                  <td align="right" style={{ whiteSpace: "nowrap" }}>
                    <b>{menuCharges?.toLocaleString()}</b>
                  </td>
                </tr>

                <tr>
                  <td align="left">Subtotal</td>
                  <td align="right">
                    <b>{subtotalCharges?.toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Discount <b>25%</b>
                  </td>
                  <td align="right">
                    -
                    <b>
                      {(
                        singleInvoice?.price?.totalPrice *
                        singleInvoice?.price?.discountPercentage
                      ).toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Tax <b>{singleInvoice?.price?.taxPercentage * 100}%</b>
                  </td>
                  <td align="right">
                    +
                    <b>
                      {(
                        singleInvoice?.price?.totalPrice *
                        singleInvoice?.price?.taxPercentage
                      ).toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left">Total</td>
                  <td align="right">
                    <b>
                      {singleInvoice?.price?.totalPriceAfterTaxAndDiscount?.toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Deposit <b>PAID</b>
                  </td>
                  <td align="right">
                    <b>{singleInvoice?.price?.paidAmount?.toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Deposit <b>REMAINING</b>
                  </td>
                  <td align="right">
                    <b>
                      {singleInvoice?.price?.remainingAmount?.toLocaleString()}
                    </b>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default BookingViewAllBookings;
