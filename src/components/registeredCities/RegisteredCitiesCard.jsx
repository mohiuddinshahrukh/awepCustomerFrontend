import { Card, Group, Image, Text } from "@mantine/core";
import { IconBuildingFortress, IconMap, IconUser } from "@tabler/icons";
import React from "react";

const RegisteredCitiesCard = ({ citiesCard }) => {
  return (
    <Card
      p={0}
      sx={{
        boxSizing: "border-box",
        ":hover": {
          boxShadow: "0 5px 12px #0003",
          cursor: "pointer",
          transform: "translateY(-8px)",
        },
        transition: "transform .35s",
        boxShadow: "0 2px 8px #00000026",
        borderRadius: "0.5rem",
      }}
    >
      <Card.Section>
        <Image height={"350px"} src={citiesCard.img} />

        <div
          style={{
            padding: "5px 10px",
            boxSizing: "border-box",
            position: "absolute",
            bottom: 0,
            backgroundColor: "rgb(0, 0, 0, 0.25)",
            width: "100%",
          }}
        >
          <Group noWrap spacing={3}>
            <IconMap color="white" />
            <Text size={"lg"} color={"white"}>
              {citiesCard.city}
            </Text>
          </Group>
          <Group noWrap spacing={"md"}>
            <Group spacing={3}>
              <IconBuildingFortress color="white" />
              <Text size={"lg"} color={"white"}>
                {citiesCard.venues} Venues
              </Text>
            </Group>
            <Group spacing={3} noWrap>
              <IconUser color="white" />
              <Text size={"lg"} color={"white"}>
                {citiesCard.vendors} Vendors
              </Text>
            </Group>
          </Group>
        </div>
      </Card.Section>
    </Card>
  );
};

export default RegisteredCitiesCard;
