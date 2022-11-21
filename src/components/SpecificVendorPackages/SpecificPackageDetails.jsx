import {
  createStyles,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { IconStar } from "@tabler/icons";
import React from "react";
import AboutVenue from "../AboutVenue/AboutVenue";
import Carousal from "../Carousal/Carousal";
import InPageNavigation from "../InPageNavigation/InPageNavigation";
import VenueServices from "../VenueServices/VenueServices";
const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));
const SpecificPackageDetails = ({ vendorPackage }) => {
  const { classes } = useStyles();

  return (
    <Paper px={80}>
      <Image height="500px" width="100%" src={vendorPackage.coverImage} />
      <Group position="apart" pt="xl">
        <Text weight="bold" size="xl">
          {vendorPackage?.vendorPackageTitle}
        </Text>
        <Group spacing={5}>
          <IconStar size={25} fill={"#FFB300"} stroke="0" />
          <Text size="lg" weight={500}>
            {vendorPackage?.rating ? vendorPackage.rating.toFixed(1) : "5.0"}
          </Text>
        </Group>
      </Group>
      <div>
        <Text size="xl" span weight={500} className={classes.price}>
          Rs. {vendorPackage?.price}
        </Text>
        <Text span size="sm" color="dimmed">
          {" "}
          /package
        </Text>
      </div>
      {/* <Grid>
        <Grid.Col lg={9}> */}
      <AboutVenue details={vendorPackage?.packageDescription} />
      {/* </Grid.Col>
      
      </Grid> */}
    </Paper>
  );
};

export default SpecificPackageDetails;
