import {
  Center,
  // Button,
  Container,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Table,
  Text,
} from "@mantine/core";

import moment from "moment";
// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
import WaterMark from "./AWEP_WATERMARK.svg";
import AdvanceStamp from "./AWEP_ADVANCE_PAID_STAMP.svg";

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
const BookingReviewInvoiceAdvancePaid = (props) => {
  console.log("@PROPS: ", props);

  let awepLogoSize = 40;
  let invoiceTextBG = "#F8F9FA";
  let invoiceTextColor = "black";
  let invoiceTextSize = 26;
  let randomInvoiceNumber = "23456789asbd";
  // let randomAccountNumber = "173281sdba12d";

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

  return (
    <Container
      size="xl"
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
        {props?.allVenues
          ?.filter((e) => e._id === props.venue)
          ?.map((e) => e.venueName)}
      </Text>
      <Group spacing={3} align="center" position="center">
        <MapPin size={iconSize} />
        <Text size="md">
          {props?.allVenues
            ?.filter((e) => e._id === props.venue)
            ?.map((e) => e.venueAddress)}
        </Text>
      </Group>

      <Group spacing={3} align="center" position="center">
        <Mail size={iconSize} />
        <Text size="md" align="center">
          {props.allVenues
            .filter((e) => e._id === props.venue)
            .map((e) => e.infoEmail)}
        </Text>
      </Group>
      <Group spacing="xs" align="center" position="center">
        <Group spacing={3} align="center" position="center">
          <Phone size={iconSize} />
          <Text size="md" align="center">
            {props.allVenues
              .filter((e) => e._id === props.venue)
              .map((e) => e.contactLandline)}
          </Text>
        </Group>
        <Group spacing={3} align="center" position="center">
          <DeviceMobile size={iconSize} />
          <Text size="md" align="center">
            {props.allVenues
              .filter((e) => e._id === props.venue)
              .map((e) => e.contactPhone)}
          </Text>
        </Group>
        <Group spacing={3} align="center" position="center">
          <BrandWhatsapp size={iconSize} />
          <Text size="md" align="center">
            {props.allVenues
              .filter((e) => e._id === props.venue)
              .map((e) => e.contactWhatsApp)}
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
                {moment(new Date(Date.now())).format("DD-MMMM-YYYY")}{" "}
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
                <Text>
                  Name:{" "}
                  {props.allCustomers
                    .filter((e) => e._id === props.customer)
                    .map((e) => e.name)}
                </Text>
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Text>Contact Number: {props?.phone}</Text>
            </Grid.Col>
            <Grid.Col>
              <Text>Email: {props?.email}</Text>
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
            <td>
              {props.allSubVenues
                .filter((e) => e._id === props.idOfSelectedSubVenue)
                .map((e) => e.subVenueName)}
            </td>
            <td>
              {moment(new Date(props?.value1)).format("DD-MMMM-YYYY")}{" "}
              {props?.time === "LUNCH"
                ? `${props?.time} (12:00-3:00)`
                : `${props?.time} (07:00-10:00)`}
            </td>
            <td align={"right"}>{props?.hallCharges?.toLocaleString()}</td>
            <td align="right">{props?.noOfGuests?.toLocaleString()}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td align="right" style={{ whiteSpace: "nowrap" }}>
              Total Hall Charges Rs.{" "}
              <b>{props?.hallCharges?.toLocaleString()}</b>
            </td>
          </tr>
        </tbody>
      </Table>
      <InvoiceHeaders title={"Service Details"} />

      <Table striped withBorder withColumnBorders>
        <thead>{serviceHeaders}</thead>
        <tbody>
          {props?.selectedVenueServiceObject?.map((service, index) => {
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
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td align="right" style={{ whiteSpace: "nowrap" }}>
              Total&nbsp;Service&nbsp;Charges Rs.&nbsp;
              <b>
                {props?.selectedVenueServiceObject
                  ?.map(
                    (service) =>
                      service.servicePrice *
                      (service.duration === "Per Event" ? 1 : 3)
                  )
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString()}
              </b>
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
            <td>{props.selectedMenu?.menuTitle}</td>

            <td>
              {/*<Group spacing={3}>*/}
              <List>
                {props.selectedMenu?.dishes.map((dish, index) => {
                  return (
                    <List.Item p={0} m={0} key={index}>
                      {dish.dishName}
                    </List.Item>
                  );
                })}
              </List>
              {/*</Group>*/}
            </td>

            <td align="right">{props?.selectedMenu?.price.toLocaleString()}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td align="right" style={{ whiteSpace: "nowrap" }}>
              Total Menu Cost Rs.{" "}
              <b>
                {props.selectedMenu?.price * props.noOfGuests.toLocaleString()}
              </b>
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
        {props?.description}
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
      <Grid>
        <Grid.Col span={6}>
          <Center>
            <Image height={300} width={300} src={AdvanceStamp} />
          </Center>
          <Text>Paid Via Stripe</Text>
          <Text>Advance Amount is Not Refundable</Text>
          <Text>
            The Venue is liable to change its payment policy at anytime without
            prior notice
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          {" "}
          <Table striped withBorder withColumnBorders>
            <thead>{billHeaders}</thead>
            <tbody>
              <tr>
                <td align="right">
                  Hall Charges Rs. <b>{props.hallCharges?.toLocaleString()}</b>
                </td>
              </tr>
              <tr>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  Service Charges Rs.{" "}
                  <b>
                    {props?.selectedVenueServiceObject
                      ?.map(
                        (service) =>
                          service.servicePrice *
                          (service.duration === "Per Event" ? 1 : 3)
                      )
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  Menu Charges Rs.{" "}
                  <b>
                    {(
                      (props.selectedMenu?.price
                        ? props.selectedMenu.price
                        : 0) * props.noOfGuests
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>

              <tr>
                <td align="right">
                  Subtotal:{" "}
                  <b>
                    {(
                      props.hallCharges +
                      props?.selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (props.selectedMenu?.price
                        ? props.selectedMenu.price
                        : 0) *
                        props.noOfGuests
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="right">
                  Discount <b>25%</b> : -
                  <b>
                    {(
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests) *
                      0.25
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="right">
                  Tax <b>17%</b> : +
                  <b>
                    {(
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests) *
                      0.17
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="right">
                  Total Rs.{" "}
                  <b>
                    {(
                      props.hallCharges +
                      props?.selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (props.selectedMenu?.price
                        ? props.selectedMenu.price
                        : 0) *
                        props.noOfGuests -
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests) *
                        0.25 +
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests) *
                        0.17
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="right">
                  Deposit Paid Rs.{" "}
                  <b>
                    {(
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests -
                        (props.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props.selectedMenu?.price
                            ? props.selectedMenu.price
                            : 0) *
                            props.noOfGuests) *
                          0.25 +
                        (props.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props.selectedMenu?.price
                            ? props.selectedMenu.price
                            : 0) *
                            props.noOfGuests) *
                          0.17) *
                      0.25
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="right">
                  Deposit Remaining Rs.{" "}
                  <b>
                    {(
                      props.hallCharges +
                      props?.selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (props.selectedMenu?.price
                        ? props.selectedMenu.price
                        : 0) *
                        props.noOfGuests -
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests) *
                        0.25 +
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests) *
                        0.17 -
                      (props.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props.selectedMenu?.price
                          ? props.selectedMenu.price
                          : 0) *
                          props.noOfGuests -
                        (props.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props.selectedMenu?.price
                            ? props.selectedMenu.price
                            : 0) *
                            props.noOfGuests) *
                          0.25 +
                        (props.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props.selectedMenu?.price
                            ? props.selectedMenu.price
                            : 0) *
                            props.noOfGuests) *
                          0.17) *
                        0.25
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default BookingReviewInvoiceAdvancePaid;
