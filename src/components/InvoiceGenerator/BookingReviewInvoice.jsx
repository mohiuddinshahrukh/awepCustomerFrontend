import {
  // Button,
  Container,
  Grid,
  Group,
  List,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import {
  IconBrandWhatsapp,
  IconDeviceMobile,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons";

import moment from "moment";
// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
import WaterMark from "./AWEP_WATERMARK.svg";

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
const billHeadCells = [
  { title: "Item ", align: "left" },
  { title: "Item Cost Rs.", align: "right" },
];
let iconSize = 20;
const BookingReviewInvoice = (props) => {
  console.log("@PROPS: ", props);

  let awepLogoSize = 40;
  let invoiceTextBG = "#1ABD9C";
  let invoiceTextColor = "white";
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
      <div
        style={{
          border: "1px solid white",
          backgroundColor: "#031B3C",
          padding: "5px",
          color: "white",
          borderStyle: "inset",
        }}
      >
        <Title>AWEP</Title>
      </div>
      <Text size={awepLogoSize} align="center">
        {/* {props?.allVenues
          ?.filter((e) => e._id === props?.venue)
          ?.map((e) => e.venueName)} */}
        Venue Name Here
      </Text>
      <Group spacing={3} align="center" position="center">
        <IconMapPin size={iconSize} />
        <Text size="md">
          {/* {props?.allVenues
            ?.filter((e) => e._id === props?.venue)
            ?.map((e) => e.venueAddress)}
             */}
          Venue Address Here
        </Text>
      </Group>

      <Group spacing={3} align="center" position="center">
        <IconMail size={iconSize} />
        <Text size="md" align="center">
          {/* {props?.allVenues
            ?.filter((e) => e._id === props?.venue)
            ?.map((e) => e.infoEmail)} */}
          Venue Email Here
        </Text>
      </Group>
      <Group spacing="xs" align="center" position="center">
        <Group spacing={3} align="center" position="center">
          <IconPhone size={iconSize} />
          <Text size="md" align="center">
            {/* {props?.allVenues
              ?.filter((e) => e._id === props?.venue)
              ?.map((e) => e.contactLandline)} */}
            Venue Landline Here
          </Text>
        </Group>
        <Group spacing={3} align="center" position="center">
          <IconDeviceMobile size={iconSize} />
          <Text size="md" align="center">
            {/* {props?.allVenues
              .filter((e) => e._id === props?.venue)
              .map((e) => e.contactPhone)} */}
            Venue Phone Here
          </Text>
        </Group>
        <Group spacing={3} align="center" position="center">
          <IconBrandWhatsapp size={iconSize} />
          <Text size="md" align="center">
            {/* {props?.allVenues
              .filter((e) => e._id === props?.venue)
              .map((e) => e.contactWhatsApp)} */}
            Venue WhatsApp Here
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
                <b>Invoice Date</b>:{" "}
                {moment(new Date(Date.now())).format("DD-MMMM-YYYY")}{" "}
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
                  <b>Name</b>:{" "}
                  {/* {props?.allCustomers
                    .filter((e) => e._id === props?.customer)
                    .map((e) => e.name)} */}
                  Customer Name Here
                </Text>
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Text>
                <b>Contact Number</b>: {props?.phone}
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Text>
                <b>Email</b>: {props?.email}
              </Text>
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
              {/* {props?.allSubVenues
                .filter((e) => e._id === props?.idOfSelectedSubVenue)
                .map((e) => e.subVenueName)} */}
              Subvenue Name Here
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
                  ?.toLocaleString()}
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
            <td>{props?.selectedMenu?.menuTitle}</td>

            <td>
              {/*<Group spacing={3}>*/}
              <List>
                {props?.selectedMenu?.dishes?.map((dish, index) => {
                  return (
                    <List.Item p={0} m={0} key={index}>
                      {dish.dishName}
                    </List.Item>
                  );
                })}
              </List>
              {/*</Group>*/}
            </td>

            <td align="right">
              {props?.selectedMenu?.price?.toLocaleString()}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td align="right" style={{ whiteSpace: "nowrap" }}>
              <Text>Persons X Menu Cost Per Head</Text>
              Total Menu Cost Rs.{" "}
              <b>
                {props?.selectedMenu?.price *
                  props?.noOfGuests?.toLocaleString()}
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
        <Text size={invoiceTextSize} color={invoiceTextColor} align="center">
          Billing Details
        </Text>
      </Paper>
      <Grid justify={"flex-end"}>
        <Grid.Col span={6}>
          <Table striped withBorder withColumnBorders>
            <thead>{billHeaders}</thead>
            <tbody>
              <tr>
                <td align="left">Hall Charges</td>
                <td align="right">
                  <b>{props?.hallCharges?.toLocaleString()}</b>
                </td>
              </tr>
              <tr>
                <td align="left" style={{ whiteSpace: "nowrap" }}>
                  Service Charges
                </td>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  <b>
                    {props?.selectedVenueServiceObject
                      ?.map(
                        (service) =>
                          service.servicePrice *
                          (service.duration === "Per Event" ? 1 : 3)
                      )
                      .reduce((a, b) => a + b, 0)
                      ?.toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="left" style={{ whiteSpace: "nowrap" }}>
                  Menu Charges
                </td>
                <td align="right" style={{ whiteSpace: "nowrap" }}>
                  <b>
                    {(
                      (props?.selectedMenu?.price
                        ? props?.selectedMenu.price
                        : 0) * props?.noOfGuests
                    )?.toLocaleString()}
                  </b>
                </td>
              </tr>

              <tr>
                <td align="left">Subtotal </td>
                <td align="right">
                  <b>
                    {(
                      props?.hallCharges +
                      props?.selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (props?.selectedMenu?.price
                        ? props?.selectedMenu.price
                        : 0) *
                        props?.noOfGuests
                    )?.toLocaleString()}
                  </b>
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
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests) *
                      0.25
                    )?.toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="left">
                  Tax <b>17%</b>
                </td>
                <td align="right">
                  +
                  <b>
                    {(
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests) *
                      0.17
                    )?.toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="left">Total </td>
                <td align="right">
                  <b>
                    {(
                      props?.hallCharges +
                      props?.selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (props?.selectedMenu?.price
                        ? props?.selectedMenu.price
                        : 0) *
                        props?.noOfGuests -
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests) *
                        0.25 +
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests) *
                        0.17
                    )?.toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="left">Deposit Due </td>
                <td align="right">
                  <b>
                    {(
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests -
                        (props?.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props?.selectedMenu?.price
                            ? props?.selectedMenu.price
                            : 0) *
                            props?.noOfGuests) *
                          0.25 +
                        (props?.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props?.selectedMenu?.price
                            ? props?.selectedMenu.price
                            : 0) *
                            props?.noOfGuests) *
                          0.17) *
                      0.25
                    )?.toLocaleString()}
                  </b>
                </td>
              </tr>
              <tr>
                <td align="left">Deposit After Due Paid </td>
                <td align="right">
                  <b>
                    {(
                      props?.hallCharges +
                      props?.selectedVenueServiceObject
                        ?.map(
                          (service) =>
                            service.servicePrice *
                            (service.duration === "Per Event" ? 1 : 3)
                        )
                        .reduce((a, b) => a + b, 0) +
                      (props?.selectedMenu?.price
                        ? props?.selectedMenu.price
                        : 0) *
                        props?.noOfGuests -
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests) *
                        0.25 +
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests) *
                        0.17 -
                      (props?.hallCharges +
                        props?.selectedVenueServiceObject
                          ?.map(
                            (service) =>
                              service.servicePrice *
                              (service.duration === "Per Event" ? 1 : 3)
                          )
                          .reduce((a, b) => a + b, 0) +
                        (props?.selectedMenu?.price
                          ? props?.selectedMenu.price
                          : 0) *
                          props?.noOfGuests -
                        (props?.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props?.selectedMenu?.price
                            ? props?.selectedMenu.price
                            : 0) *
                            props?.noOfGuests) *
                          0.25 +
                        (props?.hallCharges +
                          props?.selectedVenueServiceObject
                            ?.map(
                              (service) =>
                                service.servicePrice *
                                (service.duration === "Per Event" ? 1 : 3)
                            )
                            .reduce((a, b) => a + b, 0) +
                          (props?.selectedMenu?.price
                            ? props?.selectedMenu.price
                            : 0) *
                            props?.noOfGuests) *
                          0.17) *
                        0.25
                    )?.toLocaleString()}
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

export default BookingReviewInvoice;
