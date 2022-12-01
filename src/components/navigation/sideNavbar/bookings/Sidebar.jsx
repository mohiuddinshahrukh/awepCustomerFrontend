import { useState } from "react";
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
} from "@tabler/icons";
import { Box, NavLink, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  { icon: IconGauge, label: "Dashboard", description: "Item with description" },
  {
    icon: IconFingerprint,
    label: "Bookings",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",
    subNav: [
      {
        icon: IconActivity,
        label: "Venue Bookings",
        path: "venueBookings",
      },
      {
        icon: IconActivity,
        label: "Vendor Bookings",
        path: "vendorBookings",
      },
    ],
  },
  { icon: IconActivity, label: "Chats", path: "chats" },
  { icon: IconActivity, label: "My Cards", path: "weddingCards" },
  {
    icon: IconFingerprint,
    label: "Payments",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconActivity,
        label: "Venue Payments",
        path: "venuePayments",
      },
      {
        icon: IconActivity,
        label: "Vendor Payments",
        path: "vendorPayments",
      },
    ],
  },
  {
    icon: IconFingerprint,
    label: "Feedbacks",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconActivity,
        label: "Venue Feedbacks",
        path: "venueFeedbacks",
      },
      {
        icon: IconActivity,
        label: "Vendor Feedbacks",
        path: "vendorFeedbacks",
      },
    ],
  },
  {
    icon: IconFingerprint,
    label: "Complaints",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconActivity,
        label: "Venue Complaints",
        path: "venueComplaints",
      },
      {
        icon: IconActivity,
        label: "Vendor Complaints",
        path: "vendorComplaints",
      },
    ],
  },
  { icon: IconActivity, label: "Profile", path: "profile", path: "#" },
];

const SideBar = () => {
  const [active, setActive] = useState(0);
  const [subActive, setSubActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={!item.subNav && active === index}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size={16} stroke={1.5} />}
      component={Link}
      to={item.path}
      onClick={() => {
        setActive(index);
        setSubActive(null);
      }}
    >
      {item.subNav &&
        item.subNav.map((subItem, i) => (
          <NavLink
            styles={{ label: { fontSize: "1rem" } }}
            active={active === index && subActive === i}
            key={subItem.label}
            label={subItem.label}
            icon={<subItem.icon size={16} stroke={1.5} />}
            component={Link}
            to={subItem.path}
            onClick={() => {
              setSubActive(i);
              setActive(index);
            }}
          />
        ))}
    </NavLink>
  ));

  return (
    <Paper w={"15vw"} withBorder>
      <Box sx={{ width: "100%" }}>{items}</Box>
    </Paper>
  );
};

export default SideBar;
