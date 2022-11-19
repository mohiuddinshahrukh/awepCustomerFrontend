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

const SpecificTheme = () => {
  const { classes } = useStyles();

  return (
    <Card radius="md" withBorder p="xl">
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          height={220}
        />
      </Card.Section>

      <Group position="apart" mt="lg">
        <Text weight={500} size="lg">
          Forde, Norway
        </Text>
      </Group>
      <Text size="sm" color="dimmed" mt="sm">
        Relax, rejuvenate and unplug in this unique contemporary Birdbox. Feel
        close to nature in ultimate comfort. Enjoy the view of the epic mountain
        range of Blegja and the Førdefjord.
      </Text>

      <Group position="apart" mt="md">
        <div>
          <Text size="xl" span weight={500} className={classes.price}>
            397$
          </Text>
          <Text span size="sm" color="dimmed">
            {" "}
            / night
          </Text>
        </div>

        <Button radius="md">Book now</Button>
      </Group>
    </Card>
  );
};
export default SpecificTheme;
