import { Group, Text } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons";
import React from "react";

const AboutVenue = () => {
  return (
    <div>
      <Text py="xl" weight="bold" size="lg">
        About
      </Text>
      <Text align="justify">
        Farnham Castle is a historic wedding venue situated in Farnham, Surrey,
        approximately one hour from London. The original castle was founded by
        the Bishop of Winchester and dates back to the twelfth century. Today,
        the magnificent building is nestled amidst beautiful grounds, gardens
        and scenic woodlands. Facilities and Capacity There are several stunning
        locations for indoor and outdoor wedding ceremonies at Farnham Castle.
        You can exchange vows in one of two historic chapels, The Norman Chapel
        or The Bishop’s Chapel, each defined by antiquated features such as
        stone arches and wooden accents. Civil ceremonies are held in Lantern
        Hall, a similarly picturesque room that conjures a sense of traditional
        tranquillity. Evening receptions are held in the magnificent Great Hall,
        where you can celebrate with loved ones and enjoy an evening of formal
        dining and entertainment. This remarkable room is characterised by
        stunning stained glass windows, a grand fireplace, and gilt-framed
        portraits. From intimate gatherings and smaller weddings to large
        celebrations for 200-day and 300 evening guests, our experienced team
        are on hand to curate your dream day. Addtional facilities include a
        variety of accommodations as well as catering options to ensure that
        everyone is fully satisfied during your celebrations. Services Offered
        The experienced wedding team at Farnham Castle delight in collaborating
        with wedding planning couples to bring their vision to life. By liaising
        with this passionate team and they will do their utmost to oversee every
        fine detail. This 900-year-old estate has a long history of grand
        soirées and memorable occasions, and the team strive to oversee every
        detail. These wedding specialists would love to arrange an appointment
        to show you around Farnham Castle and chat with you further about your
        dream wedding in our historic venue.
      </Text>
      <Group>
        <Text py="xl" color="dimmed">
          Follow This Venue On
        </Text>
        <IconBrandFacebook size={20} />
        <IconBrandInstagram size={20} />
      </Group>
    </div>
  );
};

export default AboutVenue;
