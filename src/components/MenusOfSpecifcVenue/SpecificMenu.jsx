import {
  createStyles,
  Paper,
  Text,
  Title,
  Box,
  ScrollArea,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    // color: theme.black,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  dishCategory: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));
const dishes = [
  {
    id: 1,
    dishName: "Chicken",
    price: 10,
    description:
      "Chicken is the most common type of poultry in the world. Owing to the relative ease and low cost of raising them in comparison to animals such as cattle or hogs, chickens have become prevalent throughout the cuisine of cultures around the world, and their meat has been variously adapted to regional tastes.",
    image:
      "https://images.unsplash.com/photo-1611181928379-8b8b1b2b2b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    dishCategory: "Main Course",
  },
  {
    id: 2,
    dishName: "Beef",
    price: 15,
    description:
      "Beef is the culinary dishName for meat from cattle, particularly skeletal muscle. Humans have been eating beef since prehistoric times. Beef is a complete source of protein, and provides many of the essential fatty acids, vitamins, and minerals that humans need.",
    image:
      "https://images.unsplash.com/photo-1611181928379-8b8b1b2b2b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    dishCategory: "Main Course",
  },
  {
    id: 3,
    dishName: "Pork",
    price: 12,
    description:
      "Pork is the culinary dishName for meat from the domestic pig (Sus scrofa domesticus). It is the most commonly consumed meat worldwide, with evidence of pig husbandry dating back to 5000 BC. Pork is eaten both freshly cooked and preserved.",
    image:
      "https://images.unsplash.com/photo-1611181928379-8b8b1b2b2b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    dishCategory: "Main Course",
  },
  {
    id: 3,
    dishName: "Poasdrk",
    price: 12,
    description:
      "Pork is the culinary dishName for meat from the domestic pig (Sus scrofa domesticus). It is the most commonly consumed meat worldwide, with evidence of pig husbandry dating back to 5000 BC. Pork is eaten both freshly cooked and preserved.",
    image:
      "https://images.unsplash.com/photo-1611181928379-8b8b1b2b2b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    dishCategory: "Mainasd sad sad Course",
  },
  {
    id: 3,
    dishName: "P12321ork",
    price: 12,
    description:
      "Pork is the culinary dishName for meat from the domestic pig (Sus scrofa domesticus). It is the most commonly consumed meat worldwide, with evidence of pig husbandry dating back to 5000 BC. Pork is eaten both freshly cooked and preserved.",
    image:
      "https://images.unsplash.com/photo-1611181928379-8b8b1b2b2b1d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    dishCategory: "Maasdasin Course",
  },
];
var menuTitle = "hehe";
var price = 1231321;

const SpecificMenu = () =>
  // { image, menuTitle, price, dishes }
  {
    const { classes } = useStyles();
    let dishCategoriesArray = dishes?.map((dish, index) => {
      return dish?.dishCategory;
    });
    let dishCategoriesFinalArray = Array.from(new Set(dishCategoriesArray));

    return (
      <Paper
        withBorder
        component={ScrollArea}
        shadow="md"
        p="xl"
        radius="md"
        // sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Title align="center" order={3} className={classes.title}>
            {menuTitle}
          </Title>
          <Title align="center" order={4}>
            PKR: {price} PER HEAD
          </Title>

          {dishCategoriesFinalArray.map((dishCategory, globalIndex) => {
            return (
              <Box
                key={globalIndex}
                color="green"
                orientation="horizontal"
                label={dishCategory}
                size="md"
              >
                <Text
                  mt="sm"
                  style={{ color: "#95CE78" }}
                  size="lg"
                  align="center"
                >
                  {dishCategory}
                </Text>

                {dishes?.map((dish, localIndex) => {
                  if (dish.dishCategory === dishCategory) {
                    return (
                      <Text
                        align="center"
                        key={localIndex}
                        size="md"
                        // style={{ color: "black" }}
                      >
                        {dish.dishName}
                      </Text>
                    );
                  }
                })}
              </Box>
            );
          })}
        </div>
      </Paper>
    );
  };
export default SpecificMenu;

// export function SpecificVenueMenu({ menus }) {
//   const theme = useMantineTheme();
//   const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
//   const slides = menus?.map((item) => (
//     <Carousel.Slide key={item?._id}>
//       <Card {...item} />
//     </Carousel.Slide>
//   ));

//   return (
//     <Carousel
//       slideSize="33.3333%"
//       breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 2 }]}
//       slideGap="xl"
//       align="start"
//       slidesToScroll={mobile ? 1 : 3}
//     >
//       {slides}
//     </Carousel>
//   );
// }
