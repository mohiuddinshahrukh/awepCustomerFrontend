import { Container, Group, Paper, ScrollArea } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconChevronRight,
  IconEye,
  IconLayoutCards,
  IconSearch,
  IconStars,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import EasilyPlanYourWeddingCard from "./EasilyPlanYourWeddingCard";
import OtherFilterCards from "./OtherFilterCards";

const FilterCards = () => {
  return (
    <Container size={"xl"} my={"xl"}>
      <Paper
        component={ScrollArea}
        scrollbarSize={8}
        type={"hover"}
        offsetScrollbars={-20}
      >
        {" "}
        <Group m={"md"} noWrap spacing={"xs"}>
          <EasilyPlanYourWeddingCard
            cardData={[
              {
                cardTitle: "Easily Plan Your Wedding",
                cardLinkTitle: "Get Started",
                cardLinkPath: "/",
                cardLinkIcon: <IconChevronRight color="#775A97" />,
              },
            ]}
          />
          <OtherFilterCards
            cardsData={[
              {
                cardTitle: "Venues",
                cardLinkPath: "/allVenues",
                cardLinkIcon: <IconSearch size={50} color="#775A97" />,
              },
              {
                cardTitle: "Vendors",
                cardLinkPath: "/allVendors",
                cardLinkIcon: <IconUsers size={50} color="#775A97" />,
              },
              {
                cardTitle: "Featured",
                cardLinkPath: "/",
                cardLinkIcon: <IconStars size={50} color="#775A97" />,
              },
              {
                cardTitle: "Top Viewed",
                cardLinkPath: "/",
                cardLinkIcon: <IconEye size={50} color="#775A97" />,
              },
              {
                cardTitle: "Cards",
                cardLinkPath: "/",
                cardLinkIcon: <IconLayoutCards size={50} color="#775A97" />,
              },
              {
                cardTitle: "Cities",
                cardLinkPath: "/",
                cardLinkIcon: (
                  <IconBuildingSkyscraper size={50} color="#775A97" />
                ),
              },
            ]}
          />
        </Group>
      </Paper>
    </Container>
  );
};

export default FilterCards;
