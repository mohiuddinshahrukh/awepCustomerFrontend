import { Container, Group, Paper, ScrollArea } from "@mantine/core";
import {
  IconBuildingFortress,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconCards,
  IconChevronRight,
  IconCornerUpLeftDouble,
  IconEye,
  IconHeadset,
  IconLayoutCards,
  IconQuestionMark,
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
        px={0}
        mx={0}
        component={ScrollArea}
        scrollbarSize={8}
        type={"hover"}
        offsetScrollbars={-20}
      >
        <OtherFilterCards
          cardsData={[
            {
              cardTitle: "Venues",
              cardLinkPath: "/allVenues",
              cardLinkIcon: (
                <IconBuildingFortress
                  size={70}
                  stroke={1.5}
                  className="fgColorF"
                />
              ),
            },
            {
              cardTitle: "Vendors",
              cardLinkPath: "/allVendors",
              cardLinkIcon: (
                <IconBuildingStore
                  size={70}
                  stroke={1.5}
                  className="fgColorF"
                />
              ),
            },
            {
              cardTitle: "Wedding Cards",
              cardLinkPath: "/cardEditor",
              cardLinkIcon: (
                <IconCards size={70} stroke={1.5} className="fgColorF" />
              ),
            },
            {
              cardTitle: "Contact Us",
              cardLinkPath: "/contactUs",
              cardLinkIcon: (
                <IconHeadset size={70} stroke={1.5} className="fgColorF" />
              ),
            },
            {
              cardTitle: "About Us",
              cardLinkPath: "/aboutUs",
              cardLinkIcon: (
                <IconQuestionMark size={70} stroke={1.5} className="fgColorF" />
              ),
            },
            {
              cardTitle: "Feedbacks",
              cardLinkPath: "/allVenues",
              cardLinkIcon: (
                <IconCornerUpLeftDouble
                  size={70}
                  stroke={1.5}
                  className="fgColorF"
                />
              ),
            },
          ]}
        />
      </Paper>
    </Container>
  );
};

export default FilterCards;
