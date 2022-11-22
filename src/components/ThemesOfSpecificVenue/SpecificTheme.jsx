import React from "react";
import { createStyles, Image, Card, Text, Group, Button } from "@mantine/core";

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

const SpecificTheme = ({ theme }) => {
  const { classes } = useStyles();

  return (
    <Card
      radius="md"
      withBorder
      p="xl"
      style={{
        minHeight: "400px",
      }}
    >
      <Card.Section>
        <Image src={theme.coverImage} height={220} />
      </Card.Section>

      <Group position="apart" mt="lg">
        <Text weight={500} size="lg">
          {theme.themeTitle}
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
        {theme.themeDescription}
      </Text>

      <Group pt="md">
        <Group>
          <Button
            size="xs"
            radius={50}
            style={{
              backgroundColor: theme?.themeColors ? theme.themeColors[0] : "",
            }}
          ></Button>
          <Text>{theme?.themeColors ? theme.themeColors[0] : ""}</Text>
        </Group>
        <Group>
          <Button
            size="xs"
            radius={50}
            style={{
              backgroundColor: theme?.themeColors ? theme.themeColors[1] : "",
            }}
          ></Button>
          <Text>{theme?.themeColors ? theme.themeColors[1] : ""}</Text>
        </Group>
      </Group>
    </Card>
  );
};
export default SpecificTheme;
