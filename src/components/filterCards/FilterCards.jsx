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
        <Group position="center" m={"md"} noWrap spacing={"xs"}>
          {/* <EasilyPlanYourWeddingCard
            cardData={[
              {
                cardTitle: "Easily Plan Your Wedding",
                cardLinkTitle: "Get Started",
                cardLinkPath: "/allVenues",
                cardLinkIcon: <IconChevronRight className="fgColorF" />,
              },
            ]}
          />*/}
          <OtherFilterCards
            cardsData={[
              {
                cardTitle: "Venues",
                cardLinkPath: "/allVenues",
                cardLinkIcon: <IconSearch size={50} className="fgColorF" />,
              },
              {
                cardTitle: "Vendors",
                cardLinkPath: "/allVendors",
                cardLinkIcon: <IconUsers size={50} className="fgColorF" />,
              },
              {
                cardTitle: "Featured",
                cardLinkPath: "/allVenues",
                cardLinkIcon: <IconStars size={50} className="fgColorF" />,
              },
              {
                cardTitle: "Viewed",
                cardLinkPath: "/allVenues",
                cardLinkIcon: <IconEye size={50} className="fgColorF" />,
              },
              {
                cardTitle: "Cards",
                cardLinkPath: "/cardEditor",
                cardLinkIcon: (
                  <IconLayoutCards size={50} className="fgColorF" />
                ),
              },
              {
                cardTitle: "Cities",
                cardLinkPath: "/allVenues",
                cardLinkIcon: (
                  <IconBuildingSkyscraper size={50} className="fgColorF" />
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
