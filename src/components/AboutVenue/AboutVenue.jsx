import { ActionIcon, Anchor, Group, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
} from "@tabler/icons";
import React from "react";

const AboutVenue = ({ name, details, facebook, instagram }) => {
  let specificName = name ? name : "";
  let description = details ? details : "";
  let facebookLink = facebook ? facebook : "";
  let instagramLink = instagram ? instagram : "";
  return (
    <div>
      <Group position="apart">
        <Text py="lg" weight="bold" size="lg">
          About
        </Text>
        <Group spacing={0}>
          {facebookLink && (
            <ActionIcon
              size="xl"
              href={facebookLink}
              color="blue"
              target="black"
            >
              <IconBrandFacebook size={24} />
            </ActionIcon>
          )}
          {instagramLink && (
            <ActionIcon
              size="xl"
              href={instagramLink}
              color="grape"
              target="black"
            >
              <IconBrandInstagram size={24} />
            </ActionIcon>
          )}
          <ActionIcon size="xl" color="green">
            <IconBrandWhatsapp size={24} />
          </ActionIcon>
          <ActionIcon size="xl" color="blue">
            <IconPhone size={24} />
          </ActionIcon>
          <ActionIcon size="xl" color="red">
            <IconMail size={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Text align="justify">{description}</Text>
    </div>
  );
};

export default AboutVenue;
