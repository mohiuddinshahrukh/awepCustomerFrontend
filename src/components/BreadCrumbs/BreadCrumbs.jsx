import { Breadcrumbs, Anchor, Group, Text } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { Link } from "react-router-dom";
const BreadCrumbs = () => {
  const items = [
    { title: "Home", href: "/" },
    { title: "Wedding Venues", href: "#" },
    { title: "Islamabad", href: "#" },
    { title: "Marquees", href: "#" },
  ].map((item, index) => (
    <Anchor
      component={Link}
      to={item.href}
      key={index}
      variant="text"
      color="dimmed"
    >
      {item.title}
    </Anchor>
  ));
  return (
    <Group>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <IconChevronLeft
          size={20}
          style={{
            paddingTop: 3,
          }}
        />
        <Text>Results</Text>
      </div>
      <Breadcrumbs>{items}</Breadcrumbs>
    </Group>
  );
};

export default BreadCrumbs;
