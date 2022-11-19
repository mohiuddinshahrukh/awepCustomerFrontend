import { Group, SimpleGrid, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import React from "react";

const VenueServices = () => {
  return (
    <div>
      <Text weight="bold" size="lg">
        Venue Services
      </Text>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "sm" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
        pt="sm"
      >
        <Group
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconCheck color="green" stroke={1} />
          <Text>Lighting</Text>
        </Group>
        <Group
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconCheck color="green" stroke={1} />
          <Text>asdasdasdasdasd</Text>
        </Group>
        <Group
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconCheck color="green" stroke={1} />
          <Text>asdasdsadascqwewe qwewq</Text>
        </Group>
        <Group
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconCheck color="green" stroke={1} />
          <Text>Lighting</Text>
        </Group>
      </SimpleGrid>
    </div>
  );
};

export default VenueServices;
