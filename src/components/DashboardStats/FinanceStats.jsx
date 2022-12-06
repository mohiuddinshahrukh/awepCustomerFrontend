import React from "react";
import {
  createStyles,
  Paper,
  Text,
  SimpleGrid,
  ActionIcon,
  Stack,
  Group,
} from "@mantine/core";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconBuildingFortress,
  IconBuildingStore,
  IconChecks,
  IconReportMoney,
} from "@tabler/icons";
import { Action } from "@remix-run/router";
const useStyles = createStyles((theme) => ({
  root: {
    // padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
const FinanceStats = ({
  venueBookings,
  vendorBookings,
  paidVenueAmount,
  paidVendorAmount,
  remainingVenueAmount,
  remainingVendorAmount,
}) => {
  const { classes } = useStyles();

  const data = [
    {
      title: "My Venue Bookings",
      value: `Rs. ${venueBookings}`,
      icon: <IconBuildingFortress size={60} color="purple" />,
      color: "green",
      diff: "10",
    },
    {
      title: "My Vendor Bookings",
      value: `Rs. ${vendorBookings}`,
      icon: <IconBuildingStore size={60} color="purple" />,
      color: "red",
      diff: "5",
    },
    {
      title: "Paid Venue Amount",
      value: `Rs. ${paidVenueAmount}`,
      icon: <IconChecks size={60} color="green" />,
      color: "teal",
      diff: "-20",
    },
    {
      title: "Paid Vendor Amount",
      value: `Rs. ${paidVendorAmount}`,
      icon: <IconChecks size={60} color="green" />,
      color: "teal",
      diff: "-20",
    },
    {
      title: "Remaining Venue Amount",
      value: `Rs. ${remainingVenueAmount}`,
      icon: <IconReportMoney size={60} color="red" />,
      color: "teal",
      diff: "-20",
    },
    {
      title: "Remaining Vendor Amount",
      value: `Rs. ${remainingVendorAmount}`,
      icon: <IconReportMoney size={60} color="red" />,
      color: "teal",
      diff: "-20",
    },
  ];

  const stats = data.map((stat) => {
    return (
      <Paper className="border" radius="md" withBorder key={stat.title}>
        <Stack
          justify={"initial"}
          spacing={0}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            p="xs"
            align="center"
            className="bgColor"
            size="md"
            style={{
              borderTopRightRadius: "5px",
              borderTopLeftRadius: "5px",
              // border : "2px solid red",
              width: "100%",
            }}
            color="white"
            weight={700}
            px="xs"
            // transform="uppercase"
            // weight={700}
            height="100%"

            // className={classes.label}
          >
            {stat.title}
          </Text>
          <Group
            position="apart"
            px="md"
            py={0}
            align={"flex-end"}
            spacing={0}
            style={{
              transform: "translateY(-7px)",
            }}
          >
            <ActionIcon variant="transparent" size={30} mt="xs" py={0}>
              {stat.icon}
            </ActionIcon>
            <Text size={20} py={0}>
              {stat?.value ? stat?.value : 0}
            </Text>
          </Group>
        </Stack>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "xs", cols: 1 },
          { maxWidth: "sm", cols: 2 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
};

export default FinanceStats;
