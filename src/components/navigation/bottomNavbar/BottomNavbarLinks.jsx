import { Anchor, Box, List, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const BottomNavbarLinks = ({ footerLinks }) => {
  const links = footerLinks.map((footerLink, index) => {
    return (
      <Box key={index}>
        <Text weight={500} size={"lg"}>
          {footerLink.title}
        </Text>
        <List spacing={10} listStyleType={"none"} mt={"md"}>
          {footerLink.links.map((link, index) => {
            return (
              <List.Item key={index}>
                <Anchor
                  variant="text"
                  component={Link}
                  to={link.path}
                  color="dimmed"
                >
                  {link.title}
                </Anchor>
              </List.Item>
            );
          })}
        </List>
      </Box>
    );
  });
  return <div>{links}</div>;
};

export default BottomNavbarLinks;
