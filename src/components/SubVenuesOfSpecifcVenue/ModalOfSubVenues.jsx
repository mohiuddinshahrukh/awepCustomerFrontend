import { Modal, Group, Grid, Divider, Text } from "@mantine/core";
import Carousal from "../Carousal/Carousal";
import InPageNavigation from "../InPageNavigation/InPageNavigation";
import AboutVenue from "../AboutVenue/AboutVenue";
import VenueServices from "../VenueServices/VenueServices";
import BookingCharges from "./BookingCharges";

const ModalOfSubVenues = ({ open, setOpen }) => {
  //   const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        padding="2%"
        opened={open}
        onClose={() => setOpen(false)}
        title={
          <Text size="xl" weight="bold">
            Sub Venues
          </Text>
        }
        fullScreen
      >
        <Text color="dimmed">Islamabad, Pakistan</Text>

        <Group
          spacing="md"
          //   pt="sm"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Text>
            Venue Type: <b>Marquee</b>
          </Text>
          <Text>
            Guests <b>250 to 600</b>
          </Text>
        </Group>
        <Grid pt="md">
          <Grid.Col lg={9}>
            <Carousal />
            <InPageNavigation />
            <Divider mt="xl" />
            <AboutVenue />
            <VenueServices />
            <Divider mt="xl" />
            <BookingCharges />
          </Grid.Col>
        </Grid>
      </Modal>
    </>
  );
};

export default ModalOfSubVenues;
