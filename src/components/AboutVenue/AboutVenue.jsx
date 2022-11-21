import { Anchor, Group, Text } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons";
import React from "react";

const AboutVenue = ({ targetRef, details, facebook, instagram, website }) => {
  let venueDetails = details ? details : "";
  let facebookLink = facebook ? facebook : "";
  let instagramLink = instagram ? instagram : "";
  let websiteLink = website ? website : "";
  return (
    <div>
      <Text py="xl" weight="bold" size="lg" ref={targetRef}>
        About
      </Text>
      <Text align="justify">{venueDetails}</Text>
      {(facebookLink || instagramLink || websiteLink) && (
        <Group py="xl">
          <Text color="dimmed">Follow This Venue On</Text>
          {facebookLink && (
            <Anchor href={facebookLink} color="dark" underline target="black">
              <IconBrandFacebook size={20} />
            </Anchor>
          )}
          {instagramLink && (
            <Anchor href={instagramLink} color="dark" underline target="black">
              <IconBrandInstagram size={20} />
            </Anchor>
          )}
        </Group>
      )}
    </div>
  );
};

export default AboutVenue;
