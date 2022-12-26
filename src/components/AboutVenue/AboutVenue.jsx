import { ActionIcon, Anchor, Group, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
  IconPhone,
} from "@tabler/icons";
import React from "react";

const AboutVenue = ({
  name,
  details,
  facebook,
  instagram,
  whatsApp,
  email,
  phone,
}) => {
  let specificName = name ? name : "";
  let description = details ? details : "";
  let facebookLink = facebook ? facebook : "";
  let instagramLink = instagram ? instagram : "";
  let whatsAppLink = whatsApp ? whatsApp : "";
  let emailLink = email ? email : "";
  let phoneLink = phone ? phone : "";
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
          <ActionIcon
            size="xl"
            color="green"
            component={Anchor}
            href={`tel:${whatsApp}`}
            // onClick={() => {
            //   try {
            //     window.ReactNativeWebView.postMessage(
            //       `mail::::::::${whatsApp}`
            //     );
            //   } catch (e) {}
            // }}
          >
            {" "}
            <IconBrandWhatsapp size={24} />
          </ActionIcon>
          <ActionIcon
            size="xl"
            color="blue"
            component={Anchor}
            href={`tel:${phoneLink}`}
            // onClick={() => {
            //   try {
            //     window.ReactNativeWebView.postMessage(
            //       `mail::::::::${whatsApp}`
            //     );
            //   } catch (e) {}
            // }}
          >
            <IconPhone size={24} />
          </ActionIcon>
          <ActionIcon
            size="xl"
            color="red"
            component={Anchor}
            href={`mailto:${email}`}
            onClick={() => {
              try {
                window.ReactNativeWebView.postMessage(`mail::::::::${email}`);
              } catch (e) {}
            }}
          >
            <IconMail size={24} />
          </ActionIcon>
        </Group>
      </Group>
      <Text align="justify">{description}</Text>
    </div>
  );
};

export default AboutVenue;
