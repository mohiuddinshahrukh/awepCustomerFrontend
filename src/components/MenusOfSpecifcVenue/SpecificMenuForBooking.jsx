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

const SpecificMenuForBooking = ({
  menu,
  setIdOfSelectedMenu,
  idOfSelectedMenu,
  setMenuPrice,
  setSelectedMenu,
  noOfGuests,
}) => {
  // { image, menuTitle, price, dishes }
  let menuName = menu.menuTitle ? menu.menuTitle : "Menu Name";
  let menuPrice = menu.price ? menu.price : "Menu Price";
  let dishes = menu?.dishes;

  const { classes } = useStyles();
  let dishCategoriesArray = dishes?.map((dish, index) => {
    return dish?.dishCategory;
  });
  let dishCategoriesFinalArray = Array.from(new Set(dishCategoriesArray));

  return (
    <Paper
      onClick={() => {
        setIdOfSelectedMenu(menu?._id);
        setSelectedMenu(menu);
        setMenuPrice(menu?.price);
        console.log("menu clicked", menu);
      }}
      withBorder
      style={{
        border: idOfSelectedMenu === menu?._id ? "5px solid #E60084" : "none",
      }}
      component={ScrollArea}
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${menu?.image})` }}
      className={classes.card}
    >
      <div>
        <Title align="center" order={3} className={classes.title}>
          {menuName}
        </Title>
        <Title align="center" order={4}>
          Rs: {menuPrice} PER HEAD
        </Title>
        {idOfSelectedMenu === menu?._id && (
          <Text size="xl" color="red" weight="bold" align="center">
            Total Price Rs: {menuPrice * noOfGuests}
          </Text>
        )}

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
export default SpecificMenuForBooking;

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
