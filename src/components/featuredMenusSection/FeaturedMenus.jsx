import { Anchor, Button, Container, Divider, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { Link } from "react-router-dom";
import FeaturedMenusCarousel from "./FeaturedMenusCarousel";

const FeaturedMenus = ({ landingPageMenus }) => {
  return (
    <Container size={"xl"} my="xl">
      <Divider my="lg" />
      <Group position="apart">
        <Anchor
          component={Link}
          to="/"
          variant="text"
          size={"1.5rem"}
          weight={500}
        >
          Top Rated Venue Menus
        </Anchor>
      </Group>
      <FeaturedMenusCarousel landingPageMenus={landingPageMenus} />

      <Group position="right">
        <Button
          component={Link}
          to="/"
          variant="outline"
          rightIcon={<IconArrowRight />}
          className="buttonOutline"
        >
          All Venues
        </Button>
      </Group>
    </Container>
  );
};

export default FeaturedMenus;
