import { Grid, Group, Modal, Text } from "@mantine/core";
import React from "react";
import BookVenueSideColums from "../BookVenueSideColums/BookVenueSideColums";
import CarouselForModalOfSubVenues from "./CarouselForModalOfSubVenues";
import SpecificSubVenueDetails from "./SpecificSubVenueDetails";

const ModalOfSubVenues = ({ open, setOpen, subVenues }) => {
  const [subVenueDetails, setSubVenueDetails] = React.useState({});

  let subVenuesArray = subVenues ? subVenues : [{}];
  return (
    <>
      <Modal
        padding="2%"
        opened={open}
        onClose={() => setOpen(false)}
        fullScreen
      >
        <Grid>
          <Grid.Col lg={9} pl="xl">
            <CarouselForModalOfSubVenues
              subVenuesArray={subVenuesArray}
              setSubVenueDetails={setSubVenueDetails}
            />
          </Grid.Col>
          <Grid.Col lg={3} pl="xl">
            <BookVenueSideColums />
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
};

export default ModalOfSubVenues;
