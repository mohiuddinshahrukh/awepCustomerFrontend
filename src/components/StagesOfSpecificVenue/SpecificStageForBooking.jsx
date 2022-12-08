import React from "react";
import {
  createStyles,
  Image,
  Card,
  Text,
  Group,
  Button,
  Paper,
} from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  price: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    "&:hover": {
      [`& .${getRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: 4,
    height: 4,
    transition: "width 250ms ease",

    "&[data-active]": {
      width: 16,
    },
  },
}));

const SpecificStageForBooking = ({
  setStagePrice,
  stage,
  setIdOfSelectedStage,
  idOfSelectedStage,
  setSelectedStage,
  selectedStage,
}) => {
  const { classes } = useStyles();

  return (
    <Paper>
      <Card
        shadow={idOfSelectedStage === stage.id ? "md" : "sm"}
        onClick={() => {
          setIdOfSelectedStage(stage?._id);
          setSelectedStage(stage);
          setStagePrice(stage.price);
          console.log("stage clicked", stage);
        }}
        style={{
          border:
            idOfSelectedStage === stage?._id ? "5px solid #E60084" : "none",
          minHeight: "400px",
        }}
        radius="md"
        withBorder
        p="xl"
        // style={{
        // }}
      >
        <Card.Section>
          <Image src={stage.stageImageURL} height={220} />
        </Card.Section>

        <Group position="apart" mt="lg">
          <Text weight={500} size="lg">
            {stage.stageTitle}
          </Text>
        </Group>
        <Group position="apart" mt="lg">
          <Text weight={500} size="lg">
            Rs. {stage.price}
          </Text>
        </Group>
        <Text
          size="sm"
          color="dimmed"
          mt="sm"
          style={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
          lineClamp={2}
        >
          {stage.description}
        </Text>
      </Card>
    </Paper>
  );
};
export default SpecificStageForBooking;
