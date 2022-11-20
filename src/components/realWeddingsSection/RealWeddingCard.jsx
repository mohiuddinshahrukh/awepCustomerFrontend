import { Card, Group, Image, Paper, Text } from "@mantine/core";
import {
  IconBuildingStore,
  IconCash,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const RealWeddingCard = ({ vendor }) => {
  const card = (
    <Card
      radius={"md"}
      sx={{
        borderRadius: "0.5rem",
        ":hover": {
          boxShadow: "0 5px 12px #0003",

          // transform: "scale(1.005)",
        },
        boxShadow: "0 2px 8px #00000026",

        transition: "box-shadow .2s",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease",
        transitionDelay: "0s",
        transitionProperty: "box-shadow",
      }}
      component={Link}
      to={"#"}
      style={{ width: "302px" }}
    >
      <Card.Section style={{ height: "201px" }}>
        <Image
          height={"201px"}
          width={"100%"}
          fit={"cover"}
          src={vendor?.coverImage}
        />
      </Card.Section>
      <Card.Section>
        <Group spacing={2} mt={10}>
          <Image
            height={"75px"}
            width={"96px"}
            fit={"cover"}
            src={vendor?.coverImage}
          />
          <Image
            height={"75px"}
            width={"100px"}
            fit={"cover"}
            src={vendor?.coverImage}
          />
          <Image
            height={"75px"}
            width={"100px"}
            fit={"cover"}
            src={vendor?.coverImage}
          />
        </Group>
        <Paper p={"md"}>
          <Text size={"md"} weight={500}>
            Ali & Alina
          </Text>

          <Text color={"dimmed"} size={"md"}>
            53 photos Islamabad, Margalla Road
          </Text>
        </Paper>
      </Card.Section>
    </Card>
  );

  return <div>{card}</div>;
};

export default RealWeddingCard;
