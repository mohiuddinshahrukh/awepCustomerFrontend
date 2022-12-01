import {
  IconChevronDown,
  IconChevronUp,
  IconHome,
  IconUser,
} from "@tabler/icons";
import React from "react";

export const SideBarData = [
  {
    title: "1 - Dashboard",
    path: "/",
    description: "Get Add Statistics and Reports",
    icon: <IconHome />,
  },
  {
    title: "2 - Staff",
    path: "#",
    description: "Manage your staff",
    icon: <UserCircle size={20} />,
    iconClosed: <IconChevronDown />,
    iconOpened: <IconChevronUp />,
    subNav: [
      {
        title: "2.1 - Add Staff Catgeory",
        path: "/addStaffCategory",
        description: "Add Staff Category",
        icon: <IconUser size={20} />,
        cName: "sub-nav",
      },
      {
        title: "2.2 - View Staff Catgeory",

        path: "/allStaffCategories",
        description: "View Staff Category",
        icon: <IconUser size={20} />,
        cName: "sub-nav",
      },
    ],
  },
];
