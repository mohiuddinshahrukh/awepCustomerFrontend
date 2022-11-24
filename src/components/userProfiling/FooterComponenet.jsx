import { ActionIcon, Anchor, createStyles, Group, Text } from "@mantine/core";
import React from "react";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { Link } from "react-router-dom";
const FooterComponenet = () => {
  // FOOTER CODE

  const useStyles = createStyles((theme) => ({
    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
    },

    inner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

      [theme.fn.smallerThan("sm")]: {
        flexDirection: "column",
      },
    },

    links: {
      [theme.fn.smallerThan("sm")]: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
      },
    },
  }));
  const { classes } = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text>DEVELOPED BY TEAM AWEP</Text>
        <Group className={classes.links}>
          <Anchor
            variant="text"
            // component={Link}
            href="https://awep-customer.vercel.app/contactUs"
          >
            CONTACT US
          </Anchor>
          <Anchor
            variant="text"
            // component={Link}
            href="https://awep-customer.vercel.app/aboutUs"
          >
            ABOUT US
          </Anchor>
        </Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
};

export default FooterComponenet;
