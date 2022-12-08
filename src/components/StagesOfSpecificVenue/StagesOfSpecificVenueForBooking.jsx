import { Carousel } from "@mantine/carousel";
import { SimpleGrid, Text } from "@mantine/core";
import React from "react";
import SpecificStageForBooking from "./SpecificStageForBooking";

const StagesOfSpecificVenueForBooking = ({
  setStagePrice,
  stages,
  setIdOfSelectedStage,
  idOfSelectedStage,
  setSelectedStage,
  selectedStage,
}) => {
  const stagesArray = stages ? stages : [{}];

  return (
    <div>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "xl", cols: 4, spacing: "sm" },
          { maxWidth: "lg", cols: 3, spacing: "sm" },
          { maxWidth: "md", cols: 2, spacing: "sm" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
      >
        {stagesArray?.map((stage, index) => (
          // <div key={index}>
          <SpecificStageForBooking
            key={index}
            setStagePrice={setStagePrice}
            stage={stage}
            setIdOfSelectedStage={setIdOfSelectedStage}
            idOfSelectedStage={idOfSelectedStage}
            setSelectedStage={setSelectedStage}
            selectedStage={selectedStage}
          />
          // </div>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default StagesOfSpecificVenueForBooking;
