import { Accordion, Anchor, List, ThemeIcon } from "@mantine/core";
import { IconLink } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const TopNavbarDrawer = ({ linksData }) => {
  const accordion = (
    <Accordion>
      {linksData?.map((link, index) => {
        return (
          <Accordion.Item key={index} value={link.title}>
            <Accordion.Control>{link.title}</Accordion.Control>
            <Accordion.Panel>
              <List
                spacing="xs"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconLink size={16} />
                  </ThemeIcon>
                }
              >
                {link?.list?.map((list, index) => {
                  return (
                    <List.Item key={index}>
                      <Anchor
                        variant="text"
                        component={Link}
                        to={list.listItemPath}
                      >
                        {list.listItem}
                      </Anchor>
                    </List.Item>
                  );
                })}
              </List>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
  return <div>{accordion}</div>;
};

export default TopNavbarDrawer;
