import { Group, SimpleGrid, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import React from "react";

const VenueServices = ({ services }) => {
  let venueServices = services ? services : [];
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
        {venueServices.map((service, index) => (
          <Group
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconCheck color="green" stroke={1} />
            <Text>{service?.serviceTitle}</Text>
          </Group>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default VenueServices;
