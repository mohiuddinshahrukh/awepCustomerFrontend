import { Container, Group } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../navigation/sideNavbar/Sidebar";

const ShahrukhsDevTest = () => {
  return (
    <Container size={"xl"}>
      <Group align={"flex-start"} style={{ flexShrink: 0 }} noWrap>
        <Sidebar />
        <Outlet />
      </Group>
    </Container>
  );
};

export default ShahrukhsDevTest;
