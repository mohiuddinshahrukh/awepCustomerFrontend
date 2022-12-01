import { Carousel } from "@mantine/carousel";
import { Grid, Group, Image, Modal, Paper, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinktree,
  IconBrandWhatsapp,
  IconMail,
  IconMailbox,
  IconMap2,
  IconMapPin,
  IconPhone,
} from "@tabler/icons";
import React from "react";

// import MapComponentView from "../mapGoogle/MapComponentView";

const VendorBusinessModal = ({
  setViewVendorModal,
  viewVendorModal,
  vendorBusiness,
}) => {
  console.log("VENDOR BUSINESS:::::::::", vendorBusiness);
  const matches1200 = useMediaQuery("(min-width: 1200px)");
  return (
    <div>
      <Modal
        styles={{
          close: {
            color: "black",
            backgroundColor: "#EAEAEA",
            borderRadius: "50%",
            "&:hover": {
              transition: "50ms",
              color: "white",
              backgroundColor: "red",
            },
          },
        }}
        title={<Title>Vendor Service</Title>}
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        size={matches1200 ? "60%" : "lg"}
        opened={viewVendorModal}
        onClose={() => setViewVendorModal(false)}
      >
        <Paper>
          <Carousel
            withIndicators
            height={300}
            slideSize="50%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={1}
            breakpoints={[
              { maxWidth: "md", slideSize: "50%" },
              { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
            ]}
          >
            {vendorBusiness?.images?.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image src={image} height={280} alt="subVenue Image" />
              </Carousel.Slide>
            ))}
            {vendorBusiness?.videos?.map((video, index) => (
              <Carousel.Slide key={index}>
                <video src={video} height={280} controls />
              </Carousel.Slide>
            ))}
          </Carousel>

          <Grid px="xl">
            <Grid.Col lg={6}>
              <Grid>
                <Grid.Col lg={12}>
                  <Group positon="left" pt="lg">
                    <Text weight="bold" size="xl">
                      {vendorBusiness?.vendorBusinessTitle}
                    </Text>
                  </Group>
                  {/*getVendorsData?.map((vendor) => {
        return vendor?.value === getvendorId ? (
          <Group>
            <Text color="dimmed" size="lg">
              {vendor?.label}
            </Text>
          </Group>
        ) : null;
      })*/}

                  <Group>
                    <Text color="dimmed" size="lg">
                      {vendorBusiness?.vendorId?.name}
                    </Text>
                  </Group>
                </Grid.Col>

                <Grid.Col>
                  <Group postion="apart" align="center">
                    <IconMap2 size={16} />
                    <Text>{vendorBusiness?.city}</Text>
                  </Group>
                  <Group align="center">
                    <IconMapPin size={16} />
                    <Text>{vendorBusiness?.address}</Text>
                  </Group>
                  <Group align="center">
                    <IconPhone size={16} />
                    <Text>{vendorBusiness?.contactPhone}</Text>
                  </Group>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col lg={6}>
              <Grid.Col>
                <Group pt="lg">
                  <Text size="xl" weight="bold">
                    Get in touch
                  </Text>
                </Group>

                <Group align="center">
                  <IconMail size={16} />
                  <Text>{vendorBusiness?.infoEmail}</Text>
                </Group>
                <Group align="center">
                  <IconBrandWhatsapp size={16} />
                  <Text>{vendorBusiness?.contactWhatsApp}</Text>
                </Group>

                <Group>
                  <IconMailbox size={16} />
                  <Text>{vendorBusiness?.feedbackEmail}</Text>
                </Group>

                {vendorBusiness?.facebookHandle !== "" ? (
                  <Group align="center">
                    <IconBrandFacebook size={16} />
                    <Text size="lg">{vendorBusiness?.facebookHandle}</Text>
                  </Group>
                ) : null}
                {vendorBusiness?.instagramHandle !== "" ? (
                  <Group align="center">
                    <IconBrandInstagram size={16} />
                    <Text size="lg">
                      {<Text>{vendorBusiness?.instagramHandle}</Text>}
                    </Text>
                  </Group>
                ) : null}
                {vendorBusiness?.websiteHandle !== "" ? (
                  <Group align="center">
                    <IconBrandLinktree size={16} />
                    <Text size="lg">{vendorBusiness?.websiteHandle}</Text>
                  </Group>
                ) : null}
              </Grid.Col>
            </Grid.Col>

            {/* <Grid.Col>
           <MapComponentView
             pinLocation={vendorBusiness?.pinLocation}
             pinGeoLocation={vendorBusiness?.address}
           />
         </Grid.Col>*/}
            <Grid.Col>
              <Text size="xl" weight="bold">
                Description:
              </Text>
              <Text align="justify">
                {vendorBusiness?.vendorBusinessDescription}
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
};

export default VendorBusinessModal;
