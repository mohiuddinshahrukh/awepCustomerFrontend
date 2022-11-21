import { Container, Group } from "@mantine/core";
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
      <Group position="apart" spacing={"xs"}>
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
              cardLinkPath: "/",
              cardLinkIcon: <IconSearch size={50} color="#775A97" />,
            },
            {
              cardTitle: "Vendors",
              cardLinkPath: "/",
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
    </Container>
  );
};

export default FilterCards;
