import { Anchor, Box, Group, List, Text } from "@mantine/core";
import { IconDeviceMobile, IconMail, IconMap } from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

const BottomNavbarHeadOffice = ({ data }) => {
  const links = (
    <Box>
      <Text weight={500} size={"lg"}>
        {data.title}
      </Text>
      <List spacing={10} listStyleType={"none"} mt={"md"}>
        <List.Item>
          <Anchor variant="text" component={Link} to={data.path} color="dimmed">
            <Group>
              <IconMap />
              <Text> {data.address}</Text>
            </Group>
          </Anchor>
        </List.Item>
        <List.Item>
          <Anchor variant="text" component={Link} to={data.path} color="dimmed">
            <Group>
              <IconMail />
              <Text> {data.email}</Text>
            </Group>
          </Anchor>
        </List.Item>
        <List.Item>
          <Anchor variant="text" component={Link} to={data.path} color="dimmed">
            <Group>
              {" "}
              <IconDeviceMobile />
              <Text>{data.phone}</Text>
            </Group>
          </Anchor>
        </List.Item>
      </List>
    </Box>
  );

  return <div>{links}</div>;
};

export default BottomNavbarHeadOffice;
