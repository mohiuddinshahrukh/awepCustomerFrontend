import { useState } from "react";
import {
  IconFingerprint,
  IconActivity,
  IconChevronRight,
  IconSettings,
  IconLayoutGrid,
  IconNotebook,
  IconMessage,
  IconCards,
  IconBrandStripe,
  IconCornerUpLeftDouble,
  IconUserExclamation,
  IconBuildingStore,
  IconBuildingFortress,
} from "@tabler/icons";
import { Box, NavLink, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

const data = [
  {
    icon: IconLayoutGrid,
    label: "Dashboard",
    description: "Item with description",
  },
  {
    icon: IconNotebook,
    label: "Bookings",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",
    subNav: [
      {
        icon: IconBuildingFortress,
        label: "Venue Bookings",
        path: "venueBookings",
      },
      {
        icon: IconBuildingStore,
        label: "Vendor Bookings",
        path: "vendorBookings",
      },
    ],
  },
  { icon: IconMessage, label: "Chats", path: "chats" },
  { icon: IconCards, label: "My Cards", path: "weddingCards" },
  {
    icon: IconBrandStripe,
    label: "Payments",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconBuildingFortress,
        label: "Venue Payments",
        path: "venuePayments",
      },
      {
        icon: IconBuildingStore,
        label: "Vendor Payments",
        path: "vendorPayments",
      },
    ],
  },
  {
    icon: IconCornerUpLeftDouble,
    label: "Feedbacks",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconBuildingStore,
        label: "Venue Feedbacks",
        path: "venueFeedbacks",
      },
      {
        icon: IconBuildingFortress,
        label: "Vendor Feedbacks",
        path: "vendorFeedbacks",
      },
    ],
  },
  {
    icon: IconUserExclamation,
    label: "Complaints",
    rightSection: <IconChevronRight size={14} stroke={1.5} />,
    path: "#",

    subNav: [
      {
        icon: IconBuildingFortress,
        label: "Venue Complaints",
        path: "venueComplaints",
      },
      {
        icon: IconBuildingStore,
        label: "Vendor Complaints",
        path: "vendorComplaints",
      },
    ],
  },
  { icon: IconSettings, label: "Settings", path: "profile" },
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
    <Paper style={{ width: "" }} withBorder>
      <Box sx={{ width: "300px " }}>{items}</Box>
    </Paper>
  );
};

export default SideBar;
