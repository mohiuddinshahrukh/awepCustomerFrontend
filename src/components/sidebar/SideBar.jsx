import React, { useState } from "react";
import styled from "styled-components";

import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
const SidebarNav = styled.nav`
  // overflow:scroll;

  // background-image: url("https://media.istockphoto.com/photos/violet-color-velvet-texture-background-picture-id587219358?k=20&m=587219358&s=612x612&w=0&h=PtwQq0Cx7AllJLpAqQkO315w8NxwwAJIrquHjaTym3Y=");
  background-position: center;

  width: "350px";
  height: "100%";
  height: "fill";
  display: "flex";
  justify-content: "center";
  // position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: "600ms";
  // z-index: 10;
`;

const SidebarWrap = styled.div`
  width: "350px";
`;

const SideBar = ({ currentLocation, setOpened }) => {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {SideBarData.map((item, index) => {
              return (
                <SubMenu
                  route={currentLocation}
                  item={item}
                  key={index}
                  setOpened={setOpened}
                />
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
