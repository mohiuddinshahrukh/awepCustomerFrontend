import {
  ActionIcon,
  Anchor,
  Box,
  Group,
  Modal,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandTwitter,
  IconDeviceMobile,
  IconMail,
  IconPhone,
} from "@tabler/icons";
import React, { useState } from "react";

const superAdminData = {
  email: "awep@gmail.com",
  numbers: [
    {
      title: "Mobile Number",
      mobileNumber: "+923368811125",
    },
    {
      title: "Mobile Number",
      mobileNumber: "+923368811125",
    },
    {
      title: "Mobile Number",
      mobileNumber: "+923368811125",
    },
  ],
};
const TopNavbarStrip = () => {
  const [openCall, setOpenCall] = useState(false);
  const matches904 = useMediaQuery("(min-width: 904px)");
  return (
    <Paper p={"xs"} radius={0} className="bgColor fgColor">
      <Modal
        overlayOpacity={0.75}
        withCloseButton={false}
        opened={openCall}
        onClose={() => {
          setOpenCall(false);
        }}
      >
        {" "}
        <Title align="center">Contact</Title>
        {superAdminData.numbers.map((number, index) => {
          return (
            <Paper className="border" p={"xl"} m="xl" position="center">
              <Group key={index} align={"center"} style={{ width: "100%" }}>
                <Anchor
                  style={{ width: "100%" }}
                  variant="text"
                  href={`tel:${number.mobileNumber}`}
                >
                  <Group
                    style={{ width: "100%" }}
                    position="center"
                    align={"center"}
                  >
                    <IconPhone
                      fill="#e60084"
                      rotate={""}
                      size={24}
                      stroke={0}
                    />
                    <Text size={"lg"}>{number.mobileNumber}</Text>
                  </Group>
                </Anchor>
              </Group>
            </Paper>
          );
        })}
      </Modal>
      <Group position={matches904 ? "apart" : "center"}>
        <Group hidden={matches904 ? false : true}>
          <Anchor variant="text" href={`mailto:${superAdminData.email}`}>
            Email: {superAdminData.email}
          </Anchor>
          <Group spacing={3} hidden={matches904 ? false : true}>
            Mobile Number:{" "}
            {superAdminData.numbers.map((number, index) => {
              return (
                <Anchor
                  key={index}
                  variant="text"
                  href={`tel:${number.mobileNumber}`}
                >
                  {number.mobileNumber} {index !== 2 && "|"}
                </Anchor>
              );
            })}
          </Group>
        </Group>
        <Group>
          <Group hidden={!matches904 ? false : true}>
            <ActionIcon
              variant="filled"
              className="button"
              component={Anchor}
              href={`mailto:${superAdminData.email}`}
            >
              <IconMail />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              className="button"
              onClick={() => {
                setOpenCall(true);
              }}
            >
              <IconDeviceMobile />
            </ActionIcon>
          </Group>

          {[
            { icon: <IconBrandFacebook color="white" />, path: "#" },
            { icon: <IconBrandTwitter />, path: "#" },
            { icon: <IconBrandInstagram />, path: "#" },
            { icon: <IconBrandPinterest />, path: "#" },
          ].map((icon, index) => {
            return (
              <ActionIcon variant="filled" className="button" key={index}>
                {icon.icon}
              </ActionIcon>
            );
          })}
        </Group>
      </Group>
    </Paper>
  );
};

export default TopNavbarStrip;
