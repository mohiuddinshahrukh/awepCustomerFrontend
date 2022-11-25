import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Image,
  List,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";

import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import WaterMark from "./AWEP_WATERMARK.svg";

// import borderLeftRight from "./AWEP_BORDER_LOGO_LEFT_RIGHT.svg";
// import borderTopBottom from "./AWEP_BORDER_LOGO_TOP_BOTTOM.svg";

import InvoiceHeaders from "../InvoiceGenerator/InvoiceHeaders";
import {
  IconBrandWhatsapp,
  IconDeviceMobile,
  IconMail,
  IconMapPin,
} from "@tabler/icons";
const subvenueHeadCells = [
  { title: "ID", align: "center" },
  { title: "Package Title", align: "left" },
  { title: "Event Date", align: "left" },
  { title: "Duration", align: "left" },
  { title: "Cost", align: "right" },
];
const servicesHeadCells = [
  { title: "ID", align: "center" },
  { title: "Service", align: "left" },
  { title: "Duration", align: "left" },
  { title: "Individual Cost Rs.", align: "right" },
  // { title: "Details", align: "left" },
  { title: "Total Cost Rs.", align: "right" },
];
// const menuHeadCells = [
//   { title: "ID", align: "center" },
//   { title: "Menu Title", align: "left" },
//   { title: "Dishes", align: "left" },
//   { title: "Cost Per Head Rs.", align: "right" },
// ];
const billHeadCells = [
  { title: "Item", align: "left" },
  { title: "Item Cost Rs.", align: "right" },
];
let iconSize = 20;
const ViewAllVendorPaymentTableReceipts = (singleInvoice) => {
  console.log("Single Invoice: ", singleInvoice);

  let awepLogoSize = 40;
  let invoiceTextBG = "#1ABD9C";
  let invoiceTextColor = "white";
  let invoiceTextSize = 26;
  let randomInvoiceNumber = "23456789asbd";
  //   let randomAccountNumber = "173281sdba12d";

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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: `AWEP_Invoice_${singleInvoice?.subVenueName}_${singleInvoice?.customerName}_${singleInvoice?.pointOfContact?.phone}`,
    content: () => componentRef.current,
    copyStyles: true,
    pageStyle: { margin: "10px" },
  });
  return (
    <Paper>
      <Container
        size="xl"
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
          {singleInvoice?.vendorTitle}
        </Text>
        <Group spacing={3} align="center" position="center">
          <IconMapPin size={iconSize} />
          <Text size="md">{singleInvoice?.vendorAddress}</Text>
        </Group>

        <Group spacing={3} align="center" position="center">
          <IconMail size={iconSize} />
          <Text size="md" align="center">
            {singleInvoice?.vendorEmail}
          </Text>
        </Group>
        <Group spacing="xs" align="center" position="center">
          <Group spacing={3} align="center" position="center">
            <IconDeviceMobile size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.vendorPhone}
            </Text>
          </Group>
          <Group spacing={3} align="center" position="center">
            <IconBrandWhatsapp size={iconSize} />
            <Text size="md" align="center">
              {singleInvoice?.vendorWhatsapp}
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
                    <b>Name</b>: {singleInvoice?.customerName}
                  </Text>
                </Text>
              </Grid.Col>
              <Grid.Col>
                <Text>
                  <b>Contact Number</b>: {singleInvoice?.customerPhone}
                </Text>
              </Grid.Col>
              <Grid.Col>
                <Text>
                  <b>Email</b>: {singleInvoice?.customerEmail}
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <InvoiceHeaders title={"Vendor Details"} />
        <Table striped withBorder withColumnBorders>
          <thead>{subvenueHeaders}</thead>
          <tbody>
            <tr>
              <td align="center">1</td>
              <td>{singleInvoice?.packageTitle}</td>
              <td>
                {moment(new Date(singleInvoice?.bookedDateAndTime)).format(
                  "DD-MMMM-YYYY"
                )}
              </td>
              <td>{singleInvoice?.packageDuration}</td>
              <td align="right">
                {singleInvoice?.totalPrice?.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td align="right" style={{ whiteSpace: "nowrap" }}>
                Total Package Charges Rs.{" "}
                <b>{singleInvoice?.totalPrice?.toLocaleString()}</b>
              </td>
            </tr>
          </tbody>
        </Table>

        {/*        <Table striped withBorder withColumnBorders>
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
  </Table>*/}

        <InvoiceHeaders title={"Customers Request"} />
        <Text
          align="justify"
          style={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          {singleInvoice?.bookingDesription}
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
        <Grid justify={"flex-end"} align={"flex-end"}>
          {" "}
          {/*          <Grid.Col span={12}>
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
</Grid.Col>*/}
          <Grid.Col span={6}>
            {" "}
            <Table striped withBorder withColumnBorders>
              <thead>{billHeaders}</thead>
              <tbody>
                <tr>
                  <td align="left">Total Package Charges </td>
                  <td align="right">
                    <b>{singleInvoice?.totalPrice?.toLocaleString()}</b>
                  </td>
                </tr>

                <tr>
                  <td align="left">Subtotal </td>
                  <td align="right">
                    <b>{singleInvoice?.totalPrice?.toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Discount <b>25%</b>
                  </td>
                  <td align="right">
                    <b>{(singleInvoice?.totalPrice * 0.25).toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left">
                    Tax <b>17%</b>
                  </td>
                  <td align="right">
                    +
                    <b>{(singleInvoice?.totalPrice * 0.17).toLocaleString()}</b>
                  </td>
                </tr>
                <tr>
                  <td align="left">Total </td>
                  <td align="right">
                    <b>
                      {(
                        singleInvoice?.totalPrice -
                        singleInvoice?.totalPrice * 0.25 +
                        singleInvoice?.totalPrice * 0.17
                      ).toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left">Deposit Due</td>
                  <td align="right">
                    <b>
                      {(
                        (singleInvoice?.totalPrice -
                          singleInvoice?.totalPrice * 0.25 +
                          singleInvoice?.totalPrice * 0.17) *
                        0.25
                      ).toLocaleString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td align="left">Deposit Remainging </td>
                  <td align="right">
                    <b>
                      {(
                        singleInvoice?.totalPrice -
                        singleInvoice?.totalPrice * 0.25 +
                        singleInvoice?.totalPrice * 0.17 -
                        (singleInvoice?.totalPrice -
                          singleInvoice?.totalPrice * 0.25 +
                          singleInvoice?.totalPrice * 0.17) *
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
    </Paper>
  );
};

export default ViewAllVendorPaymentTableReceipts;
