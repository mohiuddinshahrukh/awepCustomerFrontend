import { Anchor, Group } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const TopNavbarLinks = ({ linksData }) => {
  const links = linksData?.map((link, index) => {
    return (
      <Anchor key={index} variant="text" component={Link} to={link.path}>
        {link.title}
      </Anchor>
    );
  });

  return <Group>{links}</Group>;
};

export default TopNavbarLinks;
