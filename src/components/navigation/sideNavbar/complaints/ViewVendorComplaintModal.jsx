import {
  Button,
  Divider,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import React from "react";

const ViewVendorComplaintModal = ({ complaintView }) => {
  return (
    <>
      <Image
        radius="md"
        height={300}
        src={
          "https://www.scribendi.com/images/cms/thumbnails/Scribendi-Complaint-Letter_848x370.jpg"
        }
        alt="Random unsplash image"
        fit="cover"
      />
      <Grid mt="md" grow justify="space-between">
        <Grid.Col
          style={{ borderRight: "1px solid #EAEAEA" }}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Title order={2}>Customer Information</Title>
          <Grid>
            <Grid.Col span={12}>
              <Group mt="md">
                <Text size="lg" weight="bold">
                  Customer Email:
                </Text>
                <Text size="lg">{complaintView.customerId?.email}</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group>
                <Text size="lg" weight="bold">
                  Customer Name:
                </Text>
                <Text size="lg">{complaintView.customerId?.name}</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group>
                <Text size="lg" weight="bold">
                  Booking Date:
                </Text>
                <Text size="lg">
                  {
                    complaintView.vendorPackageBookingId?.bookingDate.split(
                      "T"
                    )[0]
                  }
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col sm={6} md={6} lg={6} xl={6}>
          <Title order={2}>Vendor Information</Title>
          <Grid>
            <Grid.Col span={12}>
              <Group mt="md">
                <Text size="lg" weight="bold">
                  Vendor Email :
                </Text>
                <Text size="lg">{complaintView.vendorId?.email}</Text>
              </Group>
              <Group>
                <Text size="lg" weight="bold">
                  Vendor Name:
                </Text>
                <Text size="lg">{complaintView.vendorId?.name}</Text>
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group>
                <Text size="lg" weight="bold">
                  Vendor Service Title:
                </Text>
                <Text size="lg">
                  {complaintView.vendorServiceId?.vendorServiceTitle}
                </Text>
              </Group>
              <Group>
                <Text size="lg" weight="bold">
                  Vendor Package Title:
                </Text>
                <Text size="lg">
                  {complaintView.vendorPackageId?.vendorPackageTitle}
                </Text>
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />

      <Title mt="md" align="center" order={3}>
        Complaint Details
      </Title>

      <Text size="lg">
        <b>Title: </b>
        {complaintView.complaintTitle}
      </Text>

      <Text size="lg">
        <b>Category: </b> {complaintView.complaintType}
      </Text>

      <Text size="lg">
        <b>Status: </b>

        {complaintView.status === "pending" ? (
          <Button size="xs" compact color="yellow" uppercase>
            Under Review
          </Button>
        ) : complaintView.status === "resolved" ? (
          <Button size="xs" compact color="green" uppercase>
            Resolved
          </Button>
        ) : (
          "N/A"
        )}
      </Text>

      <Text size="lg">
        <b>Date: </b> {complaintView.createdAt?.split("T")[0]}
      </Text>

      <RichTextEditor
        style={{ textAlign: "justify", textJustify: "inter-word" }}
        readOnly
        value={complaintView.complaintDescription}
      />
      {complaintView?.vendorReply && (
        <>
          <Text size="lg" weight="bold">
            Reply To This Complaint
          </Text>
          <RichTextEditor
            style={{ textAlign: "justify", textJustify: "inter-word" }}
            readOnly
            value={complaintView?.vendorReply}
          />
        </>
      )}
    </>
  );
};

export default ViewVendorComplaintModal;
