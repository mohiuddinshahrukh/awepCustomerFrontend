import { Carousel } from "@mantine/carousel";
import { Container, Grid, Group, Modal, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import React from "react";
import BookVenueSideColumnsForVendor from "../BookVenueSideColums/BookVenueSideColumnsForVendor";
import CarouselForModalOfPackages from "./CarouselForModalOfPackages";
import SpecificPackageDetails from "./SpecificPackageDetails";
const ModalOfPackages = ({
  open,
  setOpen,
  vendorBusinessPackages,
  vendorId,
  contactPhone,
  setContactPhone,
  contactEmail,
  setContactEmail,
  eventType,
  setEventType,
  date,
  setDate,
  time,
  setTime,

  setIsSignIn,
  setIsSignUp,
  idOfSpecificVendorPackage,
}) => {
  let vendorPackages = vendorBusinessPackages ? vendorBusinessPackages : [{}];
  let specificVendorPackage = vendorPackages.filter(
    (e) => e._id === idOfSpecificVendorPackage
  )[0];
  return (
    <>
      <Modal
        // padding="2%"
        opened={open}
        onClose={() => setOpen(false)}
        fullScreen
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
      >
        <Container size="xl">
          <Grid>
            <Grid.Col lg={9}>
              {/* <Carousel
              withIndicators
              // height={800}
              slideSize="100%"
              nextControlIcon={<IconArrowRight size={25} />}
              previousControlIcon={<IconArrowLeft size={25} />}
              slideGap={2}
              controlSize={50}
              breakpoints={[
                { maxWidth: "md", slideSize: "100%" },
                { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
              ]}
              //   loop
              align="start"
            >
              {slides}
            </Carousel> */}
              <SpecificPackageDetails vendorPackage={specificVendorPackage} />
            </Grid.Col>
            <Grid.Col lg={3}>
              <BookVenueSideColumnsForVendor
                onClickFunction={() => {
                  console.log("onClickFunction111");
                  setOpen(true);
                }}
                contactPhone={contactPhone}
                setContactPhone={setContactPhone}
                contactEmail={contactEmail}
                setContactEmail={setContactEmail}
                eventType={eventType}
                setEventType={setEventType}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                setIsSignIn={setIsSignIn}
                vendorId={vendorId}
              />
            </Grid.Col>
          </Grid>
        </Container>
        {/* <Grid>
          <Grid.Col lg={9} pl="xl"> */}
        {/* <CarouselForModalOfPackages
          vendorPackages={vendorPackages}
          contactPhone={contactPhone}
          setContactPhone={setContactPhone}
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          eventType={eventType}
          setEventType={setEventType}
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
          setIsSignIn={setIsSignIn}
          setIsSignUp={setIsSignUp}
          idOfSpecificVendorPackage={idOfSpecificVendorPackage}
        /> */}
        {/* </Grid.Col>
         
        </Grid> */}
      </Modal>
    </>
  );
};

export default ModalOfPackages;
