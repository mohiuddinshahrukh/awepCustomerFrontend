import { Grid, Group, Modal, Text, Title } from "@mantine/core";
import React from "react";
import CarouselForModalOfPackages from "./CarouselForModalOfPackages";
const ModalOfPackages = ({ open, setOpen, vendorBusinessPackages }) => {
  let vendorPackages = vendorBusinessPackages ? vendorBusinessPackages : [{}];
  return (
    <>
      <Modal
        padding="2%"
        opened={open}
        onClose={() => setOpen(false)}
        fullScreen
        title={<Title order={2}>Packages</Title>}
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
        {/* <Grid>
          <Grid.Col lg={9} pl="xl"> */}
        <CarouselForModalOfPackages vendorPackages={vendorPackages} />
        {/* </Grid.Col>
         
        </Grid> */}
      </Modal>
    </>
  );
};

export default ModalOfPackages;
